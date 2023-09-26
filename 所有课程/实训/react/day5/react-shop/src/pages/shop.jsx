import  React,{useState,useEffect} from 'react'
import PTabBar from '@/components/p-tabbar.jsx'
import { NavBar } from 'antd-mobile'

function Shop(){

// shop加载函数
  useEffect(() => {
    console.log('shop loaded')
  },[])


  return (
    <div>
      <NavBar mode="light"
        >商城</NavBar>
      <PTabBar path="/shop"></PTabBar>
    </div>

  )
}
export default Shop;
