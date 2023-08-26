import React from 'react';
//由于react这个框架和vue不同，他是以js为核心的，所以每个页面内部
//都没有style标签，不能直接在文件内部写css，需要全局引用css样式
// 在react中引入css样式的第一种方式全局引入
//这种引入方式不需要返回对象只需要引入css文件即可
import './App.css';
import Left from './components/Left.jsx'
import Top from './components/Top.jsx'
import Right from './components/Right.jsx'
//今天的项目中的react组件使用的是函数对象定义和class对象写法上不同
//第一点，由于App是函数对象，所以他们本身就是构造函数constuctor，那么函数对象就不需要编写构造函数，
//第二点，由于函数本身可以执行并且自带返回值，
//所以函数对象也不需要写render函数，这两点就是函数对象相对class对象在编程上的优势
//第三点，由于函数无法直接编写继承，所以不能继承React.Component
//那么函数形式对象的页面最上层要引入一个React对象，才能实现让函数组件正常工作
//函数形式组件中不存在this.state也就是数据无法按照对象形式定义
//同时他也没有setState方法，想要实现数据定义需要配合react hooks api来实现
//所以函数形式组件内置也没有生命周期函数
//由于他本身就是构造函数，所以他的默认参数是props
function App() {
  return (
    <div className="App">
			<Top name="我是top"/>
			<Left name="我是left"/>
			<Right name="我是right"/>
    </div>
  );
}

export default App;
