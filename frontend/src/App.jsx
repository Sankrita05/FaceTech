// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResetPasswordForm from './components/ResetPasswordForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import OtpVerificationForm from './components/OtpVerificationForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import FaceDetection from './components/FaceDetection';
import FaceRecognition from './components/FaceRecognition';
import FaceSimilarity from './components/FaceSimilarity';
import ExpressionMatching from './components/ExpressionMatching';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/verify-otp" element={<OtpVerificationForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        {/* Private Routes with Navbar */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/face-detection"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <FaceDetection />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/face-recognition"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <FaceRecognition />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/face-similarity"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <FaceSimilarity />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/expression-recognition"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ExpressionMatching />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
