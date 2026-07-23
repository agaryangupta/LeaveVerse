const https = require("https");

const sendEmail = async ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      sender: {
        name: "LeaveVerse",
        email: "veloradigital60@gmail.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: html,
    });

    const options = {
      hostname: "api.brevo.com",
      port: 443,
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        console.log("Brevo Status:", res.statusCode);
        console.log("Brevo Response:", body);

        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("✅ Email sent successfully.");
          resolve();
        } else {
          reject(new Error(body));
        }
      });
    });

    req.on("error", (err) => {
      console.error("❌ HTTPS Error:", err);
      reject(err);
    });

    req.write(data);
    req.end();
  });
};

module.exports = sendEmail;