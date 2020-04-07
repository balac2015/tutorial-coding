## React 设计原则

### 组合

给一个组件添加功能，不会影响其它组件

组件 - 函数。描述了任何可组合的行为，包含渲染、生命周期和 state

类 Relay 库，给组件带来了其他增强功能：描述数据之间的依赖关系

### 公用抽象

state, 生命周期函数，跨浏览器事件的正规化


## React 入门 - 概述和演练

Prerequisites: 先决条件
- 基本熟悉 HTML, CSS
- JavaScript 和编程的基础知识
- 对 DOM 的基本理解
- 熟悉 ES6 语法和功能
- 安装了 Node.js, npm

Goals: 目标
- 了解基本的 React 概念和相关术语：Babel, Webpack, JSX, components, props, state, lifecycle
- 构建一个非常简单的React应用程序，以演示上述概念。

### 什么是 React

- React是一个JavaScript库-最受欢迎的库之一，在GitHub上有超过100,000个星。
- React不是一个框架（与Angular不同，后者更自以为是）。
- React是Facebook创建的一个开源项目。
- React用于在前端构建用户界面（UI）。
- React是MVC应用程序的视图层（模型视图控制器）

React的最重要方面之一是您可以创建组件，就像自定义可重用的HTML元素一样，以快速有效地构建用户界面。React还使用state和props简化了数据的存储和处理方式。

### Setup and Installation

1. 静态 html 文件 static html file
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Hello React</title>
        <!-- React - React 顶级 API -->
        <script src="https://unpkg.com/react@^16/umd/react.production.min.js"></script>
        <!-- React DOM - 添加特定的 DOM 的方法 -->
        <script src="https://unpkg.com/react-dom@16.13.0/umd/react-dom.production.min.js"></script>
        <!-- Babel - 一种 JavaScript 编译器，可让我们在旧版浏览器中使用ES6 + -->
        <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    </head>
    <body>
        <div id="root"></div>

        <!-- text/babel 类型，使用 Babel 必需 -->
        <script type="text/babel">
            // React code will go here
            class App extends React.Component {
                // 类组件中必需要的方法，用于呈现DOM节点。
                render () {
                    // jsx
                    return <h1>Hello World!</h1>
                }
            }

            ReactDOM.render(<App />, document.getElementById('root'))
        </script>
    </body>
</html>
```

2. Create React App

```bash
# 该环境预先配置了构建React应用所需的一切。它将创建一个实时开发服务器，使用Webpack自动编译React，JSX和ES6，自动前缀CSS文件，并使用ESLint测试和警告代码中的错误。
$ npx create-react-app react-tutorial

$ cd react-tutorial

$ npm start
```

### React 开发人员工具 React Developer Tools

[React DevTools for Chrome](chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### JSX: JavaScript + XML

```javascript
// jsx
const heading = <h1 className="site-heading">Hello, React</h1>

// 没有 jsx
const heading = React.createElement('h1', { className: 'site-heading' }, 'Hello, React)
```

JSX实际上更接近JavaScript，而不是HTML，因此在编写时需要注意一些关键区别:
- className用于代替class添加CSS类（class JavaScript中的保留关键字）。
- JSX 中的属性和方法为 camelCase- onclick 将变为 onClick。
- 自闭合标签必须以斜杠结尾-例如<img />

JavaScript表达式也可以使用大括号（包括变量，函数和属性）嵌入JSX内。`{{ ... }}`

### 组件 components

大写自定义组件，以区别于常规HTML元素

一个类组件必须包含render()，并且return只能返回一个父元素。

```javascript
import React, { Component } from 'react'

class App extends Component {
    render () {
        return (
            <div className="App">
                <h1>Hello, React</h1>
            </div>
        )
    }
}
```

##### 类组件 class components

```javascript
import React, { Component } from 'react'

class App extends Component {
    render () {
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Charlie</td>
                    <td>Janitor</td>
                </tr>
                <tr>
                    <td>Mac</td>
                    <td>Bouncer</td>
                </tr>
                <tr>
                    <td>Dee</td>
                    <td>Aspiring actress</td>
                </tr>
                <tr>
                    <td>Dennis</td>
                    <td>Bartender</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
```

#### 简单组件 Simple Components

```javascript
const TableHeader = () =>{
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    )
}
const TableBody = () => {
    return (
       <tbody>
            <tr>
                <td>Charlie</td>
                <td>Janitor</td>
            </tr>
            <tr>
                <td>Mac</td>
                <td>Bouncer</td>
            </tr>
            <tr>
                <td>Dee</td>
                <td>Aspiring actress</td>
            </tr>
            <tr>
                <td>Dennis</td>
                <td>Bartender</td>
            </tr>
        </tbody> 
    )
}
const Table extends Component {
    render () {
        return (
            <table>
                <TableHeader />
                <TableBody />
            </table>
        )
    }
}
```
```javascript
// 简单组件
const SimpleComponent = () => {
    return <div>Example</div>
}
// 类组件
class ClassComponent extends Component {
    render () {
        return <div>Example</div>
    }
}
```

### props

React 使用 props, state 来处理数据。

```javascript
// Table.js 调整硬编码代码
const TableBody = () => {
    return <tbody />
}
// App.js, 将所有数据移动到对象数组中，就像我们引入基于JSON的API一样
class App extends Component {
    render () {
        const characters = [
            {
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                name: 'Dennis',
                job: 'Bartender',
            },
        ]

        return (
            <div className="container">
                // 通过Table属性将数据传递到子组件（），这类似于使用data-属性传递数据的方式。只要不是保留关键字，我们就可以随意调用该属性
                // 传递的数据是characters变量，由于它是JavaScript表达式，因此将大括号括起来。
                <Table characterData={characters} />
            </div>
        )
    }
}
// Table.js
class Table extends Component {
    render () {
        const { characterData } = this.props

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} />
            </table>
        )
    }
}
// 通过数组映射 map through the array
cosnt TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            // 向每个表行添加了一个键索引，有助于识别每个列表项。操作列表项时的必须值
            <tr key={ index }>
                <td>{ row.name }</td>
                <td>{ row.job }</td>
            </tr>
        )
    })
    return <tbody>{ rows }</tbody>
}
```

如果打开React DevTools并检查Table组件，您将在属性中看到数据数组。此处存储的数据称为虚拟DOM，这是一种将数据与实际DOM同步的快速有效的方法。

props 无法更改，是只读的。单向数据流

### state

可以将状态视为无需保存或修改而不必添加到数据库中的任何数据-例如，在确认购买之前在购物车中添加和删除商品。

```javascript
class App extends Component {
    // 该对象将包含您要在状态中存储的所有内容的属性。对我们来说，这是characters。
    state = {
        characters: [
            {
                name: 'Charlie',
                // the rest of the data
            }
        ]
    }
    // 希望能从列表中删除字符，因此将 removeCharacter 添加到父 App 类上
    removeCharacter = index => {
        const { characters } = this.state
        // 必须使用this.setState()修改数组。简单地将新值应用到this.state.property将不起作用。
        this.setState({
            // .filter 不会修改原数组，而是返回一个新数组
            characters: characters.filter((character, i) => {
                return i !== index
            })
        })
    }
    render () {
        const { characters } = this.state

        return (
            <div className="container">
                <Table characterData={characters} removeCharacter={this.removeCharacter} />
            </div>
        )
    }
}
// Table.js，项目中唯一具有其自身状态的组件是App和Form，因此，最佳实践是Table从当前的类组件转换为简单的组件。
const Table = props => {
    const { characterData, removeCharacter } = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
    )
}
cosnt TableBody = props => {
    ...

    <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
            // 该onClick函数必须通过返回该removeCharacter()方法的函数，否则它将尝试自动运行。
            <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
    </tr>
}
```

### 提交表格数据 Submitting Form Data

```javascript
// 添加新的数据
class App extends Component {
    state = {
        characters: []  // 删除所有硬编码数据
    }
}
// Form.js
class Form extends Component {
    // 以前，有必要包括一个constructor()on React类组件，但是不再需要。
    // 此表单的目标是Form每次更改表单中的字段时都会更新状态，并且在我们提交时，所有数据都会传递给App状态，然后状态会更新Table。
    initialState = {
        name: '',
        job: ''
    }
    state = this.initialState
    handleChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }
    render() {
        const { name, job } = this.state;

        return (
            <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange} />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={job}
                onChange={this.handleChange} />
            </form>
            <input type="button" value="Submit" onClick={this.submitForm} />
        );
    }
    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }
}
export default Form

// App.js
return (
    <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
    </div>
)
handleSubmit = character => {
  this.setState({ characters: [...this.state.characters, character] })
}
```

### 提取 api 数据 pulling in api data

```javascript
import React, { Component } from 'react'

class App extends Component {
    state = {
        data: [],
    }

    // Code is invoked after the component is mounted/inserted into the DOM tree.
    // 确保在引入数据之前已将组件渲染到DOM
    componentDidMount() {
        const url =
            'https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*'

        // JSONView: https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc
        // js 的内置 fetch: https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/
        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result,
                })
            })
    }

    render() {
        const { data } = this.state

        const result = data.map((entry, index) => {
            return <li key={index}>{entry}</li>
        })

        return <ul>{result}</ul>
    }
}

export default App
```

### 构建和部署 React 应用

```json
// package.json
{
    // 该字段具有我们希望应用程序继续存在的URL
    "homepage": "https://taniarascia.github.io/react-tutorial",,
    "scripts": {
        // ...
        // 将创建build，其中将包含所有已编译的静态文件。
        "predeploy": "npm run build",
        // 部署到gh-pages，npm install --save-dev gh-pages
        "deploy": "gh-pages -d build"
    }
}
```