export type LoginPayloadObject = {
  expiry: string
  token: string
  user: {
    username: string
    email: string
    is_staff: boolean
  }
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  staffOnly?: boolean
  color?: ColorButtonKey
  isLogout?: boolean
  wip?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLoggedIn: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

// Game content
export type ArtifactPayloadObject = [
  {
    id: number
    img: string
    img_full: string
    name: string
    categories: [string]
    quality: string
    first_stats: string
    secondary_stats: string
    cooldown: string
    rage_cost: number
    ability_name: string
    ability_description: string
    ability_upgrade: string
  }
]

export type User = {
  username: string | null
  email: string | null
  is_staff: boolean
}

export type UserPayloadObject = [
  {
    expiry: string
    token: string
    user: User
  }
]

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}

export type News = {
  id: number
  img: string
  title: string
  description: string
  category: string
  publish_date: string
  author: string
}

export type Artifact = {
  id: number
  img: string
  name: string
  categories: [string]
  quality: string
  main_stats: string
  secondary_stats: string
}

export type Guide = {
  id: number
  title: string
  img_preview: string
  content: string
  write_date: string
  update_date: string
  author: { username: string }
  visible: boolean
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}
