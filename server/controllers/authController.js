const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateEmployeeId = require("../utils/generateEmployeeId");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sendEmail = require("../services/emailService");
const welcomeEmail = require("../templates/welcomeEmail");
const generateTemporaryPassword = require("../utils/generateTemporaryPassword");

// ===============================
// Create Employee / Manager
// ===============================
const createUser = async (req, res) => {
  try {
    // Step 1: Get data from request body
    const {
      fullName,
      email,
      phone,
      designation,
      department,
      role,
    } = req.body;

    // Step 2: Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !designation ||
      !department ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Step 3: Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    // Step 4: Generate temporary password
    const employeeId = await generateEmployeeId(role);
    const temporaryPassword = generateTemporaryPassword();

    // Step 5: Hash the password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Step 6: Create a new user object
    const newUser = new User({
      employeeId, // Temporary (we'll automate later)
      fullName,
      email,
      phone,
      designation,
      department,
      password: hashedPassword,
      role,
      leaveBalance: 20,
    });

    // Step 7: Save user to MongoDB
    await newUser.save();

    await sendEmail({
      to: email,
      subject: "Welcome to LeaveVerse 🚀",
      html: welcomeEmail({
        fullName,
        employeeId,
        email,
        temporaryPassword,
      }),
    });

    // Step 8: Send success response
    res.status(201).json({
      message: "User created successfully.",
      user: {
        employeeId: newUser.employeeId,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        designation: newUser.designation,
        department: newUser.department,
        role: newUser.role,
        leaveBalance: newUser.leaveBalance,
        temporaryPassword,
      },
    });
  } catch (error) {
    console.error(error);

    // Handle Mongoose Validation Errors
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0].message;

      return res.status(400).json({
        message: firstError,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Assign Reporting Manager (Admin Only)
const assignManager = async (req, res) => {
  try {
    const { employeeId, managerId } = req.body;

    console.log("Employee ID:", employeeId);
    console.log("Manager ID:", managerId);

    const employee = await User.findById(employeeId);

    console.log(employee);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    employee.reportingManager = managerId;

    await employee.save();

    res.status(200).json({
      message: "Reporting manager assigned successfully.",
      employee,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {

    const employees = await User.find({
      role: "employee",
    }).select(
      "employeeId fullName email phone department designation leaveBalance"
    );

    res.status(200).json({
      employees,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get Employees of Manager's Department
const getDepartmentEmployees = async (req, res) => {
  try {

    // Get logged-in manager
    const manager = await User.findById(req.user.id);

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found.",
      });
    }

    // Fetch employees from same department
    const employees = await User.find({
      role: "employee",
      department: manager.department,
    }).select(
      "employeeId fullName email phone department designation leaveBalance"
    );

    res.status(200).json({
      employees,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get All Managers
const getManagers = async (req, res) => {
  try {

    const managers = await User.find({
      role: "manager",
    }).select(
      "employeeId fullName email phone department designation leaveBalance"
    );

    res.status(200).json({
      managers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// ===============================
// Login User
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    // If password is incorrect
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        employeeId: user.employeeId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Login Successful
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        fullName: user.fullName,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully.",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Change Password
// ===============================
const changePassword = async (req, res) => {
  try {

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.mustChangePassword = false;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully. Please login again.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Forgot Password
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>

        <p>Hello ${user.fullName},</p>

        <p>You requested to reset your password.</p>

        <p>Click the link below to create a new password:</p>

        <a href="${resetUrl}">Reset Password</a>

        <p>This link will expire in 15 minutes.</p>

        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// ===============================
// Reset Password
// ===============================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully. Please login.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createUser,
  assignManager,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
  getEmployees,
  getDepartmentEmployees,
  getManagers,
};