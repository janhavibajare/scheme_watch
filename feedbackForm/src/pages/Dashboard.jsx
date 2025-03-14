import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import slider1 from "../images/slider1.jpeg";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";
import { auth } from "../components/Firebase";
import Mid_day_logo from "../images/Mid_day_logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const aboutUsRef = useRef(null); // Reference to the About Us section

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  // Function to scroll to the About Us section
  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // About Us content
  const renderAboutUs = () => (
    <div
      className="container mt-4 mb-4"
      ref={aboutUsRef} // Attach the ref here
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          border: "1px solid #dee2e6",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-4 text-secondary" style={{ fontWeight: "600" }}>
          About Us
        </h2>
        <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center">Mid Day Meal Scheme (PM-POSHAN)</h3>
          <p className="card-text">
            The Mid Day Meal Scheme is a school meal programme in India designed to 
            better the nutritional status of school-age children nationwide. The scheme 
            has been renamed as <strong>PM-POSHAN Scheme</strong>.
          </p>
          
          <p className="card-text">
            The programme supplies free lunches on working days for children in government 
            primary and upper primary schools, government-aided Anganwadis, Madarsa, and Maqtabs. 
            Serving <strong>120 million children</strong> in over <strong>1.27 million schools</strong>, 
            it is the largest of its kind in the world.
          </p>

          <h5>📌 History</h5>
          <p>
            The Mid Day Meal Scheme has been implemented in Puducherry since <strong>1930</strong> 
            under French administration. In independent India, Tamil Nadu pioneered the scheme 
            in the early 1960s under former Chief Minister <strong>K. Kamaraj</strong>. By 2002, 
            it was implemented across all states under orders from the Supreme Court of India.
          </p>

          <h5>📌 Recent Updates</h5>
          <p>
            <strong>Ajay Kumar</strong>, Director of Poshan Abhiyaan, stated that the scheme was renamed 
            to <strong>PM-POSHAN (Pradhan Mantri Poshan Shakti Nirman)</strong> in <strong>September 2021</strong> 
            by the Ministry of Education. Additionally, <strong>24 lakh pre-primary students</strong> were included 
            in 2022.
          </p>

          <h5>📌 Legal Backing</h5>
          <p>
            Under <strong>Article 24, paragraph 2c</strong> of the <strong>Convention on the Rights of the Child</strong>, 
            India has committed to providing "adequate nutritious food" for children. The scheme is covered under the 
            <strong>National Food Security Act, 2013</strong>, similar to the US National School Lunch Act.
          </p>

          <p className="text-muted text-end">Source: Government Reports & Supreme Court Orders</p>
        </div>
      </div>
    </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ backgroundColor: "#f4f7fa" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Left Section: Logo & Links */}
            <div className="d-flex align-items-center">
              <Link className="navbar-brand d-flex align-items-center" to="/">
                <img
                  src={Mid_day_logo}
                  alt="Logo"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                Dashboard
              </Link>

              {/* Navbar Links */}
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin_dashboard">
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/officer_dashboard">
                      Research Officer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={scrollToAboutUs} // Scroll to About Us on click
                    >
                      About Us
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Section: Logout Button */}
            <div className="d-flex align-items-center ms-auto">
              <button
                className="btn btn-outline-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <div className="row justify-content-center align-items-center">
            {/* Carousel Section */}
            <div className="col-md-7 col-12">
              <div
                id="dashboardCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
                style={{ maxWidth: "100%", maxHeight: "350px" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={slider1}
                      className="d-block w-100"
                      alt="Slide 1"
                      style={{
                        borderRadius: "10px",
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={slider2}
                      className="d-block w-100"
                      alt="Slide 2"
                      style={{
                        borderRadius: "10px",
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={slider3}
                      className="d-block w-100"
                      alt="Slide 3"
                      style={{
                        borderRadius: "10px",
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#dashboardCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#dashboardCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            {/* Forms Section */}
            <div className="col-md-5 col-12 mt-4 mt-md-0">
              <div
                className="card shadow-lg p-4"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <h2
                  className="text-center mb-4 text-secondary"
                  style={{ fontWeight: "600" }}
                >
                  Forms
                </h2>
                <div className="list-group">
                  <Link
                    to="/parent_form"
                    className="list-group-item list-group-item-action"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#343a40",
                      fontSize: "16px",
                      textAlign: "center",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      border: "1px solid #dee2e6",
                      padding: "12px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                  >
                    पालकांचा अभिप्राय प्रश्नावली
                  </Link>
                  <Link
                    to="/school_form"
                    className="list-group-item list-group-item-action"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#343a40",
                      fontSize: "16px",
                      textAlign: "center",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      border: "1px solid #dee2e6",
                      padding: "12px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                  >
                    School Form
                  </Link>
                  <Link
                    to="/observation_form"
                    className="list-group-item list-group-item-action"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#343a40",
                      fontSize: "16px",
                      textAlign: "center",
                      borderRadius: "8px",
                      border: "1px solid #dee2e6",
                      padding: "12px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9ecef")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                  >
                    Observation Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="d-flex justify-content-center mt-4">
          <div
            className="quote-container"
            style={{
              width: "100%",
              maxWidth: "1400px",
              height: "230px",
              borderRadius: "12px",
              border: "1px solid #dee2e6",
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            }}
          >
            <p
              style={{
                fontSize: "26px",
                fontStyle: "italic",
                color: "#495057",
                fontWeight: "bold",
                lineHeight: "1.6",
                maxWidth: "80%",
                margin: "0 auto",
              }}
            >
              "The Mid Day Meal Scheme is a transformative initiative in India that
              ensures school-age children receive nutritious meals, aiding both their
              growth and learning."
            </p>
          </div>
        </div>

        {/* About Us Section (always visible) */}
        {renderAboutUs()}

        {/* Footer */}
        <footer
          className="text-center mt-5 py-3"
          style={{
            backgroundColor: "#6c757d",
            borderTop: "1px solid #dee2e6",
          }}
        >
          <p className="text-light mb-0">
            © 2025 User Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;