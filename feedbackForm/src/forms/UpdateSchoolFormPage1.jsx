import React from "react";

const UpdateSchoolFormPage1 = ({
  formData,
  setFormData,
  handleChange,
  handleBinaryChange,
  nextStep,
}) => {
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
        "छ. संभाजीनगर": { code: "M-11", talukas: { "पैठण": "M-11.1", "गंगापूर": "M-11.2" } },
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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === "region") {
      setFormData((prev) => ({
        ...prev,
        region: value,
        district: "",
        taluka: "",
      }));
    } else if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        taluka: "",
      }));
    } else {
      handleChange(e);
    }
  };

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
      totalTeachers:
        name === "teacherMale"
          ? numericValue + (prev.teacherFemale || 0)
          : (prev.teacherMale || 0) + numericValue,
    }));
  };

  const handleStudentChange = (e, gradeKey) => {
    const { name, value } = e.target;
    const gender = name === "female" ? "female" : "male";
    const numericValue = value === "" ? "" : Number(value) || "";
    
    setFormData((prev) => {
      const updatedGrade = {
        ...prev.gradeStudents[gradeKey],
        [gender]: numericValue,
      };
      updatedGrade.total =
        (updatedGrade.female === "" ? 0 : updatedGrade.female) +
        (updatedGrade.male === "" ? 0 : updatedGrade.male);

      const allGrades = { ...prev.gradeStudents, [gradeKey]: updatedGrade };
      const totalGirls = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.female === "" ? 0 : grade.female),
        0
      );
      const totalBoys = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.male === "" ? 0 : grade.male),
        0
      );

      return {
        ...prev,
        gradeStudents: allGrades,
        totalGirls,
        totalBoys,
        totalStudents: totalGirls + totalBoys,
      };
    });
  };

  const inputStyle = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    appearance: "textfield",
  };

  const displayValue = (value) => (value === 0 || value === "" ? "" : value);

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
      <div className="container-xxl">
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-primary text-white">
              <h3>शाळेबद्दल माहिती</h3>
            </div>
            <br />
            <form>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">प्रदेश</label>
                  <select
                    className="form-select no-arrow"
                    name="region"
                    value={formData.region || ""}
                    onChange={handleLocationChange}
                  >
                    <option value="">निवडा</option>
                    {Object.keys(regionsData).map((reg) => (
                      <option key={regionsData[reg].code} value={regionsData[reg].code}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">जिल्हा (A)</label>
                  <select
                    className="form-select no-arrow"
                    name="district"
                    value={formData.district || ""}
                    onChange={handleLocationChange}
                    disabled={!formData.region}
                  >
                    <option value="">निवडा</option>
                    {formData.region &&
                      Object.keys(regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts).map((dist) => (
                        <option key={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[dist].code} value={regionsData[Object.keys(regionsData).find((r) => regionsData[r].code === formData.region)].districts[dist].code}>
                          {dist}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">तालुका (B)</label>
                  <select
                    className="form-select no-arrow"
                    name="taluka"
                    value={formData.taluka || ""}
                    onChange={handleLocationChange}
                    disabled={!formData.district}
                  >
                    <option value="">निवडा</option>
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
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेचे नाव</label>
                  <input
                    type="text"
                    className="form-control"
                    name="schoolName"
                    value={formData.schoolName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">UDISE कोड (C)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="udiseCode"
                    value={formData.udiseCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">तपासणी करणाऱ्याचे नाव</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inspectorName"
                    value={formData.inspectorName || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेचे पूर्ण नाव (संपूर्ण पत्त्यासह)</label>
                  <textarea
                    className="form-control"
                    rows="1"
                    name="schoolFullName"
                    value={formData.schoolFullName || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">तपासणी तारीख</label>
                  <input
                    type="date"
                    className="form-control"
                    name="inspectionDate"
                    value={formData.inspectionDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">तपासणी वेळ</label>
                  <input
                    type="time"
                    className="form-control"
                    name="inspectionTime"
                    value={formData.inspectionTime || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुख्याध्यापकाचे नाव</label>
                  <input
                    type="text"
                    className="form-control"
                    name="headmasterName"
                    value={formData.headmasterName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुख्याध्यापकाचा फोन</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="headmasterPhone"
                    value={formData.headmasterPhone || ""}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder="१० अंकी क्रमांक प्रविष्ट करा"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुख्याध्यापकाचा पत्ता</label>
                  <textarea
                    className="form-control"
                    rows="1"
                    name="headmasterAddress"
                    value={formData.headmasterAddress || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">सहाय्यक शिक्षकाचे नाव</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assistantTeacherName"
                    value={formData.assistantTeacherName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">सहाय्यक शिक्षकाचा फोन</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="assistantTeacherPhone"
                    value={formData.assistantTeacherPhone || ""}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder="१० अंकी क्रमांक प्रविष्ट करा"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेतील शिक्षक संख्या - पुरुष (D-1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherMale"
                    value={displayValue(formData.teacherMale)}
                    onChange={handleTeacherChange}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेतील शिक्षक संख्या - महिला (D-2)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherFemale"
                    value={displayValue(formData.teacherFemale)}
                    onChange={handleTeacherChange}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण शिक्षक संख्या (D-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalTeachers"
                    value={displayValue(formData.totalTeachers)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">विद्यार्थी संख्या - मुले (E-1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalBoys"
                    value={displayValue(formData.totalBoys)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">विद्यार्थी संख्या - मुली (E-2)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalGirls"
                    value={displayValue(formData.totalGirls)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी संख्या (E-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalStudents"
                    value={displayValue(formData.totalStudents)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 1-4 */}
              <h5 className="mt-3">इयत्ता १-४</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली (F-1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={displayValue(formData.gradeStudents?.grade1to4?.female)}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले (F-2)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={displayValue(formData.gradeStudents?.grade1to4?.male)}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी (F-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    value={displayValue(formData.gradeStudents?.grade1to4?.total)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 5-7 */}
              <h5 className="mt-3">इयत्ता ५-७</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली (G-1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={displayValue(formData.gradeStudents?.grade5to7?.female)}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले (G-2)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={displayValue(formData.gradeStudents?.grade5to7?.male)}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी (G-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    value={displayValue(formData.gradeStudents?.grade5to7?.total)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 8-10 */}
              <h5 className="mt-3">इयत्ता ८-१०</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली (H-1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={displayValue(formData.gradeStudents?.grade8to10?.female)}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले (H-2)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={displayValue(formData.gradeStudents?.grade8to10?.male)}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    style={inputStyle}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी (H-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total"
                    value={displayValue(formData.gradeStudents?.grade8to10?.total)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* School Premises Section */}
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-primary text-white">
              <h3>शाळेच्या परिसराबद्दल माहिती</h3>
            </div>
            <br />
            <form>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">१. मध्यान्ह भोजन माहिती फलक आहे का? (SP-1)</label>
                  <select
                    className="form-select"
                    name="hasMiddayMealBoard"
                    value={formData.hasMiddayMealBoard === null ? "" : formData.hasMiddayMealBoard}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">२. मध्यान्ह भोजन मेनू आहे का? (SP-2)</label>
                  <select
                    className="form-select"
                    name="hasMiddayMealMenu"
                    value={formData.hasMiddayMealMenu === null ? "" : formData.hasMiddayMealMenu}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">३. शाळा व्यवस्थापन समिती बोर्ड आहे का? (SP-3)</label>
                  <select
                    className="form-select"
                    name="hasManagementBoard"
                    value={formData.hasManagementBoard === null ? "" : formData.hasManagementBoard}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">४. मुख्याध्यापक यांचा संपर्क क्रमांक आहे का? (SP-4)</label>
                  <select
                    className="form-select"
                    name="hasPrincipalContact"
                    value={formData.hasPrincipalContact === null ? "" : formData.hasPrincipalContact}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">५. तालुका/जिल्हास्तरीय अधिकाऱ्यांचा क्रमांक आहे का? (SP-5)</label>
                  <select
                    className="form-select"
                    name="hasOfficerContact"
                    value={formData.hasOfficerContact === null ? "" : formData.hasOfficerContact}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">६. मध्यान्ह भोजन बाबत तक्रार पेटी आहे का? (SP-6)</label>
                  <select
                    className="form-select"
                    name="hasComplaintBox"
                    value={formData.hasComplaintBox === null ? "" : formData.hasComplaintBox}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">७. आपत्कालीन दूरध्वनी क्रमांक भिंतीवर आहे का? (SP-7)</label>
                  <select
                    className="form-select"
                    name="hasEmergencyNumber"
                    value={formData.hasEmergencyNumber === null ? "" : formData.hasEmergencyNumber}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">८. किचनशेड उपलब्ध आहे काय? (SP-8)</label>
                  <select
                    className="form-select"
                    name="hasKitchenShed"
                    value={formData.hasKitchenShed === null ? "" : formData.hasKitchenShed}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">९. प्राथमिक उपचार पेटी उपलब्ध आहे काय? (SP-9)</label>
                  <select
                    className="form-select"
                    name="hasFirstAidBox"
                    value={formData.hasFirstAidBox === null ? "" : formData.hasFirstAidBox}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Water Source Fields */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">१०. शाळेमध्ये पिण्याच्या पाण्याचे स्रोत आहे का? (SP-10)</label>
                  <select
                    className="form-select"
                    name="hasWaterSource"
                    value={formData.hasWaterSource === null ? "" : formData.hasWaterSource}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१०.१ असलयास : (SP-10.1)</label>
                  <select
                    className="form-select"
                    name="waterSourceType"
                    value={formData.waterSourceType || ""}
                    onChange={handleChange}
                    disabled={formData.hasWaterSource !== 1}
                  >
                    <option value="">निवडा</option>
                    <option value="1">हातपंप</option>
                    <option value="2">नळ</option>
                    <option value="3">विहीर</option>
                    <option value="4">बोअरवेल</option>
                    <option value="5">इतर</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१०.२ पाणी पुरवठा नियमित आहे का? (SP-10.2)</label>
                  <select
                    className="form-select"
                    name="hasRegularWaterSupply"
                    value={formData.hasRegularWaterSupply === null ? "" : formData.hasRegularWaterSupply}
                    onChange={handleBinaryChange}
                    disabled={formData.hasWaterSource !== 1}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Fire Extinguisher Fields */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">११. आपत्कालीन परिस्थितीत अग्निशमन उपकरणे उपलब्ध आहेत का? (SP-11)</label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisher"
                    value={formData.hasFireExtinguisher === null ? "" : formData.hasFireExtinguisher}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">११.१ तपासणी नोंदवली जाते का? (SP-11.1)</label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisherCheck"
                    value={formData.hasFireExtinguisherCheck === null ? "" : formData.hasFireExtinguisherCheck}
                    onChange={handleBinaryChange}
                    disabled={formData.hasFireExtinguisher !== 1}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">११.२ पुनर्भरण नियमित होते का? (SP-11.2)</label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisherRefill"
                    value={formData.hasFireExtinguisherRefill === null ? "" : formData.hasFireExtinguisherRefill}
                    onChange={handleBinaryChange}
                    disabled={formData.hasFireExtinguisher !== 1}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">११.३ अग्निशामक तपशील</label>
                  <textarea
                    className="form-control"
                    name="fireExtinguisherDetails"
                    value={formData.fireExtinguisherDetails || ""}
                    onChange={handleChange}
                    rows="1"
                  ></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१२. परसबाग विकसित आहे काय? (SP-12)</label>
                  <select
                    className="form-select"
                    name="hasKitchenGarden"
                    value={formData.hasKitchenGarden === null ? "" : formData.hasKitchenGarden}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१२.१ पालेभाज्या/फळे वापरले जातात का? (SP-12.1)</label>
                  <select
                    className="form-select"
                    name="usesGardenProduce"
                    value={formData.usesGardenProduce === null ? "" : formData.usesGardenProduce}
                    onChange={handleBinaryChange}
                    disabled={formData.hasKitchenGarden !== 1}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">१२.२ स्वयंपाक बाग तपशील</label>
                  <textarea
                    className="form-control"
                    name="kitchenGardenDetails"
                    value={formData.kitchenGardenDetails || ""}
                    onChange={handleChange}
                    rows="1"
                  ></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१३. नाविन्यपूर्ण उपक्रम (SP-13)</label>
                  <textarea
                    className="form-control"
                    name="innovativeInitiatives"
                    value={formData.innovativeInitiatives || ""}
                    onChange={handleChange}
                    rows="1"
                  ></textarea>
                </div>
              </div>
            </form>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={nextStep}
              >
                पुढे चला
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSchoolFormPage1;