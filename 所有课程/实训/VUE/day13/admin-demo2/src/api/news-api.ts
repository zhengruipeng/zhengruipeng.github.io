import api from '../http'

// 初步定义login函数，通过api中的http功能将登录实现
class NewsApi extends Object {
    public static listPage = async function (data: any): Promise<any> {
        return api.http({
            url: '/news/list/page',
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
            url: `/news/delete/id/${id}`,
            method: 'delete'
        })
    };
    public static insert = async function (data: Object): Promise<any> {
        console.log(data)
        return api.http({
            url: `/news/insert`,
            method: 'put',
            data: data
        })
    };
    public static update = async function (data: Object): Promise<any> {
        return api.http({
            url: `/news/update`,
            method: 'put',
            data: data
        })
    };
    public static findId = async function (id: string): Promise<any> {
        return api.http({
            url: `/news/find/id/${id}`,
            method: 'get',
        })
    };
}

export {NewsApi}