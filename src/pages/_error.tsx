import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import { getPageTitle } from '../config'

type Props = {
  message?: string
  title?: string
}


export default function Error({message, title}: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle('Error')}</title>
      </Head>

      <SectionFullScreen>
        <CardBox
          className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl"
          footer={<BaseButton href="/" label="Revenir" color="info" />}
        >
          <div className="space-y-3">
            <h1 className="text-2xl text-stone-100">{title ? title : "Unhandled exception"}</h1>
            <p className='text-stone-100'>{message ? message : "An Error Occured"}</p>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}
