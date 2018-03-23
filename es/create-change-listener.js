import evaluateSelector from './evaluate-selector';

export default (reselectors, store, selectorStore) =>
  () => {
    const state = store.getState();

    reselectors.forEach((reselector) => {
      const { type, selector, previousState } = reselector;
      const payload = evaluateSelector(selector, previousState, state);

      if (payload) {
        selectorStore.dispatch({ type, payload });
        reselector.previousState = payload;
      }
    });
  };
