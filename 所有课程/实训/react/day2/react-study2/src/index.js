//引入React
import React from 'react';
//引入ReactDOM渲染器
import ReactDOM from 'react-dom';
// 引入全局的样式文件
import './index.css';
// 引入App组件
import App from './App.jsx';
//渲染
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

