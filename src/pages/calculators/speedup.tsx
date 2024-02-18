import { mdiCalculator } from '@mdi/js'

import Head from 'next/head'
import { useState } from 'react'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import SpeedupCalculator from '../../components/SpeedupCalculator'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement)

const CalculatorPage = () => {
  // Building
  const [buildingDuration, setBuildingDuration] = useState(0)
  const [trainingDuration, setTrainingDuration] = useState(0)
  const [researchDuration, setResearchDuration] = useState(0)
  const [universalDuration, setUniversalDuration] = useState(0)
  const colors = {
    building: 'rgb(55, 180, 92)',
    training: 'rgb(215, 79, 122)',
    research: 'rgb(43, 142, 205)',
    universal: 'rgba(210,154,40)'
  }

  const options: ChartOptions<"bar"> = {
    indexAxis: 'y',
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
    labels: ['Speedup'],
    datasets: [
      {
        label: 'Building',
        data: [buildingDuration],
        backgroundColor: colors.building,
        borderRadius: {
          topLeft: 12,
          topRight: trainingDuration + researchDuration + universalDuration ? 0 : 12,
          bottomLeft: 12,
          bottomRight: trainingDuration + researchDuration + universalDuration ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Training',
        data: [trainingDuration],
        backgroundColor: colors.training,
        borderRadius: {
          topLeft: buildingDuration ? 0 : 12,
          topRight: researchDuration + universalDuration ? 0 : 12,
          bottomLeft: buildingDuration ? 0 : 12,
          bottomRight: researchDuration + universalDuration ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Research',
        data: [researchDuration],
        backgroundColor: colors.research,
        borderRadius: {
          topLeft: buildingDuration + trainingDuration ? 0 : 12,
          topRight: universalDuration ? 0 : 12,
          bottomLeft: buildingDuration + trainingDuration ? 0 : 12,
          bottomRight: universalDuration ? 0 : 12,
        },
        borderSkipped: false,
      },
      {
        label: 'Universal',
        data: [universalDuration],
        backgroundColor: colors.universal,
        borderRadius: {
          topLeft: buildingDuration + trainingDuration + researchDuration ? 0 : 12,
          topRight: 12,
          bottomLeft: buildingDuration + trainingDuration + researchDuration ? 0 : 12,
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
        <SectionTitleLineWithButton icon={mdiCalculator} title="Speedup Calculator" main />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <SpeedupCalculator
            icon={"/img/icons/building.png"}
            color={colors.building}
            name="Building Speedups"
            setDuration={setBuildingDuration}
            universalDuration={universalDuration}
          />
          <SpeedupCalculator
            icon={"/img/icons/training.png"}
            color={colors.training}
            name="Training Speedups"
            setDuration={setTrainingDuration}
            universalDuration={universalDuration}
          />
          <SpeedupCalculator
            icon={"/img/icons/research.png"}
            color={colors.research}
            name="Research Speedups"
            setDuration={setResearchDuration}
            universalDuration={universalDuration}
          />
          <SpeedupCalculator
            icon={"/img/icons/speedup.png"}
            iconSize={28}
            color={colors.universal}
            name="Universal Speedups"
            setDuration={setUniversalDuration}
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
