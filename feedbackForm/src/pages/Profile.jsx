import React, { useState, useEffect } from "react";
import { auth, db } from "../components/Firebase"; // Import Firebase auth and db
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Optional: to handle navigation after logout
import { signOut } from "firebase/auth";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid)); // Fetching user document from Firestore
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        navigate("/login"); // Redirect to login if user is not authenticated
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>तुमचे प्रोफाइल</h1>

      {userData ? (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <img
                src={userData.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="card-img-top"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{userData.firstName} {userData.lastName}</h5>
                <p className="card-text">Email: {userData.email}</p>
                <p className="card-text">Phone: {userData.phone || "N/A"}</p>
                <a href="/settings" className="btn btn-primary">सेटिंग्जमध्ये जा</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data found!</p>
      )}

      <button className="btn btn-danger mt-3" onClick={handleLogout}>लॉगआउट</button>
    </div>
  );
}

export default Profile;
