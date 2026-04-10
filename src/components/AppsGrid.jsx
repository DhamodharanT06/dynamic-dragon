import React, {useEffect} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AppsGrid({apps=[], onSelectApp}){
  useEffect(()=>{
    const cards = gsap.utils.toArray('.app-card')
    cards.forEach((c,i)=> gsap.from(c,{opacity:1,y:18,duration:0.6,delay:i*0.03,scrollTrigger:{trigger:c,start:'top 92%'}}))
  },[apps])

  return (
    <div id="apps-grid" className="apps-grid">
      {apps.map(app => (
        <div className="wrap" key={app.id}>
          <div className="stack app-card" role="article" tabIndex={0} style={{position:'relative'}} onKeyDown={e=> e.key==='Enter' && onSelectApp(app)} onClick={()=> onSelectApp(app)}>
            <div className="col">
              <div className="thumbnail"><img src={app.icon} alt={app.name} loading="lazy"/></div>
              <div className="meta">
                <div className="app-name">{app.name}</div>
                {/* <div className="app-short">{app.short}</div> */}
              </div>
            </div>
            <div className="position">
              <a className="play-link" href={app.playStore} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} aria-label={`Open ${app.name} on Play Store`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v18l15-9L5 3z"/></svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
