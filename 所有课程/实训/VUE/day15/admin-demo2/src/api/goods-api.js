import api from '../http';
// 初步定义login函数，通过api中的http功能将登录实现
class GoodsApi extends Object {
}
GoodsApi.listPage = async function (data) {
    return api.http({
        url: '/goods/list/page',
        params: {
            pno: data.pno,
            psize: data.psize,
            name: data.name ?? "",
            username: data.username
        },
        method: 'get'
    });
};
GoodsApi.deleteId = async function (id) {
    return api.http({
        url: `/goods/delete/id/${id}`,
        method: 'delete'
    });
};
GoodsApi.insert = async function (data) {
    console.log(data);
    return api.http({
        url: `/goods/insert`,
        method: 'put',
        data: data
    });
};
GoodsApi.update = async function (data) {
    return api.http({
        url: `/goods/update`,
        method: 'put',
        data: data
    });
};
GoodsApi.findId = async function (id) {
    return api.http({
        url: `/goods/find/id/${id}`,
        method: 'get',
    });
};
GoodsApi.onSale = async function (id, isOnSale) {
    return api.http({
        url: `/goods/set/onsale`,
        method: 'get',
        params: {
            id,
            isOnSale: isOnSale ? '1' : '0'
        },
    });
};
export { GoodsApi };
