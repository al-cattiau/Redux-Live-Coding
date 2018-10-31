`

Redux 简介：

全局状态管理器

通过 dispatch 一个对象描述发生的动作，如

coonst addCount = 'ADD_COUNT'; // 声明动作类型



{
    type: addCount,
    payload: 2,
}


Reducer 负责根据 action 与当前的状态， 计算出一个新的状态。
如果有新的状态产生，把所有订阅的对象全部更新一遍。

function reducer(initialState={}, action ) {
    swicth(action.type) {

        default: 
            return state;
    }
    
}

关键点： reducer 只能返回一个新的状态，不能直接修改原有的值
dispatch 的对象应该是一个普通的对象，没有任何副作用，只描述发生了什么
`



`
为什么 store 需要不可变 ?
因为 connect 的 Redux 组件判断 store 有无变化的方式为 
    previousStore === currentStore ? 
如果直接修改 store， 组件无从判断 store 是否发生了变化 
js 对象引用传递， 创建一个全新的 store 才能使 previousStore !== currentStore


每次 dispatch action 之后， 
action 经过 reducer 产生新的 store， 
之后通过判断 previousStore 与 currentStore 是否全等决定要不要更新。

`

`

reduce 高阶函数:

[].reduce(cb, initalValue )

reduce 接受一个回调，与一个初始值

cb = (accumulator, currentValue ) => nextAccumulator

accumulator 累加值
currentValue 当前值

举例：

[1,2,3].reduce( (total, current)=> total + current, 0);

`


`
    中间件： 在 action 到达 reducer 之前，对特定的 action 作出一些操作
    中间件应该是顺序无关的
     
    action => 中间件1 => 中间件2 => 中间件3 => ... => reducer

    举个例子： 
        中间件1 负责处理 promise
        而中间件 2 负责处理函数，
            即遇到函数型 action 就调用它，
            把函数的返回值继续当成新的 action 往下传递

    如果一个 action 是 ()=> { return Promise.resolve({}) }
    那么这个 action 先由中间件 1 处理还是先由中间件 2 处理结果就完全不同

    所以，中间件的一个原则就是，如果中间件处理了 action，
        那么这个 action 就应该从最开始的中间件开始重新流经所有的中间件，
        这样才能保证执行结果与中间件顺序无关

    结构上，中间件是一个增强 dispatch 功能的函数

    dispatch 函数结构为
    action => { 
        // 返回新的 storestate
    }

    使用 monkeyPaching 的方式实现中间件, like this：
    
        store.dispatch = action => {
            console.log("do something....");
            store.dispatch(action);
        }

    
    使用函数包裹的方式，使输入为 dispatch, 输出为增强过的 dispatch, like this：

    const middleware = dispatch => action => {
        console.log("do something....");
        dispatch(action);
    }

    这样写最大的好处是，我们可以配合 reduce 实现更加优雅的链式调用

    middlewares.forEach( dispatch, mdw => mdw( dispatch),  store.dispatch)

    遍历每一个中间件，每次调用中间件，把 dispatch 当成参数传进去，得到一个增强了功能的 dispatch

`




