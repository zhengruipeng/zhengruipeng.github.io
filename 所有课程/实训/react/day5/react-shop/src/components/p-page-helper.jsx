import React,{useState,useEffect} from 'react';
//滚动分页器
//参数包括 activePosition代表距离页底多远触发查询函数
//onEnd在满足到达页底时触发
//footer代表分页过程中底部展示的提示语，传入jsx对象
export default (props) => {
  let activePosition = props.activePosition||0
  document.body.onscroll = (e) => {
    let doc = e.srcElement||e.target
    let winHeight = window.innerHeight;
    let scrollTop = doc.documentElement.scrollTop
    let scrollHeight = doc.documentElement.scrollHeight
    // console.log(winHeight,scrollTop,scrollHeight,activePosition)
    if(winHeight+scrollTop+activePosition>=scrollHeight){
      // console.log('new page')
      if(props.onEnd){
        props.onEnd()
      }
    }
  }
  useEffect(() => {
    console.log(props.children)
  })
  return (
    <div className="p-page-helper">
      {props.children}
      <div style={{ textAlign: 'center', padding: '5px 15px' }}>
        {props.footer}
      </div>
    </div>
  );
}
