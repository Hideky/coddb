import {
  mdiNewspaper,
  mdiSword,
  mdiTable,
  mdiSkull,
  mdiCalculator, mdiMagicStaff,
  mdiScript,
  mdiDatabase,
  mdiDomain,
  mdiFlask,
  mdiHammerWrench,
  mdiBookOpenVariant,
  mdiBookEdit
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'
import { BACKEND_URL } from "./config"

const menuAside: MenuAsideItem[] = [
  {
    href: '/news',
    icon: mdiNewspaper,
    label: 'News',
    wip: true,
  },
  {
    // href: '/tables',
    label: 'Database',
    icon: mdiTable,
    menu: [
      {
        href: '/db/artifacts',
        icon: mdiMagicStaff,
        label: 'Artifacts',
      },
      {
        href: '/db/quests',
        icon: mdiScript,
        label: 'Main quests',
        wip: true,
      },
      {
        href: '/db/building',
        icon: mdiDomain,
        label: 'Buildings',
        wip: true,
      },
      {
        href: '/indexcopy',
        icon: mdiFlask,
        label: 'Research',
        wip: true,
      },
    ],
  },
  {
    href: '/forms_old',
    label: 'Hero Builds',
    icon: mdiSword,
    wip: true,
  },
  {
    href: '/ui_old',
    label: 'Behemots',
    icon: mdiSkull,
    wip: true,
  },
  {
    href: '/guides',
    label: 'Guides',
    icon: mdiBookOpenVariant,
    // wip: true,
  },
  // {
  //   href: '/styles',
  //   label: 'St4ts f0r N3rdz',
  //   icon: mdiChartLine,
  // },
  {
    label: 'Calculators',
    icon: mdiCalculator,
    menu: [
      {
        href: '/calculators/speedup',
        label: 'Speedup',
      },
      {
        href: '/calculators/resources',
        label: 'Resources',
      },
      {
        href: '/calculators/events',
        label: 'Training',
      },
      {
        href: '/calculators/heroes',
        label: 'Heroes',
      },
    ],
  },
  {
    href: '/decree',
    label: 'Decree Editor',
    icon: mdiBookEdit,
  },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  {
    label: 'Admin',
    icon: mdiHammerWrench,
    staffOnly: true,
    menu: [
      {
        icon: mdiDatabase,
        label: 'Database',
        href: BACKEND_URL + 'backadmin/',
      },
      {
        href: '/admin/guides',
        icon: mdiBookOpenVariant,
        label: 'Guides',
      },
      {
        href: '/admin/behemots',
        icon: mdiSkull,
        label: 'Behemots',
      }
    ],
  },
]

export default menuAside
