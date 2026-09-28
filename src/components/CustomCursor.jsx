import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [hoverState, setHoverState] = useState('default'); // 'default', 'button', 'card', 'canvas', 'image'
  const [isClicking, setIsClicking] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const prevPosRef = useRef({ x: -100, y: -100 });
  const scrollTimeoutRef = useRef(null);

  // Smooth lag & elasticity calculation loop
  useEffect(() => {
    let animId;

    const updateSmoothPos = () => {
      setSmoothPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        const vx = dx * 0.12; // Spring lag factor
        const vy = dy * 0.12;
        
        setVelocity({ x: dx, y: dy });

        return {
          x: prev.x + vx,
          y: prev.y + vy
        };
      });

      animId = requestAnimationFrame(updateSmoothPos);
    };

    updateSmoothPos();
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Add particle trail
      const speed = Math.hypot(e.clientX - prevPosRef.current.x, e.clientY - prevPosRef.current.y);
      prevPosRef.current = { x: e.clientX, y: e.clientY };

      if (speed > 2 || Math.random() > 0.4) {
        const colors = ['#2563EB', '#60A5FA', '#A855F7', '#06B6D4'];
        setTrails((prev) => [
          ...prev.slice(-14),
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)]
          }
        ]);
      }

      // Check hover state on target elements
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.dataset.interactive) {
        setHoverState('button');
      } else if (target.closest('.apple-glass-card') || target.closest('.glass-panel')) {
        setHoverState('card');
      } else if (target.tagName === 'CANVAS') {
        setHoverState('canvas');
      } else if (target.tagName === 'IMG') {
        setHoverState('image');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn wave ripple burst
      setRipples((prev) => [
        ...prev.slice(-4),
        { id: Math.random(), x: e.clientX, y: e.clientY }
      ]);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute stretch transformation based on movement & scrolling
  const speed = Math.hypot(velocity.x, velocity.y);
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  const stretch = isScrolling ? 1.35 : Math.min(1.4, 1 + speed * 0.008);

  // Compute scale based on hover state
  let scaleFactor = 1;
  if (hoverState === 'button') scaleFactor = 2.2;
  if (hoverState === 'card') scaleFactor = 1.8;
  if (hoverState === 'canvas') scaleFactor = 2.5;
  if (hoverState === 'image') scaleFactor = 3.0;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Wave Ripples on Click */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full border border-blue-500/60 animate-[ping_450ms_ease-out_forwards]"
          style={{
            left: r.x,
            top: r.y,
            width: '45px',
            height: '45px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Luxury Liquid Glass Cursor Orb */}
      <div
        className={`absolute rounded-full transition-all duration-200 ease-out backdrop-blur-[8px] ${
          hoverState === 'canvas' ? 'border-2 border-dashed border-cyan-400 animate-[spin_6s_linear_infinite]' : 'border border-white/90'
        }`}
        style={{
          left: smoothPos.x,
          top: smoothPos.y,
          width: hoverState === 'image' ? '120px' : '16px',
          height: hoverState === 'image' ? '120px' : '16px',
          background: hoverState === 'button'
            ? 'linear-gradient(135deg, rgba(37,99,235,0.7), rgba(124,58,237,0.7), rgba(6,182,212,0.7))'
            : 'linear-gradient(135deg, #2563EB, #7C3AED, #06B6D4)',
          boxShadow: hoverState === 'button'
            ? '0px 0px 35px rgba(37,99,235,0.6), inset 0px 0px 10px rgba(255,255,255,0.8)'
            : '0px 0px 25px rgba(37,99,235,0.35)',
          transform: `translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scale(${scaleFactor * (isClicking ? 0.75 : 1)})`,
          opacity: hoverState === 'image' ? 0.18 : 0.85
        }}
      />
    </div>
  );
}
