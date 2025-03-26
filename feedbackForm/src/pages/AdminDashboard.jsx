import React, { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase";
import { doc, getDoc, updateDoc, setDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button, Card, Table, Form, Badge, Pagination, Accordion } from "react-bootstrap";
import MidDayMealLogo from "../images/Mid_day_logo.png";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function AdminDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [activeFieldOfficers, setActiveFieldOfficers] = useState([]);
  const [inactiveFieldOfficers, setInactiveFieldOfficers] = useState([]);
  const [activeAssistantFOs, setActiveAssistantFOs] = useState([]);
  const [inactiveAssistantFOs, setInactiveAssistantFOs] = useState([]);
  const [activeResearchOfficers, setActiveResearchOfficers] = useState([]);
  const [inactiveResearchOfficers, setInactiveResearchOfficers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchFO, setSearchFO] = useState("");
  const [searchAFO, setSearchAFO] = useState("");
  const [searchRO, setSearchRO] = useState("");
  const [searchInactiveFO, setSearchInactiveFO] = useState("");
  const [searchInactiveAFO, setSearchInactiveAFO] = useState("");
  const [searchInactiveRO, setSearchInactiveRO] = useState("");
  const [searchAllUsers, setSearchAllUsers] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({ FO: 1, AFO: 1, RO: 1, InactiveFO: 1, InactiveAFO: 1, InactiveRO: 1, All: 1 });
  const usersPerPage = 10; // Changed from 5 to 10
  const navigate = useNavigate();

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

  useEffect(() => {
    const unsubscribes = [
      onSnapshot(collection(db, "activeUsers"), (snapshot) => {
        const activeUserList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setActiveFieldOfficers(activeUserList.filter((user) => user.role === "Field Officer"));
        setActiveAssistantFOs(activeUserList.filter((user) => user.role === "Assistant Field Officer"));
        setActiveResearchOfficers(activeUserList.filter((user) => user.role === "Research Officer"));
      }, (error) => toast.error("Error fetching active users: " + error.message)),

      onSnapshot(collection(db, "Users"), (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRegisteredUsers(allUsers);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        setInactiveFieldOfficers(allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return user.role === "Field Officer" && (!lastLogin || lastLogin < thirtyDaysAgo);
        }));
        setInactiveAssistantFOs(allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return user.role === "Assistant Field Officer" && (!lastLogin || lastLogin < thirtyDaysAgo);
        }));
        setInactiveResearchOfficers(allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return user.role === "Research Officer" && (!lastLogin || lastLogin < thirtyDaysAgo);
        }));
      }, (error) => toast.error("Error fetching users: " + error.message)),
    ];
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

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

  async function handleDeleteUser(userId) {
    try {
      await deleteDoc(doc(db, "Users", userId));
      await deleteDoc(doc(db, "activeUsers", userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user: " + error.message);
    }
  }

  const chartData = {
    labels: ["Active FOs", "Active AFOs", "Active ROs", "Inactive FOs", "Inactive AFOs", "Inactive ROs", "Registered Users"],
    datasets: [{
      data: [
        activeFieldOfficers.length,
        activeAssistantFOs.length,
        activeResearchOfficers.length,
        inactiveFieldOfficers.length,
        inactiveAssistantFOs.length,
        inactiveResearchOfficers.length,
        registeredUsers.length,
      ],
      backgroundColor: ["#4CAF50", "#2196F3", "#9C27B0", "#FF5722", "#FFC107", "#607D8B", "#E91E63"],
      borderColor: "#ffffff",
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { font: { size: 14, family: "Arial" }, padding: 20 } },
      title: { display: true, text: "User Activity Overview", font: { size: 20, weight: "bold" }, padding: 20 },
      tooltip: { backgroundColor: "#333", titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    animation: { animateScale: true, animateRotate: true },
  };

  // Pagination and Filtering Logic
  const paginateData = (data, page, search = "") => {
    const filtered = data.filter(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
    );
    const startIndex = (page - 1) * usersPerPage;
    return {
      paginated: filtered.slice(startIndex, startIndex + usersPerPage),
      totalPages: Math.ceil(filtered.length / usersPerPage),
    };
  };

  const filteredActiveFOs = paginateData(activeFieldOfficers, currentPage.FO, searchFO);
  const filteredActiveAFOs = paginateData(activeAssistantFOs, currentPage.AFO, searchAFO);
  const filteredActiveROs = paginateData(activeResearchOfficers, currentPage.RO, searchRO);
  const filteredInactiveFOs = paginateData(inactiveFieldOfficers, currentPage.InactiveFO, searchInactiveFO);
  const filteredInactiveAFOs = paginateData(inactiveAssistantFOs, currentPage.InactiveAFO, searchInactiveAFO);
  const filteredInactiveROs = paginateData(inactiveResearchOfficers, currentPage.InactiveRO, searchInactiveRO);
  const filteredAllUsers = paginateData(registeredUsers, currentPage.All, searchAllUsers);

  const renderPagination = (totalPages, current, section) => (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev 
        onClick={() => setCurrentPage(prev => ({ ...prev, [section]: Math.max(1, current - 1) }))} 
        disabled={current === 1} 
      />
      {[...Array(totalPages)].map((_, idx) => (
        <Pagination.Item
          key={idx}
          active={idx + 1 === current}
          onClick={() => setCurrentPage(prev => ({ ...prev, [section]: idx + 1 }))}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next 
        onClick={() => setCurrentPage(prev => ({ ...prev, [section]: Math.min(totalPages, current + 1) }))} 
        disabled={current === totalPages} 
      />
    </Pagination>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/admin_dashboard" className="d-flex align-items-center">
            <img src={MidDayMealLogo} alt="Logo" style={{ width: "45px", height: "45px", borderRadius: "50%", marginRight: "10px" }} />
            <span className="fs-4 fw-bold">Admin Dashboard</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-white">Profile</Nav.Link>
            <Nav.Link as={Link} to="/about_us" className="text-white">About Us</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout} className="fw-bold">Logout</Button>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: "15px", background: "white" }}>
          <Card.Body className="p-4">
            <h3 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>Quick Navigation</h3>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {[
                { to: "/parent-feedback", text: "Parent Feedback", color: "info" },
                { to: "/school-feedback", text: "School Feedback", color: "warning" },
                { to: "/observation-feedback", text: "Observation Feedback", color: "success" },
                { to: "/find-school", text: "Find School", color: "primary" } 
              ].map((nav, idx) => (
                <Button
                  key={idx}
                  variant={nav.color}
                  size="lg"
                  onClick={() => navigate(nav.to)}
                  className="w-25 fw-bold text-white"
                  style={{ borderRadius: "10px", padding: "12px" }}
                >
                  {nav.text}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: "15px", background: "white" }}>
          <Card.Body className="p-4 d-flex justify-content-around text-center flex-wrap">
            {[
              { label: "Active FOs", count: activeFieldOfficers.length, color: "success" },
              { label: "Active AFOs", count: activeAssistantFOs.length, color: "info" },
              { label: "Active ROs", count: activeResearchOfficers.length, color: "primary" },
              { label: "Inactive FOs", count: inactiveFieldOfficers.length, color: "danger" },
              { label: "Inactive AFOs", count: inactiveAssistantFOs.length, color: "warning" },
              { label: "Inactive ROs", count: inactiveResearchOfficers.length, color: "secondary" },
              { label: "Registered Users", count: registeredUsers.length, color: "dark" },
            ].map((stat, idx) => (
              <div key={idx} className="p-2">
                <Badge bg={stat.color} className="p-2 fs-6">
                  {stat.label}: <strong>{stat.count}</strong>
                </Badge>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: "15px", background: "white" }}>
          <Card.Body style={{ height: "400px" }}>
            {loading ? (
              <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Doughnut data={chartData} options={chartOptions} />
            )}
          </Card.Body>
        </Card>

        {/* User Tables with Dropdown, Status Dots, and Pagination */}
        {[
          { title: "Active Field Officers", data: filteredActiveFOs.paginated, search: searchFO, setSearch: setSearchFO, color: "success", page: "FO", totalPages: filteredActiveFOs.totalPages, isActive: true },
          { title: "Active Assistant FOs", data: filteredActiveAFOs.paginated, search: searchAFO, setSearch: setSearchAFO, color: "info", page: "AFO", totalPages: filteredActiveAFOs.totalPages, isActive: true },
          { title: "Active Research Officers", data: filteredActiveROs.paginated, search: searchRO, setSearch: setSearchRO, color: "primary", page: "RO", totalPages: filteredActiveROs.totalPages, isActive: true },
          { title: "Inactive Field Officers", data: filteredInactiveFOs.paginated, search: searchInactiveFO, setSearch: setSearchInactiveFO, color: "danger", page: "InactiveFO", totalPages: filteredInactiveFOs.totalPages, isActive: false },
          { title: "Inactive Assistant FOs", data: filteredInactiveAFOs.paginated, search: searchInactiveAFO, setSearch: setSearchInactiveAFO, color: "warning", page: "InactiveAFO", totalPages: filteredInactiveAFOs.totalPages, isActive: false },
          { title: "Inactive Research Officers", data: filteredInactiveROs.paginated, search: searchInactiveRO, setSearch: setSearchInactiveRO, color: "secondary", page: "InactiveRO", totalPages: filteredInactiveROs.totalPages, isActive: false },
        ].map((section, idx) => (
          <Card key={idx} className="shadow-lg mb-4 border-0" style={{ borderRadius: "15px", background: "white" }}>
            <Card.Body className="p-4">
              <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey={idx.toString()}>
                  <Accordion.Header>
                    <h4 className={`fw-bold mb-0 text-${section.color}`}>{section.title}</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Control
                      type="text"
                      placeholder="Search by name..."
                      value={section.search}
                      onChange={(e) => section.setSearch(e.target.value)}
                      className="mb-3 w-50"
                      style={{ borderRadius: "8px" }}
                    />
                    <Table striped hover responsive className="rounded">
                      <thead style={{ background: "#f8f9fa" }}>
                        <tr>
                          <th>Status</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>{section.isActive ? "Last Active" : "Last Login"}</th>
                          {!section.isActive && <th>Actions</th>} {/* Add Actions column for inactive users */}
                        </tr>
                      </thead>
                      <tbody>
                        {section.data.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: section.isActive ? "#4CAF50" : "#FF5722",
                                  marginRight: "10px",
                                }}
                              />
                            </td>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.email}</td>
                            <td>{user.lastActive ? new Date(user.lastActive).toLocaleString() : 
                                 user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                            {!section.isActive && (
                              <td>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                  style={{ borderRadius: "8px" }}
                                >
                                  Delete
                                </Button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {renderPagination(section.totalPages, currentPage[section.page], section.page)}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        ))}

        {/* All Registered Users with Status Dots and Pagination */}
        <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: "15px", background: "white" }}>
          <Card.Body className="p-4">
            <h4 className="fw-bold mb-3 text-dark">All Registered Users</h4>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={searchAllUsers}
              onChange={(e) => setSearchAllUsers(e.target.value)}
              className="mb-3 w-50"
              style={{ borderRadius: "8px" }}
            />
            <Table striped hover responsive className="rounded">
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAllUsers.paginated.map((user) => {
                  const isActive = activeFieldOfficers.some(u => u.id === user.id) || 
                                   activeAssistantFOs.some(u => u.id === user.id) || 
                                   activeResearchOfficers.some(u => u.id === user.id);
                  return (
                    <tr key={user.id}>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: isActive ? "#4CAF50" : "#FF5722",
                            marginRight: "10px",
                          }}
                        />
                      </td>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          style={{ borderRadius: "8px" }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {renderPagination(filteredAllUsers.totalPages, currentPage.All, "All")}
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
        theme="colored"
      />
    </div>
  );
}

export default AdminDashboard;