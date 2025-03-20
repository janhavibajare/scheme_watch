import React, { useEffect } from "react";
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
import { useState } from "react";
import { auth } from "./components/Firebase";
import AdminDash from "./pages/AdminDash";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import ParentFeedbackForm from "./forms/ParentFeedbackForm";
import ObservationForm from "./forms/ObservationForm";
import OfficerDash from "./pages/OfficerDash";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./components/Firebase";
import UpdateParentForm from "./forms/UpdateParentForm";
import UpdateObserveForm from "./forms/UpdateObserveForm";
import SchoolForm from "./forms/SchoolForm";
import UpdateSchoolForm from "./forms/UpdateSchoolForm"; // Added import

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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/parent_form" element={<ParentFeedbackForm />} />
          <Route path="/observation_form" element={<ObservationForm />} />
          <Route path="/school_form" element={<SchoolForm />} />
          <Route
            path="/update_parent_form/:id"
            element={<UpdateParentForm />}
          />
          <Route
            path="/update_Observation_form/:id"
            element={<UpdateObserveForm />}
          />
          <Route
            path="/update_school_form/:id" // Added route
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <UpdateSchoolForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute user={user} role={role} allowedRoles={["admin"]}>
                <AdminDash />
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;