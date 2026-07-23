const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"LeaveVerse" <${process.env.BREVO_SMTP_LOGIN}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully.");
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;