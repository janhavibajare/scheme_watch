import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const UpdateObserveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    district: "",
    voiceInput: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const startDictation = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "mr-IN";
      recognition.start();

      recognition.onresult = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          voiceInput: e.results[0][0].transcript,
        }));
        recognition.stop();
      };

      recognition.onerror = () => {
        recognition.stop();
      };
    }
  };

  const fetchObservation = async () => {
    try {
      setLoading(true);
      const response = await getDoc(doc(db, "Observation_Form", id));
      if (response.exists()) {
        const data = response.data();
        setFormData({
          schoolName: data.schoolName || "",
          district: data.district || "",
          voiceInput: data.voiceInput || "",
        });
        
      } else {
        console.log("No such document found.");
        setMessage("No record found.");
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
      setMessage("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, "Observation_Form", id);
      await updateDoc(docRef, {
        ...formData,
        timestamp: new Date(),
      });
      navigate("/dashboard");

      setMessage("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error.message);
      setMessage("Error updating data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">
        प्रधानमंत्री पोषण शक्ती निर्माण योजना(Update)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="school-name" className="form-label fw-bold">
            शाळेचे नाव:
          </label>
          <input
            type="text"
            id="school-name"
            className="form-control"
            value={formData.schoolName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
            }
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="district" className="form-label fw-bold">
            तालुका/जिल्हा:
          </label>
          <input
            type="text"
            id="district"
            className="form-control"
            value={formData.district}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, district: e.target.value }))
            }
            required
          />
        </div>

        <p className="mt-3 text-justify">
          आज झालेल्या शाळेचे पोषण आहाराचे सामाजिक अंकक्षण व मूल्यांकन (सोशल
          ऑडिट) मधील वरील नमूद केलेले निरीक्षण हे पुढील येणाऱ्या ग्रामसभेमध्ये
          मांडणी करून चर्चा करू असे आश्वासित करतो.
        </p>

        <div className="mt-3">
          <textarea
            id="voiceInput"
            className="form-control"
            rows="4"
            placeholder="Voice input will appear here..."
            value={formData.voiceInput}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, voiceInput: e.target.value }))
            }
          ></textarea>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={startDictation}
          >
            Start Voice Input
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {message && <p className="mt-3 text-success">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateObserveForm;
