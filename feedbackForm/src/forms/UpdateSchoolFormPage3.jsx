import React from "react";

const UpdateSchoolFormPage3 = ({
  formData = {},
  handleChange,
  handleBinaryChange,
  handleNumberChange,
  handleBeneficiaryChange,
  handleFinancialChange,
  nextStep,
  prevStep,
}) => {
  const inputStyle = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    appearance: "textfield",
  };

  const displayValue = (value) => (value === undefined || value === null || value === 0 ? "" : value);

  // Default structure for nested objects
  const defaultBeneficiaries = {
    "2022-23": { boys: '', girls: '', total: '' },
    "2023-24": { boys: '', girls: '', total: '' },
    "2024-25": { boys: '', girls: '', total: '' }
  };
  
  const defaultFinancial = {
    "2022-23": '',
    "2023-24": '',
    "2024-25": ''
  };

  // Merge fetched data with defaults
  const safeFormData = {
    healthCheckupDone: 0,
    healthCheckupStudentCount: '',
    bmiRecorded: 0,
    weightHeightMeasured: 0,
    cookHealthCheck: 0,
    helper1Name: '',
    helper2Name: '',
    hasSmcResolution: 0,
    hasHealthCertificate: 0,
    beneficiariesYearly: { ...defaultBeneficiaries, ...formData.beneficiariesYearly },
    grantReceived: { ...defaultFinancial, ...formData.grantReceived },
    grantExpenditure: { ...defaultFinancial, ...formData.grantExpenditure },
    grantBalance: { ...defaultFinancial, ...formData.grantBalance },
    ...formData
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      {/* Health Information */}
      <div className="card p-4 shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">आरोग्य विषयक माहिती</h3>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="mb-2 d-block text-start">१. विद्यार्थ्यांची आरोग्य तपासणी झाली का?</label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="healthCheckupDone"
                      value="1"
                      className="form-check-input"
                      checked={safeFormData.healthCheckupDone === 1}
                      onChange={(e) => handleBinaryChange("healthCheckupDone", e.target.value)}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="healthCheckupDone"
                      value="0"
                      className="form-check-input"
                      checked={safeFormData.healthCheckupDone === 0}
                      onChange={(e) => handleBinaryChange("healthCheckupDone", e.target.value)}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="mb-2 d-block text-start">१.१. असलयास विद्यार्थ्यांची संख्या नमूद करा:</label>
                <input
                  type="number"
                  name="healthCheckupStudentCount"
                  className="form-control"
                  value={displayValue(safeFormData.healthCheckupStudentCount)}
                  onChange={handleNumberChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">२. दर तीन महिन्याला विद्यार्थ्यांचा BMI काढून नोंदवहीमध्ये नोंद घेतली जाते काय?</label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="bmiRecorded"
                      value="1"
                      className="form-check-input"
                      checked={safeFormData.bmiRecorded === 1}
                      onChange={(e) => handleBinaryChange("bmiRecorded", e.target.value)}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="bmiRecorded"
                      value="0"
                      className="form-check-input"
                      checked={safeFormData.bmiRecorded === 0}
                      onChange={(e) => handleBinaryChange("bmiRecorded", e.target.value)}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">३. विद्यार्थ्यांचे वजन/उंची याचे मोजमाप करण्यात येते का?</label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="weightHeightMeasured"
                      value="1"
                      className="form-check-input"
                      checked={safeFormData.weightHeightMeasured === 1}
                      onChange={(e) => handleBinaryChange("weightHeightMeasured", e.target.value)}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="weightHeightMeasured"
                      value="0"
                      className="form-check-input"
                      checked={safeFormData.weightHeightMeasured === 0}
                      onChange={(e) => handleBinaryChange("weightHeightMeasured", e.target.value)}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">४. आहार शिजविणाऱ्या स्वयंपाकी मदतनीस यांची दर सहा महिन्यास आरोग्य तपासणी होते काय?</label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="cookHealthCheck"
                      value="1"
                      className="form-check-input"
                      checked={safeFormData.cookHealthCheck === 1}
                      onChange={(e) => handleBinaryChange("cookHealthCheck", e.target.value)}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="cookHealthCheck"
                      value="0"
                      className="form-check-input"
                      checked={safeFormData.cookHealthCheck === 0}
                      onChange={(e) => handleBinaryChange("cookHealthCheck", e.target.value)}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Helper Details */}
      <div className="card p-4 shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">स्वयंपाकी/मदतनीस तपशील</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">स्वयंपाकी/मदतनीस नाव १ (आवश्यक)</label>
              <input
                type="text"
                name="helper1Name"
                className="form-control"
                placeholder="नाव टाका (आवश्यक)"
                value={safeFormData.helper1Name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">स्वयंपाकी/मदतनीस नाव २</label>
              <input
                type="text"
                name="helper2Name"
                className="form-control"
                placeholder="नाव टाका"
                value={safeFormData.helper2Name || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">शालेय व्यवस्थापन समिती ठराव (आहे/नाही)</label>
              <div className="d-flex align-items-center text-start">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="hasSmcResolution"
                    value="1"
                    className="form-check-input"
                    checked={safeFormData.hasSmcResolution === 1}
                    onChange={(e) => handleBinaryChange("hasSmcResolution", e.target.value)}
                  />
                  <label className="form-check-label ms-1">होय</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="hasSmcResolution"
                    value="0"
                    className="form-check-input"
                    checked={safeFormData.hasSmcResolution === 0}
                    onChange={(e) => handleBinaryChange("hasSmcResolution", e.target.value)}
                  />
                  <label className="form-check-label ms-1">नाही</label>
                </div>
              </div>
            </div>
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">दर सहा महिन्यास तपासणीचे आरोग्य प्रमाणपत्र (आहे/नाही)</label>
              <div className="d-flex align-items-center text-start">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="hasHealthCertificate"
                    value="1"
                    className="form-check-input"
                    checked={safeFormData.hasHealthCertificate === 1}
                    onChange={(e) => handleBinaryChange("hasHealthCertificate", e.target.value)}
                  />
                  <label className="form-check-label ms-1">होय</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="hasHealthCertificate"
                    value="0"
                    className="form-check-input"
                    checked={safeFormData.hasHealthCertificate === 0}
                    onChange={(e) => handleBinaryChange("hasHealthCertificate", e.target.value)}
                  />
                  <label className="form-check-label ms-1">नाही</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="card p-4 shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3>गेल्या तीन वर्षांमध्ये योजनेंतर्गत लाभ दिलेल्या लाभार्थ्यांची संख्या</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-secondary">
              <tr>
                <th className="text-start">वर्ष</th>
                <th className="text-start">मुले</th>
                <th className="text-start">मुली</th>
                <th className="text-start">एकूण</th>
              </tr>
            </thead>
            <tbody>
              {["2022-23", "2023-24", "2024-25"].map((year) => (
                <tr key={year}>
                  <td>{year}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="मुले"
                      value={displayValue(safeFormData.beneficiariesYearly[year]?.boys)}
                      onChange={(e) => handleBeneficiaryChange(year, "boys", e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="मुली"
                      value={displayValue(safeFormData.beneficiariesYearly[year]?.girls)}
                      onChange={(e) => handleBeneficiaryChange(year, "girls", e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                  <td>{displayValue(safeFormData.beneficiariesYearly[year]?.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Details */}
      <div className="card p-4 shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">इंधन भाजीपाला व धान्यादी माल अनुदान तपशील</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-secondary">
              <tr>
                <th className="text-start">वर्ष</th>
                <th className="text-start">शाळेच्या बँक खात्यावर जमा झालेल्या अनुदानाची रक्कम</th>
                <th className="text-start">एकूण खर्च रक्कम</th>
                <th className="text-start">शिल्लक रक्कम</th>
              </tr>
            </thead>
            <tbody>
              {["2022-23", "2023-24", "2024-25"].map((year) => (
                <tr key={year}>
                  <td>{year}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="रक्कम"
                      value={displayValue(safeFormData.grantReceived[year])}
                      onChange={(e) => handleFinancialChange(year, "deposited", e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="रक्कम"
                      value={displayValue(safeFormData.grantExpenditure[year])}
                      onChange={(e) => handleFinancialChange(year, "spent", e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                  <td>{displayValue(safeFormData.grantBalance[year])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        <button type="button" className="btn btn-primary btn-lg me-2" onClick={prevStep}>
          मागे जा
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
          पुढे चला
        </button>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage3;