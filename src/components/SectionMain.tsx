import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'

type Props = {
  children: ReactNode
}

export default function SectionMain({ children }: Props) {
  return <section className={`pt-6 pl-6 pr-6 pb-2 ${containerMaxW}`}>{children}</section>
}
