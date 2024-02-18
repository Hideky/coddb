import { mdiChevronRight, mdiCommentText, mdiMagicStaff } from '@mdi/js'
import Head from 'next/head'
import { Fragment, useState } from 'react'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { Artifact } from '../../interfaces'
import { getPageTitle } from '../../config'
import CardBox from '../../components/CardBox'
import ArtifactCategoryTag from '../../components/ArtifactCategoryTag'
import BaseIcon from '../../components/BaseIcon'
import { Menu, Transition } from '@headlessui/react'
import _ from 'lodash'
import ArtifactDropdownMenuItem from '../../components/ArtifactDropdownMenuItem'
import Link from 'next/link'
import { useGetArtifactsQuery } from '../../services/db.service'

const Artifacts = () => {
  // const { artifacts } = useSampleArtifacts()
  // const { artifacts }= useAppSelector((state) => state.artifacts)
  const { data, isLoading, error } = useGetArtifactsQuery()
  const artifacts = data;
  const [searchValue, setSearchValue] = useState("")

  const qualityColor = {
    legendary: '#D79E19',
    epic: '#B534BD',
    rare: '#3A96C8',
    uncommon: '#62BF38',
  }
  const qualityOrder = { legendary: 1, epic: 2, rare: 3, uncommon: 4 }


  // Maybe build this from all artifacts existing category once source full
  const categoryList = [
    'Cavalry',
    'Marksman',
    'Infantry',
    'Magic',
    'All-Rounder',
    'PvP',
    'Peacekeeping',
    'Gathering',
    'Engineering',
    'Rally',
    'Flying',
    'Assault',
    'Support',
    'Mobility',
    'Tank',
  ]

  const categoriesState = {}
  for (const value of categoryList) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    categoriesState[value] = useState(false)
  }

  const filterArtifacts = (artifacts) => {
    // Filter by name
    artifacts = _.filter(artifacts, (a => a.name.toLowerCase().includes(searchValue.toLowerCase())))
    // Filter by category
    const checkedCategory = []
    for (const [category, value] of Object.entries(categoriesState)) {
      if (value[0]) {
        checkedCategory.push(category)
      }
    }
    if (checkedCategory.length) {
      artifacts = _.filter(artifacts, (a => _.difference(checkedCategory, a.categories).length === 0))
    }
    return _.sortBy(artifacts, [a => qualityOrder[a.quality], "name"])
  }

  const filteredArtifact = filterArtifacts(artifacts);

  return (
    <>
      <Head>
        <title>{getPageTitle('Artifacts')}</title>
      </Head>
      <SectionMain>

        <SectionTitleLineWithButton icon={mdiMagicStaff} title="Artifacts" />
        {/* <NotificationBar
          color="warning"
          icon={mdiAlert}
          outline={true}
        >  <b>WIP</b>. I need to collect artifacts data (not my top priority)
        </NotificationBar> */}

        <CardBox hasTable={true}>
          {/* Top Menu */}
          <div className="flex h-10">
            <Menu as="div">
              <Menu.Button className="h-full text-stone-200 bg-stone-600 focus:ring-1 focus:outline-none focus:ring-stone-400 font-medium rounded-tl-lg text-sm px-5 text-center inline-flex items-center">
                Categories
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="p-3 space-y-3 text-sm text-stone-700 z-10  absolute mt-2 w-48 bg-stone-800 divide-y border border-stone-600 rounded-lg" static>
                  <div className="space-y-2">
                    {categoryList.map((category, i) => {
                      return <ArtifactDropdownMenuItem key={i} label={category} value={categoriesState[category][0]} setValue={categoriesState[category][1]} />
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="relative w-full">
              <input
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
                id="search-dropdown"
                className="block p-2.5 w-full h-full z-20 rounded-tr-lg border-l-2 border bg-stone-700 border-l-stone-700 border-stone-600 focus:border-stone-600 focus:ring-stone-600 placeholder-stone-400 text-stone-200 focus:outline-none"
                placeholder="Cloak of ..."
              />
            </div>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr>
                <th className="text-stone-200" />
                <th className="text-stone-200">Name</th>
                <th className="text-stone-200">First stats</th>
                <th className="text-stone-200">Second stats</th>
                <th className="text-stone-200">Categories</th>
                <th className="text-stone-200 text-center w-12">
                  <BaseIcon path={mdiCommentText} />
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredArtifact.map((artifact: Artifact) => (
                <tr key={artifact.id}>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    <div className="w-10 h-10">
                      <img
                        src={'/img/artifacts/' + artifact.img}
                        className="block h-auto w-full max-w-full bg-stone-800"
                        alt="artifact"
                      />
                    </div>
                    {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
                  </td>
                  <td data-label="Name" style={{ color: qualityColor[artifact.quality] }}>
                    <Link href={`artifacts/${artifact.id}`} className={"h-6"}>
                      <b className='hover:underline underline-offset-2'>{artifact.name}</b>
                    </Link>
                  </td>
                  <td data-label="Main stats" className="text-sm text-stone-200">
                    {artifact.main_stats}
                  </td>
                  <td data-label="Secondary stats" className="text-sm text-stone-200">
                    {artifact.secondary_stats}
                  </td>
                  <td data-label="Categories" className='text-center'>
                    <div>
                      {artifact.categories.map((category, i) => {
                        return <ArtifactCategoryTag key={i} label={category} small />
                      })}
                    </div>
                  </td>
                  <td data-label="Comments" className="text-sm text-stone-200 text-center">
                    0
                    {/* {Math.ceil(Math.random() * 10)} */}
                  </td>
                  <td
                    data-label="Go to"
                    className="text-sm text-stone-200 text-center hover:bg-stone-700"
                  >
                    <Link href={`artifacts/${artifact.id}`} className={"h-6"}>
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
                Total: {filteredArtifact.length}
              </small>
            </div>
          </div>
        </CardBox>

        {/* <div className="grid grid-cols-1">
          <div className="flex flex-col justify-between">
            {artifacts.map((article: News) => (
              <CardBoxNews key={article.id} article={article} />
            ))}
          </div>
        </div> */}
      </SectionMain>
    </>
  )
}

export default Artifacts
