import React, { ReactNode } from 'react'

type Props = {
  path: string
  color?: string
  w?: string
  h?: string
  size?: string | number | null
  customBoxSize?: number | null
  className?: string
  children?: ReactNode
}

export default function BaseIcon({
  path,
  color = null,
  w = 'w-6',
  h = 'h-6',
  size = null,
  customBoxSize = null, 
  className = '',
  children,
}: Props) {
  const iconSize = size ?? 16

  return (
    <span className={`inline-flex justify-center items-center ${w} ${h} ${className}`}>
      <svg viewBox={customBoxSize ? `0 0 ${customBoxSize} ${customBoxSize}` : "0 0 24 24"} width={iconSize} height={iconSize} className="inline-block">
        <path fill={color ? color : "currentColor"} d={path} />
      </svg>
      {children}
    </span>
  )
}
