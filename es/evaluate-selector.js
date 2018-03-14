export default (selector, previousState, globalState) => {
  try {
    // call the selector to get the latest state
    const newState = selector(globalState) || null;

    // return new state only if state has changed
    const newStateStr = JSON.stringify(newState);
    const prevStateStr = JSON.stringify(previousState);

    return newStateStr === prevStateStr
      ? null
      : newState;
  }
  catch (error) {
    return {
      ERROR: error
    };
  }
};
