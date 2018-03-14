import evaluateSelector from './evaluate-selector';

export default (reselectors, globalState, selectorStore) => {
  reselectors.forEach((reselector) => {
    const {
      selector,
      previousState,
      setAction
    } = reselector;

    // evaluate new state of selector
    const newState = evaluateSelector(selector, previousState, globalState);

    if (newState) {
      // dispatch new state into the store
      selectorStore.dispatch({
        type: setAction,
        payload: newState
      });

      // update previous state
      reselector.previousState = newState;
    }
  });
};
