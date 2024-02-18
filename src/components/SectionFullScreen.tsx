import { ReactNode } from 'react'
import { gradientBgDark } from '../colors'

type Props = {
  children: ReactNode
}

export default function SectionFullScreen({ children }: Props) {

  const componentClass = 'flex min-h-screen items-center justify-center ' + gradientBgDark

  return <div className={componentClass}>{children}</div>
}
