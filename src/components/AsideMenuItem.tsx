import React, { useEffect, useState } from 'react'
import { mdiMinus, mdiPlus } from '@mdi/js'
import BaseIcon from './BaseIcon'
import Link from 'next/link'
import { getButtonColor } from '../colors'
import AsideMenuList from './AsideMenuList'
import { MenuAsideItem } from '../interfaces'
import { useRouter } from 'next/router'

type Props = {
  item: MenuAsideItem
  isDropdownList?: boolean
}

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(true)

  const activeClassAddon = !item.color && isLinkActive ? 'font-bold text-white' : ''
  const { asPath, isReady } = useRouter()

  useEffect(() => {
    if (item.href && isReady) {
      const linkPathName = new URL(item.href, location.href).pathname
      const activePathname = new URL(asPath, location.href).pathname

      setIsLinkActive(linkPathName === activePathname)
    }
  }, [item.href, isReady, asPath])

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <BaseIcon path={item.icon} className={`flex-none ${activeClassAddon}`} w="w-16" size="18" />
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 ${item.menu ? '' : 'pr-12'
          } ${activeClassAddon}`}
      >
        {item.label}
      </span>
      {item.menu && (
        <BaseIcon
          path={isDropdownActive ? mdiMinus : mdiPlus}
          className={`flex-none ${activeClassAddon}`}
          w="w-12"
        />
      )}
    </>
  )

  const componentClass = [
    'flex cursor-pointer',
    isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : "text-gray-300 hover:text-white text-stone-300 hover:text-white",
  ].join(' ')

  return (
    <li>
      {item.href && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && (
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`bg-gray-700/50 ${isDropdownActive ? 'block bg-stone-600/5' : 'hidden'
            }`}
          isDropdownList
        />
      )}
    </li>
  )
}

export default AsideMenuItem
