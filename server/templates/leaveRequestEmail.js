const leaveRequestEmail = ({
    recipientName,
    applicantName,
    employeeId,
    department,
    leaveType,
    startDate,
    endDate,
    reason,
}) => {

    return `
    
    <div style="font-family: Arial, sans-serif; padding:20px;">

        <h2 style="color:#2563eb;">
            New Leave Request
        </h2>

        <p>
            Hello <strong>${recipientName}</strong>,
        </p>

        <p>
            A new leave request has been submitted.
        </p>

        <hr/>

        <p><strong>Employee :</strong> ${applicantName}</p>

        <p><strong>Employee ID :</strong> ${employeeId}</p>

        <p><strong>Department :</strong> ${department}</p>

        <p><strong>Leave Type :</strong> ${leaveType}</p>

        <p><strong>From :</strong> ${startDate}</p>

        <p><strong>To :</strong> ${endDate}</p>

        <p><strong>Reason :</strong></p>

        <p>${reason}</p>

        <hr/>

        <p>
            Please login to <strong>LeaveVerse</strong> to review this request.
        </p>

    </div>

    `;
};

module.exports = leaveRequestEmail; 