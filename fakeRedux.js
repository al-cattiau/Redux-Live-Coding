
const createStore = (reducer, middlewares = []) => {
    const cbs = [];
    let state = reducer(undefined, {});

    const store =  {
        getState: ()=> {
            return state;
        },
        
        subscribe: (cb)=> {
            cbs.push(cb);
            // 返回一个 unsubscribe 函数
            return () => {
                const cbIndex = cbs.indexOf(cb);
                if(cbIndex){
                    cbs.splice(cbIndex, 1);
                }
            }
        },

        dispatch: ( action ) => {
            const nextState = reducer( state, action);
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

     next => action => {
        console.log('log action in middleware1', action);        
     }
    
    `

    return store;
}


export { createStore };

