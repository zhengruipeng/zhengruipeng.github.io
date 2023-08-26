import React from 'react';
import './App.css';
//在项目中引入自定义的路由组件
import GlobalRouter from './router'
function App() {
  return (
    <div className="App">
      <GlobalRouter/>
    </div>
  );
}

export default App;
