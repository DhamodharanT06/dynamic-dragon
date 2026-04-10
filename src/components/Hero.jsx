import React, {useEffect, useRef} from 'react'

export default function Hero({onViewApps, onLatestClick, site}){
  const canvasRef = useRef(null)
  useEffect(()=>{ 
    document.documentElement.classList.add('dark')
    // Animate canvas particles
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    const resize = ()=>{
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      particles = Array.from({length:35}, ()=>({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2+0.5, vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2}))
    }
    const animate = ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.forEach(p=>{
        p.x = (p.x+p.vx+canvas.width)%canvas.width
        p.y = (p.y+p.vy+canvas.height)%canvas.height
        ctx.fillStyle = 'rgba(16,185,129,0.1)'
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }
    window.addEventListener('resize', resize)
    resize()
    animate()
    return ()=> window.removeEventListener('resize', resize)
  },[])
  const toggleTheme = ()=>{
    const light = document.documentElement.classList.toggle('light')
    document.documentElement.classList.toggle('dark', !light)
    localStorage.setItem('theme', light? 'light':'dark')
  }
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div className="logo-glass">
              <svg viewBox="0 0 48 48" className="logo-svg" aria-hidden>
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#10B981"/>
                    <stop offset="1" stopColor="#14B8A6"/>
                  </linearGradient>
                </defs>
                <rect x="4" y="6" width="40" height="36" rx="8" fill="url(#g)"/>
                <path d="M12 34c6-6 12-12 20-18" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="brand-text">
              <div className="brand-name">{site?.developerName || 'Dynamic Dragon Apps'}</div>
              <div className="brand-tag">Simple, Secure and Useful Android Apps</div>
            </div>
          </div>
          <nav className="header-actions">
            <button className="btn ghost" onClick={onViewApps}>View Apps</button>
            <button className="btn primary" onClick={onLatestClick}>Latest App</button>
            <button className="theme-toggle" onClick={toggleTheme}>Theme</button>
          </nav>
        </div>
      </header>

      <section className="hero" id="hero">
        <div className="hero-bg">
          <canvas id="hero-canvas" ref={canvasRef}></canvas>
          <div className="gradient-orb"></div>
        </div>
        <div className="container hero-inner">
          <div className="hero-left">
            <h1 className="hero-title">Simple, Secure and Useful Android Apps</h1>
            <p className="hero-lead">Built with privacy and performance in mind — utilities you can trust.</p>
            <div className="hero-ctas">
              <button className="btn lg primary" onClick={onViewApps}>View Apps</button>
              <button className="btn lg ghost" onClick={onLatestClick}>Latest App</button>
            </div>
          </div>
          <div className="hero-right">
            <div className="floating-card">
              <div className="card-icon">🐉</div>
              <div className="card-body">
                <strong>{site?.developerName || 'Dynamic Dragon'}</strong>
                <p>Android-first utilities — secure and lightweight.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
