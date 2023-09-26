import React, { useState, useEffect } from 'react';
import { NavBar, Tabs, List } from 'antd-mobile';
import PTabBar from '@/components/p-tabbar.jsx';
// 引入连接函数，将本页面与news的model连接，与vuex中在store中注册model是一样的原理
import { connect } from 'dva';
import './news.less';
import PPageHelper from '@/components/p-page-helper.jsx';

function News(props) {
  //使用了connect之后我们就可以从props中获取dispatch和news两个对象
  const { dispatch, news } = props;

  //定义条件查询对象
  const [queryForm, setQueryForm] = useState({
    name: '',
    pno: 1,
    psize: 10,
    newsTypeId: '',
  });

  //由于queryForm是个对象，所以调用setQueryForm步骤比较多，这里我们就封装一个快速设置queryForm中指定key的函数
  const handleSetQueryForm = (key, value) => {
    //设置queryForm指定key的值
    queryForm[key] = value;
    //通过传入合并的新对象来刷新queryForm数据
    setQueryForm({ ...queryForm });
  };

  const handleNewsTypeChange = async v => {
    console.log('标签改变：', v);
  };
  const handleTabsChange = (v) => {
    console.log(v)
    //将queryForm中的新闻类型id更新
    handleSetQueryForm('newsTypeId',v.id)
    //将每次查询的页号重制为1
    handleSetQueryForm('pno',1)
    // 重新执行一次查询
    dispatch({
      type:'news/getListForPage',
      payload:queryForm
    })
  }

  const [loading, setLoading] = useState(false);
  const onEndReached = async () => {
    console.log('触发分页查询函数');
    //判断，只有在当前的loading为false的时候才执行分页逻辑
    //并且当前的页号要小于总页数
    if (loading === false && queryForm.pno < news.page.pCount) {
      //将分页状态变成true
      setLoading(true);
      //调用分页查询才查询下一页
      handleSetQueryForm('pno', queryForm.pno + 1);
      await dispatch({
        type: 'news/getListForPageMore',
        payload: queryForm,
      });
      //查询完毕将当前的loading变成false
      setLoading(false);
    }
  };

  // nes加载函数
  // news加载函数
  //通过监听函数来实现实时监听newsTypeList的变化
  //这样就能保证只要newsTypeList变更了我们就能知道
  /*useEffect(() => {
    console.log('newsTypeList变更了');
    console.log(news.newsTypeList);
    if (news.newsTypeList.length > 0) {
      //获取第一个新闻类型的id
      let newsTypeId = news.newsTypeList[0].key;
      //设置到条件查询对象中
      handleSetQueryForm('newsTypeId', newsTypeId);
      console.log(queryForm);
      dispatch({
        //type编写的是模块名/函数名
        type: 'news/getListForPage',
        //payload是参数
        payload: queryForm,
      });
    }
  }, [news.newsTypeList]);*/
  // news加载函数
  useEffect(() => {
    //useEffect的执行函数不可以使用async修饰所以我们想要执行异步流程同步化的时候
    //需要在useEffect中定义一个自执行函数通过async修饰就可以了
    (async function() {
      //dispatch执行newsmodel中的getNewsTypeListAll函数与vuex中的mapActions类似
      let newsTypeList = await dispatch({ type: 'news/getNewsTypeListAll' });
      //注意这里的newsTypeList是接口直接返回的数据和news.newsTypeList是两个不同的对象
      //将第一个类型的id设置到queryForm中
      handleSetQueryForm('newsTypeId', newsTypeList[0].id);
      //调用getListForPage并将queryForm传入
      let res = await dispatch({
        type: 'news/getListForPage',
        payload: queryForm,
      });
      console.log('news loaded');
    })();
  }, []);

  return (
    //页面部分改造的代码
    <div className="news-page">
      <div className="news-header">
        <NavBar mode="light">新闻</NavBar>
        <Tabs
          tabs={news.newsTypeList}
          onChange={v => {
            handleNewsTypeChange(v);
          }}
        ></Tabs>
      </div>
      <PPageHelper
        activePosition={100}
        footer={<div>{loading ? '加载中' : '没有更多数据'}</div>}
        onEnd={onEndReached}
      >
        <List>
          {news.list.map(item => {
            return (
              <List.Item
                key={item.id}
                thumb={
                  <img
                    style={{
                      width: '60px',
                      height: '60px',
                    }}
                    src={item.logo}
                  ></img>
                }
                arrow="horizontal"
              >
                {item.name}
                <List.Item.Brief>{item.description}</List.Item.Brief>
              </List.Item>
            );
          })}
        </List>
      </PPageHelper>
      <PTabBar path="/news"></PTabBar>
    </div>
  );
}

// 引入connect之后导出写法变成如下写法
//connect中的参数中的news就是在news的model定义的名字
//最下面括号的News是我们要整合的页面数据对象，
//通过这一步操作之后我们本页对象的props中就存在news和dispatch两个对象
//news中包括了在命名为news的model的所有state可以直接获取值
//dispatch可以执行model中的effects相当于vuex中的actions
export default connect(({ news }) => {
  return {
    news,
  };
})(News);
