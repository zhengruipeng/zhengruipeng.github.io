import api from '../http'

// 初步定义login函数，通过api中的http功能将登录实现
class GoodsApi extends Object {
    public static listPage = async function (data: any): Promise<any> {
        return api.http({
            url: '/goods/list/page',
            params: {
                pno: data.pno,
                psize: data.psize,
                name: data.name ?? "",
                username: data.username
            },
            method: 'get'
        })
    };
    public static deleteId = async function (id: string): Promise<any> {
        return api.http({
            url: `/goods/delete/id/${id}`,
            method: 'delete'
        })
    };
    public static insert = async function (data: Object): Promise<any> {
        console.log(data)
        return api.http({
            url: `/goods/insert`,
            method: 'put',
            data: data
        })
    };

    public static update = async function (data: Object): Promise<any> {
        return api.http({
            url: `/goods/update`,
            method: 'put',
            data: data
        })
    };
    public static findId = async function (id: string): Promise<any> {
        return api.http({
            url: `/goods/find/id/${id}`,
            method: 'get',
        })
    };
    public static onSale = async function (id: string, isOnSale: boolean): Promise<any> {
        return api.http({
            url: `/goods/set/onsale`,
            method: 'get',
            params: {
                id,
                isOnSale: isOnSale ? '1' : '0'
            },
        })
    };
}

export {GoodsApi}