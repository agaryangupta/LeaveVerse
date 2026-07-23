const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    try {
        const { error } = await resend.emails.send({
            from: "LeaveVerse <onboarding@resend.dev>",
            to,
            subject,
            html,
        });

        if (error) {
            console.error("❌ Resend Error:", error);
            throw error;
        }

        console.log("✅ Email sent successfully.");
    } catch (error) {
        console.error("❌ Email Error:", error);
        throw error;
    }
};

module.exports = sendEmail;