import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
  );

interface ChartComponentProps {
  config: any;
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

  return <canvas ref={canvasRef} />;
};

export default ChartComponent;
