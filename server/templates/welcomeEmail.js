const welcomeEmail = ({
    fullName,
    employeeId,
    email,
    temporaryPassword,
}) => {

    return `
    
    <div style="font-family: Arial, sans-serif; padding:20px;">

        <h2 style="color:#2563eb;">
            Welcome to LeaveVerse 🚀
        </h2>

        <p>
            Hello <strong>${fullName}</strong>,
        </p>

        <p>
            Your LeaveVerse account has been created successfully.
        </p>

        <hr/>

        <p><strong>Employee ID:</strong> ${employeeId}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>

        <hr/>

        <p>
            Please login using these credentials and
            change your password immediately.
        </p>

        <br/>

        <p>
            Regards,
            <br/>
            <strong>LeaveVerse Team</strong>
        </p>

    </div>

    `;

};

module.exports = welcomeEmail;