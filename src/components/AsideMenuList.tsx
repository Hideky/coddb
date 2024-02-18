import React from 'react'
import { MenuAsideItem } from '../interfaces'
import AsideMenuItem from './AsideMenuItem'
import { useAppSelector } from '../stores/hooks'
import _ from 'lodash'

type Props = {
  menu: MenuAsideItem[]
  isDropdownList?: boolean
  className?: string
}

export default function AsideMenuList({ menu, isDropdownList = false, className = '' }: Props) {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <>
      {user && user.is_staff ? (
        <ul className={className}>
          {menu.map((item, index) => (
            <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} />
          ))}
        </ul>
      ) : (
        <ul className={className}>
          {_.reject(_.reject(menu, { staffOnly: true }), { wip: true }).map((item, index) => (
            <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} />
          ))}
        </ul>
      )}
    </>
  )
}
