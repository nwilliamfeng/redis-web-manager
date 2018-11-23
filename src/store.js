import {connectionReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
  connection:connectionReducer,
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));