import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:bar-chart-3',
      sort: 10,
      title: '下载统计',
    },
    name: 'DownloadStatistics',
    path: '/download-statistics',
    component: () => import('#/views/statistics/download/index.vue'),
  },
];

export default routes;
