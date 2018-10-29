// import { createStore } from "redux"
import { createStore } from './fakeRedux';

`
Redux 最简单用例
store 中存储一个 count 用于计数，初始值为 0

store = {
    count: 0
}

通过 addOneCount 让 store 中 count 的值加一
`
// action
const addOneCountString  =  'ADD_ONE_COUNT'

// action creator
const addOneCount = () => ({
    type: addOneCountString,
    payload: null,
});


// reducer
function counter(state = 0, action) {
    switch (action.type) {
    case addOneCountString:
            return state + 1
        default:
            return state
        }
}

const consoleActionMiddleWare1 = store =>  next => action => {
    console.log('log action in middleware1', action);
    // console.log('next in middleware1', next);
    next(action);
}

const consoleActionMiddleWare2 = store => next => action => {
    console.log('log action in middleware2', action);
    // console.log('next in middleware2', next);
    next(action);
}


// let repeatTime = 3;
// const repeatThroughMiddleWare =  (store) => next => action => {
// 	console.log('repeatTime', repeatTime);
// 	if(repeatTime > 0) {
// 		repeatTime -= 1;
// 		store.dispatch(action);
// 	}else {
// 		next(action);
// 	}
// };

// store
let store = createStore(counter, [consoleActionMiddleWare1, consoleActionMiddleWare2]);

// let store = createStore(counter, [consoleActionMiddleWare1, consoleActionMiddleWare2] );

// console.log('inital state', store.getState());



// store.subscribe( a => console.log( 'state updated', store.getState()));

store.dispatch( addOneCount() );

