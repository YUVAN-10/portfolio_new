import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ hackerMode, zeroGravity }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Soft Light Floating Particles Pool
    const numParticles = Math.min(60, Math.floor(width / 25));
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? 'rgba(37, 99, 235, 0.25)' : 'rgba(124, 58, 237, 0.25)',
      alpha: Math.random() * 0.5 + 0.2
    }));

    let mouse = { x: -1000, y: -1000, radius: 180 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Matrix Rain setup for Hacker Mode
    const characters = '01YUVANSHANKARDEVOPSSCI-FIMERNSTACKKUBERNETESDOCKER';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (hackerMode) {
        // Hacker Matrix Rain
        ctx.fillStyle = 'rgba(10, 15, 30, 0.25)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#06B6D4';
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        // Luxury Light Mesh Gradient Background
        const baseGrad = ctx.createLinearGradient(0, 0, width, height);
        baseGrad.addColorStop(0, '#FAFBFF');
        baseGrad.addColorStop(0.5, '#F3F5FC');
        baseGrad.addColorStop(1, '#EEF4FF');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, width, height);

        // Soft Animated Aurora Mesh Blobs
        const time = Date.now() * 0.0008;

        // Blob 1: Soft Blue
        const b1X = width * 0.2 + Math.sin(time) * 80;
        const b1Y = height * 0.3 + Math.cos(time * 0.8) * 80;
        const grad1 = ctx.createRadialGradient(b1X, b1Y, 20, b1X, b1Y, width * 0.45);
        grad1.addColorStop(0, 'rgba(224, 242, 254, 0.8)'); // Light blue
        grad1.addColorStop(1, 'rgba(250, 251, 255, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Blob 2: Soft Lavender/Purple
        const b2X = width * 0.8 + Math.cos(time * 0.7) * 90;
        const b2Y = height * 0.6 + Math.sin(time * 0.9) * 90;
        const grad2 = ctx.createRadialGradient(b2X, b2Y, 20, b2X, b2Y, width * 0.4);
        grad2.addColorStop(0, 'rgba(243, 232, 255, 0.7)'); // Soft purple
        grad2.addColorStop(1, 'rgba(250, 251, 255, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hackerMode, zeroGravity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
