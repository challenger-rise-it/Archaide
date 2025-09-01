import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/dashboard')),
    private: true,
  },
  {
    path: '/trading-bots',
    component: lazy(() => import('../../views/trading-bots')),
    private: true,
  },
  {
    path: '/trading-bots/bot-edit/:id?',
    component: lazy(() => import('../../views/trading-bots/bot-edit')),
    private: true,
  },
  {
    path: '/trading-bots/bot-log/:id?',
    component: lazy(() => import('../../views/trading-bots/bot-log')),
    private: true,
  },
  {
    path: '/trading-bots/broker-edit/:brokerageId?',
    component: lazy(() => import('../../views/trading-bots/broker-edit')),
    private: true,
  },
  {
    path: '/trading-chart',
    component: lazy(() => import('../../views/trading-chart')),
    private: true,
  },
  // {
  //   path: '/certificate',
  //   component: lazy(() => import('../../views/certificate')),
  //   private: true,
  // },
  {
    path: '/discord',
    component: lazy(() => import('../../views/discord')),
    private: true,
  },
  {
    path: '/notification',
    component: lazy(() => import('../../views/notification')),
    private: true,
  },
  {
    path: '/affiliate',
    component: lazy(() => import('../../views/affiliate')),
    private: true,
  },
  {
    path: '/help',
    component: lazy(() => import('../../views/help')),
    private: true,
  },
  {
    path: '/user/list',
    component: lazy(() => import('../../views/user/list')),
    private: true,
  },
  {
    path: '/user/:id',
    component: lazy(() => import('../../views/user/info')),
    private: true,
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/account-settings')),
    private: true,
  },
  {
    path: '/force-reset-password',
    component: lazy(() => import('../../views/force-reset-password')),
    layout: 'BlankLayout',
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/register-secret',
    component: lazy(() => import('../../views/auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/onboarding',
    component: lazy(() => import('../../views/onboarding')),
    layout: 'BlankLayout',
    private: true,
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
  },
]

export { DefaultRoute, TemplateTitle, Routes }
