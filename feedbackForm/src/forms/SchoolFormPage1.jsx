import React from "react";

const SchoolFormPage1 = ({ formData, setFormData, handleChange, nextStep }) => {
  // Handler for teacher fields (converts to number)
  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // Handler for grade-specific student fields (updates totals dynamically)
  const handleStudentChange = (e, gradeKey) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => {
      const updatedGrade = {
        ...prev.beneficiaries[gradeKey],
        [name]: numericValue,
      };
      updatedGrade.total =
        (updatedGrade.boys === "" ? 0 : updatedGrade.boys) +
        (updatedGrade.girls === "" ? 0 : updatedGrade.girls);

      const allGrades = { ...prev.beneficiaries, [gradeKey]: updatedGrade };
      const totalBoys = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.boys === "" ? 0 : grade.boys),
        0
      );
      const totalGirls = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.girls === "" ? 0 : grade.girls),
        0
      );

      return {
        ...prev,
        beneficiaries: allGrades,
        totalBoys,
        totalGirls,
      };
    });
  };

  // Handler for binary (yes/no) fields (converts to number for Firebase)
  const handleBinaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value), // "1" -> 1, "0" -> 0
    }));
  };

  // Validation and next step handler (alert removed)
  const handleNext = () => {
    nextStep();
  };

  // CSS to hide number input arrows
  const inputStyle = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    appearance: "textfield",
  };

  // Utility function to display blank instead of 0
  const displayValue = (value) => (value === 0 || value === "" ? "" : value);

  return (
    <>
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
                  <label className="form-label">District</label>
                  <select
                    className="form-control"
                    name="district"
                    value={formData.district || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="District 1">District 1</option>
                    <option value="District 2">District 2</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Taluka</label>
                  <select
                    className="form-control"
                    name="taluka"
                    value={formData.taluka || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="Taluka 1">Taluka 1</option>
                    <option value="Taluka 2">Taluka 2</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">UDISE Code</label>
                  <select
                    className="form-control"
                    name="udiseCode"
                    value={formData.udiseCode || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="123456">123456</option>
                    <option value="789012">789012</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">School Name</label>
                  <select
                    className="form-control"
                    name="schoolName"
                    value={formData.schoolName || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="School A">School A</option>
                    <option value="School B">School B</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Visit Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="inspectionDate"
                    value={formData.inspectionDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Visit Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="inspectionTime"
                    value={formData.inspectionTime || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Auditor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inspectorName"
                    value={formData.inspectorName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    शाळेचे पूर्ण नाव (संपूर्ण पत्त्यासह)
                  </label>
                  <textarea
                    className="form-control"
                    rows="1"
                    name="schoolFullName"
                    value={formData.schoolFullName || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Principal Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="headmasterName"
                    value={formData.headmasterName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Principal Contact</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="headmasterPhone"
                    value={formData.headmasterPhone || ""}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Principal Address</label>
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
                  <label className="form-label">
                    शालेय पोषण आहार शिक्षकाचे नाव
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="assistantTeacherName"
                    value={formData.assistantTeacherName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">संपर्क क्रमांक</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="assistantTeacherPhone"
                    value={formData.assistantTeacherPhone || ""}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेतील शिक्षक संख्या - महिला</label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherFemale"
                    value={displayValue(formData.teacherFemale)}
                    onChange={handleTeacherChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">शाळेतील शिक्षक संख्या - पुरुष</label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherMale"
                    value={displayValue(formData.teacherMale)}
                    onChange={handleTeacherChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण शिक्षक संख्या</label>
                  <input
                    type="number"
                    className="form-control"
                    value={displayValue(
                      (formData.teacherMale || 0) + (formData.teacherFemale || 0)
                    )}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">विद्यार्थी संख्या - मुली</label>
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
                  <label className="form-label">विद्यार्थी संख्या - मुले</label>
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
                  <label className="form-label">एकूण विद्यार्थी संख्या</label>
                  <input
                    type="number"
                    className="form-control"
                    value={displayValue(
                      (formData.totalBoys || 0) + (formData.totalGirls || 0)
                    )}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 1-4 */}
              <h5 className="mt-3">इयत्ता 1-4</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="girls"
                    value={displayValue(formData.beneficiaries["grade1to4"]?.girls)}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="boys"
                    value={displayValue(formData.beneficiaries["grade1to4"]?.boys)}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={displayValue(formData.beneficiaries["grade1to4"]?.total)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 5-7 */}
              <h5 className="mt-3">इयत्ता 5-7</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="girls"
                    value={displayValue(formData.beneficiaries["grade5to7"]?.girls)}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="boys"
                    value={displayValue(formData.beneficiaries["grade5to7"]?.boys)}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={displayValue(formData.beneficiaries["grade5to7"]?.total)}
                    style={inputStyle}
                    readOnly
                  />
                </div>
              </div>

              {/* Grades 8-10 */}
              <h5 className="mt-3">इयत्ता 8-10</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="girls"
                    value={displayValue(formData.beneficiaries["grade8to10"]?.girls)}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="boys"
                    value={displayValue(formData.beneficiaries["grade8to10"]?.boys)}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={displayValue(formData.beneficiaries["grade8to10"]?.total)}
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
                  <label className="form-label">
                    १. मध्यान्ह भोजन माहिती फलक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasMiddayMealBoard"
                    value={formData.hasMiddayMealBoard}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">२. मध्यान्ह भोजन मेनू आहे का?</label>
                  <select
                    className="form-select"
                    name="hasMiddayMealMenu"
                    value={formData.hasMiddayMealMenu}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ३. शाळा व्यवस्थापन समिती बोर्ड आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasManagementBoard"
                    value={formData.hasManagementBoard}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ४. मुख्याध्यापक यांचा संपर्क क्रमांक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasPrincipalContact"
                    value={formData.hasPrincipalContact}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ५. तालुका/जिल्हास्तरीय अधिकाऱ्यांचा क्रमांक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasOfficerContact"
                    value={formData.hasOfficerContact}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ६. मध्यान्ह भोजन बाबत तक्रार पेटी आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasComplaintBox"
                    value={formData.hasComplaintBox}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ७. शाळा परिसरात आपत्कालीन दूरध्वनी क्रमांक भिंती वर शाळेला आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasEmergencyNumber"
                    value={formData.hasEmergencyNumber}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ८. शाळा परिसरात किचनशेड उपलब्ध आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="hasKitchenShed"
                    value={formData.hasKitchenShed}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ९. शाळेमध्ये प्रार्थमोपचार पेटी उपलब्ध आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="hasFirstAidBox"
                    value={formData.hasFirstAidBox}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १०. शाळेमध्ये पिण्याच्या पाण्याचे स्रोत आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasWaterSource"
                    value={formData.hasWaterSource}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१०.१ असलयास :</label>
                  <select
                    className="form-select"
                    name="waterSourceType"
                    value={formData.waterSourceType || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="हातपंप">हातपंप</option>
                    <option value="नळ">नळ</option>
                    <option value="विहीर">विहीर</option>
                    <option value="बोअरवेल">बोअरवेल</option>
                    <option value="इतर">इतर</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १०.२ पाणी पुरवठा नियमित आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="hasRegularWaterSupply"
                    value={formData.hasRegularWaterSupply}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११. शाळेमध्ये आपत्कालीन परिस्थितीत अग्निशमन उपकरणे (Fire Extinguisher) उपलब्ध आहेत का?
                  </label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisher"
                    value={formData.hasFireExtinguisher}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११.१ असलयास, नियत कालावधीनंतर उपकरणाची मिट/इतर बाबीची तपासणीच्या रजिस्टरवर नोंडी घेण्यात येतात का?
                  </label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisherCheck"
                    value={formData.hasFireExtinguisherCheck}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११.२ तसेच उपकरणाचे पुनर्भरण नियमितपणे करण्यात येते का?
                  </label>
                  <select
                    className="form-select"
                    name="hasFireExtinguisherRefill"
                    value={formData.hasFireExtinguisherRefill}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११.३ असलयास र्थोडक्यात तपशील नमि करण्यात यावा. (सन २०२२ ते २०२४)
                  </label>
                  <textarea
                    className="form-control"
                    name="fireExtinguisherDetails"
                    value={formData.fireExtinguisherDetails || ""}
                    onChange={handleChange}
                    rows="1"
                  ></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १२. शाळेमध्ये परसबाग विकसित करण्यात आलेली आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="hasKitchenGarden"
                    value={formData.hasKitchenGarden}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १२.१ असलयास परसबागेतील पालेभाज्या/फळे इत्यादीचा वापर नियमितपणाने आहारात करण्यात येतो काय?
                  </label>
                  <select
                    className="form-select"
                    name="usesGardenProduce"
                    value={formData.usesGardenProduce}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १२.२ असलयास र्थोडक्यात तपशील नमि करण्यात यावा.
                  </label>
                  <textarea
                    className="form-control"
                    name="kitchenGardenDetails"
                    value={formData.kitchenGardenDetails || ""}
                    onChange={handleChange}
                    rows="1"
                  ></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १३. शाळे मध्ये काही नाविन्यपूर्ण उपक्रम राबविला असल्यास त्या बद्दल तपशील द्यावा
                  </label>
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
                onClick={handleNext}
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

export default SchoolFormPage1;