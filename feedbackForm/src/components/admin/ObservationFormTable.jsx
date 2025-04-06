import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      toast.error("निरीक्षण डेटा आणण्यात त्रुटी: " + error.message);
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
      toast.success("निरीक्षण नोंद यशस्वीरित्या हटवली!");
      fetchObserveData();
    } catch (error) {
      toast.error("निरीक्षण नोंद हटवण्यात त्रुटी: " + error.message);
    }
  };

  const updateObservationForm = (id) => navigate(`/update_observation_form/${id}`);
  const addObservationEntry = () => navigate("/observation_form");

  const displayValue = (value) => (value != null ? value : "उपलब्ध नाही");

  const fieldMappings = [
    
   // { label: "प्रदेश", key: "region" },
    { label: "A", key: "district" },
    { label: "B", key: "taluka" },
    { label: "C", key: "schoolUdiseNumber" },
    { label: "अभिप्राय", key: "remarks" },
  ];

  const downloadObservationExcel = () => {
    if (observeData.length === 0)
      return toast.warn("डाउनलोड करण्यासाठी निरीक्षण डेटा उपलब्ध नाही!");
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
    XLSX.utils.book_append_sheet(wb, ws, "निरीक्षण डेटा");
    XLSX.writeFile(wb, "observation_data.xlsx");
  };

  const downloadObservationCSV = () => {
    if (observeData.length === 0)
      return toast.warn("डाउनलोड करण्यासाठी निरीक्षण डेटा उपलब्ध नाही!");
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));

    observeData.forEach((record) => {
      const values = fieldMappings.map((field) => {
        const value = record[field.key] || "";
        return `"${value.toString().replace(/"/g, '""')}"`;
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
    (observe.schoolUdiseNumber?.toLowerCase().includes(search.toLowerCase()) ||
     observe.region?.toLowerCase().includes(search.toLowerCase()) ||
     observe.district?.toLowerCase().includes(search.toLowerCase()) ||
     observe.taluka?.toLowerCase().includes(search.toLowerCase()) ||
     observe.remarks?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">निरीक्षण अभिप्राय फॉर्म</h5>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="UDISE क्रमांक शोधा..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <button className="btn btn-outline-success me-2" onClick={addObservationEntry}>
                नवीन नोंद जोडा
              </button>
              <button className="btn btn-outline-success me-2" onClick={downloadObservationExcel}>
                Excel डाउनलोड करा
              </button>
              {/*<button className="btn btn-outline-success" onClick={downloadObservationCSV}>
                CSV डाउनलोड करा
              </button>*/}
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
            {loading ? (
              <p className="text-center">लोड होत आहे...</p>
            ) : (
              <table className="table table-striped text-center">
                <thead style={{ position: "sticky", top: 0, background: "#f8f9fa", zIndex: 1 }}>
                  <tr>
                    <th>#</th>
                    {fieldMappings.map((field, index) => (
                      <th key={index}>{field.label}</th>
                    ))}
                    <th>Action</th>
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
                        डेटा उपलब्ध नाही
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