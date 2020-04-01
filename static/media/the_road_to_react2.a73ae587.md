## 4-代码组织与测试
### · Import和Export
导出一个或多个变量，这称为一个命名的导出。
file1.js
```javascript
   const firstname = 'Robin';
   const lastname = 'wieruch';

   export {firstname, lastname};
```
在另一个文件中用相对路径导入。
```javascript
   import {firstname, lastname} from './file1.js';
   console.log(firstname);//Robin
}
```
或者用对象的方式导入文件的全部变量。
```javascript
   import * as person from './file1.js';
   console.log(person.firstname);//Robin
```
用别名导入
```javascript
   import {firstname as foo} from './file1.js';
   console.log(foo);//Robin
```
- __default__ 语句，适用于：
  - 导出导入单一模块
  - 强调一个模块输出API中的主要功能
  - 向后兼容ES5只有一个导出物的功能
  
```javascript
   const user = {
        firstname: 'Robin',
        lastname: 'wieruch'
   };
   export default user;
```
在导入default输入的时候可以省略花括号，输入的名字也可以与导入的不同。
file1.js
```javascript
    const firstname = 'Robin';
    const lastname = 'wieruch';

    const user = {
        firstname: 'Robin',
        lastname: 'wieruch'
    };

    export {firstname, lastname};

    export default user;
```
```javascript
    import person, {firstname, lastname} from './file1.js';
    console.log(person.firstname);//Robin
    console.log(firstname);//Robin
```
可以省略多行直接导出变量。
```javascript
    export const firstname = 'Robin';
    export const lastname = 'wieruch';
```
### · 快照测试和Jest
React中测试的基础是组件测试，基本可以视作单元测试，还有部分的快照测试。
__Jest__ 是一个在Facebook使用的测试框架。
### · 单元测试和Enzyme
__Enzyme__ 是由Airbnb维护的测试工具。
### · 组件接口和PropTypes
使用 __PropTypes__ 来描述组件的接口，所有从父组件传递给子组件的props都会基于子组件PropTypes接口得到验证。
需要安装额外的库
`npm install prop-types`
使用
```javascript
    import PropTypes from 'prop-types';
    class Greeting extends React.Component {
        render() {
            return (
            <h1>Hello, {this.props.name}</h1>
            );
        }
    }
    Greeting.propTypes = {
        name: PropTypes.string
    };
```
基础类型：
- PropTypes.array
- PropTypes.bool
- PropTypes.func
- PropTypes.number
- PropTypes.object
- PropTypes.string
特殊一些的：
- PropTypes.node  
_任何可以被渲染的元素，包括数字，字符串，react 元素，数组，fragment。_
- PropTypes.element  
_一个react 元素_

__isRequired__ 必须传递的，不可以是null或undefined
```javascript
    Greeting.propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.element
    };
```
还有一些更复杂的属性检验。

## 5-高级React组件
### · 引用DOM元素
__Ref__ 属性可以让我们访问元素的一个节点。
- 当给组件、H5标签添加 ref 属性后，此实例只能在当前组件中被访问到，父组件的 __refs__ 中是没有此引用的。
```javascript
    const Parent = React.createClass({
        render: function(){
            return (
            <div className = 'parent'>
                <Child ref = 'child'/>
            </div>
            )
        },
        componentDidMount(){
            console.log(this.refs.child); // 访问挂载在组件上ref
            console.log(this.refs.child.refs.update); // 访问挂载在dom元素上的ref
        }
    });

    const Child = React.createClass({
        render: function() {
            return (
                <div ref="test">
                    <a ref="update">更新</a>
                </div>
            );
        }
    });
```
- ref属性可以设置为一个回调函数。
ref回调会在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行。
```javascript
    const Child = React.createClass({
        componentDidMount(){
            if(this.input){
                this.input.focus();
            }
        }
        render: function() {
            return (
                <div>
                    <input 
                    ref={node => {this.input = node}}
                    />
                </div>
            );
        }
    });
```
- 不管ref设置值是回调函数还是字符串，都可以通过ReactDOM.findDOMNode(ref)来获取组件挂载后真正的dom节点。
```javascript
    <Child ref={child => this._child = child}/>
    console.log(ReactDOM.findDOMNode(this._child))
```

### · 高阶组件
高阶组件（HOC）是React中的一个高级概念。接受任何输入，多数时候是一个组件，并返回一个组件作为输出。
有一个习惯是用“with”前缀来命名HOC。
- 条件渲染
```javascript
    const withLoading = (Component) => (props) => 
    props.isLoading
    ? <Loading/>
    : <Component {...props}/>
```
将对象展开然后作为一个组件的输入是十分高效的。（上下两种方法效果相同，但下面的更简练）
```javascript
    const {foo, bar} = props;
    <Component foo={foo} bar={bar}/>
    //but you can use the object spread operate to pass all object properties
    <Component {...props}/>
```
但有一点需要避免，isLoading属性可能不需要传递给输入的组件。
可以用ES6的 __rest__ 解构来避免。
下面这段代码从props对象中取出一个属性，并保留剩下的属性
```javascript
    const withLoading = (Component) => ({isLoading, ...rest}) => 
    isLoading
    ? <Loading/>
    : <Component {...rest}/>
```

### · 第三方工具库
- __lodash__ 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。
- __classnames__ 通过条件式语句来定义组件的className

## 6-React状态管理与进阶
### · 状态提取
将子状态（substate）从一个组件移动到其他组件中的 _重构_ 过程被称为状态提取。
状态提取的过程也可以反过来，从子组件到父组件，这种情形称为状态提升。
### · 再探：setState()
此前，尝试过给该函数传一个对象来改变部分的内部状态。
其实，不仅可以接受对象，还可以 __传入函数__ 来更新状态。
```javascript
    this.setState((prevState, props) => {
        ...
    })
```
什么场景下需要函数参数的形式？
__当更新状态取决于之间的状态或属性时。__ 不使用函数形式，组件的内部状态管理会引起bug，因为setState方法是异步的，通过回调函数，使用的是执行那一刻的状态和属性。
### · 驾驭State
使用外部解决方案Redux和MobX