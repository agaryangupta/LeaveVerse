const resetPasswordEmail = (name, resetLink) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#f4f7fb;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.08);">

<tr>
<td style="background:linear-gradient(135deg,#2563eb,#06b6d4);padding:30px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:28px;">
🔐 LeaveVerse
</h1>
<p style="margin-top:10px;color:#eaf6ff;font-size:15px;">
Password Reset Request
</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#1e293b;">
Hello ${name},
</h2>

<p style="color:#475569;font-size:16px;line-height:1.8;">
We received a request to reset the password for your LeaveVerse account.
If you made this request, click the button below to create a new password.
</p>

<div style="text-align:center;margin:35px 0;">
<a href="${resetLink}"
style="
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:14px 34px;
border-radius:8px;
font-size:16px;
font-weight:bold;
display:inline-block;">
Reset Password
</a>
</div>

<p style="color:#64748b;font-size:15px;line-height:1.8;">
This password reset link will expire shortly for your security.
If you didn't request a password reset, you can safely ignore this email.
Your password will remain unchanged.
</p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

<p style="font-size:13px;color:#94a3b8;text-align:center;">
Need help? Contact your LeaveVerse administrator.
</p>

</td>
</tr>

<tr>
<td style="background:#f8fafc;padding:18px;text-align:center;color:#64748b;font-size:13px;">
© ${new Date().getFullYear()} LeaveVerse. All Rights Reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = resetPasswordEmail;