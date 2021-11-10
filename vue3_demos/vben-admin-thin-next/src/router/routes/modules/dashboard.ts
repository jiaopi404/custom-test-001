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
        redirectNoTransition: true // TODO-jiaopi404: 重定向到自身时，无 transition
      },
    },
    {
      path: 'cykPage3',
      name: 'CykPage3',
      component: () => import('/@/views/dashboard/cykPage3/index.vue'),
      meta: {
        title: 'cyk页3',
      },
    },
    {
      path: 'cykPage4',
      name: 'CykPage4',
      component: () => import('/@/views/dashboard/cykPage4/index.vue'),
      meta: {
        title: 'cyk页4',
      },
    },
    {
      path: 'cykPage5',
      name: 'CykPage5',
      component: () => import('/@/views/dashboard/cykPage5/index.vue'),
      meta: {
        title: 'cyk页5',
      },
    },
    {
      path: 'cykPage6',
      name: 'CykPage6',
      component: () => import('/@/views/dashboard/cykPage6/index.vue'),
      meta: {
        title: 'cyk页6',
      },
    },
  ],
};

export default dashboard;
