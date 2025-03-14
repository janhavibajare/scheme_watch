import React, { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  onSnapshot,
  updateDoc,
  setDoc, // Added setDoc
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import MidDayMealLogo from "../images/Mid_day_logo.png";

function AdminDash() {
  const [userDetails, setUserDetails] = useState(null);
  const [userData, setUserData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [activeResearchOfficers, setActiveResearchOfficers] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [inactiveResearchOfficers, setInactiveResearchOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 20;
  const [researchOfficerPage, setResearchOfficerPage] = useState(1);
  const [activeUsersPage, setActiveUsersPage] = useState(1);
  const [inactiveUsersPage, setInactiveUsersPage] = useState(1);
  const [registeredUsersPage, setRegisteredUsersPage] = useState(1);
  const [researchOfficerSearch, setResearchOfficerSearch] = useState("");
  const [activeUsersSearch, setActiveUsersSearch] = useState("");
  const [inactiveUsersSearch, setInactiveUsersSearch] = useState("");
  const [registeredUsersSearch, setRegisteredUsersSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({ field: "lastActive", direction: "desc" });
  const [isResearchOfficersOpen, setIsResearchOfficersOpen] = useState(true);
  const [isActiveUsersOpen, setIsActiveUsersOpen] = useState(true);
  const [isInactiveUsersOpen, setIsInactiveUsersOpen] = useState(true);
  const [isRegisteredUsersOpen, setIsRegisteredUsersOpen] = useState(true);

  // Updated useEffect with modular syntax
  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserDetails(userData);

              await updateDoc(docRef, {
                lastLogin: new Date().toISOString(),
              });

              const activeUserRef = doc(db, "activeUsers", user.uid);
              await setDoc(activeUserRef, {
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
      });
      return () => unsubscribe();
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activeUsers"), (snapshot) => {
      const activeUserList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllActiveUsers(activeUserList);
      const researchOfficers = activeUserList.filter((user) => user.role === "Research Officer");
      setActiveResearchOfficers(researchOfficers);
    }, (error) => {
      toast.error("Error fetching active users: " + error.message);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersSnap = await getDocs(collection(db, "Users"));
        const activeUsersSnap = await getDocs(collection(db, "activeUsers"));
        const allUsers = allUsersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserData(allUsers);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const inactive = allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return (
            user.role === "Research Officer" &&
            (!lastLogin || lastLogin < thirtyDaysAgo)
          );
        });
        setInactiveResearchOfficers(inactive);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function handleLogout() {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await deleteDoc(doc(db, "activeUsers", currentUser.uid));
      }
      await auth.signOut();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  }

  const handleRemoveUser = async (uid) => {
    try {
      await deleteDoc(doc(db, "Users", uid));
      await deleteDoc(doc(db, "activeUsers", uid));
      toast.success("User removed successfully!");
      const updatedInactive = inactiveResearchOfficers.filter((user) => user.id !== uid);
      setInactiveResearchOfficers(updatedInactive);
      const updatedAllUsers = userData.filter((user) => user.id !== uid);
      setUserData(updatedAllUsers);
    } catch (error) {
      toast.error("Error removing user: " + error.message);
    }
  };

  const sortData = (data, field, direction) => {
    return [...data].sort((a, b) => {
      const aValue = a[field] || "";
      const bValue = b[field] || "";
      if (field === "lastActive" || field === "lastLogin") {
        const aDate = aValue ? new Date(aValue) : new Date(0);
        const bDate = bValue ? new Date(bValue) : new Date(0);
        return direction === "asc" ? aDate - bDate : bDate - aDate;
      }
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  const handleSort = (field) => {
    const direction = sortConfig.field === field && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ field, direction });
  };

  const downloadActiveResearchOfficersExcel = () => {
    const ws = XLSX.utils.json_to_sheet(activeResearchOfficers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Active Research Officers");
    XLSX.writeFile(wb, "active_research_officers.xlsx");
  };

  const downloadAllActiveUsersExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allActiveUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Active Users");
    XLSX.writeFile(wb, "all_active_users.xlsx");
  };

  const downloadInactiveResearchOfficersExcel = () => {
    const ws = XLSX.utils.json_to_sheet(inactiveResearchOfficers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inactive Research Officers");
    XLSX.writeFile(wb, "inactive_research_officers.xlsx");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(userData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Registered Users");
    XLSX.writeFile(wb, "all_registered_users.xlsx");
  };

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Parent_Form"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParentData(data);
      } catch (error) {
        toast.error("Error fetching parent data: " + error.message);
      }
    };
    fetchParentData();
  }, []);

  useEffect(() => {
    const fetchObserveData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Observation_Form"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setObserveData(data);
      } catch (error) {
        toast.error("Error fetching observation data: " + error.message);
      }
    };
    fetchObserveData();
  }, []);

  const handleParentDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Parent_Form", id));
      toast.success("Parent entry deleted successfully!");
      fetchParentData();
    } catch (error) {
      toast.error("Error deleting parent entry: " + error.message);
    }
  };

  const handleObservationDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Observation_Form", id));
      toast.success("Observation entry deleted successfully!");
      fetchObserveData();
    } catch (error) {
      toast.error("Error deleting observation entry: " + error.message);
    }
  };

  const updateParentForm = async (id) => navigate(`/update_parent_form/${id}`);
  const updateObservationForm = async (id) => navigate(`/update_observation_form/${id}`);
  const addParentEntry = () => navigate("/parent_form");
  const addObservationEntry = () => navigate("/observation_form");

  const downloadParentExcel = () => {
    if (parentData.length === 0) {
      toast.warn("No parent data available to download!");
      return;
    }
    const fieldMappings = [
      { label: "District", key: "district" },
      { label: "Taluka", key: "taluka" },
      { label: "School UDISE Number", key: "schoolUdiseNumber" },
      { label: "पालकाचे संपूर्ण नाव", key: "parentName" },
      { label: "Child 1", key: "child1" },
      { label: "इयत्ता व तुकडी", key: "child1Sec" },
      { label: "Child 2", key: "child2" },
      { label: "इयत्ता व तुकडी", key: "child2Sec" },
      { label: "पालकाची शैक्षणिक पात्रता", key: "parentEducation" },
      { label: "पालकाचा निवासाचा संपूर्ण पत्ता", key: "address" },
      { label: "मुलांना दररोज शाळेत पाठवतात का?", key: "sendChildDaily" },
      { label: "नसल्यास कारण नमूद करयायात यावेः", key: "reason" },
      { label: "मुलांचे/ मुलींचे वजन वाढले का?", key: "weightGain" },
      { label: "वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?", key: "sickFrequency" },
      { label: "अभ्यासातील प्रगती चागंली झाली का?", key: "studyProgress" },
      { label: "अभ्यासातील एकाग्रता वाढली का?", key: "concentration" },
      { label: "मुला-मुलींचे पोषण चागंले होत आहे का?", key: "nutrition" },
      { label: "नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?", key: "attendence" },
      { label: "वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार योजनेचा प्रभाव", key: "impactOfNutritionScheme" },
      { label: "दुपारच्या उपस्थितीवर जेवणाचा प्रभाव", key: "effectOnAfternoonAttendence" },
      { label: "मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव तुम्हाला कसा वाटतो ?", key: "effectOfNutritionDietPlan" },
      { label: "योजनेमध्ये सुधारणा करण्यासाठी सूचना", key: "improvementSuggestions" },
    ];
    const excelData = [];
    parentData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) excelData.push([label, record[key] || ""]);
        else excelData[fieldIndex].push(record[key] || "");
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = { font: { bold: true }, alignment: { horizontal: "center", vertical: "center" } };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parent Data");
    XLSX.writeFile(wb, "parent_data.xlsx");
  };

  const downloadObservationExcel = () => {
    if (observeData.length === 0) {
      toast.warn("No observation data available to download!");
      return;
    }
    const fieldMappings = [
      { label: "School Name", key: "schoolName" },
      { label: "Taluka/District", key: "district" },
      { label: "Feedback", key: "voiceInput" },
    ];
    const excelData = [];
    observeData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) excelData.push([label, record[key] || ""]);
        else excelData[fieldIndex].push(record[key] || "");
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = { font: { bold: true }, alignment: { horizontal: "center", vertical: "center" } };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Observation Data");
    XLSX.writeFile(wb, "observation_data.xlsx");
  };

  const filterAndPaginate = (data, search, page) => {
    const filtered = data.filter((item) =>
      (item.email?.toLowerCase().includes(search.toLowerCase()) ||
       item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
       item.lastName?.toLowerCase().includes(search.toLowerCase()))
    );
    const sorted = sortData(filtered, sortConfig.field, sortConfig.direction);
    return sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: "10px 20px", borderBottom: "1px solid #ddd" }}>
        <div className="d-flex align-items-center">
          <img src={MidDayMealLogo} alt="Mid Day Meal Logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <a className="navbar-brand text-white ms-2" href="/admin_dashboard" style={{ fontSize: "24px" }}>Admin</a>
          <div className="d-flex align-items-center ms-3">
            <Link to="/dashboard" className="nav-link text-white mx-2">Home</Link>
            <Link to="/profile" className="nav-link text-white mx-2">Profile</Link>
            <Link to="/about_us" className="nav-link text-white mx-2">About Us</Link>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex align-items-center mx-2">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "300px" }} />
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body d-flex justify-content-around text-center">
              <div>Total Active Research Officers: <strong>{activeResearchOfficers.length}</strong></div>
              <div>Total Active Users: <strong>{allActiveUsers.length}</strong></div>
              <div>Inactive Research Officers: <strong>{inactiveResearchOfficers.length}</strong></div>
              <div>Total Registered Users: <strong>{userData.length}</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setIsResearchOfficersOpen(!isResearchOfficersOpen)} style={{ cursor: "pointer" }}>
                Active Research Officers {isResearchOfficersOpen ? "▼" : "▲"}
              </h5>
              {isResearchOfficersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={researchOfficerSearch}
                      onChange={(e) => setResearchOfficerSearch(e.target.value)}
                    />
                    <div>
                      <button className="btn btn-outline-success me-2" onClick={downloadActiveResearchOfficersExcel}>Export to Excel</button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => setResearchOfficerPage((prev) => Math.max(prev - 1, 1))}
                        disabled={researchOfficerPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {researchOfficerPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setResearchOfficerPage((prev) => prev + 1)}
                        disabled={researchOfficerPage * itemsPerPage >= activeResearchOfficers.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("status")}>Status</th>
                            <th onClick={() => handleSort("email")}>Email {sortConfig.field === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("firstName")}>First Name {sortConfig.field === "firstName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastName")}>Last Name {sortConfig.field === "lastName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastActive")}>Last Active {sortConfig.field === "lastActive" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(activeResearchOfficers, researchOfficerSearch, researchOfficerPage).length > 0 ? (
                            filterAndPaginate(activeResearchOfficers, researchOfficerSearch, researchOfficerPage).map((user, index) => (
                              <tr key={user.id}>
                                <td>{(researchOfficerPage - 1) * itemsPerPage + index + 1}</td>
                                <td>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor: new Date(user.lastActive) > new Date(Date.now() - 5 * 60 * 1000) ? "green" : "red",
                                    }}
                                  />
                                </td>
                                <td data-tooltip-id="tooltip" data-tooltip-content={`Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}`}>{user.email || "N/A"}</td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{new Date(user.lastActive).toLocaleString() || "N/A"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">No Research Officers currently logged in</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setIsActiveUsersOpen(!isActiveUsersOpen)} style={{ cursor: "pointer" }}>
                All Active Users {isActiveUsersOpen ? "▼" : "▲"}
              </h5>
              {isActiveUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={activeUsersSearch}
                      onChange={(e) => setActiveUsersSearch(e.target.value)}
                    />
                    <div>
                      <button className="btn btn-outline-success me-2" onClick={downloadAllActiveUsersExcel}>Export to Excel</button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => setActiveUsersPage((prev) => Math.max(prev - 1, 1))}
                        disabled={activeUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {activeUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setActiveUsersPage((prev) => prev + 1)}
                        disabled={activeUsersPage * itemsPerPage >= allActiveUsers.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("status")}>Status</th>
                            <th onClick={() => handleSort("email")}>Email {sortConfig.field === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("firstName")}>First Name {sortConfig.field === "firstName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastName")}>Last Name {sortConfig.field === "lastName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("role")}>Role {sortConfig.field === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastActive")}>Last Active {sortConfig.field === "lastActive" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(allActiveUsers, activeUsersSearch, activeUsersPage).length > 0 ? (
                            filterAndPaginate(allActiveUsers, activeUsersSearch, activeUsersPage).map((user, index) => (
                              <tr key={user.id}>
                                <td>{(activeUsersPage - 1) * itemsPerPage + index + 1}</td>
                                <td>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor: new Date(user.lastActive) > new Date(Date.now() - 5 * 60 * 1000) ? "green" : "red",
                                    }}
                                  />
                                </td>
                                <td data-tooltip-id="tooltip" data-tooltip-content={`Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}`}>{user.email || "N/A"}</td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{user.role || "N/A"}</td>
                                <td>{new Date(user.lastActive).toLocaleString() || "N/A"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">No users currently logged in</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setIsInactiveUsersOpen(!isInactiveUsersOpen)} style={{ cursor: "pointer" }}>
                Inactive Research Officers {isInactiveUsersOpen ? "▼" : "▲"}
              </h5>
              {isInactiveUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={inactiveUsersSearch}
                      onChange={(e) => setInactiveUsersSearch(e.target.value)}
                    />
                    <div>
                      <button className="btn btn-outline-success me-2" onClick={downloadInactiveResearchOfficersExcel}>Export to Excel</button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => setInactiveUsersPage((prev) => Math.max(prev - 1, 1))}
                        disabled={inactiveUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {inactiveUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setInactiveUsersPage((prev) => prev + 1)}
                        disabled={inactiveUsersPage * itemsPerPage >= inactiveResearchOfficers.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("email")}>Email {sortConfig.field === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("firstName")}>First Name {sortConfig.field === "firstName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastName")}>Last Name {sortConfig.field === "lastName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastLogin")}>Last Login {sortConfig.field === "lastLogin" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(inactiveResearchOfficers, inactiveUsersSearch, inactiveUsersPage).length > 0 ? (
                            filterAndPaginate(inactiveResearchOfficers, inactiveUsersSearch, inactiveUsersPage).map((user, index) => (
                              <tr key={user.id}>
                                <td>{(inactiveUsersPage - 1) * itemsPerPage + index + 1}</td>
                                <td data-tooltip-id="tooltip" data-tooltip-content={`Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}`}>{user.email || "N/A"}</td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                                <td>
                                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">No inactive Research Officers</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setIsRegisteredUsersOpen(!isRegisteredUsersOpen)} style={{ cursor: "pointer" }}>
                All Registered Users {isRegisteredUsersOpen ? "▼" : "▲"}
              </h5>
              {isRegisteredUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={registeredUsersSearch}
                      onChange={(e) => setRegisteredUsersSearch(e.target.value)}
                    />
                    <div>
                      <button className="btn btn-outline-success me-2" onClick={downloadExcel}>Export to Excel</button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => setRegisteredUsersPage((prev) => Math.max(prev - 1, 1))}
                        disabled={registeredUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {registeredUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setRegisteredUsersPage((prev) => prev + 1)}
                        disabled={registeredUsersPage * itemsPerPage >= userData.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("email")}>Email {sortConfig.field === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("firstName")}>First Name {sortConfig.field === "firstName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("lastName")}>Last Name {sortConfig.field === "lastName" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("role")}>Role {sortConfig.field === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(userData, registeredUsersSearch, registeredUsersPage).length > 0 ? (
                            filterAndPaginate(userData, registeredUsersSearch, registeredUsersPage).map((user, index) => (
                              <tr key={user.id}>
                                <td>{(registeredUsersPage - 1) * itemsPerPage + index + 1}</td>
                                <td data-tooltip-id="tooltip" data-tooltip-content={`Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}`}>{user.email || "N/A"}</td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{user.role || "N/A"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Parent Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button className="btn btn-outline-success px-4" onClick={addParentEntry}>Add Entry</button>
                <button className="btn btn-outline-success px-4" onClick={downloadParentExcel}>Download Sheet</button>
              </div>
              <div className="table-responsive">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>District</th>
                        <th>Taluka</th>
                        <th>Udise Number</th>
                        <th>पालकाचे नाव</th>
                        <th>पाल्याांचे नाव 1</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पाल्याांचे नाव 2</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पालकाची शैक्षणिक पात्रता</th>
                        <th>पालकाचा निवासाचा संपूर्ण पत्ता</th>
                        <th>मुलांना दररोज शाळेत पाठवतात का?</th>
                        <th>नसल्यास कारण नमूद करयायात यावे</th>
                        <th>मुलांचे/ मुलींचे वजन वाढले का?</th>
                        <th>वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?</th>
                        <th>अभ्यासातील प्रगती चागंली झाली का?</th>
                        <th>अभ्यासातील एकाग्रता वाढली का?</th>
                        <th>मुला-मुलींचे पोषण चागंले होत आहे का?</th>
                        <th>नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?</th>
                        <th>वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार योजनेचा प्रभाव</th>
                        <th>दुपारच्या उपस्थितीवर जेवणाचा प्रभाव</th>
                        <th>मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव</th>
                        <th>योजनेमध्ये सुधारणा करण्यासाठीच्या सूचना</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parentData.length > 0 ? (
                        parentData.map((parent, index) => (
                          <tr key={parent.id}>
                            <td>{index + 1}</td>
                            <td>{parent.district || "N/A"}</td>
                            <td>{parent.taluka || "N/A"}</td>
                            <td>{parent.schoolUdiseNumber || "N/A"}</td>
                            <td>{parent.parentName || "N/A"}</td>
                            <td>{parent.child1 || "N/A"}</td>
                            <td>{parent.child1Sec || "N/A"}</td>
                            <td>{parent.child2 || "N/A"}</td>
                            <td>{parent.child2Sec || "N/A"}</td>
                            <td>{parent.parentEducation || "N/A"}</td>
                            <td>{parent.address || "N/A"}</td>
                            <td>{parent.sendChildDaily || "N/A"}</td>
                            <td>{parent.reason || "N/A"}</td>
                            <td>{parent.weightGain || "N/A"}</td>
                            <td>{parent.sickFrequency || "N/A"}</td>
                            <td>{parent.studyProgress || "N/A"}</td>
                            <td>{parent.concentration || "N/A"}</td>
                            <td>{parent.nutrition || "N/A"}</td>
                            <td>{parent.attendence || "N/A"}</td>
                            <td>{parent.impactOfNutritionScheme || "N/A"}</td>
                            <td>{parent.effectOnAfternoonAttendence || "N/A"}</td>
                            <td>{parent.effectOfNutritionDietPlan || "N/A"}</td>
                            <td>{parent.improvementSuggestions || "N/A"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button className="btn btn-primary btn-sm px-3 py-1" onClick={() => updateParentForm(parent.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm px-3 py-1" onClick={() => handleParentDelete(parent.id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="24" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">School Feedback Form</h5>
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-outline-success px-4" onClick={downloadObservationExcel}>Download Sheet</button>
              </div>
              <div className="table-responsive">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>शाळेचे नाव</th>
                        <th>तालुका/जिल्हा</th>
                        <th>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add observeData mapping if intended */}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Observation Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button className="btn btn-outline-success px-4" onClick={addObservationEntry}>Add Entry</button>
                <button className="btn btn-outline-success px-4" onClick={downloadObservationExcel}>Download Sheet</button>
              </div>
              <div className="table-responsive">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>शाळेचे नाव</th>
                        <th>तालुका/जिल्हा</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {observeData.length > 0 ? (
                        observeData.map((observer, index) => (
                          <tr key={observer.id}>
                            <td>{index + 1}</td>
                            <td>{observer.schoolName || "N/A"}</td>
                            <td>{observer.district || "N/A"}</td>
                            <td>{observer.voiceInput || "N/A"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button className="btn btn-primary btn-sm px-3 py-1" onClick={() => updateObservationForm(observer.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm px-3 py-1" onClick={() => handleObservationDelete(observer.id)}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Tooltip id="tooltip" />
    </div>
  );
}

export default AdminDash;