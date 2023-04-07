import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
  // devtool 연결 안함 이유)history가 쌓이면서 메모리도 잡아먹고 데이터가 다보이므로 보안에 취약
    : composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware)); // devtool 연결
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development', // 개발할 때 자세하게 알려주므로 개발환경때는 true로사용하자
});

export default wrapper;
