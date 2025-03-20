import React from "react";

const UpdateSchoolFormPage3 = ({
  formData,
  handleChange,
  handleBinaryChange,
  handleNumberChange,
  handleBeneficiaryYearlyChange,
  handleFinancialChange,
  nextStep,
  prevStep,
}) => {
  const displayValue = (value) => (value === 0 || value === "" || value === null ? "" : value);

  const inputStyle = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    appearance: "textfield",
  };

  return (
    <div className="container-xxl">
      {/* Health Checkup Section */}
      <div className="container my-5">
        <div className="card p-4 shadow-lg w-100 mx-auto">
          <div className="card-header bg-primary text-white">
            <h3>आरोग्य तपासणी माहिती</h3>
          </div>
          <br />
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">१. शाळेत आरोग्य तपासणी झाली का?</label>
                <select
                  className="form-select"
                  name="hadHealthCheckup"
                  value={formData.hadHealthCheckup ?? ""}
                  onChange={(e) => handleBinaryChange("hadHealthCheckup", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">१.१ असल्यास तारीख</label>
                <input
                  type="date"
                  className="form-control"
                  name="healthCheckupDate"
                  value={formData.healthCheckupDate || ""}
                  onChange={handleChange}
                  disabled={formData.hadHealthCheckup !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">१.२ तपासणी झालेल्या विद्यार्थ्यांची संख्या</label>
                <input
                  type="number"
                  className="form-control"
                  name="healthCheckupStudentCount"
                  value={displayValue(formData.healthCheckupStudentCount)}
                  onChange={(e) => handleNumberChange("healthCheckupStudentCount", e.target.value)}
                  style={inputStyle}
                  disabled={formData.hadHealthCheckup !== 1}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">१.३ आरोग्य तपासणी अहवाल उपलब्ध आहे का?</label>
                <select
                  className="form-select"
                  name="hasHealthCheckupReport"
                  value={formData.hasHealthCheckupReport ?? ""}
                  onChange={(e) => handleBinaryChange("hasHealthCheckupReport", e.target.value)}
                  required
                  disabled={formData.hadHealthCheckup !== 1}
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">१.४ विशेष टीप (असल्यास)</label>
                <textarea
                  className="form-control"
                  name="healthCheckupNotes"
                  value={formData.healthCheckupNotes || ""}
                  onChange={handleChange}
                  rows="2"
                  disabled={formData.hadHealthCheckup !== 1}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Yearly Beneficiaries Section */}
      <div className="container my-5">
        <div className="card p-4 shadow-lg w-100 mx-auto">
          <div className="card-header bg-primary text-white">
            <h3>वर्षानुसार लाभार्थी माहिती</h3>
          </div>
          <br />
          <form>
            {/* 2022-23 */}
            <h5 className="mt-3">वर्ष २०२२-२३</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">मुली</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2022-23"]?.girls)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2022-LX", "girls", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">मुले</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2022-23"]?.boys)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2022-23", "boys", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">एकूण</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2022-23"]?.total)}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>

            {/* 2023-24 */}
            <h5 className="mt-3">वर्ष २०२३-२४</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">मुली</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2023-24"]?.girls)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2023-24", "girls", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">मुले</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2023-24"]?.boys)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2023-24", "boys", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">एकूण</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2023-24"]?.total)}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>

            {/* 2024-25 */}
            <h5 className="mt-3">वर्ष २०२४-२५</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">मुली</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2024-25"]?.girls)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2024-25", "girls", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">मुले</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2024-25"]?.boys)}
                  onChange={(e) =>
                    handleBeneficiaryYearlyChange("2024-25", "boys", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">एकूण</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.beneficiariesYearly?.["2024-25"]?.total)}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Financial Data Section */}
      <div className="container my-5">
        <div className="card p-4 shadow-lg w-100 mx-auto">
          <div className="card-header bg-primary text-white">
            <h3>अनुदान माहिती</h3>
          </div>
          <br />
          <form>
            {/* 2022-23 */}
            <h5 className="mt-3">वर्ष २०२२-२३</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">जमा रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantReceived?.["2022-23"])}
                  onChange={(e) =>
                    handleFinancialChange("2022-23", "deposited", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">खर्च रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantExpenditure?.["2022-23"])}
                  onChange={(e) =>
                    handleFinancialChange("2022-23", "spent", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">शिल्लक रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantBalance?.["2022-23"])}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>

            {/* 2023-24 */}
            <h5 className="mt-3">वर्ष २०२३-२४</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">जमा रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantReceived?.["2023-24"])}
                  onChange={(e) =>
                    handleFinancialChange("2023-24", "deposited", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">खर्च रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantExpenditure?.["2023-24"])}
                  onChange={(e) =>
                    handleFinancialChange("2023-24", "spent", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">शिल्लक रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantBalance?.["2023-24"])}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>

            {/* 2024-25 */}
            <h5 className="mt-3">वर्ष २०२४-२५</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">जमा रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantReceived?.["2024-25"])}
                  onChange={(e) =>
                    handleFinancialChange("2024-25", "deposited", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">खर्च रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantExpenditure?.["2024-25"])}
                  onChange={(e) =>
                    handleFinancialChange("2024-25", "spent", e.target.value)
                  }
                  style={inputStyle}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">शिल्लक रक्कम</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayValue(formData.grantBalance?.["2024-25"])}
                  style={inputStyle}
                  readOnly
                />
              </div>
            </div>
          </form>
          <div className="text-center mt-4">
            <button type="button" className="btn btn-secondary btn-lg me-3" onClick={prevStep}>
              मागे जा
            </button>
            <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
              पुढे चला
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage3;