import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();

  // Data for the Pie chart
  const data = {
    labels: ['Solved', 'Rejected', 'In Progress'],
    datasets: [
      {
        label: 'Complaints Status',
        data: [50, 20, 30], // Example data
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'], // Colors for each section
        hoverOffset: 4,
      },
    ],
  };

  // Options for the Pie chart
  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];

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
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
