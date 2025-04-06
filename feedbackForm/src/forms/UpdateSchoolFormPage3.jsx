import React from "react";

const UpdateSchoolFormPage3 = ({
  formData,
  setFormData,
  handleChange,
  nextStep,
  prevStep,
}) => {
  // Handler for binary (yes/no) fields
  const handleBinaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  // Handler for numeric fields
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // Handler for text fields
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for beneficiaries table
  const handleBeneficiaryChange = (year, field, value) => {
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => {
      // Ensure beneficiaries object exists
      const beneficiaries = prev.beneficiaries || {};
      const updatedBeneficiaries = {
        ...beneficiaries,
        [year]: {
          ...(beneficiaries[year] || { boys: 0, girls: 0, total: 0 }),
          [field]: numericValue,
          total:
            (field === "boys"
              ? numericValue
              : beneficiaries[year]?.boys || 0) +
            (field === "girls"
              ? numericValue
              : beneficiaries[year]?.girls || 0),
        },
      };
      return {
        ...prev,
        beneficiaries: updatedBeneficiaries,
      };
    });
  };

  // Handler for financial data table
  const handleFinancialChange = (year, field, value) => {
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => {
      // Ensure financial objects exist
      const grantReceived = prev.grantReceived || {};
      const grantExpenditure = prev.grantExpenditure || {};
      const grantBalance = prev.grantBalance || {};
      const updatedField =
        field === "spent"
          ? "grantExpenditure"
          : field === "received"
          ? "grantReceived"
          : "grantBalance";
      return {
        ...prev,
        [updatedField]: {
          ...prev[updatedField],
          [year]: numericValue,
        },
        grantBalance: {
          ...grantBalance,
          [year]:
            (field === "received"
              ? numericValue
              : grantReceived[year] || 0) -
            (field === "spent"
              ? numericValue
              : grantExpenditure[year] || 0),
        },
      };
    });
  };

  const displayValue = (value) => (value === "" || value === undefined ? "" : value);

  // CSS to hide number input arrows
  const inputStyle = {
    WebkitAppearance: "none",
    MozAppearance: "textfield",
    appearance: "textfield",
  };

  // Next step handler without validation
  const handleNext = () => {
    nextStep();
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
                <label className="mb-2 d-block text-start">
                  १. विद्यार्थ्यांची आरोग्य तपासणी झाली का?
                </label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="healthCheckupDone"
                      value="1"
                      className="form-check-input"
                      checked={formData.healthCheckupDone === 1}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="healthCheckupDone"
                      value="0"
                      className="form-check-input"
                      checked={formData.healthCheckupDone === 0}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="mb-2 d-block text-start">
                  १.१. विद्यार्थ्यांची संख्या
                </label>
                <input
                  type="number"
                  name="healthCheckupStudentCount"
                  className="form-control"
                  value={displayValue(formData.healthCheckupStudentCount)}
                  onChange={handleNumberChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">
                  २. दर तीन महिन्याला BMI नोंद घेतली जाते काय?
                </label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="bmiRecorded"
                      value="1"
                      className="form-check-input"
                      checked={formData.bmiRecorded === 1}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="bmiRecorded"
                      value="0"
                      className="form-check-input"
                      checked={formData.bmiRecorded === 0}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">
                  ३. वजन/उंची मोजमाप होते का?
                </label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="weightHeightMeasured"
                      value="1"
                      className="form-check-input"
                      checked={formData.weightHeightMeasured === 1}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="weightHeightMeasured"
                      value="0"
                      className="form-check-input"
                      checked={formData.weightHeightMeasured === 0}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">नाही</label>
                  </div>
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label className="mb-2 d-block text-start">
                  ४. स्वयंपाकी मदतनीस यांची आरोग्य तपासणी होते काय?
                </label>
                <div className="d-flex align-items-center text-start">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="cookHealthCheck"
                      value="1"
                      className="form-check-input"
                      checked={formData.cookHealthCheck === 1}
                      onChange={handleBinaryChange}
                    />
                    <label className="form-check-label ms-1">होय</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="cookHealthCheck"
                      value="0"
                      className="form-check-input"
                      checked={formData.cookHealthCheck === 0}
                      onChange={handleBinaryChange}
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
              <label className="mb-2 d-block text-start">१. सहाय्यक १ नाव</label>
              <input
                type="text"
                name="helper1Name"
                className="form-control"
                placeholder="नाव टाका"
                value={formData.helper1Name || ""}
                onChange={handleTextChange}
              />
            </div>
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">२. सहाय्यक २ नाव</label>
              <input
                type="text"
                name="helper2Name"
                className="form-control"
                placeholder="नाव टाका"
                value={formData.helper2Name || ""}
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">
                ३. शालेय व्यवस्थापन समिती ठराव
              </label>
              <div className="d-flex align-items-center text-start">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="hasSmcResolution"
                    value="1"
                    className="form-check-input"
                    checked={formData.hasSmcResolution === 1}
                    onChange={handleBinaryChange}
                  />
                  <label className="form-check-label ms-1">होय</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="hasSmcResolution"
                    value="0"
                    className="form-check-input"
                    checked={formData.hasSmcResolution === 0}
                    onChange={handleBinaryChange}
                  />
                  <label className="form-check-label ms-1">नाही</label>
                </div>
              </div>
            </div>
            <div className="col-md-6 form-group">
              <label className="mb-2 d-block text-start">
                ४. दर सहा महिन्यास आरोग्य प्रमाणपत्र
              </label>
              <div className="d-flex align-items-center text-start">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="hasHealthCertificate"
                    value="1"
                    className="form-check-input"
                    checked={formData.hasHealthCertificate === 1}
                    onChange={handleBinaryChange}
                  />
                  <label className="form-check-label ms-1">होय</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="hasHealthCertificate"
                    value="0"
                    className="form-check-input"
                    checked={formData.hasHealthCertificate === 0}
                    onChange={handleBinaryChange}
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
              <tr>
                <td>2022-23</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुले"
                    value={displayValue(formData.beneficiaries?.["2022-23"]?.boys)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2022-23", "boys", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुली"
                    value={displayValue(formData.beneficiaries?.["2022-23"]?.girls)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2022-23", "girls", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.beneficiaries?.["2022-23"]?.total)}</td>
              </tr>
              <tr>
                <td>2023-24</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुले"
                    value={displayValue(formData.beneficiaries?.["2023-24"]?.boys)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2023-24", "boys", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुली"
                    value={displayValue(formData.beneficiaries?.["2023-24"]?.girls)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2023-24", "girls", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.beneficiaries?.["2023-24"]?.total)}</td>
              </tr>
              <tr>
                <td>2024-25</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुले"
                    value={displayValue(formData.beneficiaries?.["2024-25"]?.boys)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2024-25", "boys", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="मुली"
                    value={displayValue(formData.beneficiaries?.["2024-25"]?.girls)}
                    onChange={(e) =>
                      handleBeneficiaryChange("2024-25", "girls", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.beneficiaries?.["2024-25"]?.total)}</td>
              </tr>
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
                <th className="text-start">
                  शाळेच्या बँक खात्यावर जमा झालेल्या अनुदानाची रक्कम
                </th>
                <th className="text-start">एकूण खर्च रक्कम</th>
                <th className="text-start">शिल्लक रक्कम</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-23</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="जमा रक्कम"
                    value={displayValue(formData.grantReceived?.["2022-23"])}
                    onChange={(e) =>
                      handleFinancialChange("2022-23", "received", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="खर्च रक्कम"
                    value={displayValue(formData.grantExpenditure?.["2022-23"])}
                    onChange={(e) =>
                      handleFinancialChange("2022-23", "spent", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.grantBalance?.["2022-23"])}</td>
              </tr>
              <tr>
                <td>2023-24</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="जमा रक्कम"
                    value={displayValue(formData.grantReceived?.["2023-24"])}
                    onChange={(e) =>
                      handleFinancialChange("2023-24", "received", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="खर्च रक्कम"
                    value={displayValue(formData.grantExpenditure?.["2023-24"])}
                    onChange={(e) =>
                      handleFinancialChange("2023-24", "spent", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.grantBalance?.["2023-24"])}</td>
              </tr>
              <tr>
                <td>2024-25</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="जमा रक्कम"
                    value={displayValue(formData.grantReceived?.["2024-25"])}
                    onChange={(e) =>
                      handleFinancialChange("2024-25", "received", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="खर्च रक्कम"
                    value={displayValue(formData.grantExpenditure?.["2024-25"])}
                    onChange={(e) =>
                      handleFinancialChange("2024-25", "spent", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td>{displayValue(formData.grantBalance?.["2024-25"])}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-primary btn-lg me-2"
          onClick={prevStep}
        >
          मागे जा
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleNext}
        >
          पुढे चला
        </button>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage3;