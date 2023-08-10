import api from '../http'

// 初步定义login函数，通过api中的http功能将登录实现
class CardApi extends Object {
    public static listPage = async function (data: any): Promise<any> {
        return api.http({
            url: '/card/list/page',
            params: {
                pno: data.pno,
                psize: data.psize,
                name: data.name ?? "",
                num: data.num,
                cardTypeId: data.cardTypeId
            },
            method: 'get'
        })
    };
    public static deleteId = async function (id: string): Promise<any> {
        return api.http({
            url: `/card/delete/id/${id}`,
            method: 'delete'
        })
    };
    public static insert = async function (data: Object): Promise<any> {
        console.log(data)
        return api.http({
            url: `/card/insert`,
            method: 'put',
            data: data
        })
    };
    public static update = async function (data: Object): Promise<any> {
        return api.http({
            url: `/card/update`,
            method: 'put',
            data: data
        })
    };
    public static findId = async function (id: string): Promise<any> {
        return api.http({
            url: `/card/find/id/${id}`,
            method: 'get',
        })
    };
    public static insertMultiple = async function (data: Object): Promise<any> {
        return api.http({
            url: `/card/insert/multiple`,
            method: 'put',
            data: data
        })
    };

    public static openCard = async function (num: string, userId: string): Promise<any> {
        return api.http({
            url: `/card/open/card`,
            params: {
                num,
                userId
            },
            method: 'get',
        })
    };
    public static backCard = async function (num: string): Promise<any> {
        return api.http({
            url: `/card/back/card`,
            params: {
                num
            },
            method: 'get',
        })
    };
    public static findNum = async function (num: string): Promise<any> {
        return api.http({
            url: `/card/find/num`,
            params: {
                num
            },
            method: 'get',
        })
    };
}

export {CardApi}