import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';

// 리덕스
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// 머무르고 있는 페이지에서, useSelector로 store 상태만 가져와 사용하여 개발하던 도중, 새로 고침하면 기존의 store가 초기화되는 문제를 겪음.
// 해결 방법으로 LocalStorage와 SessionStorage의 storage를 redux에서 사용하게 해주는 Redux-Persist 라이브러리를 사용하여 해결.
// persistStore는 새로고침, 종료해도 지속될 store 생성
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

export default persistor;