import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Private route
import { PrivateRoutes } from "./utils";

// Pages
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  PasswordResetPage,
  UserManagement,
} from "./pages";
import { NavigationBar } from "./components";

// Newly added import for CelebrationDisplay
import CelebrationDisplay from './components/Leaderboard/CelebrationDisplay'; // Ensure this path matches the location of the new component

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* Private routes (Requires authentication token) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/userManagement" element={<UserManagement />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/passwordReset/:resetToken"
          element={<PasswordResetPage />}
        />

        {/* If the user enters an invalid path in the URL, it automatically redirects them to the homepage */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer />

      {/* CelebrationDisplay component */}
      <CelebrationDisplay />
    </>
  );
};

export default App;
