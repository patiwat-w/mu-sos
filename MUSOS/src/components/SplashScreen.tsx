import React, { useEffect, useState, useRef } from 'react';
import './SplashScreen.css'; // Assuming you will create a CSS file for styling

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 5000); // Adjust the duration to 5 seconds

      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (loading && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = 'images/icons/icon-384x384.png';
      let angle = 0;

      img.onload = () => {
        const draw = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(0, 0, img.width / 2 - 5, 0, Math.PI * 2); // Adjust the radius to avoid clipping
            ctx.clip();
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();

            // Draw red border
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(0, 0, img.width / 2 - 5, 0, Math.PI * 2); // Adjust the radius to match the clipping area
            ctx.lineWidth = 10; // Adjust the border width as needed
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.restore();

            angle += 0.01; // Slow down the rotation speed further
          }
          requestAnimationFrame(draw);
        };
        draw();
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="splash-screen">
        <h1>Welcome to MSU Stroke Triage</h1>
        <p>Loading...</p>
        <canvas ref={canvasRef} width={384} height={384}></canvas>
        {/* You can add a loading animation or branding here */}
      </div>
    );
  }

  return null; // Return null when not loading
};

export default SplashScreen;