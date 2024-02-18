import React, { useCallback } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import BaseDivider from './BaseDivider'
import BaseIcon from './BaseIcon'
// import UserAvatarCurrentUser from './UserAvatarCurrentUser'
import NavBarMenuList from './NavBarMenuList'
import { useAppSelector } from '../stores/hooks'
import { MenuNavBarItem } from '../interfaces'
import { logout } from '../stores/authSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppThunkDispatch } from '../stores/store'


type Props = {
  item: MenuNavBarItem
}

export default function NavBarItem({ item }: Props) {
  const router = useRouter()

  const { user }= useAppSelector((state) => state.auth)

  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const componentClass = [
    'block lg:flex items-center relative cursor-pointer',
    isDropdownActive
      ? " text-stone-400"
      : "text-white hover:text-stone-400",
    item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
    item.isDesktopNoLabel ? 'lg:w-16 lg:justify-center' : '',
  ].join(' ')
  const dispatch = useDispatch<AppThunkDispatch>();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleMenuClick = () => {
    if (item.menu) {
      setIsDropdownActive(!isDropdownActive)
    }

    if (item.isLogout) {
      logOut()
      router.push('/')
    }
  }
  const itemLabel = item.isCurrentUser ? user.username : item.label

  const NavBarItemComponentContents = (
    <>
      <div
        className={`flex items-center ${item.menu
          ? 'bg-stone-800/50 lg:bg-transparent p-3 lg:p-0'
          : ''
          }`}
        onClick={handleMenuClick}
      >
        {/* {item.isCurrentUser && <UserAvatarCurrentUser className="w-6 h-6 mr-3 inline-flex" />} */}
        {item.icon && <BaseIcon path={item.icon} className="transition-colors" />}
        <span
          className={`px-2 transition-colors ${item.isDesktopNoLabel && item.icon ? 'lg:hidden' : ''
            }`}
        >
          {itemLabel}
        </span>
        {item.menu && (
          <BaseIcon
            path={isDropdownActive ? mdiChevronUp : mdiChevronDown}
            className="hidden lg:inline-flex transition-colors"
          />
        )}
      </div>
      {item.menu && (
        <div
          className={`${!isDropdownActive ? 'lg:hidden' : ''
            } text-sm border-b lg:border lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:bg-stone-800/90 border-stone-700`}
        >
          <NavBarMenuList menu={item.menu} />
        </div>
      )}
    </>
  )

  if (item.isDivider) {
    return <BaseDivider navBar />
  }

  if (item.href) {
    return (
      <Link href={item.href} target={item.target} className={componentClass}>
        {NavBarItemComponentContents}
      </Link>
    )
  }

  return <div className={componentClass}>{NavBarItemComponentContents}</div>
}
