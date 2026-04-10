import React from 'react'

export default function PrivacyPolicy({site}) {
  const devName = site?.developerName || 'Dynamic Dragon Apps'
  const devEmail = site?.developerEmail || 'dynamic.dragon.dev@gmail.com'
  
  return (
    <section className="privacy-policy container" id="privacy">
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="policy-content">
        
        <div className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            {devName} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, and other information you voluntarily provide when contacting us or using our services.</li>
            <li><strong>Device Information:</strong> Device model, operating system, unique device identifiers, mobile network information, and device settings.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our application, including app crashes, usage patterns, and features accessed.</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address (not precise GPS data).</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>3. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Process your transactions and send related information</li>
            <li>Generate analytics to understand how users interact with our app</li>
            <li>Improve the content, functionality, and features of our application</li>
            <li>Respond to your inquiries, questions, and requests</li>
            <li>Send promotional communications about new features, updates, or special offers (with your consent)</li>
            <li>Enforce our terms and conditions and prevent fraudulent activity</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>4. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If required by law or to protect the rights, privacy, safety, or property of our users or the public.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with vendors, consultants, and service providers who assist us in operating our website and conducting our business.</li>
            <li><strong>Business Transfers:</strong> Your information may be transferred as part of or in anticipation of a merger, sale, or acquisition of part or all of our business.</li>
            <li><strong>Your Consent:</strong> We may disclose your information with your explicit consent for any other purpose.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies, web beacons, and similar tracking technologies to enhance your experience. These technologies help us understand user behavior, remember preferences, and deliver content tailored to your interests. You can typically control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="policy-section">
          <h2>7. Third-Party Links</h2>
          <p>
            Our application may contain links to third-party websites and applications. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites before providing your personal information.
          </p>
        </div>

        <div className="policy-section">
          <h2>8. Contact Us for Policy Information</h2>
          <p>
            The Google Play Store may collect and use your information in accordance with their policies. {devName} is not responsible for their data handling practices. For more information, visit the Google Play Store's Privacy Policy.
          </p>
        </div>

        <div className="policy-section">
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Last updated" date of this Privacy Policy and, if necessary, by providing additional notice (such as sending you an email notification).
          </p>
        </div>

        <div className="policy-section">
          <h2>10. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href={`mailto:${devEmail}`}>{devEmail}</a></p>
            <p><strong>Company:</strong> {devName}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
