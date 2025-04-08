import React, { useEffect, useState } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateParentForm = ({ role }) => { // Added role prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    region: "",
    district: "",
    taluka: "",
    schoolUdiseNumber: "",
    parentName: "",
    schoolName: "",
    child1: "",
    child1Sec: "",
    child2: "",
    child2Sec: "",
    parentEducation: "",
    address: "",
    sendChildDaily: null,
    reason: "",
    weightGain: null,
    sickFrequency: null,
    studyProgress: null,
    concentration: null,
    nutrition: null,
    attendance: null,
    impactOfNutritionScheme: "",
    effectOnAfternoonAttendance: "",
    effectOfNutritionDietPlan: "",
    improvementSuggestions: "",
    phone: "",
  });

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

  const fetchParent = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Parent_Form", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        toast.error("अशी कोणतीही पालक फॉर्म सापडली नाही!");

        navigate("/parent-feedback"); // Updated to parent-feedback as fallback

      }
    } catch (error) {
      toast.error("पालक डेटा आणताना त्रुटी: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "region") {
      setFormData({ ...formData, region: value, district: "", taluka: "" });
    } else if (name === "district") {
      setFormData({ ...formData, district: value, taluka: "" });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, "Parent_Form", id);
      await updateDoc(docRef, formData);
      toast.success("फॉर्म यशस्वीरित्या अपडेट झाला!");

      
      // Dynamic redirect based on role with a delay
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if (role === "Research Officer") {
          navigate("/officer_dashboard"); // Adjust to "/dashboard" if needed
        } else {
          navigate("/parent-feedback"); // Fallback if role is undefined
        }
      }, 1500); // 1.5s delay to show toast

    } catch (error) {
      toast.error("फॉर्म अपडेट करताना त्रुटी: " + error.message);
      console.error("फॉर्म अपडेट करताना त्रुटी: ", error);
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
    <>
      <style>
        {`
          .no-arrow {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding-right: 10px;
            background: none;
          }
          .no-arrow:focus {
            outline: none;
            border-color: #007bff;
          }
        `}
      </style>
      <div className="container shadow p-3 mb-5 bg-body-tertiary rounded mt-4">
        <h2 className="text-center mb-3">
          <b>पालकांचा अभिप्राय प्रश्नावली (अपडेट फॉर्म)</b>
        </h2>
        <form className="fs-6" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">विभाग</label>
              <select
                className="form-select no-arrow"
                name="region"
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
              <label className="form-label fw-semibold">जिल्हा</label>
              <select
                className="form-select no-arrow"
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!formData.region}
                required
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
              <label className="form-label fw-semibold">तालुका</label>
              <select
                className="form-select no-arrow"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                disabled={!formData.district}
                required
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
              <label className="form-label fw-semibold">शाळेचा UDISE क्रमांक</label>
              <input
                type="text"
                className="form-control"
                name="schoolUdiseNumber"
                value={formData.schoolUdiseNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="parentName" className="fw-semibold">
                  १. पालकाचे संपूर्ण नाव
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="schoolName" className="fw-semibold">
                  १.१ शाळेचे नाव
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <h6 className="fw-semibold">
              २.सदर शाळेत शिकत असलेल्या पाल्यांचे नावे
            </h6>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-semibold">१</label>
                <input
                  type="text"
                  className="form-control"
                  id="child1"
                  name="child1"
                  value={formData.child1}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="child1Sec" className="fw-semibold">
                  इयत्ता व तुकडी
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="child1Sec"
                  name="child1Sec"
                  value={formData.child1Sec}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="fw-semibold">२</label>
                <input
                  type="text"
                  className="form-control"
                  id="child2"
                  name="child2"
                  value={formData.child2}
                  onChange={handleChange}
                />
                <label htmlFor="child2Sec" className="fw-semibold">
                  इयत्ता व तुकडी
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="child2Sec"
                  name="child2Sec"
                  value={formData.child2Sec}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="parentEducation" className="fw-semibold">
                  3.पालकाची शैक्षणिक पात्रता
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="parentEducation"
                  name="parentEducation"
                  value={formData.parentEducation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="address" className="fw-semibold">
                  ४.पालकाचा निवासाचा संपूर्ण पत्ता
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  rows="1"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ५.मुलांना दररोज शाळेत पाठवतात का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sendChildDaily"
                      id="sendChildDailyYes"
                      value="1"
                      checked={formData.sendChildDaily === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="sendChildDailyYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sendChildDaily"
                      id="sendChildDailyNo"
                      value="0"
                      checked={formData.sendChildDaily === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="sendChildDailyNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="form-group">
              <label className="fw-semibold">
                ५.१ नसल्यास कारण नमूद करायात यावेः
              </label>
              <textarea
                className="form-control"
                id="reason"
                rows="1"
                name="reason"
                value={formData.reason || ""}
                onChange={handleChange}
                disabled={formData.sendChildDaily !== "0"}
              />
            </div>
          </div>

          <div className="row mb-2">
            <h6 className="fw-semibold">६.मुलांवर पोषण आहाराचा प्रभाव</h6>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.१ मुलांचे/मुलींचे वजन वाढले का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weightGain"
                      id="weightGainYes"
                      value="1"
                      checked={formData.weightGain === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="weightGainYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="weightGain"
                      id="weightGainNo"
                      value="0"
                      checked={formData.weightGain === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="weightGainNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.२ वारंवार आजारी पडायाचे प्रमाण कमी झाले का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sickFrequency"
                      id="sickFrequencyYes"
                      value="1"
                      checked={formData.sickFrequency === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="sickFrequencyYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sickFrequency"
                      id="sickFrequencyNo"
                      value="0"
                      checked={formData.sickFrequency === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="sickFrequencyNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.३ अभ्यासातील प्रगती चांगली झाली का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="studyProgress"
                      id="studyProgressYes"
                      value="1"
                      checked={formData.studyProgress === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="studyProgressYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="studyProgress"
                      id="studyProgressNo"
                      value="0"
                      checked={formData.studyProgress === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="studyProgressNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.४ अभ्यासातील एकाग्रता वाढली का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="concentration"
                      id="concentrationYes"
                      value="1"
                      checked={formData.concentration === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="concentrationYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="concentration"
                      id="concentrationNo"
                      value="0"
                      checked={formData.concentration === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="concentrationNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.५ मुला-मुलींचे पोषण चांगले होत आहे का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nutrition"
                      id="nutritionYes"
                      value="1"
                      checked={formData.nutrition === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="nutritionYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="nutrition"
                      id="nutritionNo"
                      value="0"
                      checked={formData.nutrition === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="nutritionNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ६.६ नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="attendance"
                      id="attendanceYes"
                      value="1"
                      checked={formData.attendance === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="attendanceYes">
                      होय
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="attendance"
                      id="attendanceNo"
                      value="0"
                      checked={formData.attendance === "0"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="attendanceNo">
                      नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ७.विद्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार
                  योजनेचा प्रभाव
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="impactOfNutritionScheme"
                      id="attendSchoolRegularly"
                      value="1"
                      checked={formData.impactOfNutritionScheme === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="attendSchoolRegularly">
                      नियमितपणे शाळेत जाणे
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="impactOfNutritionScheme"
                      id="sometimesGoing"
                      value="2"
                      checked={formData.impactOfNutritionScheme === "2"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="sometimesGoing">
                      कधीकधी जाणे
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="impactOfNutritionScheme"
                      id="justGoForTheDiet"
                      value="3"
                      checked={formData.impactOfNutritionScheme === "3"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="justGoForTheDiet">
                      फक्त आहारासाठी जाणे
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="impactOfNutritionScheme"
                      id="notGoing"
                      value="4"
                      checked={formData.impactOfNutritionScheme === "4"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="notGoing">
                      जात नाही
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ८.दुपारच्या उपस्थितीवर जेवणाचा प्रभाव
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOnAfternoonAttendance"
                      id="increase1"
                      value="1"
                      checked={formData.effectOnAfternoonAttendance === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="increase1">
                      वाढलेली
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOnAfternoonAttendance"
                      id="noEffect1"
                      value="2"
                      checked={formData.effectOnAfternoonAttendance === "2"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="noEffect1">
                      कोणताही परिणाम नाही
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOnAfternoonAttendance"
                      id="decrease1"
                      value="3"
                      checked={formData.effectOnAfternoonAttendance === "3"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="decrease1">
                      कमी
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold">
                  ९.मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव
                  तुम्हाला कसा वाटतो ?
                </label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOfNutritionDietPlan"
                      id="increase2"
                      value="1"
                      checked={formData.effectOfNutritionDietPlan === "1"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="increase2">
                      वाढलेली
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOfNutritionDietPlan"
                      id="noEffect2"
                      value="2"
                      checked={formData.effectOfNutritionDietPlan === "2"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="noEffect2">
                      कोणताही परिणाम नाही
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="effectOfNutritionDietPlan"
                      id="decrease2"
                      value="3"
                      checked={formData.effectOfNutritionDietPlan === "3"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="decrease2">
                      कमी
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-12">
              <div className="form-group">
                <label className="fw-semibold">
                  १०.योजनेमध्ये सुधारणा करण्यासाठी सूचना
                </label>
                <textarea
                  className="form-control"
                  id="improvementSuggestions"
                  rows="2"
                  name="improvementSuggestions"
                  value={formData.improvementSuggestions}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">मोबाइल नंबर</label>
              <input
                type="tel"
                className="form-control"
                placeholder="+91 1234567890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col text-center">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  "अपडेट करा"
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/parent-feedback")}
                disabled={loading}
              >
                रद्द करा
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default UpdateParentForm;