"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//请结合store/index.js中查看，本文件是通过在store/index.js中引入到vuex中并注册模块的
//先打开store/index.js查看引入方式
// 导入user-api中定义的调用接口方法，结合文件和接口文档查看
var news_api_js_1 = require("../../../api/news-api.js");
// 导出当前模块的对象
exports["default"] = {
    // 开启命名空间模式，开启之后mapState等方法才能通过模块名称自动映射数据
    namespaced: true,
    // 定义了调用接口返回时需要存储的数据对象
    // state定义的对象相当于vue中定义的data属性，他自带响应式监听
    //state通过mapState绑定在vue对象的computed中，所以state在vue对象中默认是一个只读对象
    state: {
        list: [],
        page: {
            pno: 1,
            psize: 10,
            pCount: 0,
            totalElements: 0
        },
    },
    // mutations中定义的对象只有一个功能就是给state中定义的属性赋值
    // 这里是一个固定写法，我们通过mapState得到的属性都是只读属性，所以如果相对其赋值的话需要通过
    // mutations中定义的方法来对state中指定的属性赋值
    //mutation中的函数通过mapMutations绑定在vue对象中的methods中当成函数调用
    mutations: {
        // 设置state中的list数据
        setList: function (state, list) {
            state.list = list;
        },
        // 设置state中的page数据
        setPage: function (state, page) {
            state.page = page;
        }
    },
    // getters相当于vuex中的computed，他可以直接访问state中的对象也可以通过getter
    getters: {
        getList: function (state, getter) {
            return state.list;
        },
        getPage: function (state, page) {
            return state.page;
        }
    },
    // actions相当于调用接口和后台业务时使用的一个业务处理模块
    //所有项目中涉及到调用接口的部分以及具有业务流程的部分都要放在这里
    //actions中定义的函数可以使用异步语法，通过promise封装的函数都可以使用await来做同步化
    //在actions中可以通过commit调用mutations中定义的set方法，
    //同样也可以通过dispatch来调用actions中其他的函数
    //actions中的函数通过mapActions绑定在vue对象的methods中
    actions: {
        // 分页查询
        //actions中的函数参数分两部分，第一个参数中可以通过{commit,dispatch}来调用其他的mutations和actions
        //第二个参数就是在vue文件中调用这个函数时传入的参数，如果参数是多个可以传入一个json对象
        getListForPage: function (_a, data) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, news_api_js_1.NewsApi.listPage(data)];
                        case 1:
                            res = _b.sent();
                            if (res.data.code === 200) {
                                // 当接口返回的code为200时，将查询的结果list（列表数据）和page（分页信息）通过
                                //调用对应的mutations中的函数设置到list和page中
                                commit('setList', res.data.data.list);
                                commit('setPage', res.data.data.page);
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        // 根据id删除数据的业务函数
        deleteById: function (_a, id) {
            var dispatch = _a.dispatch;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, news_api_js_1.NewsApi.deleteId(id)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        insert: function (_, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, news_api_js_1.NewsApi.insert(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        update: function (_a, addForm) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, news_api_js_1.NewsApi.update(addForm)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        findId: function (_a, id) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, news_api_js_1.NewsApi.findId(id)];
                        case 1:
                            res = _b.sent();
                            if (res.data.code === 200) {
                                return [2 /*return*/, res.data.data];
                            }
                            else {
                                return [2 /*return*/, {}];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
};
