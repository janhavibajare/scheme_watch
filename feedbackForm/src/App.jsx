import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./components/Firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./hooks/useAuth";
import ParentFeedbackForm from "./forms/ParentFeedbackForm";
import ObservationForm from "./forms/ObservationForm";
import SchoolForm from "./forms/SchoolForm";
import OfficerDash from "./pages/OfficerDash";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UpdateParentForm from "./forms/UpdateParentForm";
import UpdateObserveForm from "./forms/UpdateObserveForm";
import UpdateSchoolForm from "./forms/UpdateSchoolForm";
import ParentFeedback from "./components/admin/ParentFormTable";
import SchoolFeedback from "./components/admin/SchoolFormTable";
import ObservationFeedback from "./components/admin/ObservationFormTable";
import FindSchool from "./components/admin/FindSchool";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about_us" element={<AboutUs />} />

          {/* Form Routes */}
          <Route path="/parent_form" element={<ParentFeedbackForm />} />
          <Route path="/observation_form" element={<ObservationForm />} />
          <Route path="/school_form" element={<SchoolForm />} />

          {/* Update Form Routes (Protected for Admin and Research Officer) */}
          <Route
            path="/update_parent_form/:id"
            element={
              <ProtectedRoute
                user={user}
                role={role}
                allowedRoles={["admin", "Research Officer"]}
              >
                <UpdateParentForm role={role} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update_observation_form/:id"
            element={
              <ProtectedRoute
                user={user}
                role={role}
                allowedRoles={["admin", "Research Officer"]}
              >
                <UpdateObserveForm role={role} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update_school_form/:id"
            element={
              <ProtectedRoute
                user={user}
                role={role}
                allowedRoles={["admin", "Research Officer"]}
              >
                <UpdateSchoolForm role={role} />
              </ProtectedRoute>
            }
          />

          {/* New Component Routes (Protected for Admin) */}
          <Route
            path="/parent-feedback"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <ParentFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-feedback"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <SchoolFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/observation-feedback"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <ObservationFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-school"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <FindSchool />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer_dashboard"
            element={
              <ProtectedRoute
                user={user}
                role={role}
                allowedRoles={["admin", "Research Officer"]}
              >
                <OfficerDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                user={user}
                role={role}
                allowedRoles={["Research Officer", "admin"]}
              >
                <Dashboard role={role} /> {/* Pass role prop here */}
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;