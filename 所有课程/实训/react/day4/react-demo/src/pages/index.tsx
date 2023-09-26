import React from 'react';
import styles from './index.less';
import { List } from 'antd-mobile'
const Item = List.Item;
const menuList = [
  {name:'按钮',path:'/button'},
  {name:'输入框',path:'/input'},
  {name:'日期选择器',path:'/date-picker'},
  {name:'分段器',path:'/segment'},
  {name:'标签页',path:'/tabs'},
  {name:'列表',path:'/list'},
  {name:'picker选择器',path:'/picker'},
  {name:'textarea文本域',path:'/textarea'},
  {name:'提示框',path:'/modal-toast'}

]
export default (props) => {
  const handleClick = (path) => {
    props.history.push(path)
  }
  return (
    <div>
      <List>
        {menuList.map(item => {
          return (
            <Item key={item.path}
              align="middle"
              onClick={handleClick.bind(this,item.path)}
              arrow="horizontal"
            >{item.name}</Item>
          )
        })}
      </List>
    </div>
  );
}
