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
    //逃生舱，移除掉 create-react-app 并拿回控制权。
    //会复制所有的配置和依赖到 package.json 中，同时创建一个新的 config/ 文件夹。
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
- 使用JSX代替HTML中的一个DOM节点
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
- this 不同
```javascript
    //this 表示它自己
    function(){...}
    //this 表示包含它的语境下的this
    () => {...}
```

### · ES6 类
- React component 暴露出的方法都是公共方法。其中有一个方法必须被重写，就是render()。
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
但会有性能相关的问题，在事件处理程序中使用箭头函数，每次render()执行时，事件处理程序会实例化一个高阶箭头函数，_对性能产生影响_。

### · ES6 解构
- 在javaScript ES6中一种更方便的方法访问对象和数组的属性，叫做解构。
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
- 对于数组一样可以解构
```javascript
    const users = ['Robin', 'Dan', 'Bob'];

    //ES6
    const [user1, user2, user3] = users;
```

### · 受控组件
表单元素比如`<input>,<textarea>,<select>`会以原生HTML的形式保存自己的状态，一旦有人从外部做修改，它们就会修改内部的值，在React中称为不受控组件。
- 但在React中，应确保这些元素变为受控组件。 __`value={searchTerm}`__
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
- 在挂载 __Mount__ 的过程中，有四个生命周期方法，调用顺序如下：
  - constructor(props)
  - static getDeriverdStateFromProps ^
  - ~~componentWillMount() *~~
  - render()
  - componentDidMount()

- 在状态或属性发生改变 __Update__ 的时候，生命周期调用顺序如下：
  - ~~componentWillReceiveProps(nextProps) *~~
  - static getDeriverdStateFromProps ^
  - shouldComponentUpdate(nextProps, nextState)
  - ~~componentWillUpdate() *~~
  - render()
  - getSnapshotBeforeUpdate ^
  - componentDidUpdate()

- 在挂载的时候 __Unmount__ 的时候，生命周期如下：
  - componentWillUnmount()

- 错误处理：
  - static getDerivedStateFromError 从错误中获取 state。
  - componentDidCatch(err, info) 捕获错误并进行处理。

  _(* is not recommended for use, 17版本将会删除)_
  _(^ v16.3之后版本的生命周期)_

- 具体总用
    - __constructor__ 只有在组件实例化并插入DOM中的时候才会被调用。组件实例化的过程称作组件的挂载（mount）。
    - __static getDerivedStateFromErro(nextProps, prevState)__ 参数 nextProps 是新接收的 props，prevState 是当前的 state。返回值（对象）将用于更新 state，如果不需要更新则需要返回 null。
    - __render__ 也会在挂载的过程中被调用，当组件更新的时候也会被调用。每当组件的状态state或属性props改变是，都会被调用。
    - __componentDidMount__ 在组件被渲染到DOM树之后被调用的。这是发起异步请求去API获取数据的绝佳时期，获取的数据将被保存在内部组件的状态中然后在render生命周期中展示出来。
    - __shouldComponentUpdate(nextProps, nextState)__ 在一个更新的生命周期内，组件和子组件将更具该方法返回的布尔值决定是否重新渲染，避免不必要的渲染。
    - __getSnapShotBeforeUpdate(prevProps, prevState)__ 返回值称为一个快照（snapshot），如果不需要 snapshot，则必须显示的返回 null —— 因为返回值将作为 componentDidUpdate() 的第三个参数使用。所以这个函数必须要配合 componentDidUpdate() 一起使用。
    - __componentDidUpdate(prevPros, prevState, snapshot)__ 比较少用
    - __componentWillUnmount__ 组件销毁前调用,取消定时器,取消事件绑定,取消网络请求

  <u>setState可以在装载过程的componentDidMount中调用；在更新过程中的componentDidUpdate中调用</u>

### · 改变对象
React拥护不可变的数据结构，因此不该改变对象（或直接改变状态）。更好的做法是基于现在拥有的资源来创建一个新的对象。

- 方案一：ES6的 __Object.assign()__ 函数把接收的第一个参数作为目标对象，排在后面的对象会覆盖先前对象的该属性。
```javascript
    //don’t do this
    this.state.result.hits = updateHits;

    //ES6
    const updateHits = { hits:updateHits };
    const updatedResult = Object.assign({}, this.state.result, updateHits);
```
- 方案二：使用 __扩展操作符...__ ，使用它的时候，数组或对象的每一个值都会被拷贝到一个新的数组或对象。
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
- 方法一：三元运算符
```javascript
   {
       result?<Button/>:null
   }
```
- 方法二：&&逻辑运算符
```javascript
   {
       result && <Button/>
   }
```
