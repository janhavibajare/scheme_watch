import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"; // Added 'doc' import
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Added Bootstrap CSS for styling

function ObservationFormTable() {
  const [observeData, setObserveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchObserveData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Observation_Form"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setObserveData(data);
    } catch (error) {
      toast.error("Error fetching observation data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObserveData();
  }, []);

  const handleObservationDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Observation_Form", id));
      toast.success("Observation entry deleted successfully!");
      fetchObserveData();
    } catch (error) {
      toast.error("Error deleting observation entry: " + error.message);
    }
  };

  const updateObservationForm = (id) => navigate(`/update_observation_form/${id}`);
  const addObservationEntry = () => navigate("/observation_form");

  const displayValue = (value) => (value != null ? value : "N/A");

  const fieldMappings = [
    { label: "School Name", key: "schoolName" },
    { label: "UDISE No", key: "udiseNo" },
    { label: "Taluka", key: "taluka" },
    { label: "District", key: "district" },
    { label: "Feedback", key: "voiceInput" },
  ];

  const downloadObservationExcel = () => {
    if (observeData.length === 0)
      return toast.warn("No observation data available to download!");
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
      if (ws[cellRef])
        ws[cellRef].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Observation Data");
    XLSX.writeFile(wb, "observation_data.xlsx");
  };

  const downloadObservationCSV = () => {
    if (observeData.length === 0)
      return toast.warn("No observation data available to download!");
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));

    observeData.forEach((record) => {
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
    link.setAttribute("download", "observation_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = observeData.filter((observe) =>
    (observe.schoolName?.toLowerCase().includes(search.toLowerCase()) ||
     observe.udiseNo?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Observation Feedback Form</h5>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by school name or UDISE number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <button className="btn btn-outline-success me-2" onClick={addObservationEntry}>
                Add Entry
              </button>
              <button className="btn btn-outline-success me-2" onClick={downloadObservationExcel}>
                Download Excel
              </button>
              <button className="btn btn-outline-success" onClick={downloadObservationCSV}>
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
                    filteredData.map((observe, index) => (
                      <tr key={observe.id}>
                        <td>{index + 1}</td>
                        {fieldMappings.map((field, idx) => (
                          <td key={idx}>{displayValue(observe[field.key])}</td>
                        ))}
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => updateObservationForm(observe.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleObservationDelete(observe.id)}
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

export default ObservationFormTable;