import { mdiBookOpenVariant, mdiCheck, mdiChevronRight, mdiClose, mdiCommentText, mdiPlusThick } from '@mdi/js'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { Guide } from '../../interfaces'
import { getPageTitle } from '../../config'
import CardBox from '../../components/CardBox'
import BaseIcon from '../../components/BaseIcon'
import _ from 'lodash'
import Link from 'next/link'
import { useLazyGetGuidesQuery } from '../../services/db.service'
import { DateTime } from 'luxon'

const Guides = () => {
  const [refresh, { data, isLoading, error }] = useLazyGetGuidesQuery()
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    refresh()
  }, [])

  const filterGuides = (guides) => {
    // Filter by name
    guides = _.filter(guides, (a => a.title.toLowerCase().includes(searchValue.toLowerCase())))

    return _.sortBy(guides, ["update_date"]) // TODO: Set quality priority
  }

  const filteredGuides = filterGuides(data);

  return (
    <>
      <Head>
        <title>{getPageTitle('Guides')}</title>
      </Head>
      <SectionMain>

        <SectionTitleLineWithButton icon={mdiBookOpenVariant} title="Guides" />
        <CardBox hasTable={true}>
          {/* Top Menu */}
          <div className="flex h-10">
            <div className="relative w-full">
              <input
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
                id="search-dropdown"
                className="block p-2.5 w-full h-full z-20 rounded-tl-lg border-l-2 border bg-stone-700 border-l-stone-700 border-stone-600 focus:border-stone-600 focus:ring-stone-600 placeholder-stone-400 text-stone-200 focus:outline-none"
                placeholder="Best buying for ..."
              />
            </div>
            <div className="h-full text-emerald-500 hover:text-emerald-400 m-1.5 mr-3">
              <Link href="guides/new" className={"h-32"}>
                <BaseIcon customBoxSize={20} size={28} path={mdiPlusThick} />
              </Link>
            </div>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr>
                <th className="text-stone-200">Title</th>
                {/* <th className="text-stone-200">Tags</th> */}
                <th className="text-stone-200">Write date</th>
                <th className="text-stone-200">Update date</th>
                <th className="text-stone-200">Author(s)</th>
                <th className="text-stone-200">Visible</th>
                <th className="text-stone-200 text-center w-12">
                  <BaseIcon path={mdiCommentText} />
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredGuides.map((guide: Guide) => (
                <tr key={guide.id}>
                  <td data-label="Name">
                    <Link href={`guides/${guide.id}`} className={"h-32"}>
                      <b className='hover:underline underline-offset-2'>{guide.title}</b>
                    </Link>
                  </td>
                  {/* <td data-label="Tags" className="text-sm text-stone-200">
                    {guide.tags}
                  </td> */}
                  <td data-label="Write date" className="text-stone-200 text-center">
                    {DateTime.fromISO(guide.write_date).toLocaleString(DateTime.DATETIME_MED) }
                  </td>
                  <td data-label="Upgrade date" className='text-stone-200 text-center'>
                    {DateTime.fromISO(guide.update_date).toLocaleString(DateTime.DATETIME_MED) }
                  </td>
                  <td data-label="Author" className="text-sm text-stone-200 text-center">
                    {guide.author && guide.author.username}
                  </td>
                  <td data-label="Visible" className="text-sm text-stone-200 text-center">
                    {guide.visible ? <BaseIcon path={mdiCheck} customBoxSize={22} size={24} /> : <BaseIcon path={mdiClose} customBoxSize={22} size={24} />}
                  </td>
                  <td data-label="Comments" className="text-sm text-stone-200 text-center">
                    {/* {guide.comments} */}
                  </td>
                  <td
                    data-label="Go to"
                    className="text-sm text-stone-200 text-center hover:bg-stone-700"
                  >
                    <Link href={`guides/${guide.id}`} className={"h-32"}>
                      <BaseIcon path={mdiChevronRight} customBoxSize={22} size={24} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 lg:px-6 border-t border-stone-800">
            <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
              {/* <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons> */}
              <small className="mt-6 text-stone-300 md:mt-0">
                {/* Page {currentPage + 1} of {numPages} */}
                Total: {filteredGuides.length}
              </small>
            </div>
          </div>
        </CardBox>

        {/* <div className="grid grid-cols-1">
          <div className="flex flex-col justify-between">
            {Guides.map((article: News) => (
              <CardBoxNews key={article.id} article={article} />
            ))}
          </div>
        </div> */}
      </SectionMain>
    </>
  )
}

export default Guides
