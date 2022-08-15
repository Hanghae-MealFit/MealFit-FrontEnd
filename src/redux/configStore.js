
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
// createStore 쓰지 않기를 권고함
import thunk from "redux-thunk";
// 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있음
// import user from './modules/user';
import card from './modules/card';

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ card });

const store = createStore(rootReducer, enhancer)

export default store;

