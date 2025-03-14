import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("Research Officer","admin");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { fname, email, password, phoneNumber, role });

    if (!fname.trim() || !email.trim() || !password || !phoneNumber) {
      toast.error("Please fill all required fields!", { position: "top-center" });
      console.log("Validation failed");
      return;
    }

    try {
      console.log("Attempting to create user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      console.log("User created:", user.uid);

      if (user) {
        console.log("Writing user data to Firestore...");
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname.trim(),
          lastName: lname.trim(),
          role,
          phoneNumber,
        });
        console.log("User data written successfully");
        toast.success("User registered successfully!", { position: "top-center" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error.code, error.message);
      toast.error(`Registration failed: ${error.message}`, { position: "bottom-center" });
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow-lg p-3 p-md-4 w-100" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleRegister}>
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Research Officer">Research Officer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔓" : "🔒"}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number (e.g., +1234567890)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
          </div>

          <p className="text-center text-muted mt-3">
            Already registered?{" "}
            <a href="/login" className="text-decoration-none">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;