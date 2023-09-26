import React,{useState,useEffect} from 'react';
import { TabBar } from 'antd-mobile'
import home from '@/static/imgs/home.png'
import homeActive from "@/static/imgs/home-a.png"
import men from '@/static/imgs/men.png'
import menActive from "@/static/imgs/men-a.png"
import che from '@/static/imgs/che.png'
import cheActive from "@/static/imgs/che-a.png"
import me from '@/static/imgs/me.png'
import meActive from "@/static/imgs/me-a.png"
import {history} from 'umi'
import './p-tabbar.less'
const HomeIcon = () => {
  return (
    <img src={home} style={{width:'22px',height:'22px'}} />
  )
}
const HomeIconActive = () => {
  return (
    <img src={homeActive} style={{width:'22px',height:'22px'}} />
  )
}
const MeIcon = () => {
  return (
    <img src={me} style={{width:'22px',height:'22px'}} />
  )
}
const MeIconActive = () => {
  return (
    <img src={meActive} style={{width:'22px',height:'22px'}} />
  )
}
const ShopIcon = () => {
  return (
    <img src={men} style={{width:'22px',height:'22px'}} />
  )
}
const ShopIconActive = () => {
  return (
    <img src={menActive} style={{width:'22px',height:'22px'}} />
  )
}

const CheIcon = () => {
  return (
    <img src={che} style={{width:'22px',height:'22px'}} />
  )
}
const CheIconActive = () => {
  return (
    <img src={cheActive} style={{width:'22px',height:'22px'}} />
  )
}
export default (props) => {
  const [tabbarList,setTabbarList] = useState([
    {
      icon:<HomeIcon></HomeIcon>,
      selectedIcon:<HomeIconActive></HomeIconActive>,
      path:'/',
      title:'首页',
      selected:false
    },
    {
      icon:<ShopIcon></ShopIcon>,
      selectedIcon:<ShopIconActive></ShopIconActive>,
      path:'/shop',
      title:'商城',
      selected:false
    },
    {
      icon:<CheIcon></CheIcon>,
      selectedIcon:<CheIconActive></CheIconActive>,
      path:'/news',
      title:'新闻',
      selected:false
    },
    {
      icon:<MeIcon></MeIcon>,
      selectedIcon:<MeIconActive></MeIconActive>,
      path:'/me',
      title:'我的',
      selected:false
    }
  ])

  const setDefaultSelected = (path) => {
    let tabbarList1 = tabbarList.map((item,index) => {
      if(path){
        if(item.path == path){
          item.selected = true
        }else{
          item.selected = false
        }
      }else{
        if(index == 0){
          item.selected = true
        }
      }
      return {...item};
    })
    setTabbarList(tabbarList1)
  }
  useEffect(()=>{
    setDefaultSelected(props.path)
  },[])
  const handleItemClick = (res) => {
    history.push(res.path)
  }
  return (
    <TabBar tabBarPosition="bottom">
      {
        tabbarList.map(item => {
          return (
            <TabBar.Item
              icon={item.icon}
              selectedIcon={item.selectedIcon}
              title={item.title}
              key={item.path}
              selected={item.selected}
              onPress={handleItemClick.bind(this,item)}>
            </TabBar.Item>
          )
        })
      }

    </TabBar>
  );
}
