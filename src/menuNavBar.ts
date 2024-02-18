import {
  mdiLogin,
  // mdiMenu,
  // mdiClockOutline,
  // mdiCloud,
  // mdiCrop,
  // mdiAccount,
  // mdiCogOutline,
  // mdiEmail,
  mdiLogout
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  // {
  //   icon: mdiMenu,
  //   label: 'Dample menu',
  //   menu: [
  //     {
  //       icon: mdiClockOutline,
  //       label: 'Item One',
  //     },
  //     {
  //       icon: mdiCloud,
  //       label: 'Item Two',
  //     },
  //     {
  //       isDivider: true,
  //     },
  //     {
  //       icon: mdiCrop,
  //       label: 'Item Last',
  //     },
  //   ],
  // },
  {
    isLoggedIn: true,
    isCurrentUser: true,
    // menu: [
    //   {
    //     icon: mdiAccount,
    //     label: 'My Profile',
    //     href: '/profile',
    //   },
    //   // {
    //   //   icon: mdiCogOutline,
    //   //   label: 'Settings',
    //   // },
    //   // {
    //   //   icon: mdiEmail,
    //   //   label: 'Messages',
    //   // },
    //   {
    //     isDivider: true,
    //   },
    //   {
    //     icon: mdiLogout,
    //     label: 'Log Out',
    //     isLogout: true,
    //   },
    // ],
  },
  {
    isLoggedIn: true,
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true,
  },
  // {
  //   href: '/login',
  //   isLoggedIn: false,
  //   icon: mdiLogin,
  //   label: 'Log in',
  // },
]

export default menuNavBar
