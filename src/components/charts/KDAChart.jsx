import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PlayerStatsChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(match => `Match ${match.match_id}`),
    datasets: [
      {
        label: 'KDA',
        data: data.map(match => ((match.kills + match.assists) / Math.max(match.deaths, 1)).toFixed(2)),
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
      {
        label: 'Hero Damage',
        data: data.map(match => match.hero_damage),
        borderColor: 'rgba(54, 162, 235, 0.5)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: 'Tower Damage',
        data: data.map(match => match.tower_damage),
        borderColor: 'rgba(255, 206, 86, 0.5)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        fill: false,
      },
      {
        label: 'Last Hits',
        data: data.map(match => match.last_hits),
        borderColor: 'rgba(75, 192, 192, 0.5)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            legendItem.hidden = true;
          } else {
            ci.show(index);
            legendItem.hidden = false;
          }
        },
      },
      title: {
        display: true,
        text: 'Player Match Stats Progress',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PlayerStatsChart;
