import {getNewsTypeList} from '../../../api/news-type-api.js'
import {NewsApi} from '../../../api/news-api.js'

export default {
    namespaced: true,
    state: {
        list: [],
        page: {
            pno: 1,
            psize: 10,
            pCount: 1,
            totalElements: 1
        },
        newsTypeList: []
    },
    mutations: {
        setList(state, list) {
            state.list = list
        },
        setPage(state, page) {
            state.page = page
        },
        setNewsTypeList(state, newsTypeList) {
            state.newsTypeList = newsTypeList
        }
    },
    actions: {
        async getListForPage({commit}, queryForm) {
            // let res = await getNewsListForPage(queryForm)
            let res = await NewsApi.listPage(queryForm)
            if (res.data.code === 200) {
                commit('setList', res.data.data.list)
                commit('setPage', res.data.data.page)
            }
        },
        async getNewsTypeListAll({commit}) {
            let res = await getNewsTypeList()
            if (res.data.code === 200) {
                commit('setNewsTypeList', res.data.data.list)
            }
        },
        async insert({comimit}, addForm) {
            await NewsApi.insert(addForm)
        },
        async update({comimit}, addForm) {
            await NewsApi.update(addForm)

        },
        async findById({comimit}, id) {
            let res = await NewsApi.findId(id)
            if (res.data.code === 200) {
                return res.data.data
            } else {
                return {}
            }
        },
        async deleteById({comimit}, id) {
            await NewsApi.deleteId(id)

        }
    }
}