import createReducer from '../es/create-reducer';

describe('create-reducer', () => {
  let reducer;

  beforeEach(() => {
    reducer = createReducer('SET_FOO_BAR_BAZ');
  });

  it('reducer should return state when action type is not SET_FOO_BAR_BAZ', () => {
    const action = { type: 'BLAH_BLAH_BLAH', payload: 'the payload' };
    const result = reducer('current state', action);
    expect(result).toEqual('current state');
  });

  it('reducer should return action payload when action type is SET_FOO_BAR_BAZ', () => {
    const action = { type: 'SET_FOO_BAR_BAZ', payload: 'the payload' };
    const result = reducer('current state', action);
    expect(result).toEqual('the payload');
  });
});
