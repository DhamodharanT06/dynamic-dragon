import React, { useState } from 'react'

export default function Support({site}) {
  const devName = site?.developerName || 'Dynamic Dragon Apps'
  const devEmail = site?.developerEmail || 'support@dynamicdragon.example'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general', // general, bug-report, feature-request, app-support
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus(null)
    setErrorMsg('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: devEmail
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          type: 'general',
          message: ''
        })
      } else {
        if (response.status >= 500) {
          openMailClient(formData, devEmail)
        }
        setSubmitStatus('error')
        setErrorMsg(data.message || 'Failed to send email from website. We opened your email app as fallback.')
      }
    } catch (error) {
      openMailClient(formData, devEmail)
      setSubmitStatus('error')
      setErrorMsg('Network error. We opened your email app so you can still send your query.')
      console.error('Email submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeLabel = (type) => {
    const labels = {
      'general': 'General Inquiry',
      'bug-report': 'Bug Report',
      'feature-request': 'Feature Request',
      'app-support': 'App Support'
    }
    return labels[type] || type
  }

  const openMailClient = (payload, recipient) => {
    if (!recipient) return

    const subject = encodeURIComponent(`[${getTypeLabel(payload.type)}] ${payload.subject || 'Support Query'}`)
    const body = encodeURIComponent(
      `Name: ${payload.name || ''}\nEmail: ${payload.email || ''}\nType: ${getTypeLabel(payload.type)}\n\n${payload.message || ''}`
    )

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
  }

  return (
    <section className="support container" id="support">
      <div className="page-header">
        <h1>Support & Contact Us</h1>
        <p>Have a question or issue? We're here to help. Choose your inquiry type and send us a message.</p>
      </div>

      <div className="support-content">
        <div className="support-form-wrapper">
          <form onSubmit={handleSubmit} className="support-form">
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Inquiry Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="general">General Inquiry</option>
                <option value="app-support">App Support</option>
                <option value="bug-report">Bug Report</option>
                <option value="feature-request">Feature Request</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Brief subject of your inquiry"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Please describe your inquiry in detail..."
                rows="6"
                disabled={loading}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-message success">
                ✓ Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message error">
                ✗ {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn primary lg submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="support-info">
            <h3>Other Ways to Reach Us</h3>
            
            <div className="contact-card">
              <h4>📧 Email Support</h4>
              <p>For quick inquiries, email us directly at:</p>
              <a href={`mailto:${devEmail}`} className="contact-link">{devEmail}</a>
            </div>

            <div className="contact-card">
              <h4>🎮 App Issues</h4>
              <p>Report bugs or get app-specific support on Google Play Store:</p>
              <a 
                href={site?.playStoreDeveloperUrl || 'https://play.google.com/store/apps/developer?id=Dynamic+Dragon+Apps'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                Visit Play Store
              </a>
            </div>

            <div className="contact-card">
              <h4>💡 Feature Requests</h4>
              <p>Have an idea for a new feature? Use the form above or contact us via email.</p>
            </div>

            <div className="contact-card">
              <h4>⏱️ Response Time</h4>
              <p>We typically respond to inquiries within 24-48 business hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
