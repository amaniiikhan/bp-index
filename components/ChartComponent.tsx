import React, { useRef, useEffect } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';

interface ChartComponentProps {
  config: ChartConfiguration;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const chartInstance = new Chart(canvasRef.current, config);
      return () => {
        chartInstance.destroy();
      };
    }
  }, [config]);

  return <canvas ref={canvasRef}></canvas>;
};

export default ChartComponent;
