import nodemailer from 'nodemailer';

function createTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    return null;
  }

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    }
  });
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, type, message, recipientEmail: bodyRecipientEmail } = req.body || {};
  const transporter = createTransporter();
  const recipientEmail = process.env.EMAIL_TO || process.env.EMAIL_USER || bodyRecipientEmail;

  if (!transporter || !recipientEmail) {
    return res.status(500).json({
      message: 'Email service is not configured. Please set EMAIL_USER, EMAIL_PASSWORD, and EMAIL_TO in environment variables.'
    });
  }

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || !emailRegex.test(recipientEmail)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Create email content with template
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">New Support Message</h2>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
          <p><strong>Type:</strong> ${getTypeLabel(type)}</p>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
          
          <div style="background: white; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(message)}</p>
          </div>
          
          <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            <strong>Reply To:</strong> <a href="mailto:${email}">${email}</a>
          </p>
        </div>
      </div>
    `;

    // Send email to support team
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: email,
      subject: `[${getTypeLabel(type)}] ${subject}`,
      html: emailContent,
    });

    // Send confirmation email to user
    const confirmationEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">We Received Your Message</h2>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background: white; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px; margin: 20px 0;">
            <p><strong>Your inquiry type:</strong> ${getTypeLabel(type)}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <p style="color: #666;">We typically respond within 24-48 business hours. If you don't hear from us, please check your spam folder.</p>
          
          <p>Best regards,<br>Dynamic Dragon Apps Support Team</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'We Received Your Message - Dynamic Dragon Apps',
      html: confirmationEmail,
    });

    return res.status(200).json({ 
      message: 'Email sent successfully',
      success: true 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function getTypeLabel(type) {
  const labels = {
    'general': 'General Inquiry',
    'bug-report': 'Bug Report',
    'feature-request': 'Feature Request',
    'app-support': 'App Support'
  };
  return labels[type] || type;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
