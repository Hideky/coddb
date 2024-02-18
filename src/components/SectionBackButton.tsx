import { mdiArrowLeft } from '@mdi/js'
import Link from 'next/link'
import BaseIcon from './BaseIcon'

type Props = {
  icon?: string
  label: string
  url: string
}

export default function SectionBackButton({ label, url, icon = "" }: Props) {

  return (
    <section className="mb-6 flex items-center justify-between">
      <div className="flex items-start">
        <Link href={url}>
          {icon ? <BaseIcon path={icon} className="mr-1" size="20" /> : <BaseIcon path={mdiArrowLeft} className="mr-1" size="20" />}
        </Link>
        <h1 className="leading-tight text-lg">{label}</h1>
      </div>
      {/* {!hasChildren && <BaseButton icon={mdiCog} color="whiteDark" />} */}
    </section>
  )
}
