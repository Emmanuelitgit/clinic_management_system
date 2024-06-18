import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import "./style.css"


// Register Chart.js modules
Chart.register(...registerables);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Visits',
      data: [65, 59, 80, 81, 56, 55, 40, 80, 25, 60, 25, 50],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
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

const AreaChart = () => {

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
  <Card style={{ width: windowSize < 730 ? "100%" : '72%' }}>
  <Card.Body style={{ width: '100%', height:'30%' }}>
    <Card.Title>Patients Visits</Card.Title>
    <Line data={data} options={options} style={{height:'100vh', width:'100%'}}/>
  </Card.Body>
</Card>
  );
};

export default AreaChart;
