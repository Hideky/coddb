import React from 'react'
import { mdiClose } from '@mdi/js'
import BaseIcon from './BaseIcon'
import AsideMenuList from './AsideMenuList'
import { MenuAsideItem } from '../interfaces'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const year = new Date().getFullYear()


  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={"lg:rounded-r-2xl flex-1 flex flex-col overflow-hidden bg-stone-900/40 bg-gray-800"}
      >
        <div
          className={`flex flex-row h-14 items-center justify-between`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black text-lg  ">Call of Dragons DB</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <BaseIcon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars-[stone]`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <p className="pl-2 text-stone-300">
          {/* &copy;{year}{` `} */}
           hidekysan <img src={"/svg/discord.svg"} className="block mt-1.5 mr-2 h-3 align-middle float-left" alt="discord"/>
        </p>
      </div>
    </aside>
  )
}
