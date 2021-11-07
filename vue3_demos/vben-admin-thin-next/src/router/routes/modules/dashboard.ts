import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
    {
      path: 'cykPage',
      name: 'CykPage',
      component: () => import('/@/views/dashboard/cykPage/index.vue'),
      meta: {
        title: 'cyk页',
      },
    },
    {
      path: 'cykPage2',
      name: 'CykPage2',
      component: () => import('/@/views/dashboard/cykPage2/index.vue'),
      meta: {
        title: 'cyk页2',
      },
    },
  ],
};

export default dashboard;
