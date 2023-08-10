//mutations.js
export default {
  //第一个参数是store的state对象，第二个参数是传递过来的参数
  //名字使用全部大写，是为了和actions里面的方法名区分开
  SAVENAME(state, name) {
    state.username = name;
  }, //保存用户名

  SAVETOKEN(state, token) {
    state.token = token;
  }, //保存用户token

  SAVEROLE(state, role) {
    state.role = role;
  }, //保存用户角色

  UPDATEINFO(state, name) {
    state.info.username = name;
  }//异步修改用户信息
};
