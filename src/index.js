import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// curried function of logger(obj, next, action)
// internally - logger(obj)(next)(action)
// const logger = function({dispatch, getState}){ // random object with dispatch and getState parameter
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log("ACTION.TYPE =", action.type)
//       next(action);
//     }
//   }

// }

const logger = ({ dispatch, getState}) => (next) => (action) =>{
 // logger code
     if(typeof action !== 'function'){
       console.log("ACTION.TYPE =", action.type)
     }
      next(action);
}

// const thunk = ({ dispatch, getState}) => (next) => (action) =>{

//   if( typeof action === "function"){
//     action(dispatch);
//     return
//   }
//   next(action);
//  }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("STORE", store);
// console.log("Before state", store.getState());

// store.dispatch({
//   type : 'ADD_MOVIES',
//   movies: [{ name : "SuperMan"}]
// })

// console.log("After state", store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);


