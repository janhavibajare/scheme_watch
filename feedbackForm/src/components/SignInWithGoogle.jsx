import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleIcon from "../images/google.png";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const navigate = useNavigate();

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (user) {
        try {
          // Save user information in Firestore
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
            role: "user",
          });

          // Success message
          toast.success("User logged in Successfully", {
            position: "top-center",
          });

          // Navigate after successful login
          navigate("/dashboard");
        } catch (error) {
          toast.error("Error saving user data", {
            position: "top-center",
          });
        }
      }
    }).catch((error) => {
      toast.error("Google login failed", {
        position: "top-center",
      });
    });
  }

  return (
    <div>
      <p className="continue-p text-muted text-center">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleIcon} width={"60%"} alt="Google login" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
