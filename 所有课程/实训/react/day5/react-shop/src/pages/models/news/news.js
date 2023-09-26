import { getNewsTypeList } from '@/api/news-type-api.js';
import { getNewsListForPage } from '@/api/news-api.js';
//定义model模型
export default {
  // 命名空间，起名为news
  namespace: 'news',
  //state与vuex的state完全一样
  state: {
    newsTypeList: [],
    list: [], //新闻数据
    page: {
      //分页数据
      pno: 1,
      psize: 10,
      pCount: 0,
      totalElements: 0,
    },
  },
  // reducers相当于vuex中的mutations用法类似，按照下列语法即可
  reducers: {
    setNewsTypeList(state, { payload: newsTypeList }) {
      //将数据格式改变一下重新设置newsTypeList
      newsTypeList = newsTypeList.map(item => {
        return {
          title: item.name,
          key: item.id,
        };
      });
      return { ...state, newsTypeList };
    },
    setList(state, { payload: list }) {
      return { ...state, list };
    },
    setPage(state, { payload: page }) {
      return { ...state, page };
    },
  },
  // effects相当于vuex中的actions，用法类似
  //参数不同他的第一个参数中的payload是在页面组件中调用时传入的参数
  //第二个大参数中的put和call分别是
  //put代表vuex中的commit用来执行本页的reducers函数，执行格式与dispatch方法一样
  //call用来调用接口函数，第一个参数是接口函数名称，如果接口有参数就放在第二个参数里
  //由于本函数是通过yield控制延迟执行的，模式类似与async和await但是原理不同所以需要配合
  //put和call
  effects: {
    *getNewsTypeListAll({ payload }, { put, call }) {
      //call(函数名,参数),如call(getNewsTypeList,参数（可省略）)表示getNewsTypeList(参数)
      //通过call调用才能被yield修饰执行
      let res = yield call(getNewsTypeList);
      if (res.data.code === 200) {
        //put相当于vuex中的commit用来执行本model中的reducers定义的函数，通过payload传入参数
        yield put({
          type: 'setNewsTypeList',
          payload: res.data.data.list,
        });
        //用于实现async和await的流程控制
        return yield Promise.resolve(res.data.data.list);
      }
      return yield Promise.reject();
    },
    *getListForPage({ payload }, { put, call }) {
      //调用getNewsListForPage并将参数传入
      let res = yield call(getNewsListForPage, payload);
      if (res.data.code === 200) {
        //设置list
        yield put({
          type: 'setList',
          payload: res.data.data.list,
        });
        //设置page
        yield put({
          type: 'setPage',
          payload: res.data.data.page,
        });
        //不用返回promise对象了
      }
    },
    //models/news/news.js
    *getListForPageMore({ payload }, { put, call, select }) {
      //根据传入的payload参数使用call调用分页查询接口
      let res = yield call(getNewsListForPage, payload);
      //判断返回值
      if (res.data.code == 200) {
        //分页查询第二页之后的数据时
        //每次查询的新数据，需要与原有的list数据合并
        //所以这里就需要获取原有的list数据，这里需要使用select参数
        // 获取当前model的list的值,就是之前已有的列表数据
        let list = yield select(({ news }) => {
          return news.list;
        });
        //将这个数据与我们新查询回来的数据合并
        list = list.concat(res.data.data.list);
        //查询成功就通过put来调用reducers中的setList和setPage
        yield put({
          type: 'setList',
          payload: list,
        });
        yield put({
          type: 'setPage',
          payload: res.data.data.page,
        });
      }
    },
  },
};
