import { mdiCalculator } from '@mdi/js'

import Head from 'next/head'
import { useState } from 'react'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import SpeedupCalculator from '../../components/SpeedupCalculator'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import CardBox from '../../components/CardBox'
import CardBoxComponentBody from '../../components/CardBoxComponentBody'
import CalculatorInput from '../../components/CalculatorInput'
import CardBoxComponentFooter from '../../components/CardBoxComponentFooter'
import { Duration } from 'luxon'
import CalculatorSlider from '../../components/CalculatorSlider'
import { RadioGroup } from '@headlessui/react'
ChartJS.register(CategoryScale, LinearScale, BarElement)

const CalculatorPage = () => {
  // Building
  const [medalNumber, setMedalNumber] = useState<number>(0)
  const [luckyMedalNumber, setLuckyMedalNumber] = useState<number>(0)
  const [titanMedalNumber, setTitanMedal] = useState<number>(0)

  const estimatedProc = 0.20

  const promotionRankCost = {
    1: 400,
    2: 2000, // Not sure
    3: 5000, // Not sure
    4: 10000,
    5: 27500,
    6: 55000,
  }

  const computeProgression = (cost) => {
    return Math.round((medalNumber * 100 + luckyMedalNumber * 300 + titanMedalNumber * 1000) / cost * 10000) / 100
  }

  const computeProgressionWithProc = (cost) => {
    return Math.round((computeProgression(cost) + computeProgression(cost) * estimatedProc) * 100) / 100
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Calculator')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCalculator} title="Heroes Calculator" main />
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
          <CardBox hasComponentLayout>
            <CardBoxComponentBody>
              <div className="flex place-content-center content-center">
                {/* TODO: ADD MEDAL ICON */}
                {/* <img
                  src={'/img/icons/training.png'}
                  className="w-6 h-6 scale-[1.15] mt-1 mr-2 object-cover"
                  alt="stats_icon"
                /> */}
                <h2 className="block mb-4 text-lg text-center font-medium text-white">
                  Promote Rank
                </h2>
              </div>
              <CalculatorInput
                label="Medal"
                value={medalNumber}
                setValue={setMedalNumber}
                highLabelLength={true}
              />
              <CalculatorInput
                label="&nbsp;&nbsp;&nbsp;&nbsp;Lucky &nbsp;&nbsp;&nbsp;&nbsp;Medal"
                value={luckyMedalNumber}
                setValue={setLuckyMedalNumber}
                highLabelLength={true}
              />
              <CalculatorInput
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Titan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Medal"
                value={titanMedalNumber}
                setValue={setTitanMedal}
                highLabelLength={true}
              />
            </CardBoxComponentBody>
            <CardBoxComponentFooter>
              {/* Table */}
              <table>
                <thead>
                  <tr>
                    <th className="text-stone-200 text-center">Rank</th>
                    <th className="text-stone-200 text-center">Points Needed</th>
                    <th className="text-stone-200 text-center">Progression</th>
                    <th className="text-stone-200 text-center">Progression w/ proc</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(promotionRankCost).map(([rank, cost]) => (
                    <tr key={rank}>
                      <td data-label="Rank" className="text-center text-stone-100 font-bold">
                        {rank}
                      </td>
                      {/* <td data-label="Tags" className="text-sm text-stone-200">
                    {guide.tags}
                  </td> */}
                      <td data-label="Points Needed" className="text-stone-200 text-center">
                        {cost.toLocaleString()}
                      </td>
                      <td
                        data-label="Progression"
                        className={
                          `text-center ` +
                          (computeProgression(cost) >= 100 ? 'text-green-300' : 'text-red-300')
                        }
                      >
                        {computeProgression(cost)}%
                      </td>
                      <td
                        data-label="Progression with proc"
                        className={
                          `text-center ` +
                          (computeProgression(cost) >= 100
                            ? 'text-green-300'
                            : computeProgressionWithProc(cost) >= 100
                            ? 'text-amber-200'
                            : 'text-red-300')
                        }
                      >
                        ~ {computeProgressionWithProc(cost)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBoxComponentFooter>
          </CardBox>
        </div>
      </SectionMain>
    </>
  )
}

export default CalculatorPage
