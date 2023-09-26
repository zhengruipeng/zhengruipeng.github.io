import http from '@/http'
export const getNewsTypeList = () => {
  return http({
    url:'/news-type/list/all',
    method:'get'
  })
}