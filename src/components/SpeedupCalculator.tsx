import { useEffect, useState } from 'react'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import CalculatorInput from './CalculatorInput'
import { Duration } from "luxon"

type Props = {
  icon: string
  iconSize?: number
  name: string
  setDuration: (value:number) => void
  color?: string
  universalDuration?: number
}

const SpeedupCalculator = ({ icon, name, setDuration, color, iconSize, universalDuration}: Props) => {
  const [oneMin, setOneMin] = useState<number>(0);
  const [fiveMin, setFiveMin] = useState<number>(0);
  const [tenMin, setTenMin] = useState<number>(0);
  const [fifteenMin, setFifteenMin] = useState<number>(0);
  const [thirtyMin, setThirtyMin] = useState<number>(0);
  const [oneHour, setOneHour] = useState<number>(0);
  const [threeHours, setThreeHours] = useState<number>(0);
  const [eightHours, setEightHours] = useState<number>(0);
  const [fifteenHours, setFifteenHours] = useState<number>(0);
  const [oneDay, setOneDay] = useState<number>(0);
  const [threeDays, setThreeDays] = useState<number>(0);
  const [sevenDays, setSevenDays] = useState<number>(0);
  const [oneMonth, setOneMonth] = useState<number>(0);
  const [ownDuration, setOwnDuration] = useState<Duration>(Duration.fromObject({minutes:0}));


  useEffect(() => {
    const duration = Duration.fromObject({minutes: oneMin + fiveMin*5 + tenMin*10 + fifteenMin*15 + thirtyMin*30,
                                      hours: oneHour + threeHours*3 + eightHours*8 + fifteenHours*15,
                                      days: oneDay + threeDays*3 + sevenDays*7,
                                      months: oneMonth}).shiftTo('days', 'hours', 'minutes')
    setOwnDuration(duration)
    setDuration(duration.shiftTo('minutes').minutes)
  }, [oneMin, fiveMin, tenMin, fifteenMin, thirtyMin, oneHour, threeHours, eightHours, fifteenHours, oneDay, threeDays, sevenDays, oneMonth, universalDuration])

  const computeTotalTime = () => {
    return `${ownDuration.days}d ${ownDuration.hours}h ${ownDuration.minutes}m`
  }

  const getTotalWithUniversal = () => {
    const duration = ownDuration.plus(Duration.fromObject({minutes:universalDuration}).shiftTo('days', 'hours', 'minutes'))
    return `${duration.days}d ${duration.hours}h ${duration.minutes}m`
  }

  return (
    <CardBox hasComponentLayout>
          <CardBoxComponentBody>
            <div className="flex place-content-center">
                                                            <img
                                                src={icon}
                                                className="w-6 h-6 scale-[1.15] mt-1 mr-2 object-cover"
                                                alt="stats_icon"
                                            />
              <h2 className="block mb-4 text-lg text-center font-medium text-white">{name}</h2>
            </div>
            <CalculatorInput label="1m" value={oneMin} setValue={setOneMin}/>
            <CalculatorInput label="5m" value={fiveMin} setValue={setFiveMin}/>
            <CalculatorInput label="10m" value={tenMin} setValue={setTenMin}/>
            <CalculatorInput label="15m" value={fifteenMin} setValue={setFifteenMin}/>
            <CalculatorInput label="30m" value={thirtyMin} setValue={setThirtyMin}/>
            <CalculatorInput label="1h" value={oneHour} setValue={setOneHour}/>
            <CalculatorInput label="3h" value={threeHours} setValue={setThreeHours}/>
            <CalculatorInput label="8h" value={eightHours} setValue={setEightHours}/>
            <CalculatorInput label="15h" value={fifteenHours} setValue={setFifteenHours}/>
            <CalculatorInput label="24h" value={oneDay} setValue={setOneDay}/>
            {/* <CalculatorInput label="3d" value={threeDays} setValue={setThreeDays}/>
            <CalculatorInput label="7d" value={sevenDays} setValue={setSevenDays}/>
            <CalculatorInput label="30d" value={oneMonth} setValue={setOneMonth}/> */}
          </CardBoxComponentBody>

          <CardBoxComponentFooter>
              <p className={universalDuration == undefined ? 'mb-6' : ''}><b>Total:</b> {computeTotalTime()}</p>
              { universalDuration >= 0 && (
                <p><b className='text-amber-200'>+Universal:</b> {getTotalWithUniversal()}</p>
              )}
          </CardBoxComponentFooter>
    </CardBox>
  )
}

export default SpeedupCalculator
