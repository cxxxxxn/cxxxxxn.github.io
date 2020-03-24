## 1-React简介
### · npm
1. 初始化
    `npm init`
    初始化成默认值
    `npm init -y`

2. 安装本地包
`npm install <package>`
安装全局包
`npm install -g <package>`
一条命令安装多个包
`npm install <package1> <package2>`
3. 删除包
`npm uninstall <package>`
手工删除包
    ```
    which create-react-app
    -> /usr/local/bin/create-react-app
    rm -rf /usr/local/bin/create-react-app
    ```

### · 搭建React应用
1. 使用 [create-react-app](https://www.html.cn/create-react-app/docs/getting-started/) 来创建应用。

    创建一个名字为christy的项目
    `npx create-react-app my-app`

    *create-react-app* 创建的是一个npm项目，还附带了下面npm脚本

    ```
    //启动应用
    npm start
    //运行所有测试
    npm test
    //构建项目的产品文件
    npm run build
    //逃生舱，移除掉create-react-app并拿回控制权。会复制所有的配置和依赖到package.json中，同时创建一个新的config/文件夹。
    npm run eject
    ```

### · JSX
1. 理解*组件 class component*，*元素 element*，*实例 instance*.
- 组件
```javascript
    import React, { Component } from 'react';

    class App extents Component{
        render(){
            var hello = "Hello World!";
            return (
                <div className="App">
                    <h2>{hello}</h2>
                </div>
            );
        }
    }

    export default App;
```
- 元素 render中的返回的是元素
- 实例
```javascript
    <App />
```

2. JSX允许在JavaScript中混入HTML结构。
- 可以使用花括号{} 引入变量
- 驼峰命名 className
- 使用map函数讲一个列表转换成一组HTML元素
```javascript
    const list = [0,1,2];
    class App extents Component{
        render(){
            return (
                <div className="App">
                    {
                        list.map((item,index)=>{
                            return (
                                <h1 key={"key-"+item}> {item} </h1>
                            )
                        })
                    }
                </div>
            );
        }
    }
```
*需要记得添加一个辅助属性* __key__，标识符。
（React在列表发生变化时可以识别成员的添加，更改和删除）
<font color="red">Tip:</font> <u>key 不能使用索引，React很难正确识别</u>

### · ReactDOM
使用JSX代替HTML中的一个DOM节点
```javascript
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
```
ReactDOM.render( )可以被使用多次，但在纯React的应用中，只会使用一次来加载整个组件树。

### · ES6 const & let
- const 常量，不能被重新赋值或声明。React应用中尽量用const。
- let 变量，可以被改变。

### · ES6 箭头函数
    function(){...}

    () => {...}
- this 不同
普通的函数表达式，this 它自己
箭头函数表达式，this 包含它的语境下的this

### · ES6 类
```javascript
    class Developer{
        constructor(firstname, lastname){
            this.firstname = firstname;
            this.lastname = lastname;
        }

        getName(){
            return this.firstname + ' ' + this.lastname;
        }
    }

    const robin = new Developer('Robin', 'Wieruch');
    robin.getName();
```

React component 暴露出的方法都是公共方法。其中有一个方法必须被重写，就是render()。


## 2-React基础
### · 组件内部状态
组件内部状态（局部状态），允许你保存、修改和删除存储在组件内部的属性。

- props
构造函数初始化组件的状态。
```javascript
    class App extends Component{
        constructor(props){
            super(props);
        }
    }
```
在JavaScript中，__super__ 指的是父类构造函数。
在调用父构造函数之前，不能在构造函数中使用this。
props中有传递给这个组件的所有值。

- state
```javascript
    const list = [0,1,2];

    class App extends Component{
        constructor(props){
            super(props);
        }

        this.state = {
            list: list
        };
    }
```
state可以通过this绑定在类上，可以在整个组件内访问到state。
<font color="red">Tip:</font> <u>不能直接修改state，必须使用setState()函数</u>
```javascript
    this.setState({
        list: [1,2]
    });
```

### · ES6对象初始化
- 简写属性 当对象中的属性名和变量名相同时
```javascript
    const name = 'Christy';
    const user = {
        name,
    };
    //变量名和状态属性名称相同时
    this.state = {
        list,
    }
```
- 简写方法名
```javascript
    //ES5
    var user = {
        getName: function(){...},
    }

    //ES6
    const user = {
        getName(){...}
    }
```
- 计算属性名
```javascript
    const key = 'name';
    const user = {
        [key]: 'Christy',
    }
```
### · 绑定
绑定很重要，因为类方法不自动绑定this到实例上
```javascript
    const Test = class Test extends Component{
    handleClick(){
        console.log(this);//undefined
    }

    render(){
        return(
            <button onClick={this.handleClick}
            >button</button>
        );
    };
```
ES6箭头函数可以自动绑定
```javascript
    const Test = class Test extends Component{
    handleClick = () => {
        console.log(this);//this
    }

    render(){
        return(
            <button onClick={this.handleClick}
            >button</button>
        );
    };
```
### · 事件处理
当使用`onClick={doSomething()}`时，doSomething()函数会在浏览器打开程序时立刻执行。监听表达式是函数执行的返回值。
使用`onClick={doSomething}`时，会在点击按钮时执行。
需要传参的时候，可以在外部定义一个包装函数。 `onClick={() => doSomething(para)}`
但会有性能相关的问题，在事件处理程序中使用箭头函数，每次render()执行时，事件处理程序会实例化一个高阶箭头函数，对性能产生影响。

### · ES6 解构
在javaScript ES6中一种更方便的方法访问对象和数组的属性，叫做解构。
```javascript
    const user = {
        firstname: 'Robin',
        lastname: 'Wieruch'
    }
    //ES5
    var firstname = user.firstname;
    var lastname = user.lastname;
    //ES6
    const {firstname, lastname} = user;
```
对于数组一样可以解构
```javascript
    const users = ['Robin', 'Dan', 'Bob'];

    //ES6
    const [user1, user2, user3] = users;
```

### · 受控组件
表单元素比如`<input>,<textarea>,<select>`会以原生HTML的形式保存自己的状态，一旦有人从外部做修改，它们就会修改内部的值，在React中称为不受控组件。
但在React中，应确保这些元素变为受控组件。 __`value={searchTerm}`__
```javascript

    const {searchTerm} = this.state;
    ...
    <input 
        type="text"
        value={searchTerm}
        onChange={this.onchange}
    />
```

### · 可组合组件
在props中有一个属性：children可以使用，可以将元素从上一层传到组件中。
children就是元素标签内包含的元素，可以指定children显示在哪里
```javascript
    function App() {
        return (
            <div className="App">
                <Test>test</Test>
            </div>
        );
    }
    
    const Test = class Test extends Component{
    render(){
        const {children} = this.props;
        return(
            <div>
                {children}<button>BUTTON</button>
            </div>
        );
    };
```

### · ES5和ES6的一些不同
- 数组或字符串中是否含有pattern
```javascript
    //ES5
    string.indexOf(pattern) !== -1

    //ES6
    string.includes(pattern)
```

## 3-使用真实的API
### · 生命周期
在挂载 __Mount__ 的过程中，有四个生命周期方法，调用顺序如下：
- constructor(props)
- static getDeriverdStateFromProps ^
- ~~componentWillMount() *~~
- render()
- componentDidMount()

在状态或属性发生改变 __Update__ 的时候，生命周期调用顺序如下：
- ~~componentWillReceiveProps(nextProps) *~~
- static getDeriverdStateFromProps ^
- shouldComponentUpdate(nextProps, nextState)
- ~~componentWillUpdate() *~~
- render()
- getSnapshotBeforeUpdate ^
- componentDidUpdate()

在挂载的时候 __Unmount__ 的时候，生命周期如下：
- componentWillUnmount()

错误处理：
static getDerivedStateFromError 从错误中获取 state。
componentDidCatch(err, info) 捕获错误并进行处理。

_(* is not recommended for use, 17版本将会删除)_
_(^ v16.3之后版本的生命周期)_

__constructor__ 只有在组件实例化并插入DOM中的时候才会被调用。组件实例化的过程称作组件的挂载（mount）。
__static getDerivedStateFromErro(nextProps, prevState)__ 参数 nextProps 是新接收的 props，prevState 是当前的 state。返回值（对象）将用于更新 state，如果不需要更新则需要返回 null。
__render__ 也会在挂载的过程中被调用，当组件更新的时候也会被调用。每当组建的状态state或属性props改变是，都会被调用。
__componentDidMount__ 在组件被渲染到DOM树之后被调用的。这是发起异步请求去API获取数据的绝佳时期，获取的数据将被保存在内部组件的状态中然后在render生命周期中展示出来。
__shouldComponentUpdate(nextProps, nextState)__ 在一个更新的生命周期内，组件和子组件将更具该方法返回的布尔值决定是否重新渲染，避免不必要的渲染。
__getSnapShotBeforeUpdate(prevProps, prevState)__ 返回值称为一个快照（snapshot），如果不需要 snapshot，则必须显示的返回 null —— 因为返回值将作为 componentDidUpdate() 的第三个参数使用。所以这个函数必须要配合 componentDidUpdate() 一起使用。
__componentDidUpdate(prevPros, prevState, snapshot)__ 比较少用
__componentWillUnmount__ 组件销毁前调用,取消定时器,取消事件绑定,取消网络请求

<u>setState可以在装载过程的componentDidMount中调用；在更新过程中的componentDidUpdate中调用</u>

### · 改变对象
React拥护不可变的数据结构，因此不该改变对象（或直接改变状态）。更好的做法是基于现在拥有的资源来创建一个新的对象。

方案一：ES6的 __Object.assign()__ 函数把接收的第一个参数作为目标对象，排在后面的对象会覆盖先前对象的该属性。
```javascript
    //don’t do this
    this.state.result.hits = updateHits;

    //ES6
    const updateHits = { hits:updateHits };
    const updatedResult = Object.assign({}, this.state.result, updateHits);
```
方案二：使用 __扩展操作符...__ ，使用它的时候，数组或对象的每一个值都会被拷贝到一个新的数组或对象。
```javascript
    //ES6
    const oldUsers = ['Robin', 'Andrew'];
    const newUsers = ['Bob', 'Joy'];
    const additionUser = 'Lucy';

    const allUsers1 = [...oldUsers, additionUser];
    //['Robin', 'Andrew', 'Lucy'];
    const allUser2 = [...oldUsers, ...newUsers];
    //['Robin', 'Andrew', 'Bob', 'Joy'];

    //非ES6，但在React社区中开始使用
    const UserNames = {firstname: 'Robin', lastname: 'Chen'};
    const age = 22;
    const user = {...UserNames, age};

    //可以代替上面的Object.assign()
    const updatedResult = {...this.state.result, updateHits};
```
### · 条件渲染
方法一：三元运算符
```javascript
   {
       result?<Button/>:null
   }
```
方法二：&&逻辑运算符
```javascript
   {
       result && <Button/>
   }
```

## 4-代码组织与测试
### · ES6模块： Import和Export
可以导出一个或多个变量，这称为一个命名的导出。
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
导入有别名
```javascript
   import {firstname as foo} from './file1.js';
   console.log(foo);//Robin
```
__default__ 语句，适用于：
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
还有一些更复杂的属性检验

## 5-高级React组件（巩固）
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

## 6-React状态管理与进阶（巩固）
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