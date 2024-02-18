import Head from 'next/head'
import SectionMain from '../../components/SectionMain'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import CardBox from '../../components/CardBox'
import SectionBackButton from '../../components/SectionBackButton'
import _ from 'lodash'
import { useGetArtifactsQuery, useLazyGetGuideQuery } from '../../services/db.service'
import { Artifact } from '../../interfaces'
import { useEffect } from 'react'

const GuideDetails = () => {
  const router = useRouter()

  const [getGuide, { data, isLoading, error }] = useLazyGetGuideQuery()
  const {
    data: artifacts,
    isLoading: isLoadingArtifacts,
    error: errorArtifacts,
  } = useGetArtifactsQuery()
  console.log(data)
  useEffect(() => {
    if (router.isReady) {
      getGuide(router.query.id.toString())
    }
  }, [router.isReady])

  const formatArtifacts = (content: string) => {
    const reg = /%([\s\w]*?)%/g
    let result
    while ((result = reg.exec(content)) !== null) {
      const artifact = _.find(artifacts, (a: Artifact) => a.name == result[1])
      if (artifact) {
        content = content.replace(
          result[0],
          `<a href="/db/artifacts/${artifact.id}" class="text-amber-500 font-semibold">${artifact.name}</a>`
        )
      }
    }
    return content
  }

  return (
    !isLoading &&
    !isLoadingArtifacts &&
    data && (
      <>
        <Head>
          <title>{getPageTitle(data ? data.title : 'Loading...')}</title>
        </Head>
        <SectionMain>
          <SectionBackButton url="./" label="Back" />
          <CardBox>
            <h1 className="text-3xl text-stone-300 text-center font-semibold">{data.title}</h1>
            {/* CONTENT */}
            <article
              className="mt-4 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: formatArtifacts(data.content) }}
            />
          </CardBox>
        </SectionMain>
      </>
    )
  )
}

export default GuideDetails
