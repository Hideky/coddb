import { mdiNewspaper } from '@mdi/js'
import Head from 'next/head'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { useSampleNews } from '../hooks/sampleData'
import { News } from '../interfaces'
import CardBoxNews from '../components/CardBoxNews'
import { getPageTitle } from '../config'

const Dashboard = () => {
  const { news } = useSampleNews()

  return (
    <>
      <Head>
        <title>{getPageTitle('News')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiNewspaper} title="News" />
        <div className="grid grid-cols-1">
          <div className="flex flex-col justify-between">
            {news.map((article: News) => (
              <CardBoxNews key={article.id} article={article} />
            ))}
          </div>
          {/* <div className="flex flex-col justify-between">
            {clientsListed.map((client: Client) => (
              <CardBoxClient key={client.id} client={client} />
            ))}
          </div> */}
        </div>
      </SectionMain>
    </>
  )
}

export default Dashboard
