/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import {
  Hammer,
  Fence,
  PaintBucket,
  Layers,
  ArrowRight,
  Mail,
  CheckCircle2,
  Star,
  Menu,
  X,
  Phone,
  Send
} from 'lucide-react';

// --- Components ---

const House3D = () => (
  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
    {/* Ground Plane / Foundation */}
    <div 
      className="absolute top-[300px] left-[-150px] w-[800px] h-[800px] opacity-[0.15]" 
      style={{ 
        transform: 'rotateX(90deg) translateZ(0px)',
        backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        border: '1px solid #3b82f6'
      }} 
    />

    {/* Front Face (Fuller) */}
    <div className="absolute inset-0 opacity-[0.95] bg-blue-500/10 border-2 border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" style={{ transform: 'translateZ(120px)', backdropFilter: 'blur(2px)' }}>
      <HouseSVG />
    </div>

    {/* Back Face (Fuller) */}
    <div className="absolute inset-0 opacity-[0.6] bg-blue-500/10 border border-blue-400/20" style={{ transform: 'translateZ(-120px) rotateY(180deg)' }}>
      <HouseSVG />
    </div>

    {/* Left Side (Fuller) */}
    <div className="absolute inset-0 opacity-[0.7] bg-blue-500/10 border border-blue-400/20" style={{ transform: 'translateX(-150px) rotateY(-90deg)', width: '240px', left: 'calc(50% - 120px)' }}>
      <HouseSideSVG />
    </div>

    {/* Right Side (Fuller) */}
    <div className="absolute inset-0 opacity-[0.7] bg-blue-500/10 border border-blue-400/20" style={{ transform: 'translateX(150px) rotateY(90deg)', width: '240px', left: 'calc(50% - 120px)' }}>
      <HouseSideSVG />
    </div>

    {/* Floor Slabs (Solid-ish) */}
    <div className="absolute top-[170px] left-1/2 -translate-x-1/2 opacity-[0.3] bg-blue-400/40" style={{ transform: 'rotateX(90deg) translateZ(0px)', width: '500px', height: '240px' }} />
    <div className="absolute top-[235px] left-1/2 -translate-x-1/2 opacity-[0.3] bg-blue-400/40" style={{ transform: 'rotateX(90deg) translateZ(0px)', width: '500px', height: '240px' }} />

    {/* Roof Slopes (More Solid) */}
    <div className="absolute top-[40px] left-1/2 -translate-x-1/2 opacity-[0.4] bg-blue-400/40 border-2 border-blue-400/60" style={{ transform: 'translateZ(0px) rotateX(45deg)', width: '340px', height: '180px' }} />
    <div className="absolute top-[40px] left-1/2 -translate-x-1/2 opacity-[0.4] bg-blue-400/40 border-2 border-blue-400/60" style={{ transform: 'translateZ(0px) rotateX(-45deg)', width: '340px', height: '180px' }} />

    {/* Annotations (Floating) */}
    <div className="absolute inset-0" style={{ transform: 'translateZ(200px)' }}>
      <svg viewBox="0 0 500 400" className="w-full h-full">
        <g fill="#60a5fa" fontSize="10" fontFamily="monospace" fontWeight="bold">
          <text x="30" y="345">STRUCTURAL INTEGRITY: 98%</text>
          <text x="350" y="345">LOAD BEARING: OK</text>
        </g>
      </svg>
    </div>
  </div>
);

const HouseSideSVG = () => (
  <svg viewBox="0 0 200 400" className="w-full h-full">
    <g fill="none" stroke="#60a5fa" strokeWidth="1.2">
      {/* External Shell */}
      <rect x="0" y="80" width="200" height="220" />
      <path d="M0,80 L100,20 L200,80" />
      
      {/* Internal Room Partitions (3 Floors) */}
      <line x1="0" y1="150" x2="200" y2="150" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="0" y1="225" x2="200" y2="225" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="100" y1="80" x2="100" y2="300" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="50" y1="80" x2="50" y2="300" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.4" />
      <line x1="150" y1="80" x2="150" y2="300" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.4" />
      
      {/* Windows */}
      {[...Array(3)].map((_, floor) => (
        <g key={floor}>
          <rect x="20" y={100 + floor * 75} width="30" height="30" />
          <rect x="150" y={100 + floor * 75} width="30" height="30" />
        </g>
      ))}

      {/* Room Labels (Side) */}
      <g fill="#3b82f6" fontSize="5" fontFamily="monospace" opacity="0.6">
        <text x="10" y="95">ATTIC STORAGE</text>
        <text x="110" y="95">GUEST SUITE</text>
        <text x="10" y="170">KIDS ROOM</text>
        <text x="110" y="170">OFFICE</text>
        <text x="10" y="245">LAUNDRY</text>
        <text x="110" y="245">PANTRY</text>
      </g>
    </g>
  </svg>
);

const HouseSVG = () => (
  <svg viewBox="0 0 500 400" className="w-full h-full">
    <g fill="none" stroke="#60a5fa" strokeWidth="1.2">
      {/* Left Wing (3 Levels) */}
      <path d="M20,300 L20,100 L180,100 L180,300" />
      <path d="M20,100 L100,50 L180,100" />
      <line x1="20" y1="170" x2="180" y2="170" strokeWidth="0.5" strokeDasharray="4 2" />
      <line x1="20" y1="235" x2="180" y2="235" strokeWidth="0.5" strokeDasharray="4 2" />
      
      {/* Main Center Body (Grand 3-Level Tower) */}
      <path d="M180,300 L180,40 L320,40 L320,300" />
      <path d="M180,40 L250,0 L320,40" />
      <line x1="180" y1="130" x2="320" y2="130" strokeWidth="0.5" strokeDasharray="4 2" />
      <line x1="180" y1="210" x2="320" y2="210" strokeWidth="0.5" strokeDasharray="4 2" />
      <line x1="250" y1="40" x2="250" y2="300" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.4" />
      
      {/* Right Wing (Complex Extension) */}
      <path d="M320,300 L480,300 L480,120 L320,120" />
      <path d="M320,120 L400,70 L480,120" />
      <line x1="320" y1="210" x2="480" y2="210" strokeWidth="0.5" strokeDasharray="4 2" />

      {/* Arched Entrance */}
      <path d="M225,300 L225,240 A25,25 0 0,1 275,240 L275,300" strokeWidth="1.5" />
      
      {/* Room Labels (Front) */}
      <g fill="#3b82f6" fontSize="6" fontFamily="monospace" opacity="0.8">
        {/* Left Wing */}
        <text x="30" y="115">LIBRARY</text>
        <text x="30" y="185">ART STUDIO</text>
        <text x="30" y="250">GYM</text>
        
        {/* Center Tower */}
        <text x="190" y="55">OBSERVATORY</text>
        <text x="190" y="145">CINEMA</text>
        <text x="190" y="225">GRAND HALL</text>
        
        {/* Right Wing */}
        <text x="330" y="135">BALLROOM</text>
        <text x="330" y="225">WINE CELLAR</text>
      </g>

      {/* Windows */}
      <g strokeWidth="0.5" opacity="0.7">
        {[...Array(3)].map((_, i) => (
          <rect key={`l-${i}`} x="50" y={115 + i * 65} width="25" height="25" />
        ))}
        {[...Array(3)].map((_, i) => (
          <rect key={`c-${i}`} x="235" y={60 + i * 75} width="30" height="30" />
        ))}
        {[...Array(2)].map((_, i) => (
          <rect key={`r-${i}`} x="380" y={145 + i * 85} width="40" height="40" />
        ))}
      </g>
    </g>
  </svg>
);

const BlueprintBackground = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  
  const rotateX = useTransform(mouseY, (y: number) => -10 + (y - centerY) * 0.01);
  const rotateY = useTransform(mouseX, (x: number) => -45 + (x - centerX) * -0.01);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div 
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: 'translateZ(0)',
          rotateX,
          rotateY
        }}
      >
        {/* Central House Wireframe */}
        <div 
          className="w-[700px] h-[550px] relative will-change-transform animate-[spin-y_30s_linear_infinite]" 
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0)' }}
        >
          <House3D />
        </div>

        {/* Background Floorplan Elements */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ transform: 'translateZ(-200px)' }}>
          <svg className="w-full h-full">
            {/* Floor plan sketches */}
            <rect x="5%" y="5%" width="25%" height="35%" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            <rect x="65%" y="45%" width="25%" height="35%" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            <circle cx="15%" cy="75%" r="60" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5 5" />
            
            {/* Measurement lines */}
            <line x1="0%" y1="10%" x2="100%" y2="10%" stroke="#3b82f6" strokeWidth="0.3" strokeDasharray="15 10" />
            <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="#3b82f6" strokeWidth="0.3" strokeDasharray="15 10" />
          </svg>
        </div>

        {/* Floating Technical Elements */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
            animate={{
              z: [-400, 400],
              rotateZ: [0, 360]
            }}
            transition={{
              duration: 30 + i * 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * -10
            }}
            style={{
              width: 1000 + i * 400,
              height: 1000 + i * 400,
              border: '1px solid #3b82f6',
              borderRadius: '50%',
              transformStyle: 'preserve-3d'
            }}
          />
        ))}
      </motion.div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80" />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-white/5' 
        : 'bg-black/50 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-xs">C&C</span>
          </div>
          <span className="font-medium tracking-tight hidden sm:block">New Generation</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[['Services', 'services'], ['Our Work', 'work'], ['Reviews', 'reviews']].map(([label, anchor]) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              className="text-white/70 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 bg-white text-black rounded-md font-bold hover:bg-white/90 transition-all active:scale-95"
          >
            Contact Us
          </a>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {[['Services', 'services'], ['Our Work', 'work'], ['Reviews', 'reviews']].map(([label, anchor]) => (
                <a
                  key={anchor}
                  href={`#${anchor}`}
                  className="text-2xl font-bold tracking-tight"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="h-[1px] bg-white/10 my-2" />
              <a 
                href="#contact" 
                className="text-2xl font-bold tracking-tight text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
              <a href="mailto:cconstruccion.23@gmail.com" className="text-white/40 font-medium">cconstruccion.23@gmail.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BeamEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-[beam_6s_infinite]" />
    <div className="absolute top-0 left-3/4 w-[2px] h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-[beam_9s_infinite_2s]" />
    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-[beam_15s_infinite_5s]" />
  </div>
);

const GridShimmer = () => (
  <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
  </div>
);

const AntigravityParticles = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const numParticles = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize 3D particles
    particles.current = Array.from({ length: numParticles }).map((_, i) => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      z: (Math.random() - 0.5) * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.5,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.6,
      pulseSpeed: 0.02 + Math.random() * 0.05,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let animationFrame: number;
    const focalLength = 400;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mouseX.get();
      const my = mouseY.get();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Sort particles by Z for basic depth sorting
      particles.current.sort((a, b) => b.z - a.z);

      particles.current.forEach((p) => {
        // Orbit/Drift logic
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around 3D space
        if (p.x > 500) p.x = -500; if (p.x < -500) p.x = 500;
        if (p.y > 500) p.y = -500; if (p.y < -500) p.y = 500;
        if (p.z > 500) p.z = -500; if (p.z < -500) p.z = 500;

        // Attract to mouse in 3D
        const dx = (mx - centerX) - p.x;
        const dy = (my - centerY) - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          p.vx += dx * 0.0001;
          p.vy += dy * 0.0001;
        }

        p.pulsePhase += p.pulseSpeed;
        const currentPulse = (Math.sin(p.pulsePhase) + 1) / 2;
        
        // Project 3D to 2D
        const scale = focalLength / (focalLength + p.z + 500);
        const screenX = centerX + p.x * scale;
        const screenY = centerY + p.y * scale;
        const currentSize = p.size * scale;
        const currentOpacity = p.opacity * scale * (0.5 + currentPulse * 0.5);

        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${currentOpacity})`;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/nN4wWxnzfijMYbmezLTC/webhook-trigger/d79f1cd6-29f9-4469-9fab-8311a104841c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: window.location.href
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request. Please try again later.');
      }

      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', description: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get a Free Estimate</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Tell us what you need done and we'll reach out with a free estimate and the next steps for your project.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_100px_-20px_rgba(255,255,255,0.2)]"
        >
          {/* Subtle Blueprint Grid in background of form */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-blue-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Request Received!</h3>
              <p className="text-slate-600 mb-8">Thank you for reaching out. We'll contact you shortly at the number provided.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-blue-600 font-bold hover:underline"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                <input
                  id="firstName"
                  required
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                <input
                  id="lastName"
                  required
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Tell Us About Your Project</label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="Tell us about the job you need done..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400 resize-none"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Request</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
  return (
    <motion.a 
      href="#contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.05] transition-all group cursor-pointer block"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="text-blue-400" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed text-sm">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Get an estimate</span>
        <ArrowRight size={14} />
      </div>
    </motion.a>
  );
};

interface WorkImageProps {
  key?: React.Key;
  src: string;
  alt: string;
  onClick?: () => void;
}

const WorkImage = ({ src, alt, onClick }: WorkImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "50px" }}
      className="flex flex-col gap-4 group"
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/5 cursor-zoom-in border border-white/10 shadow-2xl"
      >
        {/* Skeleton/Placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
        
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100 grayscale group-hover:grayscale-0 group-hover:scale-105' : 'opacity-0 scale-105'
          }`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${alt}/800/600`;
            setIsLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white font-medium px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm">View Project</p>
        </div>
      </motion.div>
      <p className="text-white/60 text-sm font-bold tracking-tight px-1 uppercase">{alt}</p>
    </motion.div>
  );
};

const WhatWeDo = () => {
  const [activeCategory, setActiveCategory] = useState('Fencing');
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string, category: string } | null>(null);

  const categories = [
    { id: 'Fencing', icon: Fence, label: 'FENCING' },
    { id: 'Remodeling', icon: Hammer, label: 'REMODELING' },
    { id: 'Brickwork', icon: Layers, label: 'BRICKWORK' },
    { id: 'Painting', icon: PaintBucket, label: 'PAINTING' },
  ];

  const fencingImages = [
    { src: "/PHOTO-2026-03-22-11-09-33.jpeg", alt: "Fencing Project 01" },
    { src: "/PHOTO-2026-03-22-11-09-46.jpeg", alt: "Fencing Project 02" },
    { src: "/PHOTO-2026-03-22-11-09-47.jpeg", alt: "Fencing Project 03" },
    { src: "/PHOTO-2026-03-22-11-09-48.jpeg", alt: "Fencing Project 04" },
    { src: "/PHOTO-2026-03-22-11-09-49.jpeg", alt: "Fencing Project 05" },
    { src: "/PHOTO-2026-03-22-11-09-46-1.jpeg", alt: "Fencing Project 06" },
    { src: "/PHOTO-2026-03-22-11-09-47-1.jpeg", alt: "Fencing Project 07" },
    { src: "/PHOTO-2026-03-22-11-09-49-1.jpeg", alt: "Fencing Project 08" },
    { src: "/PHOTO-2026-03-22-11-09-33-1.jpeg", alt: "Fencing Project 09" },
    { src: "/PHOTO-2026-03-22-11-09-46-2.jpeg", alt: "Fencing Project 10" },
    { src: "/PHOTO-2026-03-22-11-09-47-2.jpeg", alt: "Fencing Project 11" }
  ];

  const remodelingImages = [
    { src: "/803b7398-eb8c-472d-9115-23268272326d.jpeg", alt: "Remodeling Project 01" },
    { src: "/48926532-0158-4e9b-8293-fe9b41f4cfc1.jpeg", alt: "Remodeling Project 02" },
    { src: "/d16bccf5-5148-4af1-8ee5-e6e133c919d8.jpeg", alt: "Remodeling Project 03" },
    { src: "/985259cc-fe0a-4285-a5d3-deaccb3fa29d.jpeg", alt: "Remodeling Project 04" },
    { src: "/4ef9336f-faac-4bbe-aea2-efa07a1c810a.jpeg", alt: "Remodeling Project 05" },
    { src: "/dc395b6d-825b-4d87-a659-c82a7257ce3c.jpeg", alt: "Remodeling Project 06" },
    { src: "/3816f5e0-9c47-43ca-8b54-d5cbf1239b42.jpeg", alt: "Remodeling Project 07" },
    { src: "/f6c3d40e-363a-4558-88e1-43cda6039a5c.jpeg", alt: "Remodeling Project 08" },
    { src: "/6143201a-10d9-4d01-8d67-59bfaf7509b0.jpeg", alt: "Remodeling Project 09" },
    { src: "/5a8df160-ccdf-4209-919d-2d453ca9b73f.jpeg", alt: "Remodeling Project 10" },
    { src: "/5a136f36-3b95-4e28-a626-841eb32bf226.jpeg", alt: "Remodeling Project 11" },
    { src: "/ef96ce7d-5c9b-4175-a4df-af1833b0f9a4.jpeg", alt: "Remodeling Project 12" },
    { src: "/305ec021-d055-40d3-be06-5899ec93f052.jpeg", alt: "Remodeling Project 13" },
    { src: "/032c856c-9bd3-496d-8755-24037346e406.jpeg", alt: "Remodeling Project 14" },
    { src: "/9fb91971-dfd7-44e5-a882-cb9c0473546d.jpeg", alt: "Remodeling Project 15" },
    { src: "/9124f445-89c3-45bf-860c-32ca28b87aa2.jpeg", alt: "Remodeling Project 16" },
    { src: "/2310859f-5821-46f8-9e3a-fc89b648130e.jpeg", alt: "Remodeling Project 17" },
    { src: "/50c0320f-6e96-4c2a-a524-f20faadabe93.jpeg", alt: "Remodeling Project 18" },
    { src: "/cec3ac75-f5f8-49e3-994b-e02c5b999d52.jpeg", alt: "Remodeling Project 19" }
  ];

  const brickworkImages = [
    { src: "/8c01d345-845c-4e5e-af07-9cb752d2f5fa.jpeg", alt: "Brickwork Project 01" },
    { src: "/7c4ef816-c310-420d-9b9c-0fe16bc9b43c.jpeg", alt: "Brickwork Project 02" },
    { src: "/3b321aed-6cd0-4204-8017-4eca2495b789.jpeg", alt: "Brickwork Project 03" },
    { src: "/f1e424e3-d85e-46f6-b9a8-34dead8fd9e0.jpeg", alt: "Brickwork Project 04" },
    { src: "/4976fb58-b749-4a89-bc4a-7efb3e148c14.jpeg", alt: "Brickwork Project 05" },
    { src: "/6afd26b0-0f88-4b47-bdc0-7967f4578107.jpeg", alt: "Brickwork Project 06" },
    { src: "/a3deb913-b4c1-4161-be69-11a98e017792.jpeg", alt: "Brickwork Project 07" },
    { src: "/bfac4334-58ea-46ea-bdc0-43dea72992e9.jpeg", alt: "Brickwork Project 08" }
  ];

  const paintingImages = [
    { src: "/f8815da6-5e78-4398-b316-7a36a8c8f7d1.jpeg", alt: "Painting Project 01" },
    { src: "/f9bfef50-6d73-4b4b-b130-76e2703b568f.jpeg", alt: "Painting Project 02" },
    { src: "/19C5916E-6955-444E-AFBB-B861E385E336.jpeg", alt: "Painting Project 03" },
    { src: "/249ad5e6-813d-4959-a795-f7229ffcdbbc.jpeg", alt: "Painting Project 04" },
    { src: "/6C21101D-2ED9-4AD2-95E1-0CE9C620B836.jpeg", alt: "Painting Project 05" },
    { src: "/8ea8c580-7684-4ff3-9474-531d15b23656.jpeg", alt: "Painting Project 06" },
    { src: "/589804c2-bccd-48a4-b761-e32ef41009f6.jpeg", alt: "Painting Project 07" }
  ];

  const portfolioData: Record<string, { src: string, alt: string }[]> = {
    'Fencing': fencingImages,
    'Remodeling': remodelingImages,
    'Brickwork': brickworkImages,
    'Painting': paintingImages,
  };

  const currentCategory = categories.find(c => c.id === activeCategory)!;

  return (
    <section id="work" className="py-24 px-6 relative overflow-visible">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Work</h2>
          <p className="text-white/50 max-w-xl">Every project tells a story. Browse our completed work across all service categories.</p>
        </div>

        <div className="flex justify-center sticky top-24 z-50 px-4">
          <div
            className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-x-auto max-w-full"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-label={cat.label}
                className={`px-4 py-3 rounded-xl transition-all duration-500 flex items-center gap-2 relative overflow-hidden shrink-0 ${
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <cat.icon size={16} className="relative z-10 shrink-0" />
                <span className="font-bold text-xs tracking-wider relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8">
          {/* Blueprint Background for Portfolio - Now Sticky with rotation and optimized */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none flex items-center justify-center sticky top-1/2 -translate-y-1/2 h-[50vh] will-change-transform" style={{ transform: 'translateY(-50%) translateZ(0)' }}>
            <div 
              className="w-full max-w-4xl transform scale-125 will-change-transform animate-[spin_60s_linear_infinite]"
              style={{ transform: 'scale(1.25) translateZ(0)' }}
            >
              <HouseSVG />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
            >
              {portfolioData[activeCategory]?.map((img, idx) => (
                <WorkImage 
                  key={`${activeCategory}-${idx}`} 
                  src={img.src} 
                  alt={img.alt} 
                  onClick={() => setSelectedImage({ ...img, category: currentCategory.label })}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                >
                  Close <X size={20} />
                </button>
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-8 text-center">
                  <p className="text-xl font-bold text-white mb-2">{selectedImage.alt}</p>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-semibold">{selectedImage.category} Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen font-sans selection:bg-white selection:text-black bg-black relative"
    >
      <Navbar />

      {/* Global Background Animations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <BlueprintBackground mouseX={mouseX} mouseY={mouseY} />
        <BeamEffect />
        <GridShimmer />
        
        {/* Global Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/[0.1] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/[0.1] rounded-full blur-[120px]" />
      </div>

      {/* Global Antigravity Orbiting Particles (Canvas) */}
      <AntigravityParticles mouseX={mouseX} mouseY={mouseY} />
      
      {/* Central Core (Small & Intense) */}
      <motion.div 
        className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_2px_white]"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* --- HERO SECTION (HOOK & VALUE PROP) --- */}
      <section 
        className="relative min-h-screen flex items-center pt-20 pb-20 px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Precision Craftsmanship
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-gradient">
              Built for <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">Today.</span> <br />
              <span className="text-white">Made to Last for the <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">Next Generation.</span></span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/65 mb-10 leading-relaxed max-w-3xl mx-auto">
              Expert fencing, remodeling, masonry, painting, and ceramic work built with precision, reliability, and lasting value
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#work" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group"
              >
                View Our Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#services" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Our Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>

        {/* Parallax Abstract Shapes */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 right-[-10%] w-96 h-96 border border-white/5 rounded-full pointer-events-none" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-[-5%] w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" 
        />
      </section>

      {/* --- VALUE PROP IN DETAIL --- */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Mastering Every Detail</h2>
            <p className="text-white/50 max-w-xl">From the foundation to the final coat of paint, our multi-disciplinary team ensures excellence at every stage of your home improvement journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              index={0}
              icon={Fence} 
              title="Custom Fencing" 
              description="Premium vinyl, wood, and aluminum fencing solutions designed for privacy, security, and curb appeal."
            />
            <ServiceCard 
              index={1}
              icon={Layers} 
              title="Masonry & Bricks" 
              description="Expert brickwork and stone masonry that stands the test of time. Patios, walkways, and structural repairs."
            />
            <ServiceCard 
              index={2}
              icon={Hammer} 
              title="Full Remodeling" 
              description="Complete interior and exterior transformations. Kitchens, bathrooms, and living space expansions."
            />
            <ServiceCard 
              index={3}
              icon={PaintBucket} 
              title="Professional Painting" 
              description="Flawless finishes and precision tile work. We specialize in high-end ceramic installations and professional painting."
            />
            <ServiceCard 
              index={4}
              icon={CheckCircle2} 
              title="Quality Assurance" 
              description="Every project undergoes a rigorous quality check to ensure it meets our 'New Generation' standards."
            />
            <ServiceCard 
              index={5}
              icon={Mail} 
              title="Direct Communication" 
              description="Work directly with our experts. No middle-men, just clear communication and dedicated service."
            />
          </div>
        </div>
      </section>

      <WhatWeDo />

      {/* --- TESTIMONIALS --- */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Trusted by Homeowners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Robert M.", text: "C&C transformed our backyard with a beautiful new fence. The attention to detail was incredible.", stars: 5 },
              { name: "Sarah L.", text: "Professional, timely, and the quality of the ceramic work in our kitchen is second to none.", stars: 5 },
              { name: "David K.", text: "The masonry work on our front walkway looks amazing. Highly recommend for any home project.", stars: 5 }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl text-left"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-white/70 mb-6 italic">"{t.text}"</p>
                <p className="font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center font-bold text-black italic">C&C</div>
            <span className="font-bold tracking-tighter">C&C NEW GENERATION</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="mailto:cconstruccion.23@gmail.com" className="hover:text-white transition-colors">cconstruccion.23@gmail.com</a>
            <span>© 2026 C&C New Generation. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ElevenLabs Conversational AI Widget */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <elevenlabs-convai agent-id="agent_8801km798d35et1b2g966m19rtrs"></elevenlabs-convai>
      </div>
    </div>
  );
}
