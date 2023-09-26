import React,{useState,useEffect} from 'react'
import { Tabs ,Badge,WhiteSpace } from 'antd-mobile'
function TabsPage(){
  const [pages,setPages] = useState([
    {title: <Badge text={'3'}>标签一</Badge>},
    {title: <Badge text={'消息20'}>标签二</Badge>},
    {title: <Badge dot>标签三</Badge>}
  ])
  const handleTabChange1 = (tab,index) => {
    console.log(tab,index)
  }
  const [pages1,setPages1] = useState([
    {title: "标签一"},
    {title: "标签二"},
    {title: "标签三"}
  ])
  /*
    tabs属性支持传入一个数组，要求必须是[{title:'字符串或jsx表达式'},{title:'字符串或jsx表达式'}]
    animated为是否开启动画
    initialPage为初始展示第一个标签页
    带页面的标签页只需要将内部插入对应数量的div即可，会按顺序编排成分页
    tabBarPosition为tabs标签出现的位置，可选left top bottom right
    tabDirection为标签页切换的方向，默认是水平切换，可选horizontal和vertical垂直切换，当为垂直切换时
    建议tabBarPosition设置为left或right并需要对Tabs父级嵌套一个有固定高度的标签
  */
  return (
    <div>
      <h4>
        只展示选项头用法
      </h4>
      <div>
        <Tabs tabs={pages} animated onChange={handleTabChange1}></Tabs>
        <WhiteSpace size="md"></WhiteSpace>
        <Tabs tabs={pages1}
          initialPage={1}
          animated={false}
          onChange={handleTabChange1}></Tabs>
      </div>
      <h4>
        带页面的标签页
      </h4>
      <div>
        <Tabs tabs={pages} animated onChange={handleTabChange1}>
          <div>
            第一页
          </div>
          <div>
            第二页
          </div>
          <div>
            第三页
          </div>
        </Tabs>
        <WhiteSpace size="md"></WhiteSpace>
        <Tabs tabs={pages1}
          initialPage={1}
          animated={false}
          onChange={handleTabChange1}>
          <div>
            第一页
          </div>
          <div>
            第二页
          </div>
          <div>
            第三页
          </div>
        </Tabs>
      </div>
      <h4>
        垂直的tabs
      </h4>
      <div>
       <div style={{ height: '100px' }}>
         <Tabs tabs={pages}
           initialPage={1}
           tabBarPosition="left"
           tabDirection="vertical"
         >
           <div>
             第一页
           </div>
           <div>
             第二页
           </div>
           <div>
             第三页
           </div>
         </Tabs>
       </div>
        <WhiteSpace size="md"></WhiteSpace>
        <div style={{height:'100px'}}>
          <Tabs tabs={pages1}
            initialPage={1}
            tabDirection="vertical"
            tabBarPosition="left"
            animated={false}
            onChange={handleTabChange1}>
            <div>
              第一页
            </div>
            <div>
              第二页
            </div>
            <div>
              第三页
            </div>
          </Tabs>
        </div>

      </div>
    </div>
  )
}
export default TabsPage
