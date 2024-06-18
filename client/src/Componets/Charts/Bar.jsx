import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';


// Register Chart.js modules
Chart.register(...registerables);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Admin Analysis',
      data: [100, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: [
        '#3120D6',
        '#F9B115',
        '#2EB85C',
        '#9C27B0',
        '#E55353',
        '#009688',
        '#795548',
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};

const BarChart = () => {

  const [windowSize, setWindowSize] = useState()

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowSize(windowWidth);
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
  <Card style={{ width: windowSize < 730 ? "100%" : '72%' }} className='chart-card'>
  <Card.Body style={{ width: '100%', height:'30%' }}>
    <Card.Title>Admin Analysis</Card.Title>
    <Bar data={data} options={options} style={{height:'100vh', width:'100%'}}/>
  </Card.Body>
</Card>
  );
};

export default BarChart;
