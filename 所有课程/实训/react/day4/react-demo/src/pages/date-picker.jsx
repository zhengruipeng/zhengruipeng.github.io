import React,{useState,useEffect} from 'react'
import { DatePicker ,InputItem } from 'antd-mobile'
function DatePickerPage(props){
  const [date1,setDate1] = useState();
  const handleDate1Change = (v) => {
    setDate1(v)
  }
  const handleClickOk = (v) => {
  }
  const handleClickDismiss = () => {
    console.log('取消')
  }
  const handleFormat = (d) => {
    //只格式化展示的值，不格式化返回的日期值
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  }
  /*onOk是点击日期选择器确认之后返回的日期数据，onDismiss是点击取消后执行的回调*/
  /*format是格式化页面展示日期的回调具体查看案例，onChange为日期改变时触发的回调*/
  /*mode使用date默认是省市区，加时分秒使用datetime，其他参考官方文档*/
  return (
    <div>
      <h4>日期选择器</h4>
      <DatePicker mode="date"
        format={handleFormat}
        value={date1}
        onOk={handleClickOk}
        onDismiss={handleClickDismiss}
        onChange={handleDate1Change}>
        <InputItem
          editable={false}
          >请选择日期</InputItem>
      </DatePicker>
    </div>
  )
}
export default DatePickerPage
