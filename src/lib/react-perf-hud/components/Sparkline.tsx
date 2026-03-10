import React, { useEffect, useRef } from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, color, width = 60, height = 20 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (data.length === 0) return;

    const max = Math.max(...data) || 1;
    const min = 0; // Usually performance metrics start at 0
    const range = max - min;
    const stepX = width / (data.length > 1 ? data.length - 1 : 1);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    data.forEach((val, i) => {
      const x = i * stepX;
      // Invert Y axis for drawing
      const normalizedValue = Math.max(0, val - min);
      const y = height - (normalizedValue / (range || 1)) * height * 0.8; // Use 80% height to avoid clipping
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data, color, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} className="ph-sparkline" />;
};
