import { createStore, combineReducers } from 'redux';
import evaluateAllSelectors from './evaluate-all-selectors';
import createReducer from './create-reducer';

const defaultStoreName = 'reselect-lens';

export default (store, selectors, storeName = defaultStoreName) => {
  // if tools are not available, don't do anything. This should not
  // prevent the application from running.
  const composeWithDevTools = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line

  if (!composeWithDevTools) {
    return;
  }

  // identify selector names, and sort alphabetically
  const selectorNames = Object.keys(selectors);
  selectorNames.sort((a, b) => (a > b ? 1 : -1));

  // create some stuff
  const reselectors = [];
  const reducers = {};

  selectorNames.forEach((name) => {
    const setAction = `${storeName}/SET_${name}`;

    reselectors.push({
      setAction,
      selector: selectors[name],
      previousState: null
    });

    reducers[name] = createReducer(setAction);
  });

  // create a new store in which to house the computed values of the reselectors
  const composeEnhancers = composeWithDevTools({ name: storeName });
  const rootReducer = combineReducers(reducers);
  const selectorStore = createStore(rootReducer, composeEnhancers());

  // listen for changes to the original store...when something changes, evaluate all reselectors
  const onChange = () => evaluateAllSelectors(reselectors, store.getState(), selectorStore);
  store.subscribe(onChange);

  // evaluate all reselectors to get the current state
  onChange();
};
