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
  const [daySpeedup, setDaySpeedup] = useState<number>()
  const [hourSpeedup, setHourSpeedup] = useState<number>()
  const [minuteSpeedup, setMinuteSpeedup] = useState<number>()
  const [trainingSpeed, setTrainingSpeed] = useState<number>()
  const [infantryRatio, setInfantryRatio] = useState<number>(0)
  const [mageRatio, setMageRatio] = useState<number>(0)
  const [archerRatio, setArcherRatio] = useState<number>(0)
  const [cavalryRatio, setCavalryRatio] = useState<number>(0)
  const [flyingRatio, setFlyingRatio] = useState<number>(0)
  const [tierTraining, setTierTraining] = useState<string>('T5')

  const trainingTime = {
    // Time in seconds
    T3: 60,
    T4: 80,
    T5: 120,
  }

  const SLEpoints = {
    // Time in seconds
    T3: 20,
    T4: 40,
    T5: 100,
  }

  const tierTrainingFormula = {
    // Time in seconds
    T4T5: trainingTime.T5 - trainingTime.T4,
    T3T4: trainingTime.T4 - trainingTime.T3,
    T5: trainingTime.T5,
    T4: trainingTime.T4,
    T3: trainingTime.T3,
  }

  const tierResourcesCost = {
    T5: {
      infantry: {
        gold: 800,
        wood: 800,
        ore: 0,
        mana: 400,
      },
      mage: {
        gold: 0,
        wood: 800,
        ore: 600,
        mana: 400,
      },
      archer: {
        gold: 800,
        wood: 0,
        ore: 600,
        mana: 400,
      },
      cavalry: {
        gold: 480,
        wood: 480,
        ore: 480,
        mana: 400,
      },
      flying: {
        gold: 480,
        wood: 480,
        ore: 480,
        mana: 400,
      },
    },
    T4T5: {
      infantry: {
        gold: 500,
        wood: 500,
        ore: 0,
        mana: 300,
      },
      mage: {
        gold: 0,
        wood: 500,
        ore: 375,
        mana: 300,
      },
      archer: {
        gold: 500,
        wood: 0,
        ore: 375,
        mana: 300,
      },
      cavalry: {
        gold: 300,
        wood: 300,
        ore: 300,
        mana: 300,
      },
      flying: {
        gold: 300,
        wood: 300,
        ore: 300,
        mana: 300,
      },
    },
    T4: {
      infantry: {
        gold: 300,
        wood: 300,
        ore: 0,
        mana: 100,
      },
      mage: {
        gold: 0,
        wood: 300,
        ore: 225,
        mana: 100,
      },
      archer: {
        gold: 300,
        wood: 0,
        ore: 225,
        mana: 100,
      },
      cavalry: {
        gold: 180,
        wood: 180,
        ore: 180,
        mana: 100,
      },
      flying: {
        gold: 180,
        wood: 180,
        ore: 180,
        mana: 100,
      },
    },
    T3: {
      infantry: {
        gold: 150,
        wood: 150,
        ore: 0,
        mana: 30,
      },
      mage: {
        gold: 0,
        wood: 150,
        ore: 112,
        mana: 30,
      },
      archer: {
        gold: 150,
        wood: 0,
        ore: 112,
        mana: 30,
      },
      cavalry: {
        gold: 90,
        wood: 90,
        ore: 90,
        mana: 30,
      },
      flying: {
        gold: 90,
        wood: 90,
        ore: 90,
        mana: 30,
      },
    },
    T3T4: {
      infantry: {
        gold: 150,
        wood: 150,
        ore: 0,
        mana: 70,
      },
      mage: {
        gold: 0,
        wood: 150,
        ore: 113,
        mana: 70,
      },
      archer: {
        gold: 150,
        wood: 0,
        ore: 112,
        mana: 70,
      },
      cavalry: {
        gold: 90,
        wood: 90,
        ore: 90,
        mana: 70,
      },
      flying: {
        gold: 90,
        wood: 90,
        ore: 90,
        mana: 70,
      },
    },
  }

  const computeTotalTime = () => {
    const duration = Duration.fromObject({
      minutes: minuteSpeedup,
      hours: hourSpeedup,
      days: daySpeedup,
    }).shiftTo('days', 'hours', 'minutes')
    return duration.shiftTo('seconds').seconds
  }

  const computePoints = (training: number, points: number) => {
    if (!computeTotalTime()) {
      return '0 Point (0 Unit)'
    }
    const units = Math.floor((computeTotalTime() * ((trainingSpeed || 0) / 100 + 1)) / training)
    const totalPoints = units * points
    return `${totalPoints.toLocaleString('en')} Points (${units.toLocaleString('en')} Units)`
  }

  const computeUnits = () => {
    if (!computeTotalTime()) {
      return 0
    }

    return Math.floor(
      (computeTotalTime() * ((trainingSpeed || 0) / 100 + 1)) / tierTrainingFormula[tierTraining]
    )
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Calculator')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCalculator} title="Training Calculator" main />
        <CardBox hasComponentLayout>
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
            <div>
              <CardBoxComponentBody>
                <div className="flex place-content-center content-center">
                  <img
                    src={'/img/icons/training.png'}
                    className="w-6 h-6 scale-[1.15] mt-1 mr-2 object-cover"
                    alt="stats_icon"
                  />
                  <h2 className="block mb-4 text-lg text-center font-medium text-white">
                    SLE Training Points
                  </h2>
                </div>
                <CalculatorInput
                  label="Days"
                  value={daySpeedup}
                  setValue={setDaySpeedup}
                  highLabelLength={true}
                />
                <CalculatorInput
                  label="Hours"
                  value={hourSpeedup}
                  setValue={setHourSpeedup}
                  highLabelLength={true}
                />
                <CalculatorInput
                  label="Minutes"
                  value={minuteSpeedup}
                  setValue={setMinuteSpeedup}
                  highLabelLength={true}
                />
                <CalculatorInput
                  label="Training &nbsp;&nbsp;&nbsp;Speed"
                  customUnit={'%'}
                  value={trainingSpeed}
                  setValue={setTrainingSpeed}
                  highLabelLength={true}
                />
              </CardBoxComponentBody>

              <h2 className="block mb-4 text-md text-center font-medium text-white">Results</h2>
              <CardBoxComponentFooter>
                <p>
                  <b>
                    <span className="text-purple-500">T4</span> →{' '}
                    <span className="text-amber-500">T5</span>&nbsp;
                  </b>{' '}
                  {computePoints(trainingTime.T5 - trainingTime.T4, SLEpoints.T5 - SLEpoints.T4)}
                </p>
                <p>
                  <b>
                    <span className="text-blue-500">T3</span> →{' '}
                    <span className="text-purple-500">T4</span>&nbsp;
                  </b>{' '}
                  {computePoints(trainingTime.T4 - trainingTime.T3, SLEpoints.T4 - SLEpoints.T3)}
                </p>
                <p>
                  <b>
                    <span className="pl-[43px] text-amber-500">T5</span>&nbsp;
                  </b>{' '}
                  {computePoints(trainingTime.T5, SLEpoints.T5)}
                </p>
                <p>
                  <b>
                    <span className="pl-[43px] text-purple-500">T4</span>&nbsp;
                  </b>{' '}
                  {computePoints(trainingTime.T4, SLEpoints.T4)}
                </p>
                <p>
                  <b>
                    <span className="pl-[43px] text-blue-500">T3</span>&nbsp;
                  </b>{' '}
                  {computePoints(trainingTime.T3, SLEpoints.T3)}
                </p>
              </CardBoxComponentFooter>
            </div>
            {/* Resources needed */}
            <div>
              <CardBoxComponentBody>
                <div className="flex place-content-center content-center">
                  <h2 className="block mb-4 text-lg text-center font-medium text-white">
                    Resources Needed
                  </h2>
                </div>
                <RadioGroup value={tierTraining} onChange={setTierTraining}>
                  <div className="grid grid-cols-5 gap-3 text-center mb-7">
                    <RadioGroup.Option value="T4T5">
                      {({ checked }) => (
                        <span>
                          <b>
                            <span className="text-purple-500">T4</span> →{' '}
                            <span className="text-amber-500">T5</span>
                          </b>
                          <div>
                            <input
                              type="radio"
                              checked={checked}
                              className="appearance-none checked:bg-stone-500"
                            />
                          </div>
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="T3T4">
                      {({ checked }) => (
                        <span>
                          <b>
                            <span className="text-blue-500">T3</span> →{' '}
                            <span className="text-purple-500">T4</span>
                          </b>
                          <div>
                            <input
                              type="radio"
                              checked={checked}
                              className="appearance-none checked:bg-stone-500"
                            />
                          </div>
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="T5">
                      {({ checked }) => (
                        <span>
                          <b>
                            <span className="text-amber-500">T5</span>
                          </b>
                          <div>
                            <input
                              type="radio"
                              checked={checked}
                              className="appearance-none checked:bg-stone-500"
                            />
                          </div>
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="T4">
                      {({ checked }) => (
                        <span>
                          <b>
                            <span className="text-purple-500">T4</span>
                          </b>
                          <div>
                            <input
                              type="radio"
                              checked={checked}
                              className="appearance-none checked:bg-stone-500"
                            />
                          </div>
                        </span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="T3">
                      {({ checked }) => (
                        <span>
                          <b>
                            <span className="text-blue-500">T3</span>
                          </b>
                          <div>
                            <input
                              type="radio"
                              checked={checked}
                              className="appearance-none checked:bg-stone-500"
                            />
                          </div>
                        </span>
                      )}
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>

                <CalculatorSlider
                  label="Infantry"
                  value={infantryRatio}
                  setValue={setInfantryRatio}
                  totalValue={computeUnits()}
                  sharedRatio={mageRatio + archerRatio + cavalryRatio + flyingRatio}
                  highLabelLength={true}
                />
                <CalculatorSlider
                  label="Mage"
                  value={mageRatio}
                  setValue={setMageRatio}
                  totalValue={computeUnits()}
                  sharedRatio={infantryRatio + archerRatio + cavalryRatio + flyingRatio}
                  highLabelLength={true}
                />
                <CalculatorSlider
                  label="Archer"
                  value={archerRatio}
                  setValue={setArcherRatio}
                  totalValue={computeUnits()}
                  sharedRatio={infantryRatio + mageRatio + cavalryRatio + flyingRatio}
                  highLabelLength={true}
                />
                <CalculatorSlider
                  label="Cavalry"
                  value={cavalryRatio}
                  setValue={setCavalryRatio}
                  totalValue={computeUnits()}
                  sharedRatio={infantryRatio + mageRatio + archerRatio + flyingRatio}
                  highLabelLength={true}
                />
                <CalculatorSlider
                  label="Flying"
                  value={flyingRatio}
                  setValue={setFlyingRatio}
                  totalValue={computeUnits()}
                  sharedRatio={infantryRatio + mageRatio + archerRatio + cavalryRatio}
                  highLabelLength={true}
                />
              </CardBoxComponentBody>

              <h2 className="block mb-4 text-md text-center font-medium text-white">Results</h2>
              <CardBoxComponentFooter>
                <div className="flex">
                  <img
                    src={'/img/icons/gold.png'}
                    className="ml-[9px] w-6 h-6 scale-[1.30] mr-2 object-cover"
                    alt="stats_icon"
                  />
                  <b>
                    <span className="block text-center mr-2 text-white">Gold</span>
                  </b>
                  <span>
                    {(
                      tierResourcesCost[tierTraining].infantry.gold *
                        Math.round((computeUnits() / 100) * infantryRatio) +
                      tierResourcesCost[tierTraining].mage.gold *
                        Math.round((computeUnits() / 100) * mageRatio) +
                      tierResourcesCost[tierTraining].archer.gold *
                        Math.round((computeUnits() / 100) * archerRatio) +
                      tierResourcesCost[tierTraining].cavalry.gold *
                        Math.round((computeUnits() / 100) * cavalryRatio) +
                      tierResourcesCost[tierTraining].flying.gold *
                        Math.round((computeUnits() / 100) * flyingRatio)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex">
                  <img
                    src={'/img/icons/wood.png'}
                    className="w-6 h-6 scale-[1.30] mr-2 object-cover"
                    alt="stats_icon"
                  />
                  <b>
                    <span className="block text-center mr-2 text-white">Wood</span>
                  </b>
                  <span>
                    {(
                      tierResourcesCost[tierTraining].infantry.wood *
                        Math.round((computeUnits() / 100) * infantryRatio) +
                      tierResourcesCost[tierTraining].mage.wood *
                        Math.round((computeUnits() / 100) * mageRatio) +
                      tierResourcesCost[tierTraining].archer.wood *
                        Math.round((computeUnits() / 100) * archerRatio) +
                      tierResourcesCost[tierTraining].cavalry.wood *
                        Math.round((computeUnits() / 100) * cavalryRatio) +
                      tierResourcesCost[tierTraining].flying.wood *
                        Math.round((computeUnits() / 100) * flyingRatio)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex">
                  <img
                    src={'/img/icons/ore.png'}
                    className="ml-[18px] w-6 h-6 scale-[1.30] mr-2 object-cover"
                    alt="stats_icon"
                  />
                  <b>
                    <span className="block text-center mr-2 text-white">Ore</span>
                  </b>
                  <span>
                    {(
                      tierResourcesCost[tierTraining].infantry.ore *
                        Math.round((computeUnits() / 100) * infantryRatio) +
                      tierResourcesCost[tierTraining].mage.ore *
                        Math.round((computeUnits() / 100) * mageRatio) +
                      tierResourcesCost[tierTraining].archer.ore *
                        Math.round((computeUnits() / 100) * archerRatio) +
                      tierResourcesCost[tierTraining].cavalry.ore *
                        Math.round((computeUnits() / 100) * cavalryRatio) +
                      tierResourcesCost[tierTraining].flying.ore *
                        Math.round((computeUnits() / 100) * flyingRatio)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex">
                  <img
                    src={'/img/icons/mana.png'}
                    className="ml-[3px] w-6 h-6 scale-[1.30] mr-2 object-cover"
                    alt="stats_icon"
                  />
                  <b>
                    <span className="block text-center mr-2 text-white">Mana</span>
                  </b>
                  <span>
                    {(
                      tierResourcesCost[tierTraining].infantry.mana *
                        Math.round((computeUnits() / 100) * infantryRatio) +
                      tierResourcesCost[tierTraining].mage.mana *
                        Math.round((computeUnits() / 100) * mageRatio) +
                      tierResourcesCost[tierTraining].archer.mana *
                        Math.round((computeUnits() / 100) * archerRatio) +
                      tierResourcesCost[tierTraining].cavalry.mana *
                        Math.round((computeUnits() / 100) * cavalryRatio) +
                      tierResourcesCost[tierTraining].flying.mana *
                        Math.round((computeUnits() / 100) * flyingRatio)
                    ).toLocaleString()}
                  </span>
                </div>
              </CardBoxComponentFooter>
            </div>
          </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

export default CalculatorPage
