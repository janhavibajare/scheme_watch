import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { db, auth } from "../Firebase"; // Ensure auth is imported from your Firebase config
import { getDocs, collection, deleteDoc, query, where, doc } from "firebase/firestore"; // Added doc import
=======
import { db, auth } from "../Firebase";
import { getDocs, collection, deleteDoc, query, where, doc } from "firebase/firestore";
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import { Accordion, Button, Form, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
<<<<<<< HEAD
import { onAuthStateChanged } from "firebase/auth"; // Import to monitor auth state
=======
import { onAuthStateChanged } from "firebase/auth";
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)

function FindSchool() {
  const [searchType, setSearchType] = useState("udise");
  const [searchValue, setSearchValue] = useState("");
  const [parentData, setParentData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentFilter, setParentFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [observeFilter, setObserveFilter] = useState("");
  const [parentPage, setParentPage] = useState(1);
  const [schoolPage, setSchoolPage] = useState(1);
  const [observePage, setObservePage] = useState(1);
<<<<<<< HEAD
  const [user, setUser] = useState(null); // Track authenticated user
  const itemsPerPage = 5;
  const navigate = useNavigate();

=======
  const [user, setUser] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Safe nested property accessor
  const getNestedValue = (obj, path) => {
    try {
      return path.split(/\.|\[|\]/).reduce((acc, part) => {
        if (!part) return acc;
        return acc && acc[part] !== undefined ? acc[part] : null;
      }, obj) || "N/A";
    } catch {
      return "N/A";
    }
  };

>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        toast.error("Please log in to access school data.");
<<<<<<< HEAD
        navigate("/login"); // Redirect to your login page
=======
        navigate("/login");
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const displayValue = (value) => (value != null ? value : "N/A");

  const handleSearch = async () => {
<<<<<<< HEAD
    const trimmedSearchValue = searchValue.trim(); // Remove leading/trailing spaces
=======
    const trimmedSearchValue = searchValue.trim();
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
    if (!trimmedSearchValue) {
      toast.warn("Please enter a value to search!");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to search for school data.");
<<<<<<< HEAD
      navigate("/login"); // Redirect to login if not authenticated
=======
      navigate("/login");
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
      return;
    }

    setLoading(true);
    try {
      // Parent_Form Query
      const parentQuery = query(
        collection(db, "Parent_Form"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const parentSnap = await getDocs(parentQuery);
      console.log("Parent_Form - Docs found:", parentSnap.size, "Data:", parentSnap.docs.map((doc) => doc.data()));
      setParentData(parentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

<<<<<<< HEAD
      // School_Forms Query (Updated to schoolUdiseNumber)
      const schoolQuery = query(
        collection(db, "School_Forms"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const schoolSnap = await getDocs(schoolQuery);
      console.log("School_Forms - Docs found:", schoolSnap.size, "Data:", schoolSnap.docs.map((doc) => doc.data()));
      setSchoolData(schoolSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Observation_Form Query (Updated to schoolUdiseNumber)
=======
      // School_Forms Query
      const schoolQuery = query(
        collection(db, "School_Form"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const schoolSnap = await getDocs(schoolQuery);
      const schoolDocs = schoolSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("School_Form - Docs found:", schoolSnap.size, "Raw Data:", schoolDocs);
      setSchoolData(schoolDocs);

      // Observation_Form Query
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
      const observeQuery = query(
        collection(db, "Observation_Form"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const observeSnap = await getDocs(observeQuery);
      console.log("Observation_Form - Docs found:", observeSnap.size, "Data:", observeSnap.docs.map((doc) => doc.data()));
      setObserveData(observeSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      if (parentSnap.empty && schoolSnap.empty && observeSnap.empty) {
        toast.info("No records found for this school!");
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Error:", error);
=======
      console.error("Error fetching school data:", error);
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
      toast.error("Error fetching school data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (collectionName, id, successMessage) => {
    if (!user) {
      toast.error("You must be logged in to delete data.");
      navigate("/login");
      return;
    }

    try {
      await deleteDoc(doc(db, collectionName, id)); // Use doc() for reference
      toast.success(successMessage);
      handleSearch();
    } catch (error) {
      toast.error(`Error deleting entry: ${error.message}`);
    }
  };

  const parentFieldMappings = [
    { label: "District", key: "district" },
    { label: "Taluka", key: "taluka" },
    { label: "School UDISE Number", key: "schoolUdiseNumber" },
    { label: "पालकाचे संपूर्ण नाव", key: "parentName" },
    { label: "शाळेचे नाव", key: "schoolName" },
    { label: "Child 1", key: "child1" },
    { label: "इयत्ता व तुकडी (Child 1)", key: "child1Sec" },
    { label: "Child 2", key: "child2" },
    { label: "इयत्ता व तुकडी (Child 2)", key: "child2Sec" },
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
    { label: "मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव", key: "effectOfNutritionDietPlan" },
    { label: "योजनेमध्ये सुधारणा करण्यासाठी सूचना", key: "improvementSuggestions" },
  ];

  const schoolFieldMappings = [
    { label: "जिल्हा", key: "district" },
    { label: "तालुका", key: "taluka" },
    { label: "शाळेचे नाव", key: "schoolName" },
    { label: "तपासणी तारीख", key: "inspectionDate" },
    { label: "तपासणी वेळ", key: "inspectionTime" },
    { label: "तपासणी करणाऱ्याचे नाव", key: "inspectorName" },
    { label: "शाळेचे पूर्ण नाव", key: "schoolFullName" },
    { label: "मुख्याध्यापकाचे नाव", key: "headmasterName" },
    { label: "मुख्याध्यापकाचा फोन", key: "headmasterPhone" },
    { label: "मुख्याध्यापकाचा पत्ता", key: "headmasterAddress" },
    { label: "सहाय्यक शिक्षकाचे नाव", key: "assistantTeacherName" },
    { label: "सहाय्यक शिक्षकाचा फोन", key: "assistantTeacherPhone" },
<<<<<<< HEAD
    { label: "UDISE कोड", key: "schoolUdiseNumber" }, // Updated from udiseCode
=======
    { label: "UDISE कोड", key: "schoolUdiseNumber" },
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
    { label: "पुरुष शिक्षक", key: "teacherMale" },
    { label: "महिला शिक्षक", key: "teacherFemale" },
    { label: "एकूण मुले", key: "totalBoys" },
    { label: "एकूण मुली", key: "totalGirls" },
    { label: "लाभार्थी इयत्ता १-४ मुले", key: "beneficiaries.grade1to4.boys" },
    { label: "लाभार्थी इयत्ता १-४ मुली", key: "beneficiaries.grade1to4.girls" },
    { label: "लाभार्थी इयत्ता १-४ एकूण", key: "beneficiaries.grade1to4.total" },
    { label: "लाभार्थी इयत्ता ५-७ मुले", key: "beneficiaries.grade5to7.boys" },
    { label: "लाभार्थी इयत्ता ५-७ मुली", key: "beneficiaries.grade5to7.girls" },
    { label: "लाभार्थी इयत्ता ५-७ एकूण", key: "beneficiaries.grade5to7.total" },
    { label: "लाभार्थी इयत्ता ८-१० मुले", key: "beneficiaries.grade8to10.boys" },
    { label: "लाभार्थी इयत्ता ८-१० मुली", key: "beneficiaries.grade8to10.girls" },
    { label: "लाभार्थी इयत्ता ८-१० एकूण", key: "beneficiaries.grade8to10.total" },
    // Add other fields as needed, but ensure they match your Firestore data
  ];

  const observeFieldMappings = [
    { label: "School Name", key: "schoolName" },
<<<<<<< HEAD
    { label: "UDISE No", key: "schoolUdiseNumber" }, // Updated from udiseNo
=======
    { label: "UDISE No", key: "schoolUdiseNumber" },
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
    { label: "Taluka", key: "taluka" },
    { label: "District", key: "district" },
    { label: "Feedback", key: "voiceInput" },
  ];

  const downloadExcel = (data, fieldMappings, sheetName, fileName) => {
    if (data.length === 0) return toast.warn(`No ${sheetName.toLowerCase()} data available to download!`);
    const excelData = [];
    data.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        const value = key.includes(".") || key.includes("[")
          ? getNestedValue(record, key)
          : record[key] || "N/A";
        if (index === 0) excelData.push([label, value]);
        else excelData[fieldIndex].push(value);
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const downloadCSV = (data, fieldMappings, fileName) => {
    if (data.length === 0) return toast.warn(`No ${fileName.split('_')[0]} data available to download!`);
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));
    data.forEach((record) => {
      const values = fieldMappings.map((field) => {
        const value = field.key.includes(".") || field.key.includes("[")
          ? getNestedValue(record, field.key)
          : record[field.key] || "N/A";
        return `"${value.toString().replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(","));
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllExcel = () => {
    if (!user) {
      toast.error("You must be logged in to download data.");
      navigate("/login");
      return;
    }

    if (parentData.length === 0 && schoolData.length === 0 && observeData.length === 0)
      return toast.warn("No data available to download!");
    const wb = XLSX.utils.book_new();

    if (parentData.length > 0) {
      const parentExcelData = [];
      parentData.forEach((record, index) => {
        parentFieldMappings.forEach(({ label, key }, fieldIndex) => {
          const value = record[key] || "N/A";
          if (index === 0) parentExcelData.push([label, value]);
          else parentExcelData[fieldIndex].push(value);
        });
      });
      const parentWs = XLSX.utils.aoa_to_sheet(parentExcelData);
      XLSX.utils.book_append_sheet(wb, parentWs, "Parent Data");
    }

    if (schoolData.length > 0) {
      const schoolExcelData = [];
      schoolData.forEach((record, index) => {
        schoolFieldMappings.forEach(({ label, key }, fieldIndex) => {
          const value = key.includes(".") || key.includes("[")
            ? getNestedValue(record, key)
            : record[key] || "N/A";
          if (index === 0) schoolExcelData.push([label, value]);
          else schoolExcelData[fieldIndex].push(value);
        });
      });
      const schoolWs = XLSX.utils.aoa_to_sheet(schoolExcelData);
      XLSX.utils.book_append_sheet(wb, schoolWs, "School Data");
    }

    if (observeData.length > 0) {
      const observeExcelData = [];
      observeData.forEach((record, index) => {
        observeFieldMappings.forEach(({ label, key }, fieldIndex) => {
          const value = record[key] || "N/A";
          if (index === 0) observeExcelData.push([label, value]);
          else observeExcelData[fieldIndex].push(value);
        });
      });
      const observeWs = XLSX.utils.aoa_to_sheet(observeExcelData);
      XLSX.utils.book_append_sheet(wb, observeWs, "Observation Data");
    }

    XLSX.writeFile(wb, "all_school_data.xlsx");
  };

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const filteredParentData = parentData.filter((parent) =>
    (parent.parentName?.toLowerCase() || "").includes(parentFilter.toLowerCase()) ||
    (parent.schoolName?.toLowerCase() || "").includes(parentFilter.toLowerCase())
  );
  const filteredSchoolData = schoolData.filter((school) =>
<<<<<<< HEAD
    school.schoolName?.toLowerCase().includes(schoolFilter.toLowerCase()) ||
    school.schoolUdiseNumber?.toLowerCase().includes(schoolFilter.toLowerCase()) // Updated filter to schoolUdiseNumber
  );
  const filteredObserveData = observeData.filter((observe) =>
    observe.schoolName?.toLowerCase().includes(observeFilter.toLowerCase()) ||
    observe.schoolUdiseNumber?.toLowerCase().includes(observeFilter.toLowerCase()) // Updated filter to schoolUdiseNumber
=======
    (school.schoolName?.toLowerCase() || "").includes(schoolFilter.toLowerCase()) ||
    (school.schoolUdiseNumber?.toLowerCase() || "").includes(schoolFilter.toLowerCase())
  );
  const filteredObserveData = observeData.filter((observe) =>
    (observe.schoolName?.toLowerCase() || "").includes(observeFilter.toLowerCase()) ||
    (observe.schoolUdiseNumber?.toLowerCase() || "").includes(observeFilter.toLowerCase())
>>>>>>> 9dbe6a7 (Make the updations in the routes for the Admin and Officer Dashboard)
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Find a School</h5>
          <div className="d-flex mb-4 align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Form.Select
                className="w-25 me-2"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="udise">UDISE Number</option>
                <option value="name">School Name</option>
              </Form.Select>
              <Form.Control
                type="text"
                className="w-50 me-2"
                placeholder={`Enter ${searchType === "udise" ? "UDISE Number" : "School Name"}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch} disabled={loading || !user}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Search"}
              </Button>
            </div>
            <Button variant="outline-success" onClick={downloadAllExcel} disabled={!user}>
              Download All (Excel)
            </Button>
          </div>

          <Accordion defaultActiveKey="0">
            {/* Parent Feedback Section */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Parent Feedback ({filteredParentData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by parent or school name..."
                    value={parentFilter}
                    onChange={(e) => setParentFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(parentData, parentFieldMappings, "Parent Data", "parent_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(parentData, parentFieldMappings, "parent_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredParentData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {parentFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredParentData, parentPage).map((parent, index) => (
                            <tr key={parent.id}>
                              <td>{(parentPage - 1) * itemsPerPage + index + 1}</td>
                              {parentFieldMappings.map((field, idx) => (
                                <td key={idx}>{displayValue(parent[field.key])}</td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_parent_form/${parent.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("Parent_Form", parent.id, "Parent entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={parentPage === 1} onClick={() => setParentPage(parentPage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {parentPage} of {Math.ceil(filteredParentData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={parentPage === Math.ceil(filteredParentData.length / itemsPerPage)} onClick={() => setParentPage(parentPage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No parent feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* School Feedback Section */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>School Feedback ({filteredSchoolData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by school name or UDISE..."
                    value={schoolFilter}
                    onChange={(e) => setSchoolFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(schoolData, schoolFieldMappings, "School Data", "school_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(schoolData, schoolFieldMappings, "school_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredSchoolData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {schoolFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredSchoolData, schoolPage).map((school, index) => (
                            <tr key={school.id}>
                              <td>{(schoolPage - 1) * itemsPerPage + index + 1}</td>
                              {schoolFieldMappings.map((field, idx) => (
                                <td key={idx}>
                                  {displayValue(
                                    field.key.includes(".") || field.key.includes("[")
                                      ? getNestedValue(school, field.key)
                                      : school[field.key]
                                  )}
                                </td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_school_form/${school.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("School_Forms", school.id, "School entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={schoolPage === 1} onClick={() => setSchoolPage(schoolPage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {schoolPage} of {Math.ceil(filteredSchoolData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={schoolPage === Math.ceil(filteredSchoolData.length / itemsPerPage)} onClick={() => setSchoolPage(schoolPage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No school feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* Observation Feedback Section */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Observation Feedback ({filteredObserveData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by school name or UDISE..."
                    value={observeFilter}
                    onChange={(e) => setObserveFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(observeData, observeFieldMappings, "Observation Data", "observation_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(observeData, observeFieldMappings, "observation_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredObserveData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {observeFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredObserveData, observePage).map((observe, index) => (
                            <tr key={observe.id}>
                              <td>{(observePage - 1) * itemsPerPage + index + 1}</td>
                              {observeFieldMappings.map((field, idx) => (
                                <td key={idx}>{displayValue(observe[field.key])}</td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_observation_form/${observe.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("Observation_Form", observe.id, "Observation entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={observePage === 1} onClick={() => setObservePage(observePage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {observePage} of {Math.ceil(filteredObserveData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={observePage === Math.ceil(filteredObserveData.length / itemsPerPage)} onClick={() => setObservePage(observePage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No observation feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FindSchool;