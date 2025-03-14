import React, { useState } from "react";
import { db } from "../components/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ObservationForm = () => {
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState("");
  const [district, setDistrict] = useState("");
  const [voiceInput, setVoiceInput] = useState("");
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
        setVoiceInput(e.results[0][0].transcript);
        recognition.stop();
      };

      recognition.onerror = () => {
        recognition.stop();
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "Observation_Form"), {
        schoolName,
        district,
        voiceInput,
        timestamp: new Date(),
      });

      navigate("/dashboard")

      setMessage("Data submitted successfully!");
      setSchoolName("");
      setDistrict("");
      setVoiceInput("");
    } catch (error) {
      setMessage("Error submitting data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">
        प्रधानमंत्री पोषण शक्ती निर्माण योजना
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
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
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
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
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
            value={voiceInput}
            onChange={(e) => setVoiceInput(e.target.value)}
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {message && <p className="mt-3 text-success">{message}</p>}
      </form>
    </div>
  );
};

export default ObservationForm;
