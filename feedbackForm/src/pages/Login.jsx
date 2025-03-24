import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../components/SignInWithGoogle";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false); // State to toggle forgot password view
  const [resetEmail, setResetEmail] = useState(""); // State for email in reset password form
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log("User role:", role);
      } else {
        console.log("No such user found in Firestore!");
      }

      console.log("User logged in Successfully", user);

      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!", {
        position: "top-center",
      });
      setForgotPassword(false); // Hide the reset password form after success
    } catch (error) {
      console.error("Password Reset Error:", error.message);
      toast.error("Failed to send reset email. Try again later.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg p-4"style={{ maxWidth: "400px", width: "100%", transform: 'none', transition: 'none' }}>
          {forgotPassword ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePasswordReset();
              }}
            >
              <h3 className="text-center mb-4">Reset Password</h3>
              <div className="mb-3">
                <label className="form-label text-start d-block">
                  Enter your email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Send Reset Email
                </button>
              </div>

              <p
                className="text-center text-muted mt-3"
                onClick={() => setForgotPassword(false)} // Go back to login
                style={{ cursor: "pointer" }}
              >
                Remember your password? Login
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Login</h3>

              <div className="mb-3">
                <label className="form-label text-start d-block">Email</label>
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
                <label className="form-label text-start d-block">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <p
                className="text-center text-muted mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => setForgotPassword(true)} // Show the reset password form
              >
                Forgot password?
              </p>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>

              <p className="text-center text-muted mt-3">
                Don't have an account yet?{" "}
                <a href="/register" className="text-decoration-none">
                  Register
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
