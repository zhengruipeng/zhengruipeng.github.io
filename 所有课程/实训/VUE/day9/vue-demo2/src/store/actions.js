//actions.js
export default {
  //payload是传递过来的参数
  saveName(context, payload) {
    context.commit("SAVENAME", payload);
  }, //触发保存用户名方法
  //也可以这样写
  // {commit}是对象的解构，本来这个参数是context上下文，也就是store对象，打印这个对象，你就会知道里面有很多东西，其中就有commit这个东西
  // saveName({commit}, payload) {
  //   commit("SAVENAME", payload);
  // } //触发保存用户名方法

  saveToken(context, payload) {
    context.commit("SAVETOKEN", payload);
  }, //触发保存用户token方法

  saveRole(context, payload) {
    context.commit("SAVEROLE", payload);
  }, //触发保存用户角色方法

  //action里面可以进行异步操作
  aUpdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit("UPDATEINFO", payload);
        //这里告诉别人我已经做完了
        resolve("success");
      }, 1000);
    });
  }
};
