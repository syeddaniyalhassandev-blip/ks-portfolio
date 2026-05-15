'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Mechatronics SVG path data (simplified, drawable on canvas)
const ICONS = [
  {
    name: 'gear',
    draw: (ctx, x, y, s) => {
      const teeth = 8;
      const outerR = s;
      const innerR = s * 0.72;
      const toothW = 0.18; // half-width of tooth in radians
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const baseAngle = (i / teeth) * Math.PI * 2;
        // 4 points per tooth: rise, top-left, top-right, fall
        const a1 = baseAngle - toothW;
        const a2 = baseAngle - toothW * 0.4;
        const a3 = baseAngle + toothW * 0.4;
        const a4 = baseAngle + toothW;
        if (i === 0) ctx.moveTo(x + innerR * Math.cos(a1), y + innerR * Math.sin(a1));
        else ctx.lineTo(x + innerR * Math.cos(a1), y + innerR * Math.sin(a1));
        ctx.lineTo(x + outerR * Math.cos(a2), y + outerR * Math.sin(a2));
        ctx.lineTo(x + outerR * Math.cos(a3), y + outerR * Math.sin(a3));
        ctx.lineTo(x + innerR * Math.cos(a4), y + innerR * Math.sin(a4));
      }
      ctx.closePath();
      ctx.stroke();
      // Center hole
      ctx.beginPath();
      ctx.arc(x, y, s * 0.25, 0, Math.PI * 2);
      ctx.stroke();
      // Center dot
      ctx.beginPath();
      ctx.arc(x, y, s * 0.07, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  {
    name: 'chip',
    draw: (ctx, x, y, s) => {
      const half = s * 0.65;
      const pinLen = s * 0.32;
      const pins = 4;
      const spacing = (half * 1.6) / (pins + 1);
      // Body
      ctx.strokeRect(x - half, y - half, half * 2, half * 2);
      // Notch top-left
      ctx.beginPath();
      ctx.arc(x - half + s * 0.2, y - half, s * 0.12, Math.PI, 0);
      ctx.stroke();
      // Pins on all 4 sides
      for (let i = 1; i <= pins; i++) {
        const offset = -half * 0.8 + i * spacing;
        // top
        ctx.beginPath(); ctx.moveTo(x + offset, y - half); ctx.lineTo(x + offset, y - half - pinLen); ctx.stroke();
        // bottom
        ctx.beginPath(); ctx.moveTo(x + offset, y + half); ctx.lineTo(x + offset, y + half + pinLen); ctx.stroke();
        // left
        ctx.beginPath(); ctx.moveTo(x - half, y + offset); ctx.lineTo(x - half - pinLen, y + offset); ctx.stroke();
        // right
        ctx.beginPath(); ctx.moveTo(x + half, y + offset); ctx.lineTo(x + half + pinLen, y + offset); ctx.stroke();
      }
      // Inner chip die
      ctx.strokeRect(x - half * 0.45, y - half * 0.45, half * 0.9, half * 0.9);
    }
  },
  {
    name: 'circuit',
    draw: (ctx, x, y, s) => {
      // PCB trace — L-shaped paths with via dots
      const traces = [
        [[x - s, y - s * 0.3], [x - s * 0.4, y - s * 0.3], [x - s * 0.4, y + s * 0.3], [x + s * 0.2, y + s * 0.3]],
        [[x - s * 0.2, y - s], [x - s * 0.2, y - s * 0.1], [x + s * 0.5, y - s * 0.1], [x + s * 0.5, y + s * 0.5]],
      ];
      traces.forEach(pts => {
        ctx.beginPath();
        pts.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.stroke();
        // Via at each end
        [[pts[0], pts[pts.length - 1]]].flat().forEach(([px, py]) => {
          ctx.beginPath(); ctx.arc(px, py, s * 0.09, 0, Math.PI * 2); ctx.fill();
        });
      });
    }
  },
  {
    name: 'motor',
    draw: (ctx, x, y, s) => {
      // DC Motor — cylinder side view
      ctx.strokeRect(x - s * 0.55, y - s * 0.45, s * 1.1, s * 0.9);
      // Shaft right
      ctx.beginPath(); ctx.moveTo(x + s * 0.55, y); ctx.lineTo(x + s * 1.05, y); ctx.stroke();
      // Shaft collar
      ctx.strokeRect(x + s * 0.55, y - s * 0.12, s * 0.15, s * 0.24);
      // Winding lines inside body
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * s * 0.22, y - s * 0.32);
        ctx.lineTo(x + i * s * 0.22, y + s * 0.32);
        ctx.stroke();
      }
      // Terminal wires on top
      ctx.beginPath(); ctx.moveTo(x - s * 0.2, y - s * 0.45); ctx.lineTo(x - s * 0.2, y - s * 0.75); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 0.2, y - s * 0.45); ctx.lineTo(x + s * 0.2, y - s * 0.75); ctx.stroke();
    }
  },
  {
    name: 'resistor',
    draw: (ctx, x, y, s) => {
      // Leads
      ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.42, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 0.42, y); ctx.lineTo(x + s, y); ctx.stroke();
      // Body
      ctx.strokeRect(x - s * 0.42, y - s * 0.22, s * 0.84, s * 0.44);
      // Color bands
      [-0.18, 0, 0.18].forEach(o => {
        ctx.beginPath();
        ctx.moveTo(x + o * s, y - s * 0.22);
        ctx.lineTo(x + o * s, y + s * 0.22);
        ctx.stroke();
      });
      // End cap dots
      ctx.beginPath(); ctx.arc(x - s, y, s * 0.07, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + s, y, s * 0.07, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    name: 'arduino',
    draw: (ctx, x, y, s) => {
      // Board shape (rounded rect)
      ctx.beginPath();
      const bx = x - s * 0.85, by = y - s * 0.6, bw = s * 1.7, bh = s * 1.2, br = s * 0.12;
      ctx.moveTo(bx + br, by);
      ctx.lineTo(bx + bw - br, by); ctx.arcTo(bx + bw, by, bx + bw, by + br, br);
      ctx.lineTo(bx + bw, by + bh - br); ctx.arcTo(bx + bw, by + bh, bx + bw - br, by + bh, br);
      ctx.lineTo(bx + br, by + bh); ctx.arcTo(bx, by + bh, bx, by + bh - br, br);
      ctx.lineTo(bx, by + br); ctx.arcTo(bx, by, bx + br, by, br);
      ctx.closePath(); ctx.stroke();
      // USB port left
      ctx.strokeRect(x - s * 1.0, y - s * 0.18, s * 0.18, s * 0.36);
      // Digital pins top row
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.arc(x + i * s * 0.22, y - s * 0.48, s * 0.06, 0, Math.PI * 2); ctx.stroke();
      }
      // Analog pins bottom row
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.arc(x + i * s * 0.22, y + s * 0.48, s * 0.06, 0, Math.PI * 2); ctx.stroke();
      }
      // ATmega chip
      ctx.strokeRect(x + s * 0.15, y - s * 0.22, s * 0.45, s * 0.44);
      // Reset button
      ctx.beginPath(); ctx.arc(x - s * 0.35, y + s * 0.15, s * 0.1, 0, Math.PI * 2); ctx.stroke();
    }
  },
  {
    name: 'wrench',
    draw: (ctx, x, y, s) => {
      // Proper wrench: open-end spanner
      // Handle — thick diagonal line
      ctx.save();
      ctx.lineWidth = s * 0.18;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x - s * 0.15, y + s * 0.1);
      ctx.lineTo(x + s * 0.65, y + s * 0.85);
      ctx.stroke();
      ctx.restore();
      // Head — circle with jaw gap
      ctx.beginPath();
      ctx.arc(x - s * 0.25, y - s * 0.1, s * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      // Jaw opening (two parallel lines cutting into circle)
      ctx.save();
      ctx.strokeStyle = 'rgba(8,13,22,1)'; // erase with bg color
      ctx.lineWidth = s * 0.22;
      ctx.beginPath();
      ctx.moveTo(x - s * 0.25, y - s * 0.1);
      ctx.lineTo(x + s * 0.25, y - s * 0.1);
      ctx.stroke();
      ctx.restore();
      // Redraw jaw lines in icon color
      ctx.beginPath();
      ctx.moveTo(x - s * 0.05, y - s * 0.32);
      ctx.lineTo(x + s * 0.28, y - s * 0.32);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - s * 0.05, y + s * 0.12);
      ctx.lineTo(x + s * 0.28, y + s * 0.12);
      ctx.stroke();
    }
  },
  {
    name: 'wifi',
    draw: (ctx, x, y, s) => {
      // IoT wireless arcs
      const cy = y + s * 0.25;
      [s * 0.85, s * 0.55, s * 0.28].forEach(r => {
        ctx.beginPath();
        ctx.arc(x, cy, r, Math.PI + 0.35, -0.35);
        ctx.stroke();
      });
      // Dot
      ctx.beginPath(); ctx.arc(x, cy, s * 0.09, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    name: 'capacitor',
    draw: (ctx, x, y, s) => {
      // Electrolytic capacitor — cylinder top view + leads
      ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 0.3, y); ctx.lineTo(x + s, y); ctx.stroke();
      // Two parallel plates
      ctx.beginPath(); ctx.moveTo(x - s * 0.3, y - s * 0.4); ctx.lineTo(x - s * 0.3, y + s * 0.4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 0.3, y - s * 0.4); ctx.lineTo(x + s * 0.3, y + s * 0.4); ctx.stroke();
      // Plus sign on left plate
      ctx.beginPath(); ctx.moveTo(x - s * 0.55, y - s * 0.15); ctx.lineTo(x - s * 0.55, y + s * 0.15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - s * 0.7, y); ctx.lineTo(x - s * 0.4, y); ctx.stroke();
    }
  },
  {
    name: 'robot_arm',
    draw: (ctx, x, y, s) => {
      // Simple 2-link robot arm
      // Base
      ctx.strokeRect(x - s * 0.25, y + s * 0.55, s * 0.5, s * 0.2);
      // Link 1
      ctx.save(); ctx.translate(x, y + s * 0.55);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-s * 0.15, -s * 0.55); ctx.lineWidth = s * 0.14; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
      // Joint 1
      ctx.beginPath(); ctx.arc(x - s * 0.15, y, s * 0.12, 0, Math.PI * 2); ctx.stroke();
      // Link 2
      ctx.save(); ctx.lineWidth = s * 0.1; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x - s * 0.15, y); ctx.lineTo(x + s * 0.4, y - s * 0.5); ctx.stroke(); ctx.restore();
      // End effector (gripper)
      ctx.beginPath(); ctx.moveTo(x + s * 0.4, y - s * 0.5); ctx.lineTo(x + s * 0.6, y - s * 0.35); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 0.4, y - s * 0.5); ctx.lineTo(x + s * 0.6, y - s * 0.65); ctx.stroke();
    }
  },
];

function createParticles(W, H) {
  const count = Math.min(Math.floor((W * H) / 18000), 28);
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 18 + 14,
    opacity: Math.random() * 0.35 + 0.18,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.004,
    iconIndex: i % ICONS.length,
  }));
}

export default function Hero({ data, id }) {
  const titles = data?.titles || ["Mechatronics Engineer"];
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    let timeoutId;
    const currentTitle = titles[index] || "";
    if (subIndex === currentTitle.length + 1 && !reverse) {
      timeoutId = setTimeout(() => setReverse(true), 2000);
    } else if (subIndex === 0 && reverse) {
      timeoutId = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }, 500);
    } else {
      timeoutId = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }, reverse ? 30 : 75);
    }
    return () => clearTimeout(timeoutId);
  }, [subIndex, index, reverse, mounted, titles]);

  // Canvas animation
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let particles = createParticles(W, H);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = createParticles(W, H);
    };
    window.addEventListener('resize', onResize);

    const PRIMARY = 'rgba(52,152,219,';

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#080d16');
      grad.addColorStop(1, '#050a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Subtle center glow
      const radial = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.5);
      radial.addColorStop(0, 'rgba(52,152,219,0.12)');
      radial.addColorStop(1, 'rgba(52,152,219,0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, W, H);

      // Draw floating mechatronics icons
      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around edges
        if (p.x < -80) p.x = W + 80;
        if (p.x > W + 80) p.x = -80;
        if (p.y < -80) p.y = H + 80;
        if (p.y > H + 80) p.y = -80;

        // Draw icon
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.strokeStyle = `${PRIMARY}${p.opacity})`;
        ctx.fillStyle = `${PRIMARY}${p.opacity})`;
        ctx.lineWidth = 1.2;
        ICONS[p.iconIndex].draw(ctx, 0, 0, p.size);
        ctx.restore();
      });

      // Subtle dot grid overlay
      ctx.fillStyle = 'rgba(52,152,219,0.07)';
      const gridSpacing = 40;
      for (let gx = 0; gx < W; gx += gridSpacing) {
        for (let gy = 0; gy < H; gy += gridSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  if (!mounted) {
    return <section id={id || "home"} className="h-screen bg-[#080d16]" />;
  }

  const currentTitle = titles[index] || "";

  return (
    <section
      id={id || "home"}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#080d16]"
    >
      {/* Animated Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white leading-[1.1] sm:leading-none"
        >
          <span className="font-extrabold opacity-80">Hi, I am</span>{' '}
          <span className="text-white">{data?.name || 'Engr. Khubaib Salman'}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-8 h-8 md:h-12 leading-tight tracking-tight"
        >
          <span className="font-semibold opacity-70">I am a</span>{' '}
          <span className="text-red-400">{currentTitle.substring(0, subIndex)}</span>
          <span className="inline-block w-1 h-5 md:h-8 ml-1 bg-white animate-pulse align-middle" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {data?.showResume !== false && (
              <a
                href={data?.cvPath || "/Khubaib_Salman_CV.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm px-8 sm:px-10 py-3 rounded-xl shadow-lg hover:shadow-primary/30 inline-flex items-center justify-center uppercase tracking-[0.15em] font-extrabold transition-all hover:scale-105 active:scale-95"
              >
                VIEW RESUME
              </a>
            )}
            {data?.showDownload !== false && (
              <a
                href={data?.cvPath || "/Khubaib_Salman_CV.pdf"}
                download="Khubaib_Salman_CV.pdf"
                className="text-xs sm:text-sm px-8 sm:px-10 py-3 rounded-xl border-2 border-white/30 hover:border-primary text-white/80 hover:text-primary inline-flex items-center justify-center uppercase tracking-[0.15em] font-extrabold transition-all hover:scale-105 active:scale-95"
              >
                DOWNLOAD ↓
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-80">
        <div className="w-6 h-10 border-[2.5px] border-primary rounded-full flex justify-center pt-2 shadow-[0_0_15px_rgba(52,152,219,0.3)]">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
