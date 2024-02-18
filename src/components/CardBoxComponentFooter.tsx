import React, { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode
}

export default function CardBoxComponentFooter({ className, children }: Props) {
  return <footer className={`pr-6 pl-6 pb-4 ${className}`}>{children}</footer>
}
