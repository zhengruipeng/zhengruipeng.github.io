import  React,{useState,useEffect} from 'react'
import PTabBar from '@/components/p-tabbar.jsx'
import { NavBar} from 'antd-mobile'
function Me(){


  // me加载函数
  useEffect(() => {
    console.log('me loaded')
  },[])

  return (
    <div>
      <NavBar mode="light">我的</NavBar>
      <PTabBar path="/me"></PTabBar>
    </div>

  )
}
export default Me;
