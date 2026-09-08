const nodemailer = require('nodemailer');

// Sends an email if SMTP is configured via .env. If it isn't configured
// (no EMAIL_HOST/EMAIL_USER/EMAIL_PASS), this just logs the message to the
// console instead of failing — so password reset works out of the box in
// local development, and "for real" once you plug in real SMTP credentials
// for production.
async function sendEmail({ to, subject, text, html }) {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

  const isConfigured = EMAIL_HOST && EMAIL_USER && EMAIL_PASS;

  if (!isConfigured) {
    console.log('\n--- EMAIL NOT CONFIGURED — printing message instead ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(text);
    console.log('--- Add EMAIL_HOST / EMAIL_USER / EMAIL_PASS to .env to send real emails ---\n');
    return { sent: false, reason: 'not_configured' };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  await transporter.sendMail({
    from: EMAIL_FROM || EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return { sent: true };
}

module.exports = sendEmail;
