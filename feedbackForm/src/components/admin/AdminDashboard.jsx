import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc, updateDoc, setDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button, Card } from "react-bootstrap";
import MidDayMealLogo from "../images/Mid_day_logo.png";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function AdminDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [activeResearchOfficers, setActiveResearchOfficers] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [inactiveResearchOfficers, setInactiveResearchOfficers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch User Data and Update Last Login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails(userData);
            await updateDoc(docRef, { lastLogin: new Date().toISOString() });
            await setDoc(doc(db, "activeUsers", user.uid), {
              email: user.email,
              firstName: userData.firstName || "N/A",
              lastName: userData.lastName || "N/A",
              role: userData.role || "N/A",
              lastActive: new Date().toISOString(),
            }, { merge: true });
          }
        } catch (error) {
          toast.error("Error updating user data: " + error.message);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Data Fetching for Stats
  useEffect(() => {
    const unsubscribes = [
      onSnapshot(collection(db, "activeUsers"), (snapshot) => {
        const activeUserList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllActiveUsers(activeUserList);
        setActiveResearchOfficers(activeUserList.filter((user) => user.role === "Research Officer"));
      }, (error) => toast.error("Error fetching active users: " + error.message)),

      onSnapshot(collection(db, "Users"), (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRegisteredUsers(allUsers);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        setInactiveResearchOfficers(allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return user.role === "Research Officer" && (!lastLogin || lastLogin < thirtyDaysAgo);
        }));
      }, (error) => toast.error("Error fetching users: " + error.message)),
    ];
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  // Logout Handler
  async function handleLogout() {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) await deleteDoc(doc(db, "activeUsers", currentUser.uid));
      await auth.signOut();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  }

  // Chart Data
  const chartData = {
    labels: ["Active ROs", "Active Users", "Inactive ROs", "Registered Users"],
    datasets: [{
      data: [
        activeResearchOfficers.length,
        allActiveUsers.length,
        inactiveResearchOfficers.length,
        registeredUsers.length,
      ],
      backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107"],
      hoverOffset: 4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, title: { display: true, text: "User Statistics" } },
    layout: { padding: 10 },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/admin_dashboard" className="d-flex align-items-center">
            <img src={MidDayMealLogo} alt="Mid Day Meal Logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
            <span className="ms-2 fs-4">Admin Dashboard</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/about_us">About Us</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        {/* Stats Overview */}
        <Card className="shadow mb-4">
          <Card.Body className="d-flex justify-content-around text-center">
            <div>
              Active Research Officers: <strong>{activeResearchOfficers.length}</strong>
            </div>
            <div>
              Active Users: <strong>{allActiveUsers.length}</strong>
            </div>
            <div>
              Inactive ROs: <strong>{inactiveResearchOfficers.length}</strong>
            </div>
            <div>
              Registered Users: <strong>{registeredUsers.length}</strong>
            </div>
          </Card.Body>
        </Card>

        {/* Chart */}
        <Card className="shadow mb-4">
          <Card.Body style={{ height: "300px" }}>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <Doughnut data={chartData} options={chartOptions} />
            )}
          </Card.Body>
        </Card>

        {/* Navigation Buttons */}
        <Card className="shadow">
          <Card.Body>
            <h5 className="card-title text-center mb-4">Navigate to Data Views</h5>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/find-school")}
                className="w-25"
              >
                Find School
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/parent-feedback")}
                className="w-25"
              >
                Parent Feedback
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/school-feedback")}
                className="w-25"
              >
                School Feedback
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/observation-feedback")}
                className="w-25"
              >
                Observation Feedback
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AdminDashboard;