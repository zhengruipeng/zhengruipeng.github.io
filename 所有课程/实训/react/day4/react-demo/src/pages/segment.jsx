import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { SegmentedControl,WhiteSpace } from 'antd-mobile'
//分段器可以用于条件选择器直观明了
function Segment(){
  const [list,setList] = useState(['分段一','分段二','分段三'])
  const [selectedIndex,setSelectedIndex] =  useState(0)
  //当值改变时触发的回调函数直接返回list中的值
  const handleSegmentValueChange = (v) => {
    console.log(v)
  }
  // 当选项变化时触发的回调，返回事件函数
  const handleSegmentChange = (event) => {
    console.log(event)
  }
  //WhiteSpace为上下留白，做间隔用的组件，只有一个size属性，值可以选xs,sm,md,lg,xl
  //segment的values需要填写数组（字符串类型）
  return (
    <div>
      <h4>分段器</h4>
      <SegmentedControl selectedIndex={selectedIndex} values={list}
        onValueChange={handleSegmentValueChange}
        onChange={handleSegmentChange}></SegmentedControl>
      <WhiteSpace size="md"></WhiteSpace>
      <SegmentedControl selectedIndex={2} values={list}
        disabled
        onValueChange={handleSegmentValueChange}
        onChange={handleSegmentChange}></SegmentedControl>
    </div>

  )
}

export default Segment;
