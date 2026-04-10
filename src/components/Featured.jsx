import React from 'react'

export default function Featured({app}){
  if(!app) return null
  const [idx,setIdx] = React.useState(0)
  const screenshots = app.screenshots || []
  React.useEffect(()=> setIdx(0), [app.id])
  const next = ()=> setIdx((i)=> (i+1) % screenshots.length)
  const prev = ()=> setIdx((i)=> (i-1+screenshots.length) % screenshots.length)
  React.useEffect(()=>{
    if(screenshots.length <= 1) return
    const timer = setInterval(next, 4000)
    return ()=> clearInterval(timer)
  }, [screenshots.length])
  return (
    <section className="featured container" id="featured">
      <div className="featured-grid">
        <div className="featured-left">
          <div className="featured-icon"><img src={app.icon} alt={app.name} loading="lazy"/></div>
          <h2>{app.name} — {app.short}</h2>
          <p className="muted">{app.description || 'Explore the features of this app in the screenshots below.'}</p>
          <ul className="features">
            <li>Local encrypted storage</li>
            <li>Strong password generator</li>
            <li>Auto-lock & biometric unlock</li>
            <li>Offline-first, no account required</li>
          </ul>
          <div className="featured-ctas" style={{marginTop: '1.5rem'}}>
            <a className="btn primary lg" href={app.playStore} target="_blank" rel="noopener noreferrer">Install on Play Store</a>
          </div>
        </div>
        <div className="featured-right">
          <div className="phone-mockup">
            <div className="phone-screen">
              <img src={screenshots[idx]} alt="screenshot" loading="lazy"/>
            </div>
          </div>
          <div className="carousel-controls">
            <button className="carousel-btn prev" onClick={prev} aria-label="Previous screenshot">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="carousel-dots">
              {screenshots.map((_, i)=> <div key={i} className={`dot ${i===idx?'active':''}`} onClick={()=>setIdx(i)}></div>)}
            </div>
            <button className="carousel-btn next" onClick={next} aria-label="Next screenshot">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
