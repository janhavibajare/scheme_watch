import React from "react";

const UpdateSchoolFormPage4 = ({
  formData,
  handleChange,
  handleBinaryChange,
  handleQualityChange,
  prevStep,
  handleSubmit,
}) => {
  return (
    <div className="container-xxl">
      {/* Facilities Section */}
      <div className="container my-5">
        <div className="card p-4 shadow-lg w-100 mx-auto">
          <div className="card-header bg-primary text-white">
            <h3>सुविधा आणि गुणवत्ता माहिती</h3>
          </div>
          <br />
          <form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>अ. क्र.</th>
                  <th>सुविधा</th>
                  <th>होय</th>
                  <th>नाही</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td>स्वयंपाकगृह</td>
                  <td>
                    <input
                      type="radio"
                      name="hasKitchen"
                      value="1"
                      checked={formData.hasKitchen === 1}
                      onChange={(e) => handleBinaryChange("hasKitchen", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="hasKitchen"
                      value="0"
                      checked={formData.hasKitchen === 0}
                      onChange={(e) => handleBinaryChange("hasKitchen", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>२</td>
                  <td>साठवणूक कक्ष</td>
                  <td>
                    <input
                      type="radio"
                      name="hasStorageRoom"
                      value="1"
                      checked={formData.hasStorageRoom === 1}
                      onChange={(e) => handleBinaryChange("hasStorageRoom", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="hasStorageRoom"
                      value="0"
                      checked={formData.hasStorageRoom === 0}
                      onChange={(e) => handleBinaryChange("hasStorageRoom", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>३</td>
                  <td>स्वयंपाकासाठी गॅस उपलब्ध</td>
                  <td>
                    <input
                      type="radio"
                      name="hasCookingGas"
                      value="1"
                      checked={formData.hasCookingGas === 1}
                      onChange={(e) => handleBinaryChange("hasCookingGas", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="hasCookingGas"
                      value="0"
                      checked={formData.hasCookingGas === 0}
                      onChange={(e) => handleBinaryChange("hasCookingGas", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>४</td>
                  <td>साफसफाईसाठी साहित्य उपलब्ध</td>
                  <td>
                    <input
                      type="radio"
                      name="hasCleaningSupplies"
                      value="1"
                      checked={formData.hasCleaningSupplies === 1}
                      onChange={(e) => handleBinaryChange("hasCleaningSupplies", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="hasCleaningSupplies"
                      value="0"
                      checked={formData.hasCleaningSupplies === 0}
                      onChange={(e) => handleBinaryChange("hasCleaningSupplies", e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Quality Assessment */}
            <h5 className="mt-4">गुणवत्ता मूल्यांकन</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>अ. क्र.</th>
                  <th>बाब</th>
                  <th>निकृष्ट</th>
                  <th>बरीचशी</th>
                  <th>अतिशय</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>१</td>
                  <td>स्वयंपाकगृहाची स्वच्छता</td>
                  <td>
                    <input
                      type="radio"
                      name="kitchenCleanliness"
                      value="निकृष्ट"
                      checked={formData.kitchenCleanliness === "निकृष्ट"}
                      onChange={(e) => handleQualityChange("kitchenCleanliness", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="kitchenCleanliness"
                      value="बरीचशी"
                      checked={formData.kitchenCleanliness === "बरीचशी"}
                      onChange={(e) => handleQualityChange("kitchenCleanliness", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="kitchenCleanliness"
                      value="अतिशय"
                      checked={formData.kitchenCleanliness === "अतिशय"}
                      onChange={(e) => handleQualityChange("kitchenCleanliness", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>२</td>
                  <td>अन्नाची गुणवत्ता</td>
                  <td>
                    <input
                      type="radio"
                      name="foodQuality"
                      value="निकृष्ट"
                      checked={formData.foodQuality === "निकृष्ट"}
                      onChange={(e) => handleQualityChange("foodQuality", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="foodQuality"
                      value="बरीचशी"
                      checked={formData.foodQuality === "बरीचशी"}
                      onChange={(e) => handleQualityChange("foodQuality", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="foodQuality"
                      value="अतिशय"
                      checked={formData.foodQuality === "अतिशय"}
                      onChange={(e) => handleQualityChange("foodQuality", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>३</td>
                  <td>साठवणूक कक्षाची स्वच्छता</td>
                  <td>
                    <input
                      type="radio"
                      name="storageCleanliness"
                      value="निकृष्ट"
                      checked={formData.storageCleanliness === "निकृष्ट"}
                      onChange={(e) => handleQualityChange("storageCleanliness", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="storageCleanliness"
                      value="बरीचशी"
                      checked={formData.storageCleanliness === "बरीचशी"}
                      onChange={(e) => handleQualityChange("storageCleanliness", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="storageCleanliness"
                      value="अतिशय"
                      checked={formData.storageCleanliness === "अतिशय"}
                      onChange={(e) => handleQualityChange("storageCleanliness", e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Helper Details */}
            <h5 className="mt-4">मदतनीस माहिती</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">मदतनीस १ चे नाव *</label>
                <input
                  type="text"
                  className="form-control"
                  name="helper1Name"
                  value={formData.helper1Name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">मदतनीस १ चा संपर्क क्रमांक</label>
                <input
                  type="tel"
                  className="form-control"
                  name="helper1Phone"
                  value={formData.helper1Phone || ""}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Enter 10-digit number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">मदतनीस २ चे नाव</label>
                <input
                  type="text"
                  className="form-control"
                  name="helper2Name"
                  value={formData.helper2Name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">मदतनीस २ चा संपर्क क्रमांक</label>
                <input
                  type="tel"
                  className="form-control"
                  name="helper2Phone"
                  value={formData.helper2Phone || ""}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Enter 10-digit number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">विशेष टीप (असल्यास)</label>
                <textarea
                  className="form-control"
                  name="finalNotes"
                  value={formData.finalNotes || ""}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </form>
          <div className="text-center mt-4">
            <button type="button" className="btn btn-secondary btn-lg me-3" onClick={prevStep}>
              मागे जा
            </button>
            <button type="button" className="btn btn-success btn-lg" onClick={handleSubmit}>
              अपडेट करा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage4;