import { mdiBookOpenVariant } from '@mdi/js'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { Guide } from '../interfaces'
import { getPageTitle } from '../config'
import { useLazyGetGuidesQuery } from '../services/db.service'
import _ from 'lodash'
import { DateTime } from 'luxon'
import Link from 'next/link'

const Guides = () => {
  const [refresh, { data, isLoading, error }] = useLazyGetGuidesQuery()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    refresh()
  }, [])

  const filterGuides = (guides) => {
    // Filter by name
    guides = _.filter(guides, (a) => a.title.toLowerCase().includes(searchValue.toLowerCase()))

    return _.sortBy(guides, ['update_date'])
  }

  const filteredGuides = filterGuides(data)

  return (
    <>
      <Head>
        <title>{getPageTitle('Behemots')}</title>
      </Head>
      {!isLoading && data && data.length ? (
        <SectionMain>
          <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Guides" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredGuides.map((guide: Guide) => (
              <div key={guide.id} className="overflow-hidden rounded-lg bg-stone-800 shadow">
                <Link href={`guides/${guide.id}`}>
                  <img
                    src={guide.img_preview}
                    className="aspect-video w-full object-cover"
                    alt=""
                  />
                </Link>
                <div className="pl-4 pr-4 pt-3">
                  <h3 className="text-xl font-medium text-stone-200">{guide.title}</h3>
                  {/* <p className="mt-1 text-gray-500">Sailboat UI helps streamline software projects, sprints, tasks, and bug tracking.</p> */}
                  <div className="pt-2 pb-2 flex justify-between">
                    <p className="text-sm text-stone-400">Author: {guide.author.username}</p>
                    <p className="text-sm text-stone-400">
                      Last update:{' '}
                      {DateTime.fromISO(guide.update_date).toLocaleString(DateTime.DATE_SHORT)}
                    </p>
                  </div>
                  {/* <div className="mt-4 flex gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                >
                  Design
                </span>gu
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                >
                  Product
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
                >
                  Develop
                </span>
              </div> */}
                </div>
              </div>
            ))}
          </div>
        </SectionMain>
      ) : (
        <div className="grid h-[50vh] place-items-center">
          <div className="text-center text-">
            <p className="text-4xl mb-4">No Guide available</p>
            <p>{"I'm focusing on core feature and stability for now."}</p>
            <p>{'If you think you can write good guides, let me know :)'}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Guides
