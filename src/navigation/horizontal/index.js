import { Home, Users, User, Grid } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGrip,
  faRobot,
  faChartLine,
  faGraduationCap,
  faBell,
  faDollar,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <FontAwesomeIcon icon={faGrip} />,
    navLink: '/home',
    restrictedTo: { role: ['user', 'superadmin'] },
  },
  {
    id: 'trading-bots',
    title: 'Trading Bots',
    icon: <FontAwesomeIcon icon={faRobot} />,
    navLink: '/trading-bots',
    restrictedTo: { role: ['user', 'superadmin'] },
  },
  {
    id: 'trading-chart',
    title: 'Live Chart',
    icon: <FontAwesomeIcon icon={faChartLine} />,
    navLink: '/trading-chart',
    restrictedTo: { role: ['user', 'superadmin'] },
  },
  {
    id: 'certificate',
    title: 'Academy',
    icon: <FontAwesomeIcon icon={faGraduationCap} />,
    navLink: 'https://academy.archaide.io/login',
    externalLink: true,
    restrictedTo: { role: ['user', 'superadmin'] },
    newTab: true,
  },
  {
    id: 'discord',
    title: 'Community',
    icon: <FontAwesomeIcon icon={faDiscord} />,
    navLink: '/discord',
    restrictedTo: { role: ['user', 'superadmin'] },
  },
  /*{
    id: 'notification',
    title: 'Notifications',
    icon: <FontAwesomeIcon icon={faBell} />,
    navLink: '/notification',
    restrictedTo: { role: ['user'] },
  },*/
  {
    id: 'affiliate',
    title: 'Affiliate',
    icon: <FontAwesomeIcon icon={faDollar} />,
    navLink: '/affiliate',
    restrictedTo: { role: ['user', 'superadmin'] },
  },
  /*{
    id: 'faq',
    title: 'Help',
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    navLink: '/help',
    restrictedTo: { role: ['user'] },
  },*/
  {
    id: 'users',
    title: 'Users',
    icon: <User size={20} />,
    navLink: '/user/list',
    restrictedTo: { role: ['admin', 'superadmin'] },
  },
  // {
  //   id: 'admins',
  //   title: 'Admins',
  //   icon: <User size={20} />,
  //   navLink: '/admin/list',
  //   restrictedTo: { role: ['admin'] },
  // },
  // {
  //   id: 'users',
  //   title: 'Users',
  //   icon: <Users size={20} />,
  //   navLink: '/user/list',
  //   restrictedTo: { role: ['admin'] },
  // },
]
