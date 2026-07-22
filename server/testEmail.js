require("dotenv").config();

const sendEmail = require("./services/emailService");

const test = async () => {

    await sendEmail({
        to: "veloradigital60@gmail.com",
        subject: "LeaveVerse Test Email",
        html: `
            <h2>🎉 Congratulations!</h2>

            <p>Your LeaveVerse Email Service is working successfully.</p>

            <p>This is the first email sent from your backend.</p>
        `,
    });

};

test();