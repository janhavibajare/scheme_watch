import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateObservationForm = ({ role }) => { // Added role prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    region: "",
    district: "",
    taluka: "",
    schoolUdiseNumber: "",
    schoolName: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(true);

  // Data structure based on your document
  const regionsData = {
    "कोकण विभाग": {
      code: "KR",
      districts: {
        "मुंबई (BMC)": { code: "KR-1", talukas: { "चेंबूर": "KR-1.1", "भायखळा": "KR-1.2" } },
        "मुंबई (DYD)": { code: "KR-2", talukas: { "घाटकोपर": "KR-2.1", "ग्रँट रोड": "KR-2.2" } },
        "ठाणे": { code: "KR-3", talukas: { "अंबरनाथ": "KR-3.1", "कल्याण": "KR-3.2", "शहापूर": "KR-3.3" } },
        "पालघर": { code: "KR-4", talukas: { "जव्हार": "KR-4.1", "मोखाडा": "KR-4.2", "तलासरी": "KR-4.3" } },
        "रायगड": { code: "KR-5", talukas: { "महाड": "KR-5.1", "पनवेल": "KR-5.2" } },
        "रत्नागिरी": { code: "KR-6", talukas: { "खेड": "KR-6.1", "राजापूर": "KR-6.2" } },
        "सिंधुदुर्ग": { code: "KR-7", talukas: { "वैभववाडी": "KR-7.1", "कणकवली": "KR-7.2" } },
      },
    },
    "पश्चिम महाराष्ट्र": {
      code: "WM",
      districts: {
        "पुणे": { code: "WM-8", talukas: { "भोर": "WM-8.1", "वेल्हे": "WM-8.2", "हवेली": "WM-8.3", "जुन्नर": "WM-8.4", "खेड": "WM-8.5" } },
        "सातारा": { code: "WM-9", talukas: { "पाटण": "WM-9.1", "खंडाळा": "WM-9.2" } },
        "सांगली": { code: "WM-10", talukas: { "जत": "WM-10.1", "शिराळा": "WM-10.2" } },
        "कोल्हापूर": { code: "WM-11", talukas: { "पन्हाळा": "WM-11.1", "गगनबावडा": "WM-11.2" } },
        "सोलापूर": { code: "WM-12", talukas: { "मंगळवेढा": "WM-12.1", "बार्शी": "WM-12.2", "अक्कलकोट": "WM-12.3", "सांगोला": "WM-12.4" } },
      },
    },
    "उत्तर महाराष्ट्र": {
      code: "NM",
      districts: {
        "नाशिक": { code: "NM-13", talukas: { "त्र्यंबकेश्वर": "NM-13.1", "कळवण": "NM-13.2", "इगतपुरी": "NM-13.3", "सिन्नर": "NM-13.4" } },
        "धुळे": { code: "NM-14", talukas: { "शिरपूर": "NM-14.1", "सिंदखेडा": "NM-14.2" } },
        "नंदुरबार": { code: "NM-15", talukas: { "तळोदा": "NM-15.1", "शहादा": "NM-15.2" } },
        "जळगाव": { code: "NM-16", talukas: { "चोपडा": "NM-16.1", "यावल": "NM-16.2" } },
        "अहमदनगर": { code: "NM-17", talukas: { "जामखेड": "NM-17.1", "कर्जत": "NM-17.2", "नेवासा": "NM-17.3", "पारनेर": "NM-17.4" } },
      },
    },
    "मराठवाडा": {
      code: "M",
      districts: {
        "छ. संभाजीनगर": { code: "M-18", talukas: { "पैठण": "M-18.1", "गंगापूर": "M-18.2" } },
        "जालना": { code: "M-19", talukas: { "अंबड": "M-19.1", "जालना": "M-19.2" } },
        "बीड": { code: "M-20", talukas: { "पाटोदा": "M-20.1", "आष्टी": "M-20.2" } },
        "धुळे": { code: "M-21", talukas: { "परांडा": "M-21.1", "कळंब": "M-21.2" } },
        "नांदेड": { code: "M-22", talukas: { "नायगाव": "M-22.1", "लोहा": "M-22.2" } },
        "लातूर": { code: "M-23", talukas: { "निलंगा": "M-23.1", "औसा": "M-23.2" } },
        "परभणी": { code: "M-24", talukas: { "पूर्णा": "M-24.1", "गंगाखेड": "M-24.2" } },
        "हिंगोली": { code: "M-25", talukas: { "सेनगांव": "M-25.1", "वसमत": "M-25.2" } },
      },
    },
    "विदर्भ - पश्चिम": {
      code: "VW",
      districts: {
        "अमरावती": { code: "VW-26", talukas: { "दर्यापूर": "VW-26.1", "तियोसा": "VW-26.2" } },
        "अकोला": { code: "VW-27", talukas: { "तेल्हारा": "VW-27.1", "अकोट": "VW-27.2" } },
        "बुलढाणा": { code: "VW-28", talukas: { "मलकापूर": "VW-28.1", "संग्रामपूर": "VW-28.2" } },
        "वाशिम": { code: "VW-29", talukas: { "करंजा": "VW-29.1" } },
        "यवतमाळ": { code: "VW-30", talukas: { "उमरखेड": "VW-30.1", "दरव्हा": "VW-30.2", "दिग्रस": "VW-30.3", "घाटंजी": "VW-30.4" } },
      },
    },
    "विदर्भ - पूर्व": {
      code: "VE",
      districts: {
        "नागपूर": { code: "VE-31", talukas: { "रामटेक": "VE-31.1", "कामठी": "VE-31.2" } },
        "वर्धा": { code: "VE-32", talukas: { "आष्टी": "VE-32.1", "करंजा": "VE-32.2" } },
        "चंद्रपूर": { code: "VE-33", talukas: { "पोंभुर्णा": "VE-33.1", "सिंदेवाही": "VE-33.2" } },
        "गोंदिया": { code: "VE-34", talukas: { "तिरोडा": "VE-34.1" } },
        "भंडारा": { code: "VE-35", talukas: { "तुमसर": "VE-35.1" } },
        "गडचिरोली": { code: "VE-36", talukas: { "मुलचेरा": "VE-36.1", "भामरागड": "VE-36.2" } },
      },
    },
  };

  const fetchObservation = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Observation_Form", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        toast.error("अशी कोणतीही निरीक्षणे सापडली नाही!");
        navigate("/observation-feedback");
      }
    } catch (error) {
      toast.error("निरीक्षणे आणताना त्रुटी: " + error.message);
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
    if (name === "region") {
      setFormData((prev) => ({ ...prev, district: "", taluka: "" }));
    } else if (name === "district") {
      setFormData((prev) => ({ ...prev, taluka: "" }));
    }
  };

  const startDictation = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "mr-IN";

      recognition.onstart = () => toast.info("व्हॉईस इनपुट सुरू झाले...");
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setFormData((prev) => ({ ...prev, voiceInput: transcript }));
        toast.success("व्हॉईस इनपुट कॅप्चर झाले!");
      };
      recognition.onerror = (e) => {
        toast.error("व्हॉईस इनपुट त्रुटी: " + e.error);
      };
      recognition.onend = () => {
        recognition.stop();
      };

      recognition.start();
    } else {
      toast.error("या ब्राउझरमध्ये स्पीच रेकग्निशन समर्थित नाही.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, "Observation_Form", id);
      await updateDoc(docRef, {
        ...formData,
        timestamp: new Date().toISOString(),
      });
      toast.success("निरीक्षण यशस्वीरित्या अपडेट झाले!");

      // Dynamic redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if (role === "Research Officer") {
          navigate("/officer_dashboard"); // Adjust to "/dashboard" if needed
        } else {
          navigate("/observation-feedback"); // Fallback in case role is undefined
        }
      }, 1500);
    } catch (error) {
      toast.error("निरीक्षण अपडेट करताना त्रुटी: " + error.message);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">लोड होत आहे...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">
        प्रधानमंत्री पोषण शक्ती निर्माण योजना (अपडेट)
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="region" className="form-label fw-bold">
              विभाग:
            </label>
            <select
              id="region"
              name="region"
              className="form-control"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">विभाग निवडा</option>
              {Object.keys(regionsData).map((reg) => (
                <option key={regionsData[reg].code} value={regionsData[reg].code}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="district" className="form-label fw-bold">
              जिल्हा:
            </label>
            <select
              id="district"
              name="district"
              className="form-control"
              value={formData.district}
              onChange={handleChange}
              required
              disabled={!formData.region}
            >
              <option value="">जिल्हा निवडा</option>
              {formData.region &&
                Object.keys(regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts).map((dist) => (
                  <option key={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[dist].code} value={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[dist].code}>
                    {dist}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="taluka" className="form-label fw-bold">
              तालुका:
            </label>
            <select
              id="taluka"
              name="taluka"
              className="form-control"
              value={formData.taluka}
              onChange={handleChange}
              required
              disabled={!formData.district}
            >
              <option value="">तालुका निवडा</option>
              {formData.district &&
                Object.keys(
                  regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[
                    Object.keys(regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts).find(
                      (d) => regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[d].code === formData.district
                    )
                  ].talukas
                ).map((tal) => (
                  <option
                    key={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[Object.keys(regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts).find((d) => regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[d].code === formData.district)].talukas[tal]}
                    value={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[Object.keys(regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts).find((d) => regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[d].code === formData.district)].talukas[tal]}
                  >
                    {tal}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="udiseNo" className="form-label fw-bold">
              UDISE क्रमांक:
            </label>
            <input
              type="text"
              id="schoolUdiseNumber"
              name="schoolUdiseNumber" // Fixed name mismatch
              className="form-control"
              value={formData.schoolUdiseNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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
        </div>

        <p className="mt-3 text-justify">
          आज झालेल्या शाळेचे पोषण आहाराचे सामाजिक अंकक्षण व मूल्यांकन (सोशल ऑडिट) मधील वरील नमूद केलेले निरीक्षण हे पुढील येणाऱ्या ग्रामसभेमध्ये मांडणी करून चर्चा करू असे आश्वासित करतो.
        </p>

        <div className="mt-3">
          <label htmlFor="voiceInput" className="form-label fw-bold">
            अभिप्राय:
          </label>
          <textarea
            id="remarks"
            name="remarks" // Fixed name mismatch (was voiceInput)
            className="form-control"
            rows="4"
            placeholder="व्हॉईस इनपुट येथे दिसेल..."
            value={formData.remarks}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={startDictation}
            disabled={loading}
          >
            व्हॉईस इनपुट सुरू करा
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
              "अपडेट"
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/observation-feedback")}
            disabled={loading}
          >
            रद्द करा
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateObservationForm;