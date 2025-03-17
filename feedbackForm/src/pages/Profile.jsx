import React, { useState, useEffect } from "react";
import { auth, db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MidDayMealLogo from "../images/Mid_day_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FA
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import fa-user icon

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setFormData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              phone: data.phone || "",
            });
          } else {
            toast.error("No profile data found!");
          }
        } catch (error) {
          toast.error("Error fetching profile: " + error.message);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setLoading(true);
      signOut(auth)
        .then(() => {
          toast.success("Logged out successfully!");
          setTimeout(() => navigate("/login"), 1500);
        })
        .catch((error) => {
          toast.error("Error signing out: " + error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, formData);
      setUserData((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: isDarkMode ? "#212529" : "#f4f7fa", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark bg-dark px-3 sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={MidDayMealLogo} alt="Mid Day Meal Logo" style={{ height: "40px", marginRight: "10px" }} />
            <span className="navbar-brand">Profile</span>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light me-2" onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "लॉगआउट"}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="text-center mb-4" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>
          Welcome, {userData?.firstName || "User"}!
        </h1>

        {userData ? (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg" style={{ borderRadius: "15px", backgroundColor: isDarkMode ? "#343a40" : "#ffffff" }}>
                <div className="card-body text-center">
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={`${userData.firstName} ${userData.lastName}'s profile`}
                      className="rounded-circle mb-3"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle mb-3 d-flex justify-content-center align-items-center"
                      style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: isDarkMode ? "#495057" : "#e9ecef",
                        margin: "0 auto",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        style={{ color: isDarkMode ? "#f8f9fa" : "#6c757d" }}
                      />
                    </div>
                  )}
                  <h5 className="card-title" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>
                    {userData.firstName} {userData.lastName}
                  </h5>
                  <p className="card-text" style={{ color: isDarkMode ? "#ced4da" : "#6c757d" }}>
                    Role: {userData.role || "N/A"}
                  </p>

                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                        placeholder="First Name"
                        style={{ backgroundColor: isDarkMode ? "#495057" : "#fff", color: isDarkMode ? "#f8f9fa" : "#343a40" }}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                        placeholder="Last Name"
                        style={{ backgroundColor: isDarkMode ? "#495057" : "#fff", color: isDarkMode ? "#f8f9fa" : "#343a40" }}
                      />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control mb-3"
                        placeholder="Phone"
                        style={{ backgroundColor: isDarkMode ? "#495057" : "#fff", color: isDarkMode ? "#f8f9fa" : "#343a40" }}
                      />
                      <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                      <button className="btn btn-secondary" onClick={handleEditToggle}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p className="card-text" style={{ color: isDarkMode ? "#ced4da" : "#6c757d" }}>
                        Email: {userData.email}
                      </p>
                      <p className="card-text" style={{ color: isDarkMode ? "#ced4da" : "#6c757d" }}>
                        Phone: {userData.phone || "N/A"}
                      </p>
                      <p className="card-text" style={{ color: isDarkMode ? "#ced4da" : "#6c757d" }}>
                        Last Login: {userData.lastLogin ? new Date(userData.lastLogin).toLocaleString() : "N/A"}
                      </p>
                      <button className="btn btn-primary mb-3" onClick={handleEditToggle}>Edit Profile</button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mt-4 mt-md-0">
              <div className="card shadow-lg" style={{ borderRadius: "15px", backgroundColor: isDarkMode ? "#343a40" : "#ffffff" }}>
                <div className="card-body">
                  <h5 className="card-title text-center" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>
                    Quick Actions
                  </h5>
                  <div className="d-flex flex-column gap-2">
                    <Link to="/dashboard" className="btn btn-outline-primary" style={{ color: isDarkMode ? "#f8f9fa" : "#007bff", borderColor: isDarkMode ? "#f8f9fa" : "#007bff" }}>
                      Back to Dashboard
                    </Link>
                    {userData.role === "Research Officer" && (
                      <Link to="/officer_dashboard" className="btn btn-outline-primary" style={{ color: isDarkMode ? "#f8f9fa" : "#007bff", borderColor: isDarkMode ? "#f8f9fa" : "#007bff" }}>
                        Officer Dashboard
                      </Link>
                    )}
                    {userData.role === "Admin" && (
                      <Link to="/admin_dashboard" className="btn btn-outline-primary" style={{ color: isDarkMode ? "#f8f9fa" : "#007bff", borderColor: isDarkMode ? "#f8f9fa" : "#007bff" }}>
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>No user data found!</p>
        )}
      </div>

      <footer className="text-center mt-5 py-3" style={{ backgroundColor: "#6c757d", color: "#f8f9fa" }}>
        <p className="mb-0">© 2025 PM-POSHAN Profile. All rights reserved.</p>
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Profile;