const leaveRejectedEmail = ({
    employeeName,
    approverName,
    leaveType,
    startDate,
    endDate,
}) => {

    return `

    <div style="font-family: Arial, sans-serif; padding:20px;">

        <h2 style="color:#dc2626;">
            Leave Rejected ❌
        </h2>

        <p>
            Hello <strong>${employeeName}</strong>,
        </p>

        <p>
            Your leave request has been <strong style="color:#dc2626;">rejected</strong>.
        </p>

        <hr/>

        <p><strong>Leave Type :</strong> ${leaveType}</p>

        <p><strong>From :</strong> ${startDate}</p>

        <p><strong>To :</strong> ${endDate}</p>

        <p><strong>Reviewed By :</strong> ${approverName}</p>

        <hr/>

        <p>
            If you have any questions, please contact your manager or administrator.
        </p>

        <p>
            Thank you for using <strong>LeaveVerse</strong>.
        </p>

    </div>

    `;
};

module.exports = leaveRejectedEmail;