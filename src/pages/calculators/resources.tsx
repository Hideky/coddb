import { mdiCalculator } from '@mdi/js'

import Head from 'next/head'
import { useState } from 'react'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'
import ResourcesCalculator from '../../components/ResourcesCalculator'
ChartJS.register(CategoryScale, LinearScale, BarElement)

const CalculatorPage = () => {
  // Resources
  const [goldQty, setGoldQty] = useState(0)
  const [woodQty, setWoodQty] = useState(0)
  const [oreQty, setOreQty] = useState(0)
  const [manaQty, setManaQty] = useState(0)
  const colors = {
    gold: 'rgba(210,154,40)',
    wood: 'rgb(55, 180, 92)',
    ore: 'rgb(215, 79, 122)',
    mana: 'rgb(43, 142, 205)'
  }

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    plugins: {},
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  }

  const data = {
    labels: ['Qty'],
    datasets: [
      {
        label: 'Gold',
        data: [goldQty],
        backgroundColor: colors.gold,
        borderRadius: {
          topLeft: 12,
          topRight: woodQty + oreQty + manaQty ? 0 : 12,
          bottomLeft: 12,
          bottomRight: woodQty + oreQty + manaQty ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Wood',
        data: [woodQty],
        backgroundColor: colors.wood,
        borderRadius: {
          topLeft: goldQty ? 0 : 12,
          topRight: oreQty + manaQty ? 0 : 12,
          bottomLeft: goldQty ? 0 : 12,
          bottomRight: oreQty + manaQty ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Ore',
        data: [oreQty],
        backgroundColor: colors.ore,
        borderRadius: {
          topLeft: goldQty + woodQty ? 0 : 12,
          topRight: manaQty ? 0 : 12,
          bottomLeft: goldQty + woodQty ? 0 : 12,
          bottomRight: manaQty ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Mana',
        data: [manaQty],
        backgroundColor: colors.mana,
        borderRadius: {
          topLeft: goldQty + woodQty + oreQty ? 0 : 12,
          topRight: 12,
          bottomLeft: goldQty + woodQty + oreQty ? 0 : 12,
          bottomRight: 12,
        },
        borderSkipped: false,
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Calculator')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiCalculator} title="Resources Calculator" main />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ResourcesCalculator
            icon={"/img/icons/gold.png"}
            color={colors.gold}
            name="Gold"
            setQuantity={setGoldQty}
            values={[1000, 10000, 50000, 150000, 500000, 1500000, 5000000]}
          />
          <ResourcesCalculator
            icon={"/img/icons/wood.png"}
            color={colors.wood}
            name="Wood"
            setQuantity={setWoodQty}
            values={[1000, 10000, 50000, 150000, 500000, 1500000, 5000000]}
          />
          <ResourcesCalculator
            icon={"/img/icons/ore.png"}
            color={colors.ore}
            name="Ore"
            setQuantity={setOreQty}
            values={[750, 7500, 37500, 112500, 375000, 1125000, 3750000]}
          />
          <ResourcesCalculator
            icon={"/img/icons/mana.png"}
            iconSize={28}
            color={colors.mana}
            name="Mana"
            setQuantity={setManaQty}
            values={[500, 3000, 15000, 50000, 200000, 600000, 2000000]}
          />
        </div>
      </SectionMain>
      <SectionMain>
        <Bar className="h-10" options={options} data={data} />
      </SectionMain>
    </>
  )
}

export default CalculatorPage
