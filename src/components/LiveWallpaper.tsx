import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

interface Blob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  type: 'plus' | 'circle' | 'dot' | 'cell';
  color: string;
}

const LiveWallpaper: React.FC = () => {
  const { activeScheme } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pulseRef = useRef(0);
  const schemeRef = useRef(activeScheme);

  useEffect(() => {
    schemeRef.current = activeScheme;
    // Re-init colors if scheme changes
    blobsRef.current.forEach(blob => {
      blob.color = Math.random() > 0.5 
        ? `${activeScheme.primary}0F` // Very transparent
        : `${activeScheme.secondary}0A`;
    });
    particlesRef.current.forEach(p => {
      p.color = Math.random() > 0.7 ? activeScheme.accent : activeScheme.secondary;
    });
  }, [activeScheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initElements();
    };

    const initElements = () => {
      const currentScheme = schemeRef.current;
      // Initialize glowing blobs
      blobsRef.current = Array.from({ length: 8 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 250 + 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.5 
          ? `${currentScheme.primary}0F` 
          : `${currentScheme.secondary}0A`
      }));

      // Initialize floating medical particles
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        type: ['plus', 'circle', 'dot', 'cell'][Math.floor(Math.random() * 4)] as any,
        color: Math.random() > 0.7 ? currentScheme.accent : currentScheme.secondary
      }));
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleClick = () => {
      // Scatter particles on click
      particlesRef.current.forEach(p => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 30;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = 1;

      if (p.type === 'plus') {
        ctx.beginPath();
        ctx.moveTo(-p.size/2, 0); ctx.lineTo(p.size/2, 0);
        ctx.moveTo(0, -p.size/2); ctx.lineTo(0, p.size/2);
        ctx.stroke();
      } else if (p.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'cell') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size/2, p.size/3, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const currentScheme = schemeRef.current;
      
      // Heartbeat pulse calculation
      pulseRef.current = (Math.sin(time / 800) + 1) / 2; // 0 to 1
      const pulseScale = 1 + pulseRef.current * 0.05;

      // 1. Draw Atmospheric Glow
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, width * 0.8 * pulseScale
      );
      gradient.addColorStop(0, `${currentScheme.secondary}08`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Glowing Blobs
      ctx.globalCompositeOperation = 'screen';
      blobsRef.current.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;

        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius * pulseScale);
        g.addColorStop(0, blob.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      // 3. Draw Neural Connections
      ctx.beginPath();
      ctx.strokeStyle = `${currentScheme.accent}0D`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 4. Draw Floating Particles
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (repulsion)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 1500;
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        drawParticle(p);
      });

      // 5. Interactive Bio-Helix
      const helixTime = time / 1500;
      ctx.beginPath();
      ctx.strokeStyle = `${currentScheme.accent}14`;
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 15) {
        // Helix follows mouse Y slightly
        const targetY = height * 0.5 + (mouseRef.current.y - height * 0.5) * 0.1;
        const yBase = targetY + Math.sin(i / 150 + helixTime) * 40;
        const yOffset = Math.cos(i / 80 + helixTime * 2) * 25;
        
        // Strands
        ctx.moveTo(i, yBase + yOffset);
        ctx.lineTo(i + 2, yBase + yOffset + 2);
        ctx.moveTo(i, yBase - yOffset);
        ctx.lineTo(i + 2, yBase - yOffset + 2);
        
        if (i % 45 === 0) {
          ctx.moveTo(i, yBase + yOffset);
          ctx.lineTo(i, yBase - yOffset);
        }
      }
      ctx.stroke();

      // 6. Scanning Line
      const scanY = (time / 8) % height;
      const scanG = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanG.addColorStop(0, 'transparent');
      scanG.addColorStop(0.5, `${currentScheme.accent}05`);
      scanG.addColorStop(1, 'transparent');
      ctx.fillStyle = scanG;
      ctx.fillRect(0, scanY - 30, width, 60);

      // 7. Mouse Interaction Glow
      const mouseG = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 200
      );
      mouseG.addColorStop(0, `${currentScheme.accent}1F`);
      mouseG.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseG;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 200, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default LiveWallpaper;
