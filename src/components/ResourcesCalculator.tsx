import { useState } from 'react'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import CalculatorInput from './CalculatorInput'
import { humanize } from '../utils/numbers'

type Props = {
  icon: string
  iconSize?: number
  name: string
  setQuantity: (value: number) => void
  color?: string
  values: number[]
}

const ResourcesCalculator = ({ icon, name, setQuantity, color, iconSize, values }: Props) => {
  const valuesState = {}
  for (const value of values) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    valuesState[value] = useState()
  }
  // const [oneMinBuilding, setOneMinBuilding] = useState();
  // const [fiveMinBuilding, setFiveMinBuilding] = useState();
  // const [tenMinBuilding, setTenMinBuilding] = useState();
  // const [fifteenMinBuilding, setFifteenMinBuilding] = useState();
  // const [thirtyMinBuilding, setThirtyMinBuilding] = useState();
  // const [oneHourBuilding, setOneHourBuilding] = useState();
  // const [threeHoursBuilding, setThreeHoursBuilding] = useState();

  const computeTotalQty = () => {
    let total = 0
    for (const value of values) {
      total += (valuesState[value][0] ? valuesState[value][0] : 0) * value
    }
    setQuantity(total)
    return total.toLocaleString()
  }

  return (
    <CardBox hasComponentLayout>
      <CardBoxComponentBody>
        <div className="flex place-content-center">
          <img
            src={icon}
            className="w-6 h-6 scale-[1.7] mr-2 object-cover"
            alt="stats_icon"
          />
          <h2 className="block mb-4 text-lg text-center font-medium text-white">{name}</h2>
        </div>
        {
          Object.keys(valuesState).map((value) => {
            return <CalculatorInput key={value} label={humanize(value)} value={valuesState[value][0]} setValue={valuesState[value][1]} />
          })
        }
      </CardBoxComponentBody>

      <CardBoxComponentFooter>
        <p><b>Total:</b> {computeTotalQty()}</p>
      </CardBoxComponentFooter>
    </CardBox>
  )
}

export default ResourcesCalculator
