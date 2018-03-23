import createReducer from './create-reducer';

export default (selectors, storeName) => {
  const reselectors = [];
  const reducers = {};

  const selectorNames = Object.keys(selectors);
  selectorNames.sort((a, b) => (a > b ? 1 : -1));

  selectorNames.forEach((name) => {
    const type = `${storeName}/SET_${name}`;

    reselectors.push({
      type,
      selector: selectors[name],
      previousState: null
    });

    reducers[name] = createReducer(type);
  });

  return {
    reselectors,
    reducers
  };
};
