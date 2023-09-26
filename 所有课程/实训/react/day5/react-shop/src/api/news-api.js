//api/news-api.js
import http from '@/http';

export const getNewsListForPage = params => {
  return http({
    url: '/news/list/page',
    method: 'get',
    params,
  });
};
