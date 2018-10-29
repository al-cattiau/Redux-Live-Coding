
const createStore = (reducer, middlewares = []) => {
    const cbs = [];
    let state = reducer(undefined, {});

    const store =  {
        getState: ()=> {
            return state;
        },
        subscribe: (cb)=> {
            cbs.push(cb);
        },

        dispatch: ( action ) => {
            const nextState = [action].reduce( reducer, undefined );
            if(nextState !== state ) {
                state = nextState;
                cbs.forEach( cb => cb() );
            }
        }
    };

    if(middlewares.length) {
        ` 如果由中间件，把 dispatch 函数做特殊处理 `
        const middlewaresWithStore =  middlewares.map( m => m(store));
        store.dispatch =  
            middlewaresWithStore.reduce(
                (newDispatch, middleware) => middleware(newDispatch),  
                store.dispatch
            );

    }

    `
     [中间件1， 中间件2 ].reduce => 

     store.dispatch =  中间件2(中间件1( store.dispatch))

     所以中间件的流动顺序与默认 reduce 传递的函数顺序相反
    
    `

    return store;
}


export { createStore };

