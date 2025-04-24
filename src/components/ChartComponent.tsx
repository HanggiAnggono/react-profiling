import React, { useState, useEffect, useRef } from 'react';

interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
  status: string;
  timestamp: string;
}

interface ChartProps {
  data: DataItem[];
  type: 'bar' | 'pie';
}

const ChartComponent: React.FC<ChartProps> = ({ data, type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Bottleneck: Processing data on every render without memoization
  const processData = () => {
    // Group by category
    const categoryData: Record<string, number> = {};

    // Intentionally inefficient processing
    for (let i = 0; i < data.length; i++) {
      const category = data[i].category;
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }

      // Simulate expensive computation
      let sum = 0;
      for (let j = 0; j < 1000; j++) {
        sum += data[i].value;
      }
      categoryData[category] += data[i].value;
    }

    return categoryData;
  };

  // Bottleneck: This effect will run on every render due to missing dependencies
  // or could be optimized with memoization
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    const updateDimensions = () => {
      if (canvas.parentElement) {
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
        setDimensions({ width, height });
      }
    };

    updateDimensions();

    const categoryData = processData();
    const categories = Object.keys(categoryData);
    const values = Object.values(categoryData);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate colors
    const colors = categories.map((_, index) => {
      return `hsl(${(index * 360) / categories.length}, 70%, 60%)`;
    });

    if (type === 'bar') {
      // Draw bar chart
      const barWidth = (canvas.width - 60) / categories.length;
      const maxValue = Math.max(...values);

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(40, 20);
      ctx.lineTo(40, canvas.height - 40);
      ctx.lineTo(canvas.width - 20, canvas.height - 40);
      ctx.stroke();

      // Draw bars
      categories.forEach((category, index) => {
        const barHeight = ((values[index] / maxValue) * (canvas.height - 80));
        const x = 40 + index * barWidth;
        const y = canvas.height - 40 - barHeight;

        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth - 10, barHeight);

        // Category label
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.fillText(category.substring(0, 8), x, canvas.height - 25);

        // Value label
        ctx.fillText(values[index].toString(), x, y - 5);
      });
    } else if (type === 'pie') {
      // Draw pie chart
      const total = values.reduce((sum, value) => sum + value, 0);
      let startAngle = 0;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      categories.forEach((category, index) => {
        const sliceAngle = (2 * Math.PI * values[index]) / total;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();

        ctx.fillStyle = colors[index];
        ctx.fill();

        // Draw label
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + (radius / 1.5) * Math.cos(labelAngle);
        const labelY = centerY + (radius / 1.5) * Math.sin(labelAngle);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(category, labelX - 15, labelY);

        startAngle += sliceAngle;
      });

      // Legend
      const legendX = canvas.width - 150;
      const legendY = 40;

      categories.forEach((category, index) => {
        // Color box
        ctx.fillStyle = colors[index];
        ctx.fillRect(legendX, legendY + index * 20, 15, 15);

        // Text
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(
          `${category}: ${values[index]}`,
          legendX + 20,
          legendY + index * 20 + 12
        );
      });
    }

    // Window resize listener - inefficiently added on every render
    window.addEventListener('resize', updateDimensions);

    // Memory leak: Missing cleanup for the resize listener
    // return () => window.removeEventListener('resize', updateDimensions);
  });

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ChartComponent;