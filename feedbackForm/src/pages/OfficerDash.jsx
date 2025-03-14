import React, { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom"; // ✅ Corrected import
import MidDayMealLogo from "../images/Mid_day_logo.png";

function AdminDash() {
  const [userDetails, setUserDetails] = useState(null);
  const [userData, setUserData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ useNavigate should be at the top

  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, "Users", user.uid); // ✅ Ensure "Users" is correct
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            } else {
              console.log("User document not found");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.log("User not logged in");
        }
      });

      return () => unsubscribe(); // ✅ Cleanup function to prevent memory leaks
    };

    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login"); // ✅ Corrected placement
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Parent_Form")); // ✅ Ensure correct collection name
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParentData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, []);

  useEffect(() => {
    const fetchObserveData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Observation_Form")); // ✅ Ensure correct collection name
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setObserveData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObserveData();
  }, []);

  const updateParentForm = async (id) => {
    navigate(`/update_parent_form/${id}`);
  };

  const updateObservationForm = async (id) => {
    navigate(`/update_observation_form/${id}`);
  };

  const addParentEntry = () => {
    navigate("/parent_form");
  };

  const addObservationEntry = () => {
    navigate("/observation_form");
  };

  const downloadParentExcel = () => {
    if (parentData.length === 0) {
      alert("No data available to download!");
      return;
    }

    // Define the custom order of fields
    const fieldMappings = [
      { label: "District", key: "district" },
      { label: "Taluka", key: "taluka" },
      { label: "School UDISE Number", key: "schoolUdiseNumber" },
      { label: "पालकाचे संपूर्ण नाव", key: "parentName" },
      { label: "शाळेचे नाव", key: "schoolName" },   
      { label: "Child 1", key: "child1" },
      { label: "इयत्ता व तुकडी", key: "child1Sec" },
      { label: "Child 2", key: "child2" },
      { label: "इयत्ता व तुकडी", key: "child2Sec" },
      { label: "पालकाची शैक्षणिक पात्रता", key: "parentEducation" },
      { label: "पालकाचा निवासाचा संपूर्ण पत्ता", key: "address" },
      { label: "मुलांना दररोज शाळेत पाठवतात का?", key: "sendChildDaily" },
      { label: "नसल्यास कारण नमूद करयायात यावेः", key: "reason" },
      { label: "मुलांचे/ मुलींचे वजन वाढले का?", key: "weightGain" },
      {
        label: "वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?",
        key: "sickFrequency",
      },
      { label: "अभ्यासातील प्रगती चागंली झाली का?", key: "studyProgress" },
      { label: "अभ्यासातील एकाग्रता वाढली का?", key: "concentration" },
      { label: "मुला-मुलींचे पोषण चागंले होत आहे का?", key: "nutrition" },
      { label: "नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?", key: "attendence" },
      {
        label:
          "वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार योजनेचा प्रभाव",
        key: "impactOfNutritionScheme",
      },
      {
        label: "दुपारच्या उपस्थितीवर जेवणाचा प्रभाव",
        key: "effectOnAfternoonAttendence",
      },
      {
        label:
          "मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव तुम्हाला कसा वाटतो ?",
        key: "effectOfNutritionDietPlan",
      },
      {
        label: "योजनेमध्ये सुधारणा करण्यासाठी सूचना",
        key: "improvementSuggestions",
      },
    ];

    // Prepare data in vertical format
    const excelData = [];

    parentData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) {
          // First row for each field contains the field name
          excelData.push([label, record[key] || ""]);
        } else {
          // Only append data in subsequent rows
          excelData[fieldIndex].push(record[key] || "");
        }
      });
    });

    // ✅ Convert to worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // ✅ Apply bold styling, center alignment, and appropriate column width for headers
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" }, // Center alignment
      };
    });

    // ✅ Adjust column width for better readability
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }]; // Column A: 25 width, Column B: 30 width

    // ✅ Adjust row height for the headings
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 })); // Set height to 25px for headers

    // ✅ Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parent Data");

    // ✅ Download the Excel file
    XLSX.writeFile(wb, "parent_data.xlsx");
  };

  const downloadObservationExcel = () => {
    if (observeData.length === 0) {
      alert("No data available to download!");
      return;
    }

    // Define the custom order of fields
    const fieldMappings = [
      { label: "School Name", key: "schoolName" },
      { label: "UDISENo", key: "udiseNo" },
      { label: "Taluka", key: "taluka" },
      { label: "District", key: "district" },
      { label: "Feedback", key: "voiceInput" },
    ];

    // Prepare data in vertical format
    const excelData = [];

    observeData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) {
          // First row for each field contains the field name
          excelData.push([label, record[key] || ""]);
        } else {
          // Only append data in subsequent rows
          excelData[fieldIndex].push(record[key] || "");
        }
      });
    });

    // ✅ Convert to worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // ✅ Apply bold styling, center alignment, and appropriate column width for headers
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" }, // Center alignment
      };
    });

    // ✅ Adjust column width for better readability
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }]; // Column A: 25 width, Column B: 30 width

    // ✅ Adjust row height for the headings
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 })); // Set height to 25px for headers

    // ✅ Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Observation Data");

    // ✅ Download the Excel file
    XLSX.writeFile(wb, "observation_data.xlsx");
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side: Logo and Navigation Links */}
        <div className="d-flex align-items-center">
          <img
            src={MidDayMealLogo}
            alt="Mid Day Meal Logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
          <a
            className="navbar-brand text-white ms-2"
            href="/officer_dashboard"
            style={{ fontSize: "24px" }}
          >
           Research Officer
          </a>
          <div className="d-flex align-items-center ms-3">
            <Link to="/dashboard" className="nav-link text-white mx-2">
              Home
            </Link>
            <Link to="/profile" className="nav-link text-white mx-2">
              Profile
            </Link>
            <Link to="/about_us" className="nav-link text-white mx-2">
              About Us
            </Link>
          </div>
        </div>

        {/* Right Side: Search Bar and Logout Button */}
        <div className="d-flex align-items-center">
          <form className="d-flex align-items-center mx-2">
            <input
              className="form-control me-2"
              type="search"
              
              placeholder="Search"
              aria-label="Search"
              style={{ width: "300px" }}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          <div className="ms-2">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="row mt-4 justify-content-center">
        {/* Statistics Card */}
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Parent Feedback Form</h5>

              {/* Download Button */}
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={addParentEntry}
                >
                  Add Entry
                </button>
                <button
                  className="btn btn-outline-success px-4"
                  onClick={downloadParentExcel}
                >
                  Download Sheet
                </button>
              </div>

              {/* Parent Table */}
              <div className="table-responsive overflow-x-auto">
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
                        <th>शाळेचे नाव</th>
                        <th>पाल्याांचे नाव 1</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पाल्याांचे नाव 2</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पालकाची शैक्षणिक पात्रता</th>
                        <th>पालकाचा निवासाचा संपूर्ण पत्ता</th>
                        <th>मुलाांना दररोज शाळेत पाठवतात का?</th>
                        <th>नसल्यास कारण नमूद करयायात यावे</th>
                        <th>मुलांचे/ मुलींचे वजन वाढले का?</th>
                        <th>वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?</th>
                        <th>अभ्यासातील प्रगती चागंली झाली का?</th>
                        <th>अभ्यासातील एकाग्रता वाढली का?</th>
                        <th>मुला-मुलींचे पोषण चागंले होत आहे का?</th>
                        <th>नियमित शाळेत जाण्यामध्ये सुधारणा झाली का? </th>
                        <th>
                          वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण
                          आहार योजनेचा प्रभाव{" "}
                        </th>
                        <th>दुपारच्या उपस्थितीवर जेवणाचा प्रभाव</th>
                        <th>
                          मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा
                          प्रभाव
                        </th>
                        <th>योजनेमध्ये सुधारणा करण्यासाठीच्या सूचना</th>
                        <th>Actions</th>{" "}
                        {/* New column for Edit & Delete buttons */}
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
                            <td>{parent.schoolName || "N/A"}</td>
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
                            <td>
                              {parent.effectOnAfternoonAttendence || "N/A"}
                            </td>
                            <td>{parent.effectOfNutritionDietPlan || "N/A"}</td>
                            <td>{parent.improvementSuggestions || "N/A"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateParentForm(parent.id)}
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="21" className="text-center">
                            No data available
                          </td>
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

              {/* Download Button */}
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-outline-success px-4">
                  Download Sheet
                </button>
              </div>

              {/* Users Table */}
              <div className="table-responsive overflow-x-auto">
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
                    <tbody></tbody>
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

              {/* Download Button */}
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={addObservationEntry}
                >
                  Add Entry
                </button>
                <button
                  className="btn btn-outline-success px-4"
                  onClick={downloadObservationExcel}
                >
                  Download Sheet
                </button>
              </div>

              {/* Observation Table */}
              <div className="table-responsive overflow-x-auto">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>शाळेचे नाव</th>
                        <th>UDISE क्रमांक</th>
                        <th>तालुका</th>
                        <th>जिल्हा</th>
                        <th>Feedback</th>
                        <th>Actions</th>{" "}
                      </tr>
                    </thead>
                    <tbody>
                      {observeData.length > 0 ? (
                        observeData.map((observer, index) => (
                          <tr key={observer.id}>
                            <td>{index + 1}</td>
                            <td>{observer.schoolName || "N/A"}</td>
                            <td>{observer.udiseNo || "N/A"}</td>
                            <td>{observer.taluka || "N/A"}</td>
                            <td>{observer.district || "N/A"}</td>
                            <td>{observer.voiceInput || "N/A"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() =>
                                    updateObservationForm(observer.id)
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No data available
                          </td>
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
    </div>
  );
}

export default AdminDash;
