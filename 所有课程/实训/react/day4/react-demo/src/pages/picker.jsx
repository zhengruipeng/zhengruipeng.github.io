import React,{useEffect,useState} from 'react'
// 当引入的组件和本部分代码命名冲突时可以使用 as 来取别名
import { Picker ,List,Toast } from 'antd-mobile'
import { position } from '@/data/position.js'
//position封装了省市区的集联关系，我们可以输出查看
console.log(position)
function PickerPage(){
  const [sexList,setSexList] = useState([
    {
      value:'1',
      label:'男'
    },
    {
      value:'2',
      label:'女'
    },
  ])
  const [sex,setSex] = useState(['1'])
  const handleChange = (v) => {
    console.log(v)
    setSex(v)
  }
  
  const [addressList,setAddressList] = useState(position)
  const [address,setAddress] = useState(['','',''])
  const handleChange1 = (v) =>{
    setAddress(v)
  }
  const handlePickerChange1 = (v)=>{
    console.log(v)
  }
  //多列无关联的数据定义
  const [classValue,setClassValue] = useState(['1','1'])
  const [list,setList] = useState([
    [
      {
        value:'1',
        label:'一年级'
      },
      {
        value:'2',
        label:'二年级'
      },
    ],
    [
      {
        value:'1',
        label:'一班'
      },
      {
        value:'2',
        label:'二班'
      },
    ]
  ])
  //多列有关联的数据定义
  const [address1,setAddress1] = useState(['1','11','111'])
  const [addressList1,setAddressList1] = useState([
    {
      value:'1',
      label:'黑龙江',
      children:[
        {
          value:'11',
          label:'哈尔滨',
          children:[
            {
              value:'111',
              label:'南岗区'
            },
            {
              value:'112',
              label:'道里区'
            }
          ]
        },
        {
          value:'12',
          label:'齐齐哈尔',
          children:[
            {
              value:'121',
              label:'龙沙区'
            },
            {
              value:'122',
              label:'建华区'
            }
          ]
        }
      ]
    },
    {
      value:'2',
      label:'辽宁',
      children:[
        {
          value:'21',
          label:'铁岭',
          children:[
            {
              value:'211',
              label:'市区'
            },
            {
              value:'212',
              label:'郊区'
            }
          ]
        },
        {
          value:'22',
          label:'沈阳',
          children:[
            {
              value:'221',
              label:'浑南区'
            },
            {
              value:'222',
              label:'铁西区'
            }
          ]
        }
      ]
    },
  ])
  /**
   * Picker主要用于移动端做选择的插件，他可以做单列选择和多列选择。
   * value绑定的是picker中返回的值的value，必须是数组，有几列数组就有几个元素
   * cols定义该选择器有多少列
   * data为选择器的数据源结构为[{value:'',label:''},{value:'',label:''}...]
   * 如果是多列选择需要在有子选项的内部追加[{value:'',label:'',children:[{value:'',label:''}]},{value:'',label:''}...]
   * onChange是在选择变化点击确定之后的回调，不点击确定按钮不执行，回调的参数是新的value的值
   */
  return (
    <div>
      <h4>单列选择器用法</h4>
      <List>
        <Picker 
          data={sexList} 
          cols={1} 
          value={sex} 
          onChange={handleChange}>
          <List.Item>选择性别</List.Item>
        </Picker>
      </List>
      <h4>仿照单列练习一个选择器</h4>
      
      <h4>多列无关联的picker</h4>
      {/* 多列无关联的picker需要吧cascade属性设置为false否则无法工作 */}
      <List>
        <Picker
          data={list}
          cols={2}
          value={classValue}
          onChange={
            v => {
              // 简化一层函数的写法
              setClassValue(v)
            }
          }
          cascade={false}>
          <List.Item>选择班级</List.Item>
        </Picker>
      </List>
      <h4>多列有父子关系的picker</h4>
      <List>
        <Picker 
          data={addressList1}
          value={address1}
          cols={3}
          onChange={
            v => {
              setAddress1(v)
            }
          }>
          <List.Item>选择省市区</List.Item>
        </Picker>
      </List>
      <h4>真实省市区数据(多列用法)</h4>
      <List>
        <Picker data={addressList} cols={3}
          value={address}
          onPickerChange={handlePickerChange1}
          onChange={handleChange1}>
          <List.Item>选择地区</List.Item>
        </Picker>
      </List>
    </div>
  )
}

export default PickerPage;
