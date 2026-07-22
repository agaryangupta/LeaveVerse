const leaveApprovedEmail = ({
    employeeName,
    approverName,
    leaveType,
    startDate,
    endDate,
}) => {

    return `

    <div style="font-family: Arial, sans-serif; padding:20px;">

        <h2 style="color:#16a34a;">
            Leave Approved ✅
        </h2>

        <p>
            Hello <strong>${employeeName}</strong>,
        </p>

        <p>
            Your leave request has been <strong style="color:#16a34a;">approved</strong>.
        </p>

        <hr/>

        <p><strong>Leave Type :</strong> ${leaveType}</p>

        <p><strong>From :</strong> ${startDate}</p>

        <p><strong>To :</strong> ${endDate}</p>

        <p><strong>Approved By :</strong> ${approverName}</p>

        <hr/>

        <p>
            Thank you for using <strong>LeaveVerse</strong>.
        </p>

    </div>

    `;
};

module.exports = leaveApprovedEmail;