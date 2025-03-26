import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"; // Added 'doc' import
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Added Bootstrap CSS for styling

function ParentFormTable() {
  const [parentData, setParentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchParentData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Parent_Form"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setParentData(data);
    } catch (error) {
      toast.error("Error fetching parent data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentData();
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

  const updateParentForm = (id) => navigate(`/update_parent_form/${id}`);
  const addParentEntry = () => navigate("/parent_form");

  const displayValue = (value) => (value != null ? value : "N/A");

  const fieldMappings = [
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

  const downloadParentExcel = () => {
    if (parentData.length === 0) return toast.warn("No parent data available to download!");
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
      if (ws[cellRef])
        ws[cellRef].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parent Data");
    XLSX.writeFile(wb, "parent_data.xlsx");
  };

  const downloadParentCSV = () => {
    if (parentData.length === 0) return toast.warn("No parent data available to download!");
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));

    parentData.forEach((record) => {
      const values = fieldMappings.map((field) => {
        const value = record[field.key] || "";
        return `"${value.toString().replace(/"/g, '""')}"`; // Escape quotes
      });
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "parent_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = parentData.filter((parent) =>
    (parent.parentName?.toLowerCase().includes(search.toLowerCase()) ||
     parent.schoolName?.toLowerCase().includes(search.toLowerCase()) ||
     parent.schoolUdiseNumber?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Parent Feedback Form</h5>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by parent name, school name, or UDISE number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <button className="btn btn-outline-success me-2" onClick={addParentEntry}>
                Add Entry
              </button>
              <button className="btn btn-outline-success me-2" onClick={downloadParentExcel}>
                Download Excel
              </button>
              <button className="btn btn-outline-success" onClick={downloadParentCSV}>
                Download CSV
              </button>
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <table className="table table-striped text-center">
                <thead style={{ position: "sticky", top: 0, background: "#f8f9fa", zIndex: 1 }}>
                  <tr>
                    <th>#</th>
                    {fieldMappings.map((field, index) => (
                      <th key={index}>{field.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((parent, index) => (
                      <tr key={parent.id}>
                        <td>{index + 1}</td>
                        {fieldMappings.map((field, idx) => (
                          <td key={idx}>{displayValue(parent[field.key])}</td>
                        ))}
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => updateParentForm(parent.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleParentDelete(parent.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={fieldMappings.length + 2} className="text-center">
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
      <ToastContainer />
    </div>
  );
}

export default ParentFormTable;