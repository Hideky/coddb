import React from 'react'
import { MenuNavBarItem } from '../interfaces'
import NavBarItem from './NavBarItem'
import { useAppSelector } from '../stores/hooks'
import _ from 'lodash'
import { selectCurrentUser } from '../stores/authSlice'
import { useSelector } from 'react-redux'

type Props = {
  menu: MenuNavBarItem[]
}

export default function NavBarMenuList({ menu }: Props) {
  const user = useSelector(selectCurrentUser)

  return (
    <>
      {_.filter(menu, { isLoggedIn: user != null }).map((item, index) => (
        <NavBarItem key={index} item={item} />
      ))}
    </>
  )
}
