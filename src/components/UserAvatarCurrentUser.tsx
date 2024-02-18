import React, { ReactNode } from 'react'
import { useAppSelector } from '../stores/hooks'
import UserAvatar from './UserAvatar'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const userName = useAppSelector((state) => state.auth.user.username)
  // const userAvatar = useAppSelector((state) => state.auth.user.userAvatar)

  return (
    <UserAvatar username={userName} className={className}>
      {children}
    </UserAvatar>
  )
}
