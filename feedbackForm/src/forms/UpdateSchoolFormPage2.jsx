import React from "react";

const UpdateSchoolFormPage2 = ({
  formData,
  handleChange,
  handleBinaryChange,
  nextStep,
  prevStep,
}) => {
  const displayValue = (value) => (value === 0 || value === "" || value === null ? "" : value);

  return (
    <div className="container-xxl">
      {/* Nutrition Info Section */}
      <div className="container my-5">
        <div className="card p-4 shadow-lg w-100 mx-auto">
          <div className="card-header bg-primary text-white">
            <h3>मध्यान्ह भोजन आणि पोषण माहिती</h3>
          </div>
          <br />
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">१. शालेय पोषण आहार समिती आहे का?</label>
                <select
                  className="form-select"
                  name="hasDietCommittee"
                  value={formData.hasDietCommittee ?? ""}
                  onChange={(e) => handleBinaryChange("hasDietCommittee", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">१.१ असल्यास समितीची बैठक नियमित घेतली जाते का?</label>
                <select
                  className="form-select"
                  name="hasRegularDietCommitteeMeeting"
                  value={formData.hasRegularDietCommitteeMeeting ?? ""}
                  onChange={(e) => handleBinaryChange("hasRegularDietCommitteeMeeting", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">१.२ समितीच्या बैठकीचा अहवाल ठेवला जातो का?</label>
                <select
                  className="form-select"
                  name="hasDietCommitteeReport"
                  value={formData.hasDietCommitteeReport ?? ""}
                  onChange={(e) => handleBinaryChange("hasDietCommitteeReport", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">२. मध्यान्ह भोजनाची वेळ निश्चित आहे का?</label>
                <select
                  className="form-select"
                  name="hasFixedMealTime"
                  value={formData.hasFixedMealTime ?? ""}
                  onChange={(e) => handleBinaryChange("hasFixedMealTime", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">२.१ असल्यास वेळ</label>
                <input
                  type="time"
                  className="form-control"
                  name="mealTime"
                  value={formData.mealTime || ""}
                  onChange={handleChange}
                  disabled={formData.hasFixedMealTime !== 1}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">३. शालेय पोषण आहार रजिस्टर ठेवले जाते का?</label>
                <select
                  className="form-select"
                  name="hasMealRegister"
                  value={formData.hasMealRegister ?? ""}
                  onChange={(e) => handleBinaryChange("hasMealRegister", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">४. शालेय पोषण आहाराचा मेनू ठरलेला आहे का?</label>
                <select
                  className="form-select"
                  name="hasMealMenu"
                  value={formData.hasMealMenu ?? ""}
                  onChange={(e) => handleBinaryChange("hasMealMenu", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">४.१ असल्यास मेनूचे तपशील</label>
                <textarea
                  className="form-control"
                  name="mealMenuDetails"
                  value={formData.mealMenuDetails || ""}
                  onChange={handleChange}
                  rows="2"
                  disabled={formData.hasMealMenu !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">५. शालेय पोषण आहाराची गुणवत्ता तपासली जाते का?</label>
                <select
                  className="form-select"
                  name="checksMealQuality"
                  value={formData.checksMealQuality ?? ""}
                  onChange={(e) => handleBinaryChange("checksMealQuality", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">५.१ असल्यास कोण तपासते?</label>
                <input
                  type="text"
                  className="form-control"
                  name="mealQualityInspector"
                  value={formData.mealQualityInspector || ""}
                  onChange={handleChange}
                  disabled={formData.checksMealQuality !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">६. शालेय पोषण आहारात फळांचा समावेश आहे का?</label>
                <select
                  className="form-select"
                  name="includesFruits"
                  value={formData.includesFruits ?? ""}
                  onChange={(e) => handleBinaryChange("includesFruits", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">६.१ असल्यास कोणती फळे?</label>
                <input
                  type="text"
                  className="form-control"
                  name="fruitDetails"
                  value={formData.fruitDetails || ""}
                  onChange={handleChange}
                  disabled={formData.includesFruits !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">७. शालेय पोषण आहारात दूधाचा समावेश आहे का?</label>
                <select
                  className="form-select"
                  name="includesMilk"
                  value={formData.includesMilk ?? ""}
                  onChange={(e) => handleBinaryChange("includesMilk", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">७.१ असल्यास किती वेळा (आठवड्यात)?</label>
                <input
                  type="number"
                  className="form-control"
                  name="milkFrequency"
                  value={displayValue(formData.milkFrequency)}
                  onChange={handleChange}
                  min="0"
                  max="7"
                  disabled={formData.includesMilk !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">८. शालेय पोषण आहारात अंड्यांचा समावेश आहे का?</label>
                <select
                  className="form-select"
                  name="includesEggs"
                  value={formData.includesEggs ?? ""}
                  onChange={(e) => handleBinaryChange("includesEggs", e.target.value)}
                  required
                >
                  <option value="">निवडा</option>
                  <option value="1">होय</option>
                  <option value="0">नाही</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">८.१ असल्यास किती वेळा (आठवड्यात)?</label>
                <input
                  type="number"
                  className="form-control"
                  name="eggFrequency"
                  value={displayValue(formData.eggFrequency)}
                  onChange={handleChange}
                  min="0"
                  max="7"
                  disabled={formData.includesEggs !== 1}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">९. शालेय पोषण आहाराबाबत विशेष टीप (असल्यास)</label>
                <textarea
                  className="form-control"
                  name="nutritionNotes"
                  value={formData.nutritionNotes || ""}
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
            <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
              पुढे चला
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage2;