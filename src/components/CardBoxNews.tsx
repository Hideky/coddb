import { mdiCashMinus, mdiCashPlus, mdiCreditCard, mdiReceipt } from '@mdi/js'
import CardBox from './CardBox'
import PillTag from './PillTag'
import { News } from '../interfaces'

type Props = {
  article: News
}

const CardBoxNews = (props: Props) => {
  const icon = {
    withdraw: mdiCashMinus,
    deposit: mdiCashPlus,
    invoice: mdiReceipt,
    payment: mdiCreditCard,
  }[props.article.category]

  const typeColor = () => {
    switch (props.article.category) {
      case 'Game update':
        return 'danger'
      case 'deposit':
        return 'success'
      case 'invoice':
        return 'warning'
      case 'payment':
        return 'info'
    }
  }

  return (
    <CardBox className="mb-6 last:mb-0">
  
    <div className=" w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-48 lg:w-96 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden" style={{ backgroundImage: `url(${props.article.img})`}}>
          <div className="absolute ml-1 mt-1">
            <PillTag color={typeColor()} label={props.article.category} small />
          </div>

      </div>
      <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          <div className="grow-0 text-stone-300 font-bold text-xl mb-2">{props.article.title}</div>
          <p className="grow text-stone-400 text-base">{props.article.description}</p>
        </div>
        <div className="grow-0 h-4 items-center">
          <div className="text-sm">
            <p className="text-stone-500">{props.article.publish_date} by <span className="text-stone-400 leading-none">{props.article.author}</span></p>
          </div>
        </div>
      </div>
    </div>



      {/* <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
          <Image
            src={props.article.img}
            width={200}
            height={960}
            alt={""}
            className="block"
          />
          <div>
            <PillTag color={typeColor()} label={props.article.category} small />
          </div>
          <div className="text-center space-y-1 md:text-left md:mr-6">
            <h4 className="text-xl">{props.article.title}</h4>
            <p className="text-stone-400">
              <b>{props.article.publish_date}</b> via
            </p>
          </div>
        </div>
        <div className="text-center md:text-right space-y-2">
          <p className="text-sm text-gray-500">{props.article.title}</p>

        </div>
      </div> */}
    </CardBox>
  )
}

export default CardBoxNews
