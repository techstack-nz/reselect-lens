Reselect Lens
=========================

Visibility for [Reselect](https://github.com/reactjs/reselect) in [Redux DevTools](https://github.com/gaearon/redux-devtools).

## Installation

```
npm install --save reselect-lens
```

## Web example

```js
import reselectLens from 'reselect-lens';
import store from './store';
import * as fooSelectors from './selectors/foo';
import * as barSelectors from './selectors/bar';

// Best not to run reselect-lens in production.
if (process.env.NODE_ENV === 'development') {
  const allSelectors = {
    ...fooSelectors,
    ...barSelectors
  };

  reselectLens(store, allSelectors);
}
```

1. Open Chrome Developer Tools.
2. Select the 'Redux' tab.
3. Locate the dropdown list for choosing a store (top right of the screen).
4. Choose the store called 'reselect-lens'.
5. You should now be able to view the values returned by your selectors.

## React Native example

```js
import reselectLens from 'reselect-lens';
import store from './store';
import * as fooSelectors from './selectors/foo';
import * as barSelectors from './selectors/bar';

// Best not to run reselect-lens in production.
if (__DEV__) {
  const allSelectors = {
    ...fooSelectors,
    ...barSelectors
  };

  reselectLens(store, allSelectors);
}
```

1. Open your React Native Debugger.
2. Ensure that Redux DevTools is on.
3. Locate the dropdown list for choosing a store (top right of the Redux DevTools panel).
4. Choose the store called 'reselect-lens'.
5. You should now be able to view the values returned by your selectors.
