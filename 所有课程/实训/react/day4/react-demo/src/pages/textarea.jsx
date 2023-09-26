import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { TextareaItem,Toast,List } from 'antd-mobile'
//TextareaItem主要结合List使用
function Textarea(){
  const [str,setStr] = useState('默认值')
  const handleChange = (v) => {
    setStr(v)
  }
  return (
    <div>
      <h4>多行输入</h4>
      <List>
        {str}
        <TextareaItem
          title="多行输入" rows={3} value={str}
            onChange={handleChange}
           count={100} clear placeholder="请输入">

        </TextareaItem>
      </List>
    </div>
  )
}

export default Textarea;
