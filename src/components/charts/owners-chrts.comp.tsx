import React from 'react';
import { Line} from 'react-chartjs-2';
import "chart.js/auto";

const ChartComponent: React.FC = () => {
  
  const data = {
    labels :["February","March","April","May","June","July","August","September","October","November","December"],
    datasets: [
      {
        label: 'Owners',
        data: [65, 59, 80, 81, 56, 55, 40,80,90, 30,200, 300],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
        y: {
          beginAtZero: true,
        },
      },
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded p-5">
      <Line data={data} options={options}/>
    </div>
  );
};

export default ChartComponent;
