import Head from 'next/head'
import { getPageTitle } from '../config'

const News = () => {

  return (
    <>
      <Head>
        <title>{getPageTitle('Welcome')}</title>
      </Head>
        <div className="grid h-[50vh] place-items-center">
          <div className='text-center text-'>
          <p className='text-4xl mb-4'>
            Welcome
          </p>
          <p>
            This site is currently under development and many pages are therefore hidden while waiting for data.
          </p>
          <p>
            Soon™
          </p>

          </div>

        </div>
    </>
  )
}

export default News
