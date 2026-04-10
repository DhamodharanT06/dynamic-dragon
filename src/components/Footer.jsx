import React from 'react'

export default function Footer({site}){
  const devName = site?.developerName || 'Dynamic Dragon Apps'
  const devEmail = site?.developerEmail || 'support@dynamicdragon.example'
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">{devName}</h3>
            <p className="footer-desc">{site?.description || 'Android-first utilities designed for everyday use.'}</p>
            <a href={`mailto:${devEmail}`} className="footer-email">{devEmail}</a>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <nav className="footer-links">
              <a href="#apps">View Apps</a>
              <a href="#about">About</a>
              <a href="#trust">Why Us</a>
            </nav>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <nav className="footer-links">
              <a href="#support">Support</a>
              <a href="#privacy">Privacy Policy</a>
              <a href={site?.playStoreDeveloperUrl || '#'} target="_blank" rel="noopener noreferrer">Play Store</a>
            </nav>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; 2026 {devName}. All rights reserved.</p>
          <div className="footer-socials">
            <a href={`mailto:${devEmail}`} aria-label="Email">{devEmail}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
