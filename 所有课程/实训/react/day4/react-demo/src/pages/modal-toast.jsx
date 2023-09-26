import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { Button ,Toast,Modal,WhiteSpace ,WingBlank } from 'antd-mobile'
//此文件中的所有AButton就相当于antd中的Button了
function ToastModal(){
  const handleToast = (key) => {
    //Toast[key]相当于Toast['success']也就相当于Toast.success
    //当json的key为变量时无法通过.来取值就可以通过[]的方式来获取值
    //toast的四个参数分别是，提示内容，消失时间（秒），关闭之后的回调函数，是否产生遮罩层
    Toast[key](key+'提示', 1, ()=>{
      console.log('我关闭了')
    }, true)
  }

  const handleToastLoading = () => {
    //当我们把持续时间传递0的时候Toast就不会自动关闭
    //需要我们手动调用Toast.hide()来关闭它
    //我们通常在调用接口的时候会使用他
    Toast.loading('我会在三秒后关闭',0,() => {},true)
    setTimeout(() => {
      Toast.hide()
    },3000)
  }
  const handleModelAlert = () => {
    // 这个提示框相当于confirm提示框
    //第一个参数是标题
    //第二个参数是提示内容
    //第三个参数是数组，设置提示框按钮个数，每个按钮是一个对象{text,onPress,style}参考案例理解
    //Modal提示框我们暂时掌握他就可以
    let alert = Modal.alert('提示','确认关闭吗',[
      {
        text:'取消',
        onPress(){
          console.log('点击取消')
          alert.close()
        },
        style:{
          color:'red'
        }
      },
      {
        text:'确认',
        onPress(){
          console.log('点击确认')
          alert.close()
        }
      },
    ])
  }
  return (
    <div>
      <WingBlank size="md">
        <h4>toast</h4>
        <Button type="primary" onClick={e=>{handleToast('success')}}>toast,success</Button>
        <WhiteSpace size="md"></WhiteSpace>
        <Button type="primary" onClick={e=>{handleToast('info')}}>toast,info</Button>
        <WhiteSpace size="md"></WhiteSpace>
        <Button type="primary" onClick={e=>{handleToast('fail')}}>toast,fail</Button>
        <WhiteSpace size="md"></WhiteSpace>
        <Button type="primary" onClick={e=>{handleToast('offline')}}>toast,offline</Button>
        <WhiteSpace size="md"></WhiteSpace>
        <Button type="primary" onClick={e=>{handleToast('loading')}}>toast,loading</Button>
        <WhiteSpace size="md"></WhiteSpace>
        <Button type="primary" onClick={e=>{handleToastLoading(e)}}>手动控制关闭</Button>
        <h4>model</h4>

        <Button type="primary" onClick={e=>{handleModelAlert(e)}}>Modal提示框</Button>
      </WingBlank>
    </div>
  )
}

export default ToastModal;
