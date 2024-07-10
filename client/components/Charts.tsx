import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { getRecordsByExerciseId } from '../apis/Records'
import { Record } from '../../models/exercises'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

interface RecordChartProps {
  exerciseId: number
  fetchRecords: () => void
}

export default function RecordChart({
  exerciseId,
  fetchRecords,
}: RecordChartProps) {
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    const fetchAndSetRecords = async () => {
      try {
        const recordList = await getRecordsByExerciseId(exerciseId)
        setRecords(recordList)
      } catch (error) {
        console.error('Error fetching records:', error)
      }
    }
    fetchAndSetRecords()
  }, [exerciseId, fetchRecords])

  const data = {
    labels: records.map((record) => record.date_of_exercise),
    datasets: [
      {
        label: 'Personal Best',
        data: records.map((record) => record.new_record),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Exercise Records Over Time',
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="record-chart-container">
      <div className="records-container">
        <h2>Exercise Records</h2>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <span className="record-data">
                {record.date_of_exercise} - New Record: {record.new_record}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chart-container">
        <h2>Exercise Record Chart</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
