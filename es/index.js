import { createStore, combineReducers } from 'redux';
import createChangeListener from './create-change-listener';
import createReselectors from './create-reselectors';

const defaultStoreName = 'reselect-lens';

export default (store, selectors, storeName = defaultStoreName) => {
  // if tools are not available, don't do anything. This should not
  // prevent the application from running.
  const compose = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  if (!compose) {
    return;
  }

  // create some useful stuff
  const { reselectors, reducers } = createReselectors(selectors, storeName);

  // create a new store to house the computed values of the selectors
  const composeEnhancers = compose({ name: storeName });
  const rootReducer = combineReducers(reducers);
  const selectorStore = createStore(rootReducer, composeEnhancers());

  // listen for changes to the original store...when
  // something changes evaluate all selectors
  const onChange = createChangeListener(reselectors, store, selectorStore);
  store.subscribe(onChange);

  // evaluate all selectors to initialize current state
  onChange();
};
