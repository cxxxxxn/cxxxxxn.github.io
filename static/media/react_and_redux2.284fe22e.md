## 4-模块化React和Redux应用
### · 代码文件的组织方式
- 按角色组织，如mvc，代码分为models，controllers，views三个文件夹。跳转麻烦。
- 按功能组织，更适合。
  每个基本功能对应的一个功能模块，每个功能模块对应一个目录。包括：
    1. actionTypes.js 定义action类型;
    2. actions.js 定义action构造函数;
    3. reducer.js 定义这个功能模块如何响应actions.js中定义的动作;
    4. views 目录，包含这个功能模块中所有的 React 组件，包括傻瓜组件和容器组件;
    5. index.js 这个文件把所有的角色导人，然后统一导出。
   
### · 模块接口
把一个目录看做一个模块，要明确这个模块对外的接口，而这个接口应该实现把内部封装起来。
index.js文件就是模块的接口。
比如，在todoList/index.js中，
```javascript
    import * as actions from '. /actions.js'; 
    import reducer from './reducer.js';
    import view from './views/container.js';

    export {actions, reducer, view}
```
如果filter中的组件想要使用todoList中的功能，只要导人todoList这个目录。
```javascript
    import {actions, reducer, view as TodoList} from '../todoList';
```
### · 状态树的设计
须遵循以下三个原则:
1. 一个模块控制一个状态节点
2. 避免冗余数据
3. 树形结构扁平

### · Todo应用实例
1. 考虑到应用课无限扩展，最好每个组件的action类型字符串都有唯一的前缀，避免命名冲突。
2. 简写省去return
```javascript
    export const toggleTodo = (id) => ({
        type : TOGGLE_TODO,
        id: id
    });
```
3. 组合reducer
    在src/store.js文件中
```javascript
    import {createStore, combineReducers} from 'redux';
    import {reducer as todoReducer} from './todos';
    import {reducer as filterReducer} from './filter';

    const reducer = combineReducers({
        todos: todoReducer,
        filter: filterReducer
    });
    export default createStore(reducer);
```
    利用 __combineReducers__ 把多个reducer函数合成一个。参数对象的每个字段对应着state上的字段名（todos，filter）。
    由此，每个功能模块的reducer中的state不是完整的state，而是状态上 _对应自己的部分_。

    在reducer中想返回一个增加了一个对象的数组：
```javascript
    return [newObject, ...state];
```
    _不能改变原来的数组_，所以不可使用push和unshift。
    类似的如果是对象的话：
```javascript
    return {...todoItem, completed: !todoItem.completed};
``` 
    _switch语句不能以后default_，因为reducer会接收到任意action，包括他不感兴趣的。
4. 简写mapDispatchToProps 函数
```javascript
    const mapDispatchToProps = (dispatch) => { 
        return {
            onToggleTodo: (id) => { 
                dispatch(toggleTodo(id))
            },
            onRemoveTodo: (id) => { 
                dispatch(removeTodo(id))
            }
        };
    }

    //简写
    const mapDispatchToProps = { 
        onToggleTodo: toggleTodo,
        onRemoveTodo: removeTodo
    }
```
上面的那种方法都是吧接收到的参数作为参数传递给一个action构造函数，然后用dispatch派发，属于重复代码。

### · 开发辅助工具
1. Chrome扩展包：React Devtools，可以检视React组件的树形结构；Redux Devtools，可以检视Redux数据流；React Perf，可以发现React组件渲染的性能问题，发现浪费的渲染时间。
2. redux-immutable-state-invariant辅助包，提供了一个Redux的中间件，开发环境下检查reducer是否违反了作为一个纯函数的规定擅自修改了参数 state和action。

## 5-React组件的性能优化
### · 单个组件的性能优化
虽然Virtual DOM能够将每次DOM操作量减少到最小，计算和比较Virtual DOM依然是一个复杂的计算过程。
- react-redux的shouldComponentUpdate实现
  “决定什么时候不需要重新渲染”。
  1. shouldComponentUpdate
```javascript
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.completed !== this.props.completed) ||
            (nextProps.text !== this.props.text);
    }
```
  2. connect函数
```javascript
    export default connect()(TodoItem);
```
    理解：
    connect使用的是HOC模式，所以他基本控制了你组件S的渲染。在connect中，每次父级传入的props发生改变的时候，都会经过一次shallow equal再决定是否有必要渲染S组件。虽然你的父组件Content的state发生了改变，但是传入S的props没有发生改变，所以在connect中被拦截，所以组件S就没有渲染。
    但是因为是做的“__浅层比较__”（shallow compare)，所以如果prop的类型是复杂对象，只看是不是对同一对象的引用。（深层比较，如果递归进行，不光代码复杂，且有性能问题。）

### · 多个组件的性能优化
- React的调和(Reconciliation)过程
   React在更新阶段很巧妙地对比原有的VirtualDOM和新生成的VirtualDOM，找出两者的不同之处，这个过程叫做 __调和__。
   React首先检查两个树形的根节点的类型是否相同，根据相同或者不同有不同处理方式。
   1. 节点类型不同的情况
      意味着改动太大，需要重新构建新的DOM树，原有的树形上的React组件会经历“ __卸载__”的生命周期。
      表面作为包裹功能的节点类型被随意改变。
   2. 节点类型相同的情况
      只更新。节点的类型分为两种：一类是DOM元素，另一类是React组件。
      对于DOM元素，React会保留节点对应的DOM元素，只对树形结构根节点上的属性和内容做一下比对，然后只更新修改的部分。
      React组件类型，按生命周期进行。如果开始的shouldComponentUpdate函数返回false的话，那么更新过程。重视可以优化性能。
   3. 多个子组件
      __Key的用法__。React不会使用算法去找出前后两列子组件的差别，默认情况下，确定每一个组件在组件序列中的唯一标识就是它的位置。所以需要key作为他们的唯一标识符。
      key值唯一且还需稳定不变的。

### · 利用reselect提高数据选取的性能
通过获取数据的过程来优化。
reselect库工作原理：只要相关状态没有改变，那就直接使用上一次的缓存结果。

## 6-React高级组件
目的是为了重用代码。
- __高阶组件__
  高阶组件（HOC）是一个函数，接受一个组件为输入，然后返回一个新的组件为结果，且新组件有输入组件没有的功能。
  实现方式分为两大类：（优先考虑代理）
  - 代理方式的高阶组件
    返回的组件类直接继承自React.Component类。
    应用在以下场景：
    1. 操纵props
       增、删、改传递给包裹组件的props列表。
       ```javascript
        const addNewProps = (WrappedComponent, newProps) => { 
            return class WrappingComponent extends React.Component {
                render() {
                    return <WrappedComponent {...this.props} {...newProps} />
                }
            }
        }

        const FooComponent = addNewPropsHOC(DemoComponent, {foo: 'foo'}} ;
       ```
    2. 访问ref
       访问ref并不值得推荐，只是展示可行性。
       ```javascript
        const refsHOC = (WrappedComponent) => {
            return class HOCComponent extends React.Component {
                constructor() {
                    super (...arguments);
                    this.linkRef = this.linkRef.bind(this);
                }
                linkRef(wrappedinstance) { 
                    this._root = wrappedinstance;
                }
                render() {
                    const props= {...this.props, ref: this.linkRef};
                    return <WrappedComponent {...props}/>;
                }
            }
        }
        ```
    3. 抽取状态
       connect函数的执行结果就是一个这样的高阶组件。
    4. 包装组件
       在render的JSX中引入其他的元素，甚至组合多个react组件。例如添加style。

  - 继承方式的高阶组件
    返回的组件继承自传入的组件。
    应用在以下场景：
    1. 操作props
       ```javascript
            const modifyPropsHOC = (WrappedComponent) => {
                return class NewComponent extends WrappedComponent {
                    render() {
                        const elements= super.render();
                        const newStyle = {
                            color: (elements && elements.type ==='div')?'red':'green';
                        }
                        const newProps = {...this.props, style: newStyle};
                        return React.cloneElement(elements, newProps, elements.props.children);
                    }
                }
            }
       ```
       利用React.cloneElement让组件重新绘制。
       虽然可行但十分复杂，唯一用得上的场景是需要更具渲染结果决定如何修稿props。
    2. 操作生命周期函数
       继承独有。

  - 高阶组价的显示名
    每个高阶组件都会产生一个新的组件，使用这个新组件就丢失掉了参数组件的“显示名”，为了方便开发和维护，往往需要给高阶组件重新定义一个“显示名”。
    增加“显示名”的方式就是给高阶组件类的 displayName 赋上一个字符串类型的值。

- 以函数为子组件
  高阶组件要求参数组件必须和自己有契约的方式，必须有什么的props。“以函数为子组件”的模式可以克服这种局限。
  这种模式下，实现代码重用的不是一个函数，而是一个真正的React组件，这个组件要求必须有子组件的存在，且子组件必须是一个函数。
```javascript
    const loggedinUser = 'mock user';
    class AddUserProp extends React.Component { 
        render() {
            const user = loggedinUser ;
            return this.props.children(user);
        }
    }

    AddUserProp.propTypes = {
        children: React.PropTypes.func.isRequired
    }

    <AddUserProp>
        {(user) => <Foo user={user} />}
    </AddUserProp>
```
