import {connectionReducer,dbReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
  connection:connectionReducer,
  db:dbReducer,
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));