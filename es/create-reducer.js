export default setAction =>
  (state = null, action) =>
    (action.type === setAction
      ? action.payload || null
      : state);
