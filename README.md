# 🚀 LeaveVerse - Employee Leave Management System

LeaveVerse is a modern Employee Leave Management System built using the MERN Stack. It streamlines leave requests, approvals, and employee management through secure role-based access.

---

## 🌐 Live Demo

### Frontend
https://leave-verse.vercel.app

### Backend API
https://leaveverse.onrender.com

---

## 📖 Overview

LeaveVerse helps organizations efficiently manage employee leave workflows.

The system provides three different portals:

- 👨‍💼 Admin
- 👨‍💻 Manager
- 👨‍💼 Employee

Each role has dedicated permissions and dashboards.

---

# ✨ Features

## 🔐 Authentication

- Secure Login
- JWT Authentication
- Forgot Password
- Reset Password
- Change Password
- Protected Routes
- Role-Based Access Control

---

## 👨‍💼 Admin

- Create Employees
- Create Managers
- Assign Reporting Managers
- View Employees
- View Managers
- Monitor Manager Leave Requests
- Dashboard Analytics

---

## 👨‍💻 Manager

- Dashboard
- View Team Members
- Approve Leave Requests
- Reject Leave Requests
- Apply for Leave
- View Team Leave History
- Profile Management

---

## 👨‍💼 Employee

- Dashboard
- Apply for Leave
- View Leave History
- Track Leave Status
- Profile Management

---

## 📧 Email Notifications

Automatic email notifications are sent for:

- Welcome Email
- Leave Request Submitted
- Leave Approved
- Leave Rejected
- Password Reset

---

## 🎨 UI Features

- Modern Responsive UI
- Dark Mode
- Light Mode
- User-specific Theme Preference
- Responsive Dashboard
- Status Badges
- Loading Buttons

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Axios
- Context API
- CSS

## Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Nodemailer

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
LeaveVerse
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── templates
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/agaryangupta/LeaveVerse.git
```

```bash
cd LeaveVerse
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

### Backend (.env)

```
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=
```

### Frontend (.env)

```
VITE_API_URL=
```

---

# 📸 Screenshots

Add screenshots of:

- Login Page
- Employee Dashboard
- Manager Dashboard
- Admin Dashboard
- Apply Leave
- Team Leave Approval

---

# 🚀 Future Improvements

- Search & Filter
- Pagination
- In-App Notifications
- Leave Calendar
- Leave Reports
- Admin Analytics
- Export Reports
- Multi-Organization Support

---

# 👨‍💻 Author

**Aryan Gupta**

GitHub:
https://github.com/agaryangupta

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future development.

---

## 📄 License

This project is licensed under the MIT License.
