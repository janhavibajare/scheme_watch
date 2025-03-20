import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../components/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slider1 from "../images/slider1.jpeg";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";
import Mid_day_logo from "../images/Mid_day_logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const aboutUsRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email.split("@")[0]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  async function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      setLoading(true);
      try {
        await auth.signOut();
        toast.success("Logged out successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } catch (error) {
        toast.error("Error logging out: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const renderAboutUs = () => (
    <div className="container mt-5 mb-5" ref={aboutUsRef}>
      <div className="card shadow-lg p-4" style={{ borderRadius: "15px", backgroundColor: isDarkMode ? "#343a40" : "#ffffff" }}>
        <h2 className="text-center mb-4" style={{ color: isDarkMode ? "#f8f9fa" : "#6c757d", fontWeight: "600" }}>
          About Us
        </h2>
        <div className="card-body">
          <h3 className="text-center" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>Mid Day Meal Scheme (PM-POSHAN)</h3>
          <p style={{ color: isDarkMode ? "#ced4da" : "#495057" }}>
            The Mid Day Meal Scheme is a school meal programme in India designed to better the nutritional status of school-age children nationwide. Renamed <strong>PM-POSHAN</strong>, it serves <strong>120 million children</strong> across <strong>1.27 million schools</strong>.
          </p>
          <h5 style={{ color: isDarkMode ? "#f8f9fa" : "#6c757d" }}>📌 History</h5>
          <p style={{ color: isDarkMode ? "#ced4da" : "#495057" }}>
            Launched in Puducherry in <strong>1930</strong>, it was pioneered in Tamil Nadu in the 1960s by <strong>K. Kamaraj</strong>. It became nationwide in 2002 via Supreme Court orders.
          </p>
          <h5 style={{ color: isDarkMode ? "#f8f9fa" : "#6c757d" }}>📌 Recent Updates</h5>
          <p style={{ color: isDarkMode ? "#ced4da" : "#495057" }}>
            Renamed <strong>PM-POSHAN</strong> in <strong>September 2021</strong>, it added <strong>24 lakh pre-primary students</strong> in 2022.
          </p>
          <p className="text-muted text-end" style={{ color: isDarkMode ? "#adb5bd" : "#6c757d" }}>
            Source: Government Reports & Supreme Court Orders
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: isDarkMode ? "#212529" : "#f4f7fa", minHeight: "100vh" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={Mid_day_logo} alt="Mid Day Meal Logo" style={{ height: "40px", marginRight: "10px" }} />
              Home
            </Link>
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admin_dashboard">Admin</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/officer_dashboard">Research Officer</Link>
              </li>
              <li className="nav-item mx-2">
                <span className="nav-link" style={{ cursor: "pointer" }} onClick={scrollToAboutUs}>About Us</span>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light me-2" onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Logout"}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h3 className="text-center mb-4" style={{ color: isDarkMode ? "#f8f9fa" : "#343a40" }}>
          Welcome, {userName || "User"}!
        </h3>

        <div className="row justify-content-center align-items-center">
          <div className="col-md-7 col-12">
            <div id="dashboardCarousel" className="carousel slide shadow" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={slider1} className="d-block w-100" alt="Children enjoying meals" style={{ borderRadius: "10px", height: "350px", objectFit: "cover" }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Nutritious Meals for All</h5>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={slider2} className="d-block w-100" alt="School lunch distribution" style={{ borderRadius: "10px", height: "350px", objectFit: "cover" }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Supporting Education</h5>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={slider3} className="d-block w-100" alt="Healthy kids in school" style={{ borderRadius: "10px", height: "350px", objectFit: "cover" }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Growth & Learning</h5>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#dashboardCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="col-md-5 col-12 mt-4 mt-md-0">
            <div className="card shadow-lg p-4" style={{ borderRadius: "15px", backgroundColor: isDarkMode ? "#343a40" : "#ffffff" }}>
              <h2 className="text-center mb-4" style={{ color: isDarkMode ? "#f8f9fa" : "#6c757d", fontWeight: "600" }}>Forms</h2>
              <div className="list-group">
                {[
                  { to: "/parent_form", text: "पालकांचा अभिप्राय प्रश्नावली" },
                  { to: "/school_form", text: "School Form" },
                  { to: "/observation_form", text: "Observation Form" },
                ].map((form, index) => (
                  <Link
                    key={index}
                    to={form.to}
                    className="list-group-item list-group-item-action mb-2"
                    style={{
                      backgroundColor: isDarkMode ? "#495057" : "#f8f9fa",
                      color: isDarkMode ? "#f8f9fa" : "#343a40",
                      textAlign: "center",
                      borderRadius: "8px",
                      padding: "12px",
                      transition: "transform 0.2s ease, background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isDarkMode ? "#6c757d" : "#e9ecef";
                      e.target.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = isDarkMode ? "#495057" : "#f8f9fa";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    {form.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <div
            className="quote-container card shadow-lg"
            style={{
              maxWidth: "1400px",
              width: "100%",
              borderRadius: "12px",
              background: isDarkMode ? "linear-gradient(135deg, #343a40, #495057)" : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "26px", fontStyle: "italic", color: isDarkMode ? "#f8f9fa" : "#495057", fontWeight: "bold", lineHeight: "1.6" }}>
              "The Mid Day Meal Scheme nourishes both body and mind, empowering India's future."
            </p>
          </div>
        </div>

        {renderAboutUs()}
      </div>

      <footer className="text-center mt-5 py-3" style={{ backgroundColor: "#6c757d", color: "#f8f9fa" }}>
        <p className="mb-0">© 2025 PM-POSHAN Dashboard. All rights reserved.</p>
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;