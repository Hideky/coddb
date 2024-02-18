import React from 'react'

type Props = {
  navBar?: boolean
}

export default function BaseDivider({ navBar = false }: Props) {
  const classAddon = navBar
    ? 'hidden lg:block lg:my-0.5 border-stone-700'
    : 'my-6 -mx-6 border-stone-800'

  return <hr className={`${classAddon} border-t border-gray-100`} />
}
