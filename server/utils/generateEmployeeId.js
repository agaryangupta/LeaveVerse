const User = require("../models/User");

const generateEmployeeId = async (role) => {
  // Find the latest user of the given role
  const latestUser = await User.findOne({ role })
    .sort({ employeeId: -1 });

  // If no user exists, return the first ID
  if (!latestUser) {
    if (role === "employee") return "EMP001";

    if (role === "manager") return "MGR001";

    return "ADM001";
  }

  // Get the latest employee ID
  const currentId = latestUser.employeeId;

  // Extract the numeric part
  const currentNumber = currentId.slice(3);

  // Increment the number
  const nextNumber = parseInt(currentNumber) + 1;

  // Format it to 3 digits (001, 002, 003...)
  const formattedNumber = nextNumber
    .toString()
    .padStart(3, "0");

  // Decide the prefix
  let prefix = "";

  if (role === "employee") {
    prefix = "EMP";
  } else if (role === "manager") {
    prefix = "MGR";
  } else {
    prefix = "ADM";
  }

  // Return the new Employee ID
  return `${prefix}${formattedNumber}`;
};

module.exports = generateEmployeeId;