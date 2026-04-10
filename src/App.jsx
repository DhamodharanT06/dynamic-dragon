import React, {useEffect, useState, useRef} from 'react'
import Hero from './components/Hero'
import AppsGrid from './components/AppsGrid'
import Featured from './components/Featured'
import Trust from './components/Trust'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'
import { toDirectGoogleDriveImageUrl } from './utils/imageUrl'

export default function App(){
  const [apps, setApps] = useState([])
  const [site, setSite] = useState(null)
  const [selectedApp, setSelectedApp] = useState(null)
  useEffect(()=>{
    fetch('/data/apps.json')
      .then(r=>r.json())
      .then((data)=> setApps((data || []).map(normalizeAppData)))
      .catch(console.error)

    fetch('/data/site.json').then(r=>r.json()).then(setSite).catch(console.error)
  },[])
  useEffect(()=>{ if(apps.length > 0 && !selectedApp) setSelectedApp(apps[0]) }, [apps, selectedApp])

  const openPrimary = ()=> selectedApp && window.open(selectedApp.playStore,'_blank')
  const scrollToApps = ()=> document.getElementById('apps')?.scrollIntoView({behavior:'smooth'})

  return (
    <div className="app-root">
      <Hero onViewApps={scrollToApps} onLatestClick={openPrimary} site={site} />
      <main>
        <section className="apps container" id="apps">
          <h2 className="section-title">Apps Showcase</h2>
          <AppsGrid apps={apps} onSelectApp={setSelectedApp} />
        </section>
        <Featured app={selectedApp} />
        <Trust />
        <section className="about container" id="about">
          <h2 className="section-title">About {site?.developerName || 'Dynamic Dragon Apps'}</h2>
          <p>{site?.description || 'Dynamic Dragon Apps builds simple and reliable Android utilities designed for everyday use.'}</p>
        </section>
        <PrivacyPolicy site={site} />
        <section className="cta container" id="final-cta">
          <div className="cta-inner">
            <h2>Explore the apps</h2>
            <p className="muted">Discover secure, small, and useful Android tools.</p>
            <div className="cta-actions">
              <button className="btn primary lg" onClick={scrollToApps}>View All Apps</button>
              <a className="btn ghost lg" href={site?.playStoreDeveloperUrl || 'https://play.google.com/store/apps/developer?id=Dynamic+Dragon+Apps'} target="_blank" rel="noopener noreferrer">Open Play Store</a>
            </div>
          </div>
        </section>
      </main>
      <Footer site={site} />
    </div>
  )
}

function normalizeAppData(app) {
  return {
    ...app,
    icon: toDirectGoogleDriveImageUrl(app.icon),
    playStore: (app.playStore || '').trim(),
    screenshots: (app.screenshots || []).map(toDirectGoogleDriveImageUrl)
  }
}
