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
    console.log("========== EMAIL DEBUG ==========");
    console.log("To:", to);
    console.log("From:", process.env.BREVO_SMTP_LOGIN);
    console.log("SMTP Host:", process.env.BREVO_SMTP_HOST);
    console.log("SMTP Port:", process.env.BREVO_SMTP_PORT);

    const info = await transporter.sendMail({
      from: `"LeaveVerse" <${process.env.BREVO_SMTP_LOGIN}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully.");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("================================");

  } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);

    if (error.response) {
      console.error("Response:", error.response);
    }

    if (error.responseCode) {
      console.error("Response Code:", error.responseCode);
    }

    console.error("Full Error:", error);
    console.error("=================================");

    throw error;
  }
};

module.exports = sendEmail;