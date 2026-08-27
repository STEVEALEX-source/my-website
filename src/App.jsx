import React, { useState, useEffect, useRef, useCallback } from 'react';

const Icons = {
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Github: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.8 4 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Terminal: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  )
};

const CatSVG = ({ color, idx }) => (
  <svg viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg" style={{
    width: '64px', height: '72px', display: 'block',
    imageRendering: 'pixelated'
  }}>
    <rect x="22" y="32" width="26" height="22" fill={color} stroke="#000" strokeWidth="2.5" />
    <rect x="16" y="8" width="38" height="28" fill={color} stroke="#000" strokeWidth="2.5" />
    <polygon points="22,8 18,0 26,4" fill={color} stroke="#000" strokeWidth="2.5" />
    <polygon points="48,8 52,0 44,4" fill={color} stroke="#000" strokeWidth="2.5" />
    <rect x="24" y="15" width="4" height="4" fill="#000" />
    <rect x="42" y="15" width="4" height="4" fill="#000" />
    <polygon points="35,24 33,27 37,27" fill="#000" stroke="#000" strokeWidth="1.5" />
    <path d="M 35 27 L 32 30 M 35 27 L 38 30" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="square" />
    <g className={`cat-limb left-arm-cat${idx}`} style={{ transformOrigin: '18px 38px' }}>
      <rect x="8" y="36" width="10" height="18" fill={color} stroke="#000" strokeWidth="2.5" />
      <circle cx="13" cy="54" r="4" fill={color} stroke="#000" strokeWidth="2" />
    </g>
    <g className={`cat-limb right-arm-cat${idx}`} style={{ transformOrigin: '52px 38px' }}>
      <rect x="52" y="36" width="10" height="18" fill={color} stroke="#000" strokeWidth="2.5" />
      <circle cx="57" cy="54" r="4" fill={color} stroke="#000" strokeWidth="2" />
    </g>
    <g className={`cat-limb left-leg-cat${idx}`} style={{ transformOrigin: '24px 54px' }}>
      <rect x="20" y="54" width="8" height="18" fill={color} stroke="#000" strokeWidth="2.5" />
      <circle cx="24" cy="72" r="3" fill={color} stroke="#000" strokeWidth="2" />
    </g>
    <g className={`cat-limb right-leg-cat${idx}`} style={{ transformOrigin: '42px 54px' }}>
      <rect x="42" y="54" width="8" height="18" fill={color} stroke="#000" strokeWidth="2.5" />
      <circle cx="46" cy="72" r="3" fill={color} stroke="#000" strokeWidth="2" />
    </g>
    <path d="M 20 40 Q 8 35 5 20" stroke={color} strokeWidth="6" fill="none" strokeLinecap="square" />
  </svg>
);

const PixelCookie = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="2" width="8" height="1" fill="#B8895A" />
    <rect x="3" y="3" width="10" height="1" fill="#D4A574" />
    <rect x="2" y="4" width="12" height="1" fill="#D4A574" />
    <rect x="1" y="5" width="14" height="1" fill="#D4A574" />
    <rect x="1" y="6" width="14" height="1" fill="#D4A574" />
    <rect x="1" y="7" width="14" height="1" fill="#D4A574" />
    <rect x="1" y="8" width="14" height="1" fill="#D4A574" />
    <rect x="1" y="9" width="14" height="1" fill="#D4A574" />
    <rect x="2" y="10" width="12" height="1" fill="#D4A574" />
    <rect x="2" y="11" width="12" height="1" fill="#D4A574" />
    <rect x="3" y="12" width="10" height="1" fill="#B8895A" />
    <rect x="4" y="13" width="8" height="1" fill="#8B6B3D" />
    <rect x="4" y="5" width="2" height="2" fill="#3D2817" />
    <rect x="9" y="4" width="2" height="2" fill="#3D2817" />
    <rect x="6" y="8" width="2" height="2" fill="#3D2817" />
    <rect x="11" y="7" width="2" height="2" fill="#3D2817" />
    <rect x="4" y="10" width="2" height="2" fill="#3D2817" />
    <rect x="9" y="11" width="2" height="2" fill="#3D2817" />
    <rect x="5" y="4" width="1" height="1" fill="#E8C39E" />
    <rect x="10" y="6" width="1" height="1" fill="#E8C39E" />
    <rect x="7" y="9" width="1" height="1" fill="#E8C39E" />
  </svg>
);

const TiltCard = ({ children, className, style, intensity = 12, onMouseEnter, onMouseLeave }) => {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    onMouseLeave && onMouseLeave();
  };
  return (
    <div ref={ref} className={className} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={onMouseEnter}>
      {children}
    </div>
  );
};

const TerminalWidget = ({ onClose }) => {
  const [stage, setStage] = useState('idle');
  const [output, setOutput] = useState([]);
  const [terminalPos, setTerminalPos] = useState({ x: 60, y: 60 });
  const [glitch, setGlitch] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const termRef = useRef(null);
  const timersRef = useRef([]);

  const clampPosition = useCallback((x, y) => {
    const termWidth = termRef.current ? termRef.current.offsetWidth : 520;
    const termHeight = termRef.current ? termRef.current.offsetHeight : 400;
    const maxX = Math.max(20, window.innerWidth - termWidth - 20);
    const maxY = Math.max(20, window.innerHeight - termHeight - 20);
    return {
      x: Math.max(20, Math.min(x, maxX)),
      y: Math.max(20, Math.min(y, maxY))
    };
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  const runCommand = () => {
    clearTimers();
    setStage('running');
    setOutput([]);
    const lines = [
      { text: 'riz@dev:~$ rm -rf /', delay: 0 },
      { text: 'rm: cannot remove \'/\': Permission denied', delay: 400 },
      { text: 'riz@dev:~$ sudo rm -rf /', delay: 800 },
      { text: '[sudo] password for riz: ', delay: 1200, type: 'input' },
      { text: '', delay: 2000 },
      { text: 'WARNING: You are about to delete the entire filesystem.', delay: 2200, type: 'warn' },
      { text: 'This action is irreversible. Type "YES" to continue:', delay: 2600, type: 'warn' },
      { text: 'riz@dev:~$ YES', delay: 3400 },
      { text: '', delay: 3600 },
      { text: 'Starting deletion sequence...', delay: 3800, type: 'info' },
      { text: '[  0%] Deleting /bin...', delay: 4200 },
      { text: '[ 12%] Deleting /boot...', delay: 4600 },
      { text: '[ 23%] Deleting /dev...', delay: 5000 },
      { text: '[ 34%] Deleting /etc...', delay: 5400 },
      { text: '[ 45%] Deleting /home...', delay: 5800 },
      { text: 'ERROR: Process 8472 (firefox) is using /home/user/.mozilla', delay: 6200, type: 'error' },
      { text: 'Killing process 8472...', delay: 6600 },
      { text: '[ 56%] Deleting /lib...', delay: 7000 },
      { text: '[ 67%] Deleting /opt...', delay: 7400 },
      { text: '[ 78%] Deleting /proc...', delay: 7800 },
      { text: 'WARNING: /proc is a virtual filesystem. This is a bad idea.', delay: 8200, type: 'warn' },
      { text: '[ 89%] Deleting /root...', delay: 8600 },
      { text: '[ 95%] Deleting /sys...', delay: 9000 },
      { text: '[100%] Deleting /usr...', delay: 9400 },
      { text: '', delay: 9600 },
      { text: 'rm: cannot remove \'/var/run/docker.sock\': No such file or directory', delay: 9800, type: 'error' },
      { text: 'rm: cannot remove \'/tmp/.X11-unix/X0\': No such file or directory', delay: 10000, type: 'error' },
      { text: '', delay: 10200 },
      { text: 'Deletion complete. 847,293 files removed.', delay: 10400, type: 'success' },
      { text: 'Freeing memory... OK', delay: 10800 },
      { text: 'Syncing disks... OK', delay: 11200 },
      { text: 'Rebooting system...', delay: 11600 },
      { text: '', delay: 12000 },
      { text: 'KERNEL PANIC - NOT SYNCING: VFS: Unable to mount root fs', delay: 12400, type: 'critical' },
      { text: 'CPU: 0 PID: 1 Comm: swapper/0 Not tainted 5.15.0-generic', delay: 12600, type: 'critical' },
      { text: 'Call Trace:', delay: 12800, type: 'critical' },
      { text: '  ? panic+0x18b/0x3a0', delay: 13000, type: 'critical' },
      { text: '  ? mount_block_root+0x234/0x280', delay: 13200, type: 'critical' },
      { text: '', delay: 13400 },
      { text: '---[ end Kernel panic - not syncing: VFS ]---', delay: 13600, type: 'critical' },
      { text: '', delay: 14000 },
      { text: 'just kidding lol', delay: 14500, type: 'joke' },
      { text: 'your computer is fine', delay: 15000, type: 'joke' },
      { text: 'but here, have a cookie:', delay: 15500, type: 'joke' },
    ];
    lines.forEach((line) => {
      const t = setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (line.type === 'critical') {
          setGlitch(true);
          const t2 = setTimeout(() => setGlitch(false), 150);
          timersRef.current.push(t2);
        }
        if (line.type === 'joke') {
          setShowCookie(true);
        }
      }, line.delay);
      timersRef.current.push(t);
    });
    const t3 = setTimeout(() => setStage('done'), 16000);
    timersRef.current.push(t3);
  };

  const reset = () => {
    clearTimers();
    setStage('idle');
    setOutput([]);
    setShowCookie(false);
    setGlitch(false);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragRef.current.isDragging) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const pos = clampPosition(
        clientX - dragRef.current.offsetX,
        clientY - dragRef.current.offsetY
      );
      setTerminalPos(pos);
    };
    const handleUp = () => { dragRef.current.isDragging = false; };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [clampPosition]);

  useEffect(() => {
    const handleResize = () => {
      setTerminalPos(prev => clampPosition(prev.x, prev.y));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition]);

  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = termRef.current.getBoundingClientRect();
    dragRef.current = {
      isDragging: true,
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  };

  const handleClose = (e) => {
    e.stopPropagation();
    clearTimers();
    onClose();
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'warn': return '#FFB84D';
      case 'error': return '#D85A30';
      case 'critical': return '#ff0000';
      case 'success': return '#1D9E75';
      case 'info': return '#7F77DD';
      case 'joke': return '#1D9E75';
      case 'input': return '#a1a1aa';
      default: return '#e4e4e7';
    }
  };

  return (
    <div
      ref={termRef}
      className={`terminal-widget ${glitch ? 'terminal-glitch' : ''}`}
      style={{
        position: 'fixed',
        left: `${terminalPos.x}px`,
        top: `${terminalPos.y}px`,
        zIndex: 1000
      }}
    >
      <div className="terminal-window">
        <div
          className="terminal-header"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={handleClose} role="button" aria-label="Close terminal"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title">bash - 80x24</div>
          <div style={{ width: '40px' }}></div>
        </div>
        <div className="terminal-scanlines"></div>
        <div className="terminal-body">
          {stage === 'idle' && (
            <>
              <div className="term-line">
                <span className="term-prompt">riz@dev:~$</span>
                <span className="term-cmd"> cat readme.txt</span>
              </div>
              <div className="term-line term-muted" style={{ marginTop: '0.5rem' }}>
                &gt; hey, so i wrote this thing that pretends to delete your computer
              </div>
              <div className="term-line term-muted">
                &gt; it's a joke. don't actually run rm -rf /
              </div>
              <div className="term-line term-muted">
                &gt; (seriously, that command is bad news)
              </div>
              <div className="term-line" style={{ marginTop: '1rem' }}>
                <span className="term-prompt">riz@dev:~$</span>
                <span className="term-cmd"> ./run_prank.sh</span>
              </div>
              <button className="term-run-btn" onClick={runCommand}>
                [ execute ]
              </button>
            </>
          )}
          {(stage === 'running' || stage === 'done') && (
            <>
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`term-line ${line.type === 'critical' ? 'term-critical-line' : ''}`}
                  style={{ color: getLineColor(line.type) }}
                >
                  {line.type === 'input' ? (
                    <>
                      {line.text}
                      <span className="term-cursor-block"></span>
                    </>
                  ) : (
                    line.text || '\u00A0'
                  )}
                </div>
              ))}
              {stage === 'done' && showCookie && (
                <>
                  <div className="cookie-display">
                    <PixelCookie size={96} />
                  </div>
                  <div className="term-line term-joke" style={{ marginTop: '1rem' }}>
                    there you go. a pixel cookie.
                  </div>
                  <div className="term-line term-muted">
                    (it's not real, just like the panic above)
                  </div>
                  <button className="term-run-btn" onClick={reset} style={{ marginTop: '1rem' }}>
                    [ run again? ]
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [view, setView] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [typedBio, setTypedBio] = useState("");
  const [voxels, setVoxels] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef(null);
  const cursorPosRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  const fullBio = "hey, i'm riz. i build stuff on the internet — websites, apps, weird interactive things. i like clean code, chaotic animations, and the feeling when something finally works at 3am. currently turning caffeine into pixels.";

  const catPositions = [
    { id: 0, x: '8%', y: '20%' },
    { id: 1, x: '85%', y: '25%' },
    { id: 2, x: '50%', y: '75%' }
  ];

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    const newVoxels = Array.from({ length: 18 }, (_, i) => {
      const depth = Math.random();
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        depth: depth,
        color: ['#7F77DD', '#1D9E75', '#D85A30', '#185FA5'][Math.floor(Math.random() * 4)],
        colorDark: ['#534AB7', '#0F6E56', '#993C1D', '#0D3A6B'][Math.floor(Math.random() * 4)],
        colorDarker: ['#3a2f8f', '#084535', '#6b2a15', '#072545'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 5,
        size: 20 + depth * 40
      };
    });
    setVoxels(newVoxels);

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullBio.length) {
        setTypedBio(fullBio.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const animateCursor = () => {
      const current = cursorPosRef.current;
      const target = targetPosRef.current;
      const lerp = 0.25;
      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x - 12}px, ${current.y - 12}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };
    rafRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);

      if (containerRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        containerRef.current.style.setProperty('--mx', x);
        containerRef.current.style.setProperty('--my', y);
      }
    };

    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, cursorVisible]);

  const handleViewChange = useCallback((newView) => {
    if (newView === view) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setView(newView);
      if (newView === 'projects' && projects.length === 0) {
        fetchProjects();
      }
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400);
  }, [view, projects.length]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch('https://api.github.com/users/STEVEALEX-source/repos?sort=stars&per_page=10');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProjects(data.map(repo => ({
        id: repo.id,
        title: repo.name,
        desc: repo.description || 'No description available',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || 'N/A',
        color: ['#7F77DD', '#1D9E75', '#D85A30', '#185FA5'][Math.floor(Math.random() * 4)]
      })));
    } catch (error) {
      setApiError('Failed to load repositories. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleHoverEnter = () => {
    if (cursorRef.current) cursorRef.current.classList.add('hovering');
  };
  const handleHoverLeave = () => {
    if (cursorRef.current) cursorRef.current.classList.remove('hovering');
  };

  return (
    <div
      ref={containerRef}
      className={isTouchDevice ? 'touch-device' : ''}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d12 70%, #050508 100%)',
        color: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        '--mx': 0,
        '--my': 0,
        imageRendering: 'pixelated',
        perspective: '1500px',
        perspectiveOrigin: '50% 50%',
        cursor: isTouchDevice ? 'auto' : 'none'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; image-rendering: pixelated; }
        body { background: #0d0d12; color: #ffffff; overflow-x: hidden; -webkit-font-smoothing: none; }
        a, button { cursor: ${isTouchDevice ? 'pointer' : 'none'}; }

        .voxel-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        .voxel {
          position: absolute;
          width: var(--size); height: var(--size);
          transform-style: preserve-3d;
          transform: 
            translate3d(
              calc(var(--mx) * calc(var(--depth) * -40px - 10px)), 
              calc(var(--my) * calc(var(--depth) * -40px - 10px) - 20px), 
              calc(var(--depth) * 100px - 50px)
            )
            rotateX(calc(var(--my) * 10deg))
            rotateY(calc(var(--mx) * -10deg));
          transition: transform 0.15s ease-out;
          animation: floatVoxel3D 8s ease-in-out infinite;
        }
        .voxel::before, .voxel::after {
          content: '';
          position: absolute;
          width: var(--size);
          height: var(--size);
        }
        .voxel::before {
          background: var(--color);
          transform: translateZ(calc(var(--size) / 2)) rotateX(90deg);
          transform-origin: bottom;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.2);
        }
        .voxel::after {
          background: var(--color-dark);
          transform: translateX(calc(var(--size) / 2)) rotateY(90deg);
          transform-origin: left;
          box-shadow: inset 0 0 0 2px rgba(0,0,0,0.3);
        }
        .voxel-face-front {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: var(--color);
          transform: translateZ(calc(var(--size) / 2));
          box-shadow: 
            inset 0 0 0 2px rgba(255,255,255,0.15),
            inset -4px -4px 0 rgba(0,0,0,0.2);
        }
        .voxel-face-back {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: var(--color-darker);
          transform: translateZ(calc(var(--size) / -2)) rotateY(180deg);
        }
        .voxel-face-left {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: var(--color-dark);
          transform: translateX(calc(var(--size) / -2)) rotateY(-90deg);
          transform-origin: right;
          box-shadow: inset 0 0 0 2px rgba(0,0,0,0.4);
        }
        .voxel-face-bottom {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: var(--color-darker);
          transform: translateY(calc(var(--size) / 2)) rotateX(-90deg);
          transform-origin: top;
        }
        @keyframes floatVoxel3D {
          0%, 100% { 
            transform: 
              translate3d(
                calc(var(--mx) * calc(var(--depth) * -40px - 10px)), 
                calc(var(--my) * calc(var(--depth) * -40px - 10px)), 
                calc(var(--depth) * 100px - 50px)
              )
              rotateX(calc(var(--my) * 10deg))
              rotateY(calc(var(--mx) * -10deg))
              rotateZ(0deg);
          }
          50% { 
            transform: 
              translate3d(
                calc(var(--mx) * calc(var(--depth) * -40px - 10px)), 
                calc(var(--my) * calc(var(--depth) * -40px - 10px) - 30px), 
                calc(var(--depth) * 100px - 50px)
              )
              rotateX(calc(var(--my) * 10deg + 15deg))
              rotateY(calc(var(--mx) * -10deg + 20deg))
              rotateZ(5deg);
          }
        }
        .pixel-grid {
          position: fixed; 
          top: 50%; left: 0; 
          width: 200%; height: 200%;
          margin-left: -50%;
          margin-top: -10%;
          z-index: 1;
          background-image: 
            linear-gradient(rgba(127, 119, 221, 0.15) 2px, transparent 2px),
            linear-gradient(90deg, rgba(127, 119, 221, 0.15) 2px, transparent 2px);
          background-size: 60px 60px;
          transform: perspective(800px) rotateX(65deg) translateZ(-100px);
          transform-origin: center top;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          animation: gridScroll 20s linear infinite;
        }
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          background: #fff;
          pointer-events: none;
          z-index: 99999;
          transform: translate3d(-100px, -100px, 0);
          will-change: transform;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 25% 50%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 50%, 0 50%);
          box-shadow: 0 0 12px rgba(255,255,255,0.6);
          opacity: 0;
          transition: width 0.15s, height 0.15s, background 0.15s, opacity 0.2s;
        }
        .custom-cursor.visible { opacity: 1; }
        .custom-cursor.hovering {
          width: 40px;
          height: 40px;
          background: #7F77DD;
          box-shadow: 0 0 20px rgba(127, 119, 221, 0.8);
        }
        .pixel-card {
          background: #1a1a24;
          border: 4px solid #ffffff;
          position: relative;
          padding: 3rem;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
          box-shadow: 
            4px 0 0 0 #ffffff, -4px 0 0 0 #ffffff,
            0 4px 0 0 #ffffff, 0 -4px 0 0 #ffffff,
            4px 4px 0 0 #888,
            8px 8px 0 0 #666,
            12px 12px 0 0 #444,
            16px 16px 0 0 #222,
            20px 20px 0 0 #111,
            24px 24px 0 0 #000,
            30px 30px 60px 0 rgba(0,0,0,0.8);
        }
        .pixel-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(to right, rgba(255,255,255,0.3), transparent);
          pointer-events: none;
        }
        .pixel-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
          pointer-events: none;
        }
        .hero-label {
          font-family: 'Press Start 2P', cursive; font-size: 0.7rem; color: #7F77DD;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2rem;
          display: flex; align-items: center; gap: 1rem;
          transform: translateZ(30px);
          text-shadow:
            1px 1px 0 #000,
            2px 2px 0 #534AB7,
            3px 3px 0 #3a2f8f,
            4px 4px 0 #2a1f6f,
            5px 5px 0 #1a0f4f,
            6px 6px 15px rgba(127, 119, 221, 0.8);
        }
        .hero-label::before { 
          content: ''; width: 30px; height: 4px; background: #7F77DD; 
          box-shadow: 
            2px 2px 0 #000,
            3px 3px 0 #534AB7,
            4px 4px 0 #3a2f8f,
            5px 5px 0 #2a1f6f,
            6px 6px 10px rgba(0,0,0,0.6);
        }
        .hero-title {
          font-family: 'Press Start 2P', cursive;
          font-size: clamp(1.5rem, 4vw, 2.5rem); line-height: 1.4; margin-bottom: 2rem;
          transform: translateZ(50px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #1a1a2e,
            3px 3px 0 #000,
            4px 4px 0 rgba(127, 119, 221, 0.7),
            5px 5px 0 rgba(127, 119, 221, 0.6),
            6px 6px 0 rgba(127, 119, 221, 0.5),
            7px 7px 0 rgba(127, 119, 221, 0.4),
            8px 8px 0 rgba(127, 119, 221, 0.3),
            9px 9px 0 rgba(127, 119, 221, 0.2),
            10px 10px 0 rgba(127, 119, 221, 0.1),
            12px 12px 30px rgba(0,0,0,0.8);
        }
        .hero-title span { 
          color: #7F77DD;
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #534AB7,
            3px 3px 0 #3a2f8f,
            4px 4px 0 #2a1f6f,
            5px 5px 0 #1a0f4f,
            6px 6px 0 #0a052f,
            7px 7px 0 #000,
            8px 8px 15px rgba(127, 119, 221, 0.9),
            10px 10px 25px rgba(127, 119, 221, 0.6);
        }
        .bio-text {
          font-family: 'VT323', monospace; font-size: clamp(1.4rem, 3vw, 1.8rem);
          color: #a1a1aa; line-height: 1.4; max-width: 600px; margin-bottom: 3rem;
          min-height: 120px;
          transform: translateZ(20px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #1a1a2e,
            3px 3px 0 #000,
            4px 4px 10px rgba(0,0,0,0.6);
        }
        .typing-cursor {
          display: inline-block; width: 12px; height: 1.2em; background: #7F77DD;
          animation: blink 0.8s step-end infinite; vertical-align: text-bottom; margin-left: 4px;
          box-shadow: 
            2px 2px 0 #000,
            3px 3px 0 #534AB7,
            4px 4px 0 #3a2f8f,
            5px 5px 10px rgba(0,0,0,0.6);
        }
        @keyframes blink { 50% { opacity: 0; } }
        .btn-group { 
          display: flex; gap: 1.5rem; flex-wrap: wrap;
          transform: translateZ(40px);
        }
        .pixel-btn {
          position: relative; display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 1rem 1.5rem; background: #ffffff; color: #0d0d12;
          border: none; font-family: 'Press Start 2P', cursive; font-size: 0.65rem;
          cursor: ${isTouchDevice ? 'pointer' : 'none'};
          transition: transform 0.1s steps(3, end);
          text-decoration: none;
          text-shadow:
            1px 1px 0 #ccc,
            2px 2px 0 #aaa;
          box-shadow: 
            3px 0 0 0 #ffffff, -3px 0 0 0 #ffffff,
            0 3px 0 0 #ffffff, 0 -3px 0 0 #ffffff,
            3px 3px 0 0 #aaa,
            6px 6px 0 0 #888,
            9px 9px 0 0 #666,
            12px 12px 0 0 #444,
            15px 15px 0 0 #222,
            18px 18px 0 0 #000,
            20px 20px 30px 0 rgba(0,0,0,0.5);
          transform-style: preserve-3d;
        }
        .pixel-btn:hover { 
          transform: translate(-3px, -3px) translateZ(10px);
        }
        .pixel-btn:active { 
          transform: translate(12px, 12px);
          box-shadow: 
            3px 0 0 0 #ffffff, -3px 0 0 0 #ffffff,
            0 3px 0 0 #ffffff, 0 -3px 0 0 #ffffff,
            3px 3px 0 0 #000;
        }
        .pixel-btn-secondary {
          background: transparent; color: #ffffff; 
          border: 3px solid #ffffff;
          text-shadow:
            1px 1px 0 #000,
            2px 2px 0 #555,
            3px 3px 0 #333;
          box-shadow: 
            3px 0 0 0 #ffffff, -3px 0 0 0 #ffffff,
            0 3px 0 0 #ffffff, 0 -3px 0 0 #ffffff,
            3px 3px 0 0 #aaa,
            6px 6px 0 0 #888,
            9px 9px 0 0 #666,
            12px 12px 0 0 #444,
            15px 15px 0 0 #222,
            18px 18px 0 0 #000,
            20px 20px 30px 0 rgba(0,0,0,0.5);
        }
        .pixel-btn-secondary:hover { 
          background: rgba(255,255,255,0.1);
          transform: translate(-3px, -3px) translateZ(10px);
        }
        .projects-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem;
          flex-wrap: wrap; gap: 1rem;
        }
        .section-title {
          font-family: 'Press Start 2P', cursive; font-size: 1.2rem;
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #1a1a2e,
            3px 3px 0 #000,
            4px 4px 0 rgba(127, 119, 221, 0.6),
            5px 5px 0 rgba(127, 119, 221, 0.5),
            6px 6px 0 rgba(127, 119, 221, 0.4),
            7px 7px 0 rgba(127, 119, 221, 0.3),
            8px 8px 25px rgba(0,0,0,0.9);
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 0.5rem; background: transparent;
          border: 3px solid #ffffff; color: #ffffff; padding: 0.75rem 1rem;
          font-family: 'Press Start 2P', cursive; font-size: 0.5rem; cursor: ${isTouchDevice ? 'pointer' : 'none'};
          text-shadow:
            1px 1px 0 #000,
            2px 2px 0 #555;
          box-shadow: 
            3px 3px 0 0 #aaa,
            6px 6px 0 0 #888,
            9px 9px 0 0 #666,
            12px 12px 0 0 #000;
          transition: all 0.1s steps(3, end);
        }
        .back-btn:hover { transform: translate(-2px, -2px); }
        .back-btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 0 #000; }
        .projects-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem;
          perspective: 1000px;
        }
        .project-card {
          background: #15151e; border: 3px solid #333;
          padding: 1.5rem;
          transform-style: preserve-3d; 
          transition: transform 0.15s ease-out, border-color 0.2s;
          opacity: 0; animation: staggerFadeIn 0.5s forwards;
          box-shadow: 
            3px 0 0 0 #333, -3px 0 0 0 #333,
            0 3px 0 0 #333, 0 -3px 0 0 #333,
            3px 3px 0 0 #222,
            6px 6px 0 0 #111,
            9px 9px 0 0 #000,
            12px 12px 20px 0 rgba(0,0,0,0.6);
        }
        .project-card:hover { 
          border-color: #7F77DD;
          transform: translateZ(30px);
        }
        @keyframes staggerFadeIn { 
          from { opacity: 0; transform: translateZ(-100px) rotateX(-10deg); }
          to { opacity: 1; transform: translateZ(0) rotateX(0); }
        }
        .project-title {
          font-family: 'Press Start 2P', cursive; font-size: 0.75rem; margin-bottom: 1rem;
          color: #ffffff; line-height: 1.4;
          transform: translateZ(20px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #1a1a2e,
            3px 3px 0 #000,
            4px 4px 8px rgba(0,0,0,0.7);
        }
        .project-desc {
          font-family: 'VT323', monospace; font-size: 1.3rem; color: #a1a1aa;
          line-height: 1.3; margin-bottom: 1.5rem; flex-grow: 1;
          transform: translateZ(10px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 5px rgba(0,0,0,0.5);
        }
        .project-meta {
          display: flex; align-items: center; gap: 1.5rem; font-family: 'VT323', monospace;
          font-size: 1.2rem; color: #71717a; margin-bottom: 1.5rem;
          transform: translateZ(15px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 4px rgba(0,0,0,0.5);
        }
        .meta-item { display: flex; align-items: center; gap: 0.5rem; }
        .lang-dot { 
          width: 10px; height: 10px; 
          box-shadow: 
            2px 2px 0 #000,
            3px 3px 5px rgba(0,0,0,0.6);
        }
        .project-link {
          display: inline-flex; align-items: center; gap: 0.5rem; color: #7F77DD;
          text-decoration: none; font-family: 'Press Start 2P', cursive; font-size: 0.6rem;
          transition: gap 0.2s, transform 0.2s;
          transform: translateZ(25px);
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #534AB7,
            3px 3px 0 #3a2f8f,
            4px 4px 8px rgba(127, 119, 221, 0.7);
        }
        .project-link:hover { gap: 0.75rem; color: #9d97e6; transform: translateZ(35px); }
        .loading-container {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 300px; gap: 1.5rem;
        }
        .pixel-loader {
          width: 32px; height: 32px; background: #7F77DD;
          box-shadow: 
            4px 0 0 #fff, 0 4px 0 #fff, 
            4px 4px 0 #534AB7,
            8px 8px 0 #000;
          animation: spinPixel 0.8s steps(4) infinite;
        }
        @keyframes spinPixel { to { transform: rotate(360deg); } }
        .loading-text { 
          font-family: 'VT323', monospace; font-size: 1.5rem; color: #71717a;
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 5px rgba(0,0,0,0.6);
        }
        .cat-container {
          position: fixed; z-index: 50; pointer-events: none;
          filter: 
            drop-shadow(4px 4px 0px #000)
            drop-shadow(8px 8px 0px rgba(0,0,0,0.5))
            drop-shadow(12px 12px 20px rgba(0,0,0,0.8));
        }
        .cat-style-0 { animation: catChaos0 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite; }
        @keyframes catChaos0 {
          0%   { transform: translateY(0) rotate(0deg) scale(1); }
          15%  { transform: translateY(-40px) rotate(90deg) scale(1.2); }
          30%  { transform: translateY(0) rotate(180deg) scale(0.9); }
          45%  { transform: translateY(-25px) rotate(270deg) scale(1.15); }
          60%  { transform: translateY(0) rotate(360deg) scale(1); }
          75%  { transform: translateY(-50px) rotate(450deg) scale(1.3); }
          90%  { transform: translateY(10px) rotate(630deg) scale(0.8); }
          100% { transform: translateY(0) rotate(720deg) scale(1); }
        }
        .cat-style-1 { animation: catChaos1 2s ease-in-out infinite; }
        @keyframes catChaos1 {
          0%   { transform: translate(0, 0) rotate(0deg) skewX(0deg) scale(1); }
          12%  { transform: translate(-25px, -15px) rotate(-25deg) skewX(20deg) scale(1.2); }
          25%  { transform: translate(20px, 10px) rotate(30deg) skewX(-15deg) scale(0.85); }
          37%  { transform: translate(-15px, -30px) rotate(-40deg) skewX(25deg) scale(1.3); }
          50%  { transform: translate(25px, 15px) rotate(45deg) skewX(-20deg) scale(0.9); }
          62%  { transform: translate(-30px, -10px) rotate(-35deg) skewX(15deg) scale(1.15); }
          75%  { transform: translate(15px, 20px) rotate(20deg) skewX(-10deg) scale(1); }
          87%  { transform: translate(-10px, -20px) rotate(-15deg) skewX(10deg) scale(1.1); }
          100% { transform: translate(0, 0) rotate(0deg) skewX(0deg) scale(1); }
        }
        .cat-style-2 { animation: catChaos2 1.8s linear infinite; }
        @keyframes catChaos2 {
          0%   { transform: scale(1) rotate(0deg); }
          25%  { transform: scale(1.4) rotate(90deg); }
          50%  { transform: scale(0.7) rotate(180deg); }
          75%  { transform: scale(1.3) rotate(270deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        .cat-style-0 .left-arm-cat0  { animation: limb0A 0.4s ease-in-out infinite; }
        .cat-style-0 .right-arm-cat0 { animation: limb0A 0.4s ease-in-out infinite reverse; }
        .cat-style-0 .left-leg-cat0  { animation: limb0B 0.3s ease-in-out infinite; }
        .cat-style-0 .right-leg-cat0 { animation: limb0B 0.3s ease-in-out infinite reverse; }
        @keyframes limb0A { 0%, 100% { transform: rotate(-30deg); } 50% { transform: rotate(-150deg); } }
        @keyframes limb0B { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-60deg); } }
        .cat-style-1 .left-arm-cat1  { animation: limb1A 0.25s ease-in-out infinite; }
        .cat-style-1 .right-arm-cat1 { animation: limb1A 0.25s ease-in-out infinite reverse; }
        .cat-style-1 .left-leg-cat1  { animation: limb1B 0.2s ease-in-out infinite; }
        .cat-style-1 .right-leg-cat1 { animation: limb1B 0.2s ease-in-out infinite reverse; }
        @keyframes limb1A { 0%, 100% { transform: rotate(-45deg); } 50% { transform: rotate(-180deg); } }
        @keyframes limb1B { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
        .cat-style-2 .left-arm-cat2  { animation: limb2A 0.15s linear infinite; }
        .cat-style-2 .right-arm-cat2 { animation: limb2A 0.15s linear infinite reverse; }
        .cat-style-2 .left-leg-cat2  { animation: limb2B 0.15s linear infinite; }
        .cat-style-2 .right-leg-cat2 { animation: limb2B 0.15s linear infinite reverse; }
        @keyframes limb2A { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes limb2B { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        .terminal-widget {
          animation: terminalAppear 0.3s steps(6, end);
          font-family: 'VT323', monospace;
          max-width: calc(100vw - 40px);
        }
        .terminal-glitch {
          animation: terminalGlitch 0.15s steps(5, end);
        }
        @keyframes terminalGlitch {
          0% { transform: translate(0, 0) skewX(0deg); filter: hue-rotate(0deg); }
          20% { transform: translate(-4px, 2px) skewX(-3deg); filter: hue-rotate(90deg); }
          40% { transform: translate(4px, -2px) skewX(3deg); filter: hue-rotate(180deg); }
          60% { transform: translate(-3px, -4px) skewX(-2deg); filter: hue-rotate(270deg); }
          80% { transform: translate(3px, 4px) skewX(2deg); filter: hue-rotate(360deg); }
          100% { transform: translate(0, 0) skewX(0deg); filter: hue-rotate(0deg); }
        }
        @keyframes terminalAppear {
          from { opacity: 0; transform: scale(0.5) translateY(-40px) rotateX(-30deg); }
          to { opacity: 1; transform: scale(1) translateY(0) rotateX(0); }
        }
        .terminal-window {
          width: 520px;
          max-width: calc(100vw - 40px);
          background: #000000;
          border: 4px solid #7F77DD;
          position: relative;
          overflow: hidden;
          image-rendering: pixelated;
          box-shadow: 
            4px 0 0 0 #7F77DD, -4px 0 0 0 #7F77DD,
            0 4px 0 0 #7F77DD, 0 -4px 0 0 #7F77DD,
            4px 4px 0 0 #534AB7,
            8px 8px 0 0 #3a2f8f,
            12px 12px 0 0 #000,
            16px 16px 0 0 rgba(0,0,0,0.8),
            20px 20px 40px 0 rgba(127, 119, 221, 0.4);
        }
        .terminal-scanlines {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 2px,
            transparent 2px,
            transparent 4px
          );
          pointer-events: none;
          z-index: 3;
        }
        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: #1a1a24;
          border-bottom: 3px solid #7F77DD;
          cursor: grab;
          user-select: none;
          position: relative;
          z-index: 2;
          touch-action: none;
        }
        .terminal-header:active { cursor: grabbing; }
        .terminal-dots { display: flex; gap: 6px; }
        .dot {
          width: 14px; height: 14px;
          cursor: ${isTouchDevice ? 'pointer' : 'none'};
          transition: all 0.1s steps(2, end);
          border: 2px solid #000;
          box-shadow: 2px 2px 0 0 rgba(0,0,0,0.5);
          display: inline-block;
        }
        .dot:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 0 rgba(0,0,0,0.5); }
        .dot:active { transform: translate(2px, 2px); box-shadow: 0 0 0 0 rgba(0,0,0,0.5); }
        .dot-red { background: #D85A30; }
        .dot-yellow { background: #FFB84D; }
        .dot-green { background: #1D9E75; }
        .terminal-title {
          font-family: 'Press Start 2P', cursive;
          font-size: 0.55rem;
          color: #7F77DD;
          letter-spacing: 1px;
          text-shadow: 2px 2px 0 #000;
        }
        .terminal-body {
          padding: 1rem;
          min-height: 300px;
          max-height: 60vh;
          overflow-y: auto;
          color: #e4e4e7;
          font-family: 'VT323', monospace;
          font-size: 1.15rem;
          line-height: 1.4;
          position: relative;
          z-index: 2;
          background: #000;
        }
        .terminal-body::-webkit-scrollbar { width: 12px; }
        .terminal-body::-webkit-scrollbar-track { background: #1a1a24; border-left: 2px solid #7F77DD; }
        .terminal-body::-webkit-scrollbar-thumb {
          background: #7F77DD;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
        }
        .term-line {
          margin-bottom: 0.2rem;
          word-break: break-word;
          font-family: 'VT323', monospace;
          white-space: pre-wrap;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.8);
          letter-spacing: 0.5px;
        }
        .term-prompt { 
          color: #1D9E75; 
          font-weight: bold; 
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #0F6E56,
            3px 3px 5px rgba(0,0,0,0.7);
        }
        .term-cmd { 
          color: #ffffff; 
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 4px rgba(0,0,0,0.6);
        }
        .term-muted { 
          color: #666; 
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 3px rgba(0,0,0,0.5);
        }
        .term-critical-line {
          animation: criticalPulse 0.4s steps(3, end) infinite;
          text-shadow: 
            0 0 8px currentColor,
            1px 1px 0 #000,
            2px 2px 5px rgba(0,0,0,0.8);
        }
        @keyframes criticalPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .term-cursor-block {
          display: inline-block;
          width: 10px; height: 16px;
          background: #fff;
          animation: cursorBlink 0.8s steps(2, end) infinite;
          vertical-align: middle;
          margin-left: 2px;
          box-shadow: 
            2px 2px 0 #000,
            3px 3px 5px rgba(0,0,0,0.6);
        }
        @keyframes cursorBlink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .term-joke { 
          color: #1D9E75; 
          font-weight: bold; 
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #0F6E56,
            3px 3px 5px rgba(0,0,0,0.7);
        }
        .cookie-display {
          display: flex; justify-content: center; align-items: center;
          margin: 1.5rem 0;
          animation: cookieBounce 0.5s steps(8, end);
          filter: drop-shadow(4px 4px 0 #000) drop-shadow(8px 8px 0 rgba(0,0,0,0.5));
        }
        @keyframes cookieBounce {
          0% { transform: scale(0) rotate(-180deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0); }
        }
        .term-run-btn {
          margin-top: 1rem;
          padding: 0.6rem 1rem;
          background: transparent;
          color: #1D9E75;
          border: 3px solid #1D9E75;
          font-family: 'Press Start 2P', cursive;
          font-size: 0.6rem;
          cursor: ${isTouchDevice ? 'pointer' : 'none'};
          transition: all 0.1s steps(2, end);
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 
            1px 1px 0 #000,
            2px 2px 0 #0F6E56;
          box-shadow: 
            3px 3px 0 0 #0F6E56,
            6px 6px 0 0 #000;
        }
        .term-run-btn:hover {
          background: #1D9E75;
          color: #000;
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 0 #0F6E56, 8px 8px 0 0 #000;
          text-shadow: none;
        }
        .term-run-btn:active {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 0 #000;
        }
        .terminal-toggle-btn {
          position: fixed;
          bottom: 2rem; right: 2rem;
          width: 56px; height: 56px;
          background: #7F77DD;
          border: 3px solid #ffffff;
          display: flex; align-items: center; justify-content: center;
          cursor: ${isTouchDevice ? 'pointer' : 'none'};
          z-index: 100;
          transition: all 0.1s steps(3, end);
          color: #ffffff;
          box-shadow: 
            3px 0 0 0 #fff, -3px 0 0 0 #fff,
            0 3px 0 0 #fff, 0 -3px 0 0 #fff,
            3px 3px 0 0 #534AB7,
            6px 6px 0 0 #3a2f8f,
            9px 9px 0 0 #000,
            12px 12px 20px 0 rgba(0,0,0,0.6);
          animation: togglePulse 3s ease-in-out infinite;
        }
        @keyframes togglePulse {
          0%, 100% { box-shadow: 3px 0 0 0 #fff, -3px 0 0 0 #fff, 0 3px 0 0 #fff, 0 -3px 0 0 #fff, 3px 3px 0 0 #534AB7, 6px 6px 0 0 #3a2f8f, 9px 9px 0 0 #000, 12px 12px 20px 0 rgba(0,0,0,0.6); }
          50% { box-shadow: 3px 0 0 0 #fff, -3px 0 0 0 #fff, 0 3px 0 0 #fff, 0 -3px 0 0 #fff, 3px 3px 0 0 #534AB7, 6px 6px 0 0 #3a2f8f, 9px 9px 0 0 #000, 12px 12px 20px 0 rgba(0,0,0,0.6), 0 0 25px rgba(127, 119, 221, 0.7); }
        }
        .terminal-toggle-btn:hover {
          transform: translate(-3px, -3px);
          box-shadow: 
            3px 0 0 0 #fff, -3px 0 0 0 #fff,
            0 3px 0 0 #fff, 0 -3px 0 0 #fff,
            3px 3px 0 0 #534AB7,
            6px 6px 0 0 #3a2f8f,
            9px 9px 0 0 #000,
            12px 12px 0 0 rgba(0,0,0,0.8),
            15px 15px 30px 0 rgba(127, 119, 221, 0.5);
        }
        .terminal-toggle-btn:active { 
          transform: translate(6px, 6px); 
          box-shadow: 
            3px 0 0 0 #fff, -3px 0 0 0 #fff,
            0 3px 0 0 #fff, 0 -3px 0 0 #fff,
            3px 3px 0 0 #000;
        }
        .touch-device a,
        .touch-device button {
          cursor: pointer;
        }
        .touch-device .custom-cursor {
          display: none;
        }
        @media (max-width: 600px) {
          .pixel-card { padding: 1.5rem; }
          .btn-group { flex-direction: column; width: 100%; }
          .pixel-btn { width: 100%; justify-content: center; }
          .projects-grid { grid-template-columns: 1fr; }
          .terminal-window { width: calc(100vw - 40px); }
          .terminal-toggle-btn { bottom: 1rem; right: 1rem; }
          .cat-container { display: none; }
        }
      `}</style>

      <div className="voxel-bg">
        {voxels.map((voxel) => (
          <div key={voxel.id} className="voxel" style={{
            left: `${voxel.x}%`,
            top: `${voxel.y}%`,
            '--size': `${voxel.size}px`,
            '--color': voxel.color,
            '--color-dark': voxel.colorDark,
            '--color-darker': voxel.colorDarker,
            '--depth': voxel.depth,
            animationDelay: `${voxel.delay}s`
          }}>
            <div className="voxel-face-front"></div>
            <div className="voxel-face-back"></div>
            <div className="voxel-face-left"></div>
            <div className="voxel-face-bottom"></div>
          </div>
        ))}
      </div>

      <div className="pixel-grid" />

      {!isTouchDevice && (
        <div
          ref={cursorRef}
          className={`custom-cursor ${cursorVisible ? 'visible' : ''}`}
        />
      )}

      {view === 'home' && catPositions.map((cat, idx) => (
        <div
          key={cat.id}
          className={`cat-container cat-style-${idx}`}
          style={{ left: cat.x, top: cat.y }}
        >
          <CatSVG color={['#7F77DD', '#1D9E75', '#D85A30'][idx]} idx={idx} />
        </div>
      ))}

      <div className="view-container">
        {view === 'home' && (
          <TiltCard className={`view-content ${isTransitioning ? 'exiting' : 'active'}`} intensity={15}>
            <div className="pixel-card">
              <div className="hero-label">Developer & Builder</div>
              <h1 className="hero-title">
                hey, i'm <span>riz</span>.<br />
                i make things<br />for the internet.
              </h1>
              <div className="bio-text">
                {typedBio}
                <span className="typing-cursor"></span>
              </div>
              <div className="btn-group">
                <button
                  className="pixel-btn"
                  onClick={() => handleViewChange('projects')}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  VIEW PROJECTS <Icons.ArrowRight />
                </button>
                <a
                  href="https://github.com/STEVEALEX-source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn pixel-btn-secondary"
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  <Icons.Github /> GITHUB
                </a>
              </div>
            </div>
          </TiltCard>
        )}
        {view === 'projects' && (
          <div className={`view-content ${isTransitioning ? 'entering' : 'active'}`}>
            <div className="projects-header">
              <h2 className="section-title">SELECTED WORK</h2>
              <button
                className="back-btn"
                onClick={() => handleViewChange('home')}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <Icons.ArrowLeft /> BACK
              </button>
            </div>
            {loading ? (
              <div className="loading-container">
                <div className="pixel-loader"></div>
                <div className="loading-text">FETCHING REPOSITORIES...</div>
              </div>
            ) : apiError ? (
              <div className="loading-container">
                <div className="loading-text" style={{ color: '#D85A30' }}>{apiError}</div>
                <button className="pixel-btn" onClick={fetchProjects} style={{ marginTop: '1rem' }}>RETRY</button>
              </div>
            ) : (
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <TiltCard
                    key={project.id}
                    className="project-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    intensity={8}
                  >
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-meta">
                      <span className="meta-item">
                        <span className="lang-dot" style={{ background: project.color }}></span>
                        {project.language}
                      </span>
                      <span className="meta-item">
                        <Icons.Star /> {project.stars}
                      </span>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onMouseEnter={handleHoverEnter}
                      onMouseLeave={handleHoverLeave}
                    >
                      VIEW REPO <Icons.ArrowRight />
                    </a>
                  </TiltCard>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        className="terminal-toggle-btn"
        onClick={() => setShowTerminal(prev => !prev)}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        aria-label="Open terminal easter egg"
      >
        <Icons.Terminal />
      </button>
      {showTerminal && (
        <TerminalWidget onClose={() => setShowTerminal(false)} />
      )}
    </div>
  );
}
