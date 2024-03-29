import React, { ReactNode } from 'react'

type Props = {
  zIndex?: string
  type?: string
  children?: ReactNode
  className?: string
  onClick: (e: React.MouseEvent) => void
}

export default function OverlayLayer({
  zIndex = 'z-50',
  type = 'flex',
  children,
  className,
  ...props
}: Props) {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <div
      className={`${type} ${zIndex} ${className} items-center flex-col justify-center overflow-hidden fixed inset-0`}
    >
      <div
        className={`from-stone-700 via-stone-800 to-stone-900 absolute inset-0 bg-gradient-to-tr opacity-90 from-stone-800 to-stone-900`}
        onClick={handleClick}
      ></div>

      {children}
    </div>
  )
}
