## 2-高质量React组件
### · 设计要素
高内聚，低耦合。
### · 组件的数据
React利用prop定义组件对外的接口，用state表示内部的状态。
### · 生命周期
与 the road to learn react 相似
### · 组件向外传递数据
子组件传递数据给父组件,在父组件中写好改变状态的函数，__作为props传递__ 给子组件。
但这样会出现数据的冗余和重复，更好的解决方案是将数据放在react组件之外，形成 __全局状态__ 。
在利用props跨级传递数据时，通过父组件中转，其实也违背了低耦合的设计要求。

## 3-从Flux到React
### · Flux
Flux一族框架的最重要观点———— __单向数据流__ 。
 - MVC框架的缺陷
    分而治之：Model管理数据；View渲染用户界面；Controller接受用户输入，根据输入调用Model中的部分逻辑，将结果传输给View，让View渲染。
    但是实际操作时，常常会为了遍历让model和view直接对话，结构变得像蜘蛛网一样混乱。
 - Flux框架
    <img src="static/flux.png" alt="flux frame">
    Dispatcher处理动作分发；Store，负责数据存储和处理相关逻辑；Action驱动Dispatcher的JavaScript对象;View显示界面。
    MVC框架中，系统提供服务，通过Controller暴露函数实现，没增加一个函数，Controller中增加一个函数。而Flux中，Dispatcher只暴露一个函数Dispatch，新增加功能时，要增加的是一个新的Action类型（和d3中的dispatch相似）。
 - Flux应用
    1. 创建唯一的 __Dispatcher__ ，来派发action。
    2. 定义 __action__ 需要两个文件，一个定义action的类型，一个定义action的构造函数。
    在 src/ActionTypes.js 中，我们定义 action 的类型，代码如下:
```javascript
    export const INCREMENT = 'increment';
    export const DECREMENT = 'decrement';
```
    在 src/Actions.js 文件中定义 action 构造函数:
```javascript
    import * as ActionTypes from './ActionTypes.js';
    import AppDispatcher from './AppDispatcher.js';

    export const increment = (counterCaption) => { 
        AppDispatcher.dispatch({
            type: ActionTypes.INCREMENT, 
            counterCaption: counterCaption
        });
    };
    export const decrement = (counterCaption) => { 
        AppDispatcher.dispatch({
            type: ActionTypes.DECREMENT,
            counterCaption: counterCaption
        });
    };
```

    3. __Store__ 是一个对象，存储应用的状态同时接受Dispatcher派发的动作，根据动作确定是否更新应用状态。
```javascript
    import AppDispatcher from '../AppDispatcher.js';

    const counterValues = {
        'First': 0, 
        'Second': 10, 
        'Third': 30
    }

    const CounterStore = Object.assign({}, EventEmitter.prototype, {
        getCounterValues: function(){//getter函数，应该返回一个不可变的数据，避免修改
            return counterValues ; 
        },
        emitChange: function() {//广播
            //emit，广播一个特定事件
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function(callback){//增加监听事件
            //on，增加一个挂在特定事件上的处理函数
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function(callback) { //删除监听事件
            //removeListener，删除一个挂在特定事件上的处理函数
            this.removeListener(CHANGE_EVENT, callback);
        }
    });
    //把CounterStore注册到唯一的Dispatcher上
    CounterStore.dispatchToken = AppDispatcher.register((action) => {
        if (action.type === ActionTypes.INCREMENT) {
            counterValues[action.counterCaption] ++ ;
            CounterStore.emitChange();
        } else if (action.type === Act工onTypes.DECREMENT) {
            counterValues[action.counterCaption] --;
            CounterStore.emitChange ();
        }
    }); 
```
    CounterStore扩展了EventEmitter.prototype，让CounterStore成了EventEmitter对象。
    通过Dispatcher派发action（名字为First的计数器完成加一动作）：
```javascript
    AppDispatcher.dispatch ({
        type: ActionTypes. INCREMENTI,
        counterCaption: 'First'
    });
```
    因为SumrnaryStore中的数值是依赖CounterStore中的数据求和得到的，所以SummaryStore在Dispatcher上注册的回调函数和CounterStore很不一样。
    __waitfor__ 函数，可以让SumrnaryStore在CounterStore执行结束后执行。waitfor接受的参数可以是一个数组。
```javascript
    SumrnaryStore.dispatchToken = AppDispatcher.register((action) =>{
        if ((action.type === ActionTypes.INCREMENT) ||
            (action.type === ActionTypes.DECREMENT)) {
            AppDispatcher.waitFor([CounterStore.dispatchToken]);
            SumrnaryStore.emitChange();
        }
    });
```

    4. __View__ ，存在于Flux框架中的React组件需完成以下功能：
    - 创建时要读取Store上状态来初始化组件内部状态；
```javascript
    constructor(props){ 
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onClickincrementButton = this.onClicklncrementButton.bind(this); this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.state = {
            count:CounterStore.getCounterValues()[props.caption]
        }
    }
``` 
    - 当store上状态变化时，组件要立刻同步更新
```javascript
    componentDidMount() {
        CounterStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() { 
        CounterStore.removeChangeListener(this.onChange);
    }

    onChange() {
        const newCount = CounterStore.getCounterValues() [this.props.caption); 
        this.setState({count: newCount}};
    }
``` 
    - View要改变store状态，只能依靠派发action。
```javascript
    onClickIncrementButton() {
        Actions.increment(this.props.caption);
    }
``` 

Flux的优点是“单向数据流”，禁绝了数据流混乱的可能。缺点是store之间依赖关系，难以进行服务端渲染，store混杂了逻辑与状态。

### · Redux
- 基本原则
Flux的基本原则是“__单向数据流__”，Redux在此基础上强调三个原则：
  1. __唯一数据源__
    应用的状态数据只存储在唯一的store上。
    唯一的store上的状态，是一个树形的对象，每个组件只是树形对象上分的一部数据。
  2. __保持状态只读__
  3. __数据改变只能通过纯函数完成__
    纯函数值得是 __Reducer__。
    在Redux中，每个reducer的签名如下：
  ```javascript
      reducer(state, action)
  ``` 
    reducer是一个纯函数，函数的返回结果由当前状态state和action决定，且不产生任何副作用，也不能修改state和action对象。
  ```javascript
      function reducer(state , action) => { 
          const {counterCaption} = action;
          switch (action.type) {
              case ActionTypes.INCREMENT :
                  return {...state , [counterCaption]: state[counterCaption] + 1};
              case ActionTypes.DECREMENT:
                  return {...state, [counterCaption]: state[counterCaption] - 1};
              default:
                  return state;
          }
      }
  ``` 
  Redux的reducer只负责计算状态，并不负责存储状态。

- Redux应用
  1. __action__，与Flux一样，Redux把action的类型和构造函数分成两个文件定义。
    定义action类型的 src/ActionType.js 没有任何差别，但是 src/Actions.js文件就不大一样了
    ```javascript
        import * as ActionTypes from './ActionTypes.js';

        export const increment = (counterCaption) => { 
            return {
                type : ActionTypes.INCREMENT, 
                counterCaption: counterCaption
            };
        };
        export const decrement = (counterCaption) => { 
            return {
                type : ActionTypes.DECREMENT, 
                counterCaption: counterCaption
            }
        };
    ```
    Flux中action构造函数通过调用Dispatcher的dispatch函数派发。
    而Redux中每个action构造函数都返回一个action对象。在Redux中，很多函数都是不做产生副作用的动作，而是返回一个对象，把如何处理这个对象的工作交给调用者。
  2. __store__，创造一个 src/Store.js文件，这个文件输出全局唯一的那个Store。
    ```javascript
        import {createStore} from 'redux'
        import reducer from './Reducer.js';

        const initValues = { 'First': 0, 'Second': 10, 'Third': 20 };
        const store = createStore (reducer, initValues);
        export default store;
    ```
    Redux库提供了 createStore 函数，函数第一个参数代表更新状态的reducer，第二个参数是状态的初始值，第三个参数可选，代表Store Enhancer。
  3. __reducer__，创建src/Reducer.js文件。
    ```javascript
        import * as ActionTypes from '. / ActionTypes.js';

        export default (state , action) => { 
            const {counterCaption} = action;
            switch (action.type) {
                case ActionTypes.INCREMENT:
                    return {...state, [counterCaption]: state[counterCaption] + 1};
                case ActionTypes.DECREMENT:
                    return {...state, [counterCaption]: state[counterCaption] - 1};
                default:
                    return state;
            }
        }
    ```
    和Flux不同的是，多了一个参数state。在Flux中没有这个参数，因为state是由Store管理的。
    Redux中把存储state的工作抽取出来交给Redux框架本身，让reducer只用关心如何更新state。
    reducer是一个纯函数，不可以直接修改state。
  4. __view__, Counter组件位于src/views/Counter.js，和Flux不大一样。
    - __初始化__ 引人唯一的Redux Store，通过 __store.getState()__ 获得store上存储的所有状态。组件只需要使用状态的一部分数据。
    为了避免重复代码，我们把从store获得状态的逻辑放在getOwnState函数中，这样任何关联Store状态的地方都可以重用这个函数。。
    ```javascript
        import store from '../Store.js';

        class Counter extends Component { 
            constructor(props) {
                super(props);
                ...
                this.state = this.getOwnState();
            }

            getOwnState() { 
                return {
                    value: store.getState()[this.props.caption]
                };
            }
        }
    ```
    - __保持同步__。
    ```javascript
        onChange () {
            this.setState(this.getOwnState());
        }
        componentDidMount() {
            store.subscribe(this.onChange);
        }
        componentWillUnmount() {
            store.unsubscribe(this.onChange);
        }
    ```
    - __改变状态__。唯一的方法就是派发action。
    ```javascript
        onIncrement () {
            store.dispatch(Actions.increment(this.props.caption));
        }
        onDecrement () {
            store.dispatch(Actions.decrement(this.props.caption));
        }
    ```
- 容器组件和傻瓜组件
  分析上面的例子，Redux中一个组件基本完成两个功能：与store中的数据打交道，根据props和state渲染用户界面。
  让一个组件只专注一件事，如果React组件要包办两个任务，可以考虑拆分。
  两个组件是父子组件的关系。与Redux Store打交道的组件，处于外层，成为 __容器组件__，又叫聪明组件；负责渲染界面的组件，处于内层，叫 __展示组件__，又叫傻瓜组件。
  __傻瓜组件__ 是一个纯函数，根据props产生结果，无状态，所以可以简化，不需要用类表示。
  ```javascript
    function Counter(props) { 
        const {caption, onlncrement, onDecrement, value} = props;
        return(
            <div>
                <button style={buttonStyle} onClick={onIncrement}>+</button> 
                <button style={buttonStyle} onClick={onDecrement}>-</button> 
                <span>{caption} count: {value} </span>
            </div>
        );
    }
  ```
  __容器组件__ 做一些涉及状态转换的事。它的render函数所做的就是渲染傻瓜组件Counter，传递必要的prop。
  ```javascript
    class CounterConta工ner extends Component { 
        render () {
        return<Counter caption={this.props.caption}
            onIncrement={this.onIncrement} 
            onDecrement={this.onDecrement}
            value={this.state.value} />
        }
    }
    export default CounterContainer;
  ```
- 组件Context
  在组件中直接导人Store非常不利于组件复用。
  一个应用中，最好只有一个地方直接导人Store，在最顶层React组件。其余组件应避免直接导入Store。
  React提供了一个叫Context的功能，能够完美地解决这个问题。
  <img src="static/context.png" alt="react context">
  所谓Context，就是“上下文环境”，让一个树状组件上所有组件都能访问一个共同的对象。
  上级组件要宣称自己支持context，并且提供一个函数来返回代表Context的对象。
  上级组件之下的所有子孙组件，只要宣称自己需要这个context，就可以通过 __this.context__ 访问到共同的环境对象。

  - 顶层组件
    创建一个特殊的React组件，它将是一个通用的context提供者，可以应用在任何一个应用中，我们把这个组件叫做 __Provider__。 
    在src/Provider.js中:
    ```javascript
        import {PropTypes, Component} from 'react';

        class Provider extends Component { 
            getChildContext() {
                return {
                    store: this.props.store
                };
            }
            render() {
                return this.props.children;
            }
        }
    ```
    Provider的render函数就是简单地把子组件渲染出来。
    为了让Provider能够被React认可为一个Context的提供者，还需要指定Provider的childContextTypes属性：
    ```javascript
        Provider.childContextTypes = {
            store: PropTypes.object
        }
    ```
    有了Provider，我们就可以改进一下应用的入口src/index.js文件。
    ```javascript
        import store from './Store.js';
        import Provider from './Provider.js';

        ReactDOM.render(
            <Provider store={store}>
                <ControlPanel />
            </Provider> ,
            document.getElementByid('root')
        );
    ```
 - 底层组件
    傻瓜组件和之前的代码一样，容器组件发生了变化。
    为了让CounterContainer能够访问到context，必须给CounterContainer类的contextTypes赋和 Provider.childContextTypes一样的值，代码如下:
    ```javascript
        CounterContainer.contextTypes = {
            store: PropTypes.object
        }
    ```
    在CounterContainer中，所有对 store 的访问，都是通过 __this.context.store__ 完成。
    ```javascript
        getOwnState() { 
            return {
                value: this.context.store.getState()[this.props.caption];
            };
        }
    ```
    ```javascript
        getOwnState() { 
            return {
                value: this.context.store.getState()[this.props.caption];
            };
        }
    ```
    在构造函数调用super的时候，一定要带上context参数，这样才能让React组件初始化实例中的context，不然组件的其他部分就无法使用this.context。
    ```javascript
    constructor(props, context) { 
        super(props, context);
    }
    ```
    为了一劳永逸，也可以
    ```javascript
    constructor() { 
        super(... arguments);
    }
    ```
    不能直接使用arguments，因为在JavaScript中arguments表现得像是一个数组，通过扩展标示符就能把arguments彻底变成传递给super的参数。

    _Context功能要谨慎使用，只有对那些每个组件都可能使用，但是中间组件又可能不使用的对象才有必要使用Context，千万不要滥用。_

- React-Redux
    上面介绍了改进React应用的两个方法：
      __connect__:连接容器组件和傻瓜组件;
      __Provider__:提供包含 store 的 context。
    这两种方法都有套路，可以抽取出来复用。库react-redux可以完成。
    1. connect
       react-redux的例子中没有定义CounterContainer这样的容器组件,而是直接导出了一个这样的语句。
       ```javascript
            export default connect(mapStateToProps, mapDispatchToProps)(Counter);
       ```
       connect是react-redux提供的一个方法，这个方法接收两个参数mapStateToProps和mapDispatchToProps。
       执行结果依然是一个函数，把connect函数执行的结果立刻执行，这一次参数是Counter这个傻瓜组件。
       产生的就是容器组件，相当于CounterContainer。

       __mapStateToProps 函数__，把Store上的状态转化为内层组件的props。
       ```javascript
            function mapStateToProps(state, ownProps){ 
                return {
                    value: state[ownProps.caption];
                }
            }
       ```
       __mapDispatchToProps 函数__，把内层傻瓜组件中用户动作转化为派送给Store的动作。
       ```javascript
            function mapDispatchToProps(dispatch, ownProps){
                return {
                    onincrement: () => {
                        dispatch(Actions.increment(ownProps.caption));
                    },
                    onDecrement: () => { 
                        dispatch(Actions.decrement(ownProps.caption));
                    }
                }
            }
    2. Provider
       react-redux和例子中的Provider几乎一样,但是更加严谨。