import { Calendar } from 'react-feather'
import { formatDateAlt } from '@utils'

export const USER_SORT_KEY = ['name', 'email', 'status']

export const PROFILE_TAB_ROUTES = [
  {
    id: '1',
    title: 'Overview',
    route: '',
  },
]

export const DURATION = [
  new Date(Date.now() - 86400000 * 7).toISOString(),
  new Date().toISOString(),
]
