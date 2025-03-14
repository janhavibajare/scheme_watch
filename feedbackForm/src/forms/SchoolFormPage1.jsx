import React from "react";

const SchoolFormPage1 = ({ formData, setFormData, handleChange, nextStep }) => {
  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value) || 0;

    setFormData((prev) => {
      const updatedTeachers = {
        ...prev.teachers,
        [name]: numericValue,
      };
      updatedTeachers.total = updatedTeachers.male + updatedTeachers.female;

      return { ...prev, teachers: updatedTeachers };
    });
  };

  return (
    <>
      <div className="container-xxl">
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-info text-white">
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
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value="">Select District</option>
                    <option value="District 1">District 1</option>
                    <option value="District 2">District 2</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Taluka</label>
                  <select
                    className="form-control"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                  >
                    <option value="">Select Taluka</option>
                    <option value="Taluka 1">Taluka 1</option>
                    <option value="Taluka 2">Taluka 2</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">UDISE Code</label>
                  <select
                    className="form-control"
                    name="udisecode"
                    value={formData.udisecode}
                    onChange={handleChange}
                  >
                    <option value="">Select UDISE Code</option>
                    <option value="123456">123456</option>
                    <option value="789012">789012</option>
                  </select>
                </div>
              </div>
              <div className="row"></div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">School Name</label>
                  <select
                    className="form-control"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                  >
                    <option value="">Select School</option>
                    <option value="School A">School A</option>
                    <option value="School B">School B</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Visit Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Visit Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Auditor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="auditorName"
                    value={formData.auditorName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    शाळेचे पूर्ण नाव (संपूर्ण पत्त्यासह)
                  </label>
                  <textarea
                    className="form-control"
                    rows="1"
                    name="fullAddress"
                    value={formData.fullAddress}
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
                    name="principalName"
                    value={formData.principal?.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Principal Contact</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="principalContact"
                    value={formData.principal?.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Principal Address</label>
                  <textarea
                    className="form-control"
                    rows="1"
                    name="principalAddress"
                    value={formData.principal?.address}
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
                    name="nutritionTeacherName"
                    value={formData.nutritionTeacher?.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">संपर्क क्रमांक</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="nutritionTeacherContact"
                    value={formData.nutritionTeacher?.contact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    शाळेतील शिक्षक संख्या - महिला
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherFemale"
                    value={formData.teachers?.female}
                    onChange={handleTeacherChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    शाळेतील शिक्षक संख्या - पुरुष
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherMale"
                    value={formData.teachers?.male}
                    onChange={handleTeacherChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण शिक्षक संख्या</label>
                  <input
                    type="number"
                    className="form-control"
                    name="teacherTotal"
                    value={formData.teachers?.total}
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
                    name="studentsFemale"
                    value={formData.students?.female}
                    onChange={handleTeacherChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">विद्यार्थी संख्या - मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="studentsMale"
                    value={formData.students?.male}
                    onChange={handleTeacherChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी संख्या</label>
                  <input
                    type="number"
                    className="form-control"
                    name="studentsTotal"
                    value={formData.students?.total}
                    readOnly
                  />
                </div>
              </div>
              <h5 className="mt-3">इयत्ता 1-4</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={formData.students?.grade1to4.female}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={formData.students?.grade1to4.male}
                    onChange={(e) => handleStudentChange(e, "grade1to4")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.students?.grade1to4.total}
                    readOnly
                  />
                </div>
              </div>

              <h5 className="mt-3">इयत्ता 5-7</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={formData.students?.grade5to7.female}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={formData.students?.grade5to7.male}
                    onChange={(e) => handleStudentChange(e, "grade5to7")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.students?.grade5to7.total}
                    readOnly
                  />
                </div>
              </div>

              <h5 className="mt-3">इयत्ता 8-10</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुली</label>
                  <input
                    type="number"
                    className="form-control"
                    name="female"
                    value={formData.students?.grade8to10.female}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">मुले</label>
                  <input
                    type="number"
                    className="form-control"
                    name="male"
                    value={formData.students?.grade8to10.male}
                    onChange={(e) => handleStudentChange(e, "grade8to10")}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">एकूण विद्यार्थी</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.students?.grade8to10.total}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-info text-white">
              <h3>शाळेच्या परिसराबद्दल माहिती</h3>
            </div>
            <br />
            <form>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १.मध्यान्ह भोजन माहिती फलक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q1"
                    value={formData.schoolInfrastructure?.hasMiddayMealBoard}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    २.मध्यान्ह भोजन मेनू आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q2"
                    value={formData.schoolInfrastructure?.hasMiddayMealMenu}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ३.शाळा व्यवस्थापन समिती बोर्ड आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q3"
                    value={
                      formData.schoolInfrastructure?.hasSchoolManagementBoard
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>

              {/* Additional Questions */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ४.मुख्याध्यापक यांचा संपर्क क्रमांक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q4"
                    value={
                      formData.schoolInfrastructure?.hasPrincipalContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ५.तालुका/जिल्हास्तरीय अधिकाऱ्यांचा क्रमांक आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q5"
                    value={
                      formData.schoolInfrastructure?.hasOfficerContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ६.मध्यान्ह भोजन बाबत तक्रार पेटी आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q6"
                    value={formData.schoolInfrastructure?.hasComplaintBox}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ७. शाळा परिसरात आपत्कालीन दूरध्वनी क्रमांक भिंती वर शाळेला
                    आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q4"
                    value={
                      formData.schoolInfrastructure?.hasPrincipalContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ८. शाळा परिसरात किचनशेड उपलब्ध आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="q5"
                    value={
                      formData.schoolInfrastructure?.hasOfficerContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ९. शाळेमध्ये प्रार्थमोपचार पेटी उपलब्ध आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="q6"
                    value={formData.schoolInfrastructure?.hasComplaintBox}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
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
                    name="q4"
                    value={
                      formData.schoolInfrastructure?.hasPrincipalContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">१०.१ असलयास :</label>
                  <select
                    className="form-select"
                    name="q5"
                    value={
                      formData.schoolInfrastructure?.hasOfficerContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १०.२ पाणी पुरवठा नियमित आहे का?
                  </label>
                  <select
                    className="form-select"
                    name="q6"
                    value={formData.schoolInfrastructure?.hasComplaintBox}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११. शाळेमध्ये आपत्कालीन परिस्थितीत अग्निशमन उपकरणे (Fire
                    Extinguisher) उपलब्ध आहेत का?
                  </label>
                  <select
                    className="form-select"
                    name="q4"
                    value={
                      formData.schoolInfrastructure?.hasPrincipalContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११.१ असलयास, नियत कालावधीनंतर उपकरणाची मिट/इतर बाबीची
                    तपासणीच्या रजिस्टरवर नोंडी घेण्यात येतात का?
                  </label>
                  <select
                    className="form-select"
                    name="q5"
                    value={
                      formData.schoolInfrastructure?.hasOfficerContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    ११.२ तसेच उपकरणाचे पुनर्भरण नियमितपणे करण्यात येते का?
                  </label>
                  <select
                    className="form-select"
                    name="q6"
                    value={formData.schoolInfrastructure?.hasComplaintBox}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १२. शाळेमध्ये परसबाग ववकशसत करण्यात आलेली आहे काय?
                  </label>
                  <select
                    className="form-select"
                    name="q4"
                    value={
                      formData.schoolInfrastructure?.hasPrincipalContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १२.१ असलयास परसबागेतील पालेभाज्या/फळे इत्यािीचा वापर
                    ननयशमतपणाने आहारात करण्यात येतो काय?
                  </label>
                  <select
                    className="form-select"
                    name="q5"
                    value={
                      formData.schoolInfrastructure?.hasOfficerContactDisplay
                    }
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    १३ शाळे मध्ये काही नाववन्यपूणण उपक्रम राबववला असल्हयास त्या
                    बद्िल तपशील द्यावा
                  </label>
                  <select
                    className="form-select"
                    name="q6"
                    value={formData.schoolInfrastructure?.hasComplaintBox}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>

              {/* More fields can be added similarly */}
            </form>
            <div className="text-center mt-4">
              <button type="button" className="btn btn-primary btn-md ms-3" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolFormPage1;
