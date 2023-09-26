import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { InputItem ,Toast } from 'antd-mobile'
//此文件中的所有AButton就相当于antd中的Button了
function Input(){
  // 定义一个表单对象
  const [formData,setFormData] = useState({
    username:'',
    password:'',
    age:0,
    money:0
  })
  // 定义表单中username改变时要处理的数据
  const handleUsernameChange = (value) => {
    //改变formData中username的值并将其设置回formData中
    formData.username = value
    //这里使用...进行浅拷贝，否则对象还是原对象不会触发页面更新
    setFormData({...formData})
  }
  const handlePasswordChange = (value) => {
    formData.password = value
    //这里使用...进行浅拷贝，否则对象还是原对象不会触发页面更新
    setFormData({...formData})
  }
  const handleAgeChange = (value) => {
    formData.age = value
    //这里使用...进行浅拷贝，否则对象还是原对象不会触发页面更新
    setFormData({...formData})
  }
  const handleMoneyChange = (value) => {
    formData.money = value
    //这里使用...进行浅拷贝，否则对象还是原对象不会触发页面更新
    setFormData({...formData})
  }
  const handleConfirm = (v) => {
    console.log('虚拟键盘提交了',v)
  }
  return (
    <div>
      {JSON.stringify(formData)}
      <h4>普通输入框</h4>
      <InputItem clear
        value={formData.username}
        placeholder="请输入用户名"
        onChange={handleUsernameChange}
      >用户名</InputItem>
      <h4>密码输入框</h4>
      <InputItem clear
        type="password"
        value={formData.password}
        placeholder="请输入密码"
        onChange={handlePasswordChange}
      >密码</InputItem>
      <h4>数字输入框</h4>
      <InputItem clear
        type="number"
        value={formData.age}
        placeholder="请输入年龄"
        onChange={handleAgeChange}
      >年龄</InputItem>
      <h4>金额输入框</h4>
      {/* onVirtualKeyboardConfirm虚拟键盘提交时出发点的事件*/}
      <InputItem clear
        type="money"
        value={formData.money}
        placeholder="请输入金额"
        onChange={handleMoneyChange}
        onVirtualKeyboardConfirm={handleConfirm}
      >金额</InputItem>
    </div>

  )
}

export default Input;
