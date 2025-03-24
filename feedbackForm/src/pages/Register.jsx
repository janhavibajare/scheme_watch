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
  const [role] = useState("Research Officer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { 
      fname, 
      email, 
      password, 
      phoneNumber, 
      role, 
      age, 
      qualification, 
      workExperience 
    });

    if (!fname.trim() || !email.trim() || !password || !phoneNumber || !age || 
        !lname.trim() || !qualification.trim() || !workExperience.trim()) {
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
          role: "Research Officer",
          phoneNumber,
          age: Number(age),
          qualification: qualification.trim(),
          workExperience: workExperience.trim(),
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
      <div className="card shadow-lg p-3 p-md-4 w-100" style={{ maxWidth: "500px", transform: 'none', transition: 'none' }}>
        <form onSubmit={handleRegister}>
          <h3 className="text-center mb-4">Sign Up</h3>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value="Research Officer"
              readOnly
              required
            />
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
                required
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

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="100"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Qualification</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your highest qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Work Experience</label>
            <textarea
              className="form-control"
              placeholder="Describe your work experience"
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
              rows="3"
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