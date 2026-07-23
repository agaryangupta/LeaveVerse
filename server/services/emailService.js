const nodemailer = require("nodemailer");
const dns = require("dns");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    family: 4,

    tls: {
        rejectUnauthorized: false,
    },

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"LeaveVerse" <${process.env.EMAIL_USER}>`,
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