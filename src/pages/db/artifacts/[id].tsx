import { mdiArrowUpBold } from '@mdi/js'
import Head from 'next/head'
import SectionMain from '../../../components/SectionMain'
import { getPageTitle } from '../../../config'
import { useRouter } from 'next/router'
import CardBox from '../../../components/CardBox'
import { colorsTextQuality } from '../../../colors'
import ArtifactCategoryTag from '../../../components/ArtifactCategoryTag'
import SectionBackButton from '../../../components/SectionBackButton'
import BaseIcon from '../../../components/BaseIcon'
import _ from 'lodash'
import { useGetArtifactsQuery } from '../../../services/db.service'
import { getStatsIcon } from '../../../utils/stats'

const ArtifactDetails = () => {
    const router = useRouter()
    // const { artifacts } = useAppSelector((state) => state.artifacts)
    const { data, isLoading, error } = useGetArtifactsQuery()
    const artifact = _.find(data, ((a) => a.id == router.query.id))
    const formatDescription = (description: string) => {
        return description.replace(/(\d+%?)/g, '<span class="text-amber-500 font-semibold">$1</span>')
    }

    return (
        <>
            <Head>
                <title>{getPageTitle(artifact ? artifact.name : "Loading...")}</title>
            </Head>
            <SectionMain>
                <SectionBackButton url="./" label="Back" />
                {artifact && (
                    <div className="flex flex-col">

                        <div className="flex flex-row-reverse">
                            <CardBox className='basis-1/3 self-start'>
                                <div className='grid grid-cols-1'>
                                    {/* Name */}
                                    <div className="justify-self-center">
                                        <p className={`${colorsTextQuality[artifact.quality]} text-2xl font-semibold mb-4`}>{artifact.name}</p>
                                    </div>
                                    {/* Image */}
                                    <div className="w-44 h-44 justify-self-center">
                                        <img
                                            src={'/img/artifacts/' + artifact.img_full}
                                            className="block h-auto w-full rounded-lg  max-w-full"
                                            alt="artifact"
                                        />
                                    </div>
                                    {/* Categories */}
                                    <div className="justify-self-center mt-2">
                                        {artifact.categories.map((category, i) => {
                                            return <ArtifactCategoryTag key={i} label={category} small />
                                        })}
                                    </div>
                                    <div className="flex justify-between font-semibold text-stone-300 mt-4">
                                        <div>
                                        <img
                                            src={getStatsIcon(artifact.main_stats)}
                                            className="w-6 h-6 scale-[1.7] float-left object-cover"
                                            alt="stats_icon"
                                        />
                                        {artifact.main_stats}
                                        </div>
                                        <div>
                                            <p>{artifact.main_stats_min}% - {artifact.main_stats_max}%</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-semibold  text-stone-300">
                                        <div>
                                            <img
                                                src={getStatsIcon(artifact.secondary_stats)}
                                                className="w-6 h-6 scale-[1.7] float-left object-cover"
                                                alt="stats_icon"
                                            />
                                            {artifact.secondary_stats}
                                        </div>
                                        <div>
                                            <p>{artifact.secondary_stats_min}% - {artifact.secondary_stats_max}%</p>
                                        </div>
                                    </div>
                                </div>
                            </CardBox>
                            <CardBox className='basis-2/3 mr-10 pb-2'>
                                {/* Ability */}
                                <div className="justify-self-center mt-2">
                                    <p className="text-2xl font-medium text-stone-200">{artifact.ability_name}</p>
                                </div>
                                {/* Cooldown */}
                                <div className='mt-3'>
                                    <p className="font-semibold text-stone-300"><span className='text-slate-500'>Cooldown: </span>{artifact.cooldown}</p>
                                </div>
                                {/* Rage Cost */}
                                <div className='mt-1'>
                                    <p className="font-semibold text-stone-300"><span className='text-slate-500'>Rage Cost: </span>{artifact.rage_cost}</p>
                                </div>
                                {/* Description */}
                                <div className='mt-2'>
                                    <p className="font-normal text-stone-300 leading-5 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: formatDescription(artifact.ability_description) }}></p>
                                </div>
                                {/* Upgrade */}
                                <div className='mt-4'>
                                    <p className="text-xl font-normal text-slate-500 text-center mb-1">Upgrade<BaseIcon path={mdiArrowUpBold} size={22} customBoxSize={20} /></p>
                                    <p className="font-normal text-stone-300 leading-5 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: formatDescription(artifact.ability_upgrade) }}></p>
                                </div>
                            </CardBox>

                        </div>
                        {/* <div className='grow mt-5'>
                            <Tab.Group>
                                <Tab.List>
                                    <Tab className="w-1/3 rounded-l-lg py-2 text-sm font-medium ring-white ring-opacity-60 focus:outline-none focus:ring-0 shadow ui-selected:bg-stone-500 ui-selected:text-stone-200 ui-not-selected:bg-stone-600 ui-not-selected:text-stone-200"><BaseIcon path={mdiCommentTextMultiple} h="h-2 align-bottom mb-1.5" size={14} customBoxSize={23} />Comments (0)</Tab>
                                    <Tab className="w-1/3 py-2 border-l-2 border-r-2 border-stone-800 text-sm font-medium ring-white ring-opacity-60 focus:outline-none focus:ring-0 shadow ui-selected:bg-stone-500 ui-selected:text-stone-200 ui-not-selected:bg-stone-600 ui-not-selected:text-stone-200"><BaseIcon path={mdiImageArea} h="h-2 align-bottom mb-1.5" size={14} customBoxSize={23} />Screenshots (0)</Tab>
                                    <Tab className="w-1/3 rounded-r-lg py-2 text-sm font-medium ring-white ring-opacity-60 focus:outline-none focus:ring-0 shadow ui-selected:bg-stone-500 ui-selected:text-stone-200 ui-not-selected:bg-stone-600 ui-not-selected:text-stone-200"><BaseIcon path={mdiYoutube} h="h-2 align-bottom mb-1.5" size={16} customBoxSize={22} />Videos (0)</Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel><CardBox>
                                        <div className='mb-4 text-center text-stone-300 divide-y divide-blue-200'>
                                            No comments, be the first!(WIP)
                                        </div>
                                        <hr className='border-1 border-stone-500' />
                                        <div className="w-full mb-1 mt-4 border rounded-lg bg-stone-700 border-stone-600">
                                            <div className="px-4 py-2 rounded-t-lg bg-stone-800">
                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                <textarea id="comment" rows={4} className="w-full px-0 text-sm border-0 bg-stone-800 focus:ring-0 text-stone-200 placeholder-stone-400" placeholder="Write a comment..." required></textarea>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 border-t border-stone-600">
                                                <button className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-stone-200 bg-amber-700 rounded-lg focus:ring-1 focus:ring-amber-700 hover:bg-amber-800">
                                                    Comment
                                                </button>
                                            </div>
                                        </div>
                                        <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                                    </CardBox></Tab.Panel>
                                    <Tab.Panel><CardBox>WIP</CardBox></Tab.Panel>
                                    <Tab.Panel><CardBox>WIP</CardBox></Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div> */}
                    </div>
                )}
            </SectionMain>
        </>
    )
}

export default ArtifactDetails
