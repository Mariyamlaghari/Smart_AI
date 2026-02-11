import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"SmartAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to SmartAI - Your AI-Powered Content Creation Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; color: white; text-align: center;">
            <h1>Welcome to SmartAI! 🚀</h1>
            <p>Your AI-powered content creation journey starts here</p>
          </div>
          
          <div style="padding: 40px; background-color: #f9f9f9;">
            <p>Hi ${name},</p>
            
            <p>Thank you for signing up for <strong>SmartAI</strong>! We're excited to have you on board.</p>
            
            <h3>What You Can Do:</h3>
            <ul>
              <li>✨ Generate high-quality articles with AI</li>
              <li>📝 Create engaging blog titles</li>
              <li>🖼️ Generate stunning images from text</li>
              <li>✂️ Remove backgrounds from images</li>
              <li>🔍 Remove unwanted objects from photos</li>
              <li>📄 Get AI-powered resume reviews</li>
            </ul>
            
            <p><strong>Your Free Plan Includes:</strong></p>
            <ul>
              <li>10 Free Credits to get started</li>
              <li>Access to all AI tools</li>
              <li>Monthly credit reset</li>
            </ul>
            
            <p style="margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Go to Dashboard
              </a>
            </p>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              If you have any questions, feel free to contact us at ${process.env.EMAIL_USER}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to', email);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
};

/**
 * Send payment confirmation email
 */
export const sendPaymentConfirmationEmail = async (email, name, paymentDetails) => {
  try {
    const mailOptions = {
      from: `"SmartAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '💰 Payment Confirmed - SmartAI Credits Added',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; color: white; text-align: center;">
            <h1>Payment Confirmed! ✅</h1>
            <p>Your credits have been added to your account</p>
          </div>
          
          <div style="padding: 40px; background-color: #f9f9f9;">
            <p>Hi ${name},</p>
            
            <p>Thank you for your payment! Here's a summary of your transaction:</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p><strong>Plan:</strong> ${paymentDetails.plan}</p>
              <p><strong>Amount Paid:</strong> $${(paymentDetails.amount / 100).toFixed(2)}</p>
              <p><strong>Credits Added:</strong> ${paymentDetails.credits}</p>
              <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p><strong>Your Account Status:</strong></p>
            <ul>
              <li>Plan: ${paymentDetails.plan}</li>
              <li>Total Credits: ${paymentDetails.totalCredits}</li>
              <li>Next Reset: ${paymentDetails.nextReset}</li>
            </ul>
            
            <p style="margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                View Dashboard
              </a>
            </p>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              If you didn't make this purchase or have any concerns, please contact us immediately.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Payment confirmation email sent to', email);
  } catch (error) {
    console.error('❌ Error sending payment email:', error);
  }
};

/**
 * Send plan upgrade email
 */
export const sendPlanUpgradeEmail = async (email, name, newPlan, credits) => {
  try {
    const mailOptions = {
      from: `"SmartAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎉 Welcome to ${newPlan} Plan - SmartAI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; color: white; text-align: center;">
            <h1>Plan Upgraded! 🚀</h1>
            <p>You're now on the ${newPlan} plan</p>
          </div>
          
          <div style="padding: 40px; background-color: #f9f9f9;">
            <p>Hi ${name},</p>
            
            <p>Congratulations! You've successfully upgraded to the <strong>${newPlan}</strong> plan.</p>
            
            <p><strong>Your New Benefits:</strong></p>
            <ul>
              <li>✨ ${credits} credits per month</li>
              <li>🚀 Priority processing</li>
              <li>📞 24/7 customer support</li>
              <li>🔒 Advanced security features</li>
            </ul>
            
            <p style="margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Start Using Your New Plan
              </a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Plan upgrade email sent to', email);
  } catch (error) {
    console.error('❌ Error sending upgrade email:', error);
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: `"SmartAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Reset Your SmartAI Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; color: white; text-align: center;">
            <h1>Password Reset Request</h1>
          </div>
          
          <div style="padding: 40px; background-color: #f9f9f9;">
            <p>Hi,</p>
            
            <p>We received a request to reset your SmartAI password. Click the button below to set a new password:</p>
            
            <p style="margin-top: 30px;">
              <a href="${resetLink}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </p>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent to', email);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
  }
};

export default {
  sendWelcomeEmail,
  sendPaymentConfirmationEmail,
  sendPlanUpgradeEmail,
  sendPasswordResetEmail,
};
