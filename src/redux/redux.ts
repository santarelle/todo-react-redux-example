import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createPromise } from 'redux-promise-middleware';

import { rootReducer } from './root.redux';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      createPromise({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE'],
      })
    )
  )
);

export { store };
