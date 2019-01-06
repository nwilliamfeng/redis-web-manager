import {connectionReducer,dbReducer,keyReducer,stateReducer,dialogReducer } from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
  connection:connectionReducer,
  db:dbReducer,
  key:keyReducer,
  state:stateReducer,
  dialog:dialogReducer

  
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));