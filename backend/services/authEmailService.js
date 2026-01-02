const nodemailer = require('nodemailer');

// Log email configuration status on module load
console.log('📧 Email Service Status:', {
  emailConfigured: !!process.env.EMAIL,
  passwordConfigured: !!process.env.EMAIL_PASSWORD,
  emailUser: process.env.EMAIL ? process.env.EMAIL.substring(0, 5) + '***' : 'not set'
});

const createTransporter = () => {
  const emailUser = process.env.EMAIL;
  const emailPass = process.env.EMAIL_PASSWORD;
  
  if (!emailUser || !emailPass) {
    console.log('⚠️ Email credentials not configured - EMAIL:', !!emailUser, 'PASSWORD:', !!emailPass);
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();
  if (!transporter || !user.email) {
    console.log('📧 Welcome email skipped: no transporter or user email');
    return false;
  }
  
  try {
    const mailOptions = {
      from: `"TathaGat Classes" <${process.env.EMAIL}>`,
      to: user.email,
      subject: 'Welcome to TathaGat - Your CAT Preparation Journey Begins!',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to TathaGat!</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 10px; font-size: 16px;">Your journey to IIM starts here</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Hi ${user.name || 'Student'}! 👋</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.8;">
              Congratulations on taking the first step towards your dream MBA! You've successfully registered on TathaGat - India's premier CAT preparation platform.
            </p>
            
            <div style="background: white; border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">What's waiting for you:</h3>
              <ul style="color: #555; font-size: 15px; line-height: 2;">
                <li>📚 Comprehensive Study Materials</li>
                <li>📝 Mock Tests & Practice Papers</li>
                <li>🎥 Live Classes with Expert Faculty</li>
                <li>📊 Detailed Performance Analytics</li>
                <li>💬 Discussion Forums & Doubt Solving</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://tathagat.com/study-zone" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 30px; 
                        font-weight: 600;
                        font-size: 16px;
                        display: inline-block;">
                Start Learning Now
              </a>
            </div>
            
            <p style="color: #777; font-size: 14px; text-align: center; margin-top: 30px;">
              Need help? Reply to this email or visit our support section.
            </p>
          </div>
          
          <div style="background: #333; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #aaa; margin: 0; font-size: 13px;">
              © ${new Date().getFullYear()} TathaGat Classes. All rights reserved.
            </p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', user.email);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    return false;
  }
};

const sendLoginNotificationEmail = async (user) => {
  const transporter = createTransporter();
  if (!transporter || !user.email) {
    console.log('📧 Login notification skipped: no transporter or user email');
    return false;
  }
  
  try {
    const loginTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short'
    });
    
    const mailOptions = {
      from: `"TathaGat Classes" <${process.env.EMAIL}>`,
      to: user.email,
      subject: 'Login Notification - TathaGat Classes',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">TathaGat Classes</h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${user.name || 'Student'}! 👋</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.8;">
              We noticed a new login to your TathaGat account.
            </p>
            
            <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0; color: #555;">
                <strong>Login Time:</strong> ${loginTime}<br>
                <strong>Account:</strong> ${user.email}
              </p>
            </div>
            
            <p style="color: #555; font-size: 15px;">
              If this was you, no action is needed. If you didn't login, please secure your account immediately.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://tathagat.com/study-zone" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: 600;">
                Go to Dashboard
              </a>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              This is an automated security notification from TathaGat Classes.
            </p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Login notification email sent to:', user.email);
    return true;
  } catch (error) {
    console.error('❌ Error sending login notification:', error.message);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendLoginNotificationEmail
};
