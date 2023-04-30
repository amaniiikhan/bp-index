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
  }, [canvasRef,config]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '40px', height: '100px' }} />
    </div>
  );
};

export default ChartComponent;
