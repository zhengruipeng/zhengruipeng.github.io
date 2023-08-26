import React from 'react';
import styles from './index.less';
//引入全局的history对象
import {history} from 'umi';

export default (props: any) => {
//增加点击事件
  const handleJump = () => {
    //通过全局的history对象跳转与react-router语法完全一致
    //同样也可以使用props.histroy进行编写
    //umi高度集成了react-router所以使用起来更加灵活，并且通过query传参数可以实现解析到url路径中传参数
    history.push({pathname: '/test', query: {name: '你好'}})
  }
  return (
    <div>
      <h1 className={styles.title}>
        <button onClick={handleJump}>跳转到test</button>
      </h1>
    </div>
  );
}
