import React, { useState, useEffect } from 'react';
import {
  NavBar,
  List,
  Toast,
  InputItem,
  WhiteSpace,
  Button,
} from 'antd-mobile';
import { login } from '@/api/user-api.js';

function Login(props) {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const handleFormDataChange = (v, key) => {
    formData[key] = v;
    setFormData({ ...formData });
  };

  //然后改在我们的提交事件 由于涉及到异步代码所以增加async修饰符
  //然后改在我们的提交事件 由于涉及到异步代码所以增加async修饰符
  const handleSubmit = async () => {
    //表单验证
    let phoneRegx = /^1[3456789]\d{9}$/;
    if (formData.phone.trim().length == 0) {
      Toast.fail('请输入手机号码', 2);
      return;
    }
    if (!phoneRegx.test(formData.phone)) {
      Toast.fail('手机号码格式不正确', 2);
      return;
    }

    if (formData.password.trim().length == 0) {
      Toast.fail('请输入密码', 2);
      return;
    }
    console.log(formData);
    //调用接口登录，
    let res = await login({
      username: formData.phone,
      password: formData.password,
    });
    //处理返回的token
    if (res.data.code == 200) {
      //由于其他接口都需要鉴权，所以要把token放到sessionStorage中用来在接口拦截器中自动补冲
      sessionStorage.token = res.data.data.token;
      //登录成功之后要把用户信息存储到sessionStorage中
      sessionStorage.userInfo = JSON.stringify(res.data.data.userInfo);
      //跳转到首页
      props.history.push('/');
    }
  };

  return (
    <div>
      <NavBar mode="light">登录</NavBar>
      <List>
        <InputItem
          clear
          value={formData.phone}
          onChange={e => handleFormDataChange(e, 'phone')}
          placeholder="请输入手机号"
        >
          手机号
        </InputItem>
        <InputItem
          clear
          type="password"
          value={formData.password}
          onChange={e => handleFormDataChange(e, 'password')}
          placeholder="请输入密码"
        >
          密码
        </InputItem>
      </List>
      <WhiteSpace size="md"></WhiteSpace>
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
}

export default Login;
