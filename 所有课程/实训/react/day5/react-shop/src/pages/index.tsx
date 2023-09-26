import React,{useState,useEffect} from 'react';
import styles from './index.less';
import PTabBar from '@/components/p-tabbar.jsx'
import { NavBar,Icon ,Popover} from 'antd-mobile'
import { history } from 'umi'
const RenderIcon = (props) => {
  const [show,setShow] = useState(false)
  const handleVisiableChange = (v) => {
    setShow(v)
  }
  const handleSelect = (v) =>{
    setShow(false)
    history.push('/me')
  }
  return (
    <Popover
      visible={show}
      overlay={[
        <Popover.Item
          icon={<Icon type="check-circle-o"></Icon>}>
          我的
        </Popover.Item>
      ]}
      onVisibleChange={handleVisiableChange}
      onSelect={handleSelect}
      >
      <Icon type="ellipsis" size="xs"></Icon>
    </Popover>
  )
}

export default () => {
  // index加载函数
  useEffect(() => {
    console.log('index loaded')
  },[])
  return (
    <div>
      <NavBar mode="light"
      rightContent={
        <RenderIcon ></RenderIcon>
      }>首页</NavBar>
      <PTabBar></PTabBar>
    </div>
  );
}
