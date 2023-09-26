import React,{useEffect,useState} from 'react'
import { Button ,Toast } from 'antd-mobile'
function ButtonPage(){
  const handleClick = () => {
    Toast.success("点击了我",1)
  }
  return (
    <div>
      <h4>按钮样式</h4>
      <Button type="primary">经典按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="ghost">朴素按钮</Button>
      <Button >普通按钮</Button>
      <h4>
        按钮尺寸和图标
      </h4>
      <Button icon="check-circle-o" size="large">大按钮</Button>
      <Button icon="check-circle-o" size="small">小按钮</Button>
      <Button icon="check-circle-o" size="small">普通按钮</Button>
      <h4>
        行内按钮
      </h4>
      <Button inline size="large">大按钮</Button>
      <Button inline size="small">小按钮</Button>
      <Button inline size="small">普通按钮</Button>
      <h4>
        状态
      </h4>
      <Button loading >加载中</Button>
      <Button disabled>禁用</Button>
      <h4>
        事件
      </h4>
      <Button onClick={handleClick.bind(this)} >点击事件</Button>
    </div>
  )
}

export default ButtonPage;
