import evaluateSelector from '../es/evaluate-selector';

describe('evaulate-selector', () => {
  let globalState;
  let previousState;
  let selector;

  beforeEach(() => {
    selector = jest.fn();

    globalState = {
      a: 'this doesnt really matter'
    };
  });

  afterEach(() => {
    expect(selector).toHaveBeenCalledTimes(1);
    expect(selector).toHaveBeenCalledWith(globalState);
  });

  describe('when the previous state is null', () => {
    beforeEach(() => {
      previousState = null;
    });

    it('should return null if the selector returns null', () => {
      selector.mockReturnValueOnce(null);
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toBe(null);
    });

    it('should return { bar: "test 1" } if the selector returns { bar: "test 1"}', () => {
      selector.mockReturnValueOnce({ bar: 'test 1' });
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toEqual({ bar: 'test 1' });
    });

    it('should return an error if the selector throws an exception', () => {
      selector = jest.fn(() => {
        throw new Error('this is an error');
      });
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toEqual({ ERROR: new Error('this is an error') });
    });

    it('should return null if the selector returns undefined', () => {
      selector.mockReturnValueOnce(undefined);
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toBe(null);
    });
  });

  describe('when the previous state is { foo: "bar" }', () => {
    beforeEach(() => {
      previousState = { foo: 'bar' };
    });

    it('should return null if the selector returns null', () => {
      selector.mockReturnValueOnce(null);
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toBe(null);
    });

    it('should return null if the selector returns { foo: "bar" }', () => {
      selector.mockReturnValueOnce({ foo: 'bar' });
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toBe(null);
    });

    it('should return { bar: "test 1" } if the selector returns { bar: "test 1"}', () => {
      selector.mockReturnValueOnce({ bar: 'test 1' });
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toEqual({ bar: 'test 1' });
    });

    it('should return an error if the selector throws an exception', () => {
      selector = jest.fn(() => {
        throw new Error('this is an error');
      });
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toEqual({ ERROR: new Error('this is an error') });
    });

    it('should return null if the selector returns undefined', () => {
      selector.mockReturnValueOnce(undefined);
      const result = evaluateSelector(selector, previousState, globalState);
      expect(result).toBe(null);
    });
  });
});
