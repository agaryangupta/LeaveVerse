import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ApplyLeave from "./pages/employee/ApplyLeave";
import MyLeaves from "./pages/employee/MyLeaves";
import Profile from "./pages/employee/Profile";
import TeamLeaves from "./pages/manager/TeamLeaves";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEmployee from "./pages/admin/CreateEmployee";
import CreateManager from "./pages/admin/CreateManager";
import ManagerProfile from "./pages/manager/Profile";
import AdminProfile from "./pages/admin/Profile";
import ManagerLeaves from "./pages/admin/ManagerLeaves";
import Employees from "./pages/admin/Employees";
import Managers from "./pages/admin/Managers";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ManagerEmployees from "./pages/manager/Employees";
import ResetPassword from "./pages/auth/ResetPassword";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
     <ThemeProvider>
    <BrowserRouter>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

        <Route path="/" element={<Login />} />

        {/* Employee Routes */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/apply-leave"
          element={
            <ProtectedRoute allowedRole="employee">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/my-leaves"
          element={
            <ProtectedRoute allowedRole="employee">
              <MyLeaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute allowedRole="employee">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/team-leaves"
          element={
            <ProtectedRoute allowedRole="manager">
              <TeamLeaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/employees"
          element={
            <ProtectedRoute allowedRole="manager">
              <ManagerEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/apply-leave"
          element={
            <ProtectedRoute allowedRole="manager">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/my-leaves"
          element={
            <ProtectedRoute allowedRole="manager">
              <MyLeaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/profile"
          element={
            <ProtectedRoute allowedRole="manager">
              <ManagerProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* View Pages */}

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRole="admin">
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/managers"
          element={
            <ProtectedRoute allowedRole="admin">
              <Managers />
            </ProtectedRoute>
          }
        />

        {/* Create Pages */}

        <Route
          path="/admin/create-employee"
          element={
            <ProtectedRoute allowedRole="admin">
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-manager"
          element={
            <ProtectedRoute allowedRole="admin">
              <CreateManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manager-leaves"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManagerLeaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;