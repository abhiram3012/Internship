import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();

  // State for the chart data
  const [chartData, setChartData] = useState({
    labels: ['Solved', 'Rejected', 'In Progress'],
    datasets: [
      {
        label: 'Complaints Status',
        data: [0, 0, 0], // Initial data
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
        hoverOffset: 4,
      },
    ],
  });

  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complain/status'); // Replace with your actual API endpoint
        const { solved, rejected, inProgress } = response.data;
        console.log(solved);
        console.log(rejected);
        console.log(inProgress);

        // Update the chart data
        setChartData({
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [solved, rejected, inProgress],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Options for the Pie chart
  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = chartData.labels[index];

        // Navigate to different pages based on the label
        if (label === 'Solved') {
          navigate('/admin/dashboard/solved');
        } else if (label === 'Rejected') {
          navigate('/admin/dashboard/rejected');
        } else if (label === 'In Progress') {
          navigate('/admin/dashboard/in-progress');
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Complaints Status</h2>
        <div className="flex justify-center">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
