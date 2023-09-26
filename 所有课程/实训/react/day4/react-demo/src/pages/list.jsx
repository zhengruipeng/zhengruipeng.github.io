import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { Link } from 'umi'
import { List,WhiteSpace,Icon,InputItem,DatePicker,TextareaItem } from 'antd-mobile'
function ListPage(){
  const [date1,setDate1] = useState();
  const handleDate1Change = (v) => {
    setDate1(v)
  }
  /**
   *
    List列表在表单操作中最为常见，需要配合List.Item使用也可以配合InputItem和TextareaItem
    一起使用
    List.Item上常用的属性有 arrow右侧展示的箭头horizontal up down empty
    extra右边自定义内容
    配合Link使用需要用Link嵌套在List.Item外
    配合DatePicker使用仍然如此，数据优先级DatePicker优先
    InputItem和TextareaItem在List中直接使用与List.Item同级别
    List.Item.Brief组件可以对list的选项中增加副标题
   */
  return (
    <div>
      <h4>列表</h4>
      <List>
        <List.Item arrow="horizontal">我是第一行</List.Item>
        <List.Item extra="右边">自定义右边</List.Item>
        <Link to="/">
          <List.Item arrow="horizontal">
            返回
          </List.Item>
        </Link>
        <InputItem placeholder="请输入" clear >配合输入框</InputItem>
        <DatePicker mode="date" value={date1} onChange={handleDate1Change} extra="请选择1">
          <List.Item  extra="请选择">配合日期选择器</List.Item>
        </DatePicker>
        <List.Item arrow="horizontal">
          我是第一行
          <List.Item.Brief>
            我是副标题1
          </List.Item.Brief>
          <List.Item.Brief>
            我是副标题2
          </List.Item.Brief>
        </List.Item>
        {/* 作为字符串引用线上图片 */}
        <List.Item 
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          extra="右边">网络图标</List.Item>
          {/* 作为字符串使用本地图片，需要使用import来转换一下图片 */}
        <List.Item
          thumb={marker}>
          本地图标
        </List.Item>
        {/* 作为组件传入，使用本地图片 */}
        <List.Item
          thumb={
            <img style={{width:'30px',height:'30px'}} src={marker}></img>
          }>
          组件图标
        </List.Item>
        {/* 作为组件传入，使用Icon图标 */}
        <List.Item
          thumb={
            <Icon type="check-circle" color="green"></Icon>
          }>
          组件图标1
        </List.Item>
        <TextareaItem
          title="配合多行输入"
          rows={2}
          placeholder="请输入"
          clear
          count={300}
          >
        </TextareaItem>
      </List>
    </div>

  )
}

export default ListPage;
