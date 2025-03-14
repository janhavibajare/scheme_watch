import React from "react";

const SchoolFormPage3 = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">City:</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">State:</label>
        <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">ZIP Code:</label>
        <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} required />
      </div>
      <button className="btn btn-secondary me-2" onClick={prevStep}>Back</button>
      <button className="btn btn-primary" onClick={nextStep}>Next</button>
    </div>
  );
};

export default SchoolFormPage3;
