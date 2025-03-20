import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateObservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: "",
    udiseNo: "",
    district: "",
    taluka: "",
    voiceInput: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchObservation = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Observation_Form", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        toast.error("No such observation found!");
        navigate("/admin_dashboard");
      }
    } catch (error) {
      toast.error("Error fetching observation: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startDictation = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "mr-IN";

      recognition.onstart = () => toast.info("Voice input started...");
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setFormData((prev) => ({ ...prev, voiceInput: transcript }));
        toast.success("Voice input captured!");
      };
      recognition.onerror = (e) => {
        toast.error("Voice input error: " + e.error);
      };
      recognition.onend = () => {
        recognition.stop();
      };

      recognition.start();
    } else {
      toast.error("Speech recognition not supported in this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, "Observation_Form", id);
      await updateDoc(docRef, {
        ...formData,
        timestamp: new Date().toISOString(), // Update timestamp
      });
      toast.success("Observation updated successfully!");
      setTimeout(() => navigate("/admin_dashboard"), 1500);
    } catch (error) {
      toast.error("Error updating observation: " + error.message);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">
        प्रधानमंत्री पोषण शक्ती निर्माण योजना (Update)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="schoolName" className="form-label fw-bold">
              शाळेचे नाव:
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              className="form-control"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="udiseNo" className="form-label fw-bold">
              UDISE क्रमांक:
            </label>
            <input
              type="text"
              id="udiseNo"
              name="udiseNo"
              className="form-control"
              value={formData.udiseNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="taluka" className="form-label fw-bold">
              तालुका:
            </label>
            <input
              type="text"
              id="taluka"
              name="taluka"
              className="form-control"
              value={formData.taluka}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="district" className="form-label fw-bold">
              जिल्हा:
            </label>
            <input
              type="text"
              id="district"
              name="district"
              className="form-control"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <p className="mt-3 text-justify">
          आज झालेल्या शाळेचे पोषण आहाराचे सामाजिक अंकक्षण व मूल्यांकन (सोशल
          ऑडिट) मधील वरील नमूद केलेले निरीक्षण हे पुढील येणाऱ्या ग्रामसभेमध्ये
          मांडणी करून चर्चा करू असे आश्वासित करतो.
        </p>

        <div className="mt-3">
          <label htmlFor="voiceInput" className="form-label fw-bold">
            Feedback:
          </label>
          <textarea
            id="voiceInput"
            name="voiceInput"
            className="form-control"
            rows="4"
            placeholder="Voice input will appear here..."
            value={formData.voiceInput}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={startDictation}
            disabled={loading}
          >
            Start Voice Input
          </button>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              "Update"
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin_dashboard")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateObservationForm;