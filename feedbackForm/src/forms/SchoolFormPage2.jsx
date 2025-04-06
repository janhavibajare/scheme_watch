import React from "react";

const SchoolFormPage2 = ({ formData, setFormData, handleChange, nextStep, prevStep }) => {
  // Handler for binary (yes/no) fields (converts to number for Firebase)
  const handleBinaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : Number(value),
    }));
  };

  // Next step handler without validation
  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <div className="container-xxl">
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-primary text-white">
              <h3>पोषण आहाराबद्दल माहिती</h3>
            </div>
            <br />
            <form>
              {/* Row 1 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="hasDietCommittee">
                    १. शालेय आहार व्यवस्थापन समिती स्थापन आहे काय?
                  </label>
                  <select
                    name="hasDietCommittee"
                    id="hasDietCommittee"
                    className="form-control"
                    value={formData.hasDietCommittee === null ? "" : formData.hasDietCommittee}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasCommitteeBoard">
                    १.१. समिती सभासदांचा फलक लावला आहे का?
                  </label>
                  <select
                    name="hasCommitteeBoard"
                    id="hasCommitteeBoard"
                    className="form-control"
                    value={formData.hasCommitteeBoard === null ? "" : formData.hasCommitteeBoard}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="cookingAgency">
                    २. अन्न शिजवणाऱ्या यंत्रणा
                  </label>
                  <textarea
                    name="cookingAgency"
                    id="cookingAgency"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.cookingAgency || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasAgreementCopy">
                    ३. करारनाम्याची प्रत उपलब्ध आहे काय
                  </label>
                  <select
                    name="hasAgreementCopy"
                    id="hasAgreementCopy"
                    className="form-control"
                    value={formData.hasAgreementCopy === null ? "" : formData.hasAgreementCopy}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="hasCookTraining">
                    ४. स्वयंपाकी/मदतनीस यांना प्रशिक्षण देण्यात आले आहे का?
                  </label>
                  <select
                    name="hasCookTraining"
                    id="hasCookTraining"
                    className="form-control"
                    value={formData.hasCookTraining === null ? "" : formData.hasCookTraining}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="cookHelperCount">
                    ५. स्वयंपाकी मदतनीस संख्या
                  </label>
                  <textarea
                    name="cookHelperCount"
                    id="cookHelperCount"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.cookHelperCount || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="isCookedAtSchool">
                    ६. आहार शाळेमध्ये शिजवला जातो काय?
                  </label>
                  <select
                    name="isCookedAtSchool"
                    id="isCookedAtSchool"
                    className="form-control"
                    value={formData.isCookedAtSchool === null ? "" : formData.isCookedAtSchool}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="fuelType">
                    ६.१ इंधनाचा वापर
                  </label>
                  <select
                    name="fuelType"
                    id="fuelType"
                    className="form-control"
                    value={formData.fuelType || ""}
                    onChange={handleChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">एलपीजी गँस</option>
                    <option value="2">चुल</option> 
                    <option value="3">स्टोव्ह</option>
                    <option value="4">इतर</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasWeighingScale">
                    ७. वजनकाटा उपलब्ध आहे काय?
                  </label>
                  <select
                    name="hasWeighingScale"
                    id="hasWeighingScale"
                    className="form-control"
                    value={formData.hasWeighingScale === null ? "" : formData.hasWeighingScale}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "7px" }} htmlFor="hasRiceWeighed">
                    ७.१. तांदूळ वजन करून वापरल्या जातात काय?
                  </label>
                  <select
                    name="hasRiceWeighed"
                    id="hasRiceWeighed"
                    className="form-control"
                    value={formData.hasRiceWeighed === null ? "" : formData.hasRiceWeighed}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="hasStorageUnits">
                    ८. धान्य साठविण्याकरीता कोठ्या आहेत का?
                  </label>
                  <select
                    name="hasStorageUnits"
                    id="hasStorageUnits"
                    className="form-control"
                    value={formData.hasStorageUnits === null ? "" : formData.hasStorageUnits}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasPlates">
                    ९. ताटे/प्लेट्स उपलब्ध आहेत काय?
                  </label>
                  <select
                    name="hasPlates"
                    id="hasPlates"
                    className="form-control"
                    value={formData.hasPlates === null ? "" : formData.hasPlates}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "30px" }} htmlFor="teacherPresentDuringDistribution">
                    १०. आहार वितरीत करतेवेळी शिक्षक उपस्थित असतात का?
                  </label>
                  <select
                    name="teacherPresentDuringDistribution"
                    id="teacherPresentDuringDistribution"
                    className="form-control"
                    value={formData.teacherPresentDuringDistribution === null ? "" : formData.teacherPresentDuringDistribution}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="mdmPortalUpdated">
                    ११. एमडीएम पोर्टलवर नोंदवली जाते काय?
                  </label>
                  <select
                    name="mdmPortalUpdated"
                    id="mdmPortalUpdated"
                    className="form-control"
                    value={formData.mdmPortalUpdated === null ? "" : formData.mdmPortalUpdated}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "7px" }} htmlFor="supplementaryDiet">
                    १२. पूरक आहार दिला जातो काय?
                  </label>
                  <select
                    name="supplementaryDiet"
                    id="supplementaryDiet"
                    className="form-control"
                    value={formData.supplementaryDiet === null ? "" : formData.supplementaryDiet}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="supplementaryDietDetails">
                    १२.१ पूरक आहार तपशील
                  </label>
                  <textarea
                    name="supplementaryDietDetails"
                    id="supplementaryDietDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.supplementaryDietDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Row 5 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="sampleStored">
                    १३. आहाराचा नमुना जतन केला जातो काय?
                  </label>
                  <select
                    name="sampleStored"
                    id="sampleStored"
                    className="form-control"
                    value={formData.sampleStored === null ? "" : formData.sampleStored}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="cleaningDone">
                    १४. जेवणानंतर स्वच्छता केली जाते काय?
                  </label>
                  <select
                    name="cleaningDone"
                    id="cleaningDone"
                    className="form-control"
                    value={formData.cleaningDone === null ? "" : formData.cleaningDone}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="headmasterFoodOpinion">
                    १५. मुख्याध्यापकाचे अन्न मत
                  </label>
                  <textarea
                    name="headmasterFoodOpinion"
                    id="headmasterFoodOpinion"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.headmasterFoodOpinion || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="thirdPartySupport">
                    १६. त्रयस्थ संस्थांकडून सहकार्य मिळते का?
                  </label>
                  <select
                    name="thirdPartySupport"
                    id="thirdPartySupport"
                    className="form-control"
                    value={formData.thirdPartySupport === null ? "" : formData.thirdPartySupport}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 6 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="basicFacilitiesAvailable">
                    १७. पायाभूत सुविधा उपलब्ध आहेत का?
                  </label>
                  <select
                    name="basicFacilitiesAvailable"
                    id="basicFacilitiesAvailable"
                    className="form-control"
                    value={formData.basicFacilitiesAvailable === null ? "" : formData.basicFacilitiesAvailable}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="basicFacilitiesDetails">
                    १७.१ मूलभूत सुविधा तपशील
                  </label>
                  <textarea
                    name="basicFacilitiesDetails"
                    id="basicFacilitiesDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.basicFacilitiesDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "30px" }} htmlFor="diningArrangement">
                    १८. भोजन व्यवस्था
                  </label>
                  <textarea
                    name="diningArrangement"
                    id="diningArrangement"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.diningArrangement || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="followsGovtRecipe">
                    १९. शासनाच्या पाककृतीनुसार आहार दिला जातो काय?
                  </label>
                  <select
                    name="followsGovtRecipe"
                    id="followsGovtRecipe"
                    className="form-control"
                    value={formData.followsGovtRecipe === null ? "" : formData.followsGovtRecipe}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 7 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="eggsBananasRegular">
                    २०. अंडी/केळी नियमित देण्यात येत आहे काय?
                  </label>
                  <select
                    name="eggsBananasRegular"
                    id="eggsBananasRegular"
                    className="form-control"
                    value={formData.eggsBananasRegular === null ? "" : formData.eggsBananasRegular}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="usesSproutedGrains">
                    २१. मोड आलेल्या कडधान्याचा वापर?
                  </label>
                  <select
                    name="usesSproutedGrains"
                    id="usesSproutedGrains"
                    className="form-control"
                    value={formData.usesSproutedGrains === null ? "" : formData.usesSproutedGrains}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="labTestMonthly">
                    २२. दरमहा प्रयोगशाळा तपासणी होते काय?
                  </label>
                  <select
                    name="labTestMonthly"
                    id="labTestMonthly"
                    className="form-control"
                    value={formData.labTestMonthly === null ? "" : formData.labTestMonthly}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="tasteTestBeforeDistribution">
                    २३. आहार वितरणच्या अगोदर चव घेतली जाते काय?
                  </label>
                  <select
                    name="tasteTestBeforeDistribution"
                    id="tasteTestBeforeDistribution"
                    className="form-control"
                    value={formData.tasteTestBeforeDistribution === null ? "" : formData.tasteTestBeforeDistribution}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 8 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="smcParentVisits">
                    २४. शालेय व्यवस्थापन समितीच्या भेटी झाल्या आहेत काय?
                  </label>
                  <select
                    name="smcParentVisits"
                    id="smcParentVisits"
                    className="form-control"
                    value={formData.smcParentVisits === null ? "" : formData.smcParentVisits}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasTasteRegister">
                    २५. चव रजिस्टर ठेवण्यात आले आहे काय?
                  </label>
                  <select
                    name="hasTasteRegister"
                    id="hasTasteRegister"
                    className="form-control"
                    value={formData.hasTasteRegister === null ? "" : formData.hasTasteRegister}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="dailyTasteEntries">
                    २५.१ दैनंदिन नोंदी घेण्यात येतात का?
                  </label>
                  <select
                    name="dailyTasteEntries"
                    id="dailyTasteEntries"
                    className="form-control"
                    value={formData.dailyTasteEntries === null ? "" : formData.dailyTasteEntries}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="stockMatchesRegister">
                    २६. नोंदवहीतील साठा बरोबर आहे काय?
                  </label>
                  <select
                    name="stockMatchesRegister"
                    id="stockMatchesRegister"
                    className="form-control"
                    value={formData.stockMatchesRegister === null ? "" : formData.stockMatchesRegister}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
              </div>

              {/* Row 9 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="stockDiscrepancyDetails">
                    २६.१ साठा विसंगती तपशील
                  </label>
                  <textarea
                    name="stockDiscrepancyDetails"
                    id="stockDiscrepancyDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.stockDiscrepancyDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="recipesDisplayed">
                    २७. दैनंदिन आहाराच्या पाककृती प्रदर्शित आहेत काय?
                  </label>
                  <select
                    name="recipesDisplayed"
                    id="recipesDisplayed"
                    className="form-control"
                    value={formData.recipesDisplayed === null ? "" : formData.recipesDisplayed}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="monitoringCommitteeMeetings">
                    २८. समितीच्या बैठक घेण्यात आल्या आहेत काय?
                  </label>
                  <select
                    name="monitoringCommitteeMeetings"
                    id="monitoringCommitteeMeetings"
                    className="form-control"
                    value={formData.monitoringCommitteeMeetings === null ? "" : formData.monitoringCommitteeMeetings}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "10px" }} htmlFor="meetingCount2024_25">
                    २८.१ सन २०२४-२५ मधील बैठकांची संख्या
                  </label>
                  <textarea
                    name="meetingCount2024_25"
                    id="meetingCount2024_25"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.meetingCount2024_25 || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Row 10 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="emptySacksReturned">
                    २९. रिकाम्या गोण्या पुरवठादारास दिल्या आहेत काय?
                  </label>
                  <select
                    name="emptySacksReturned"
                    id="emptySacksReturned"
                    className="form-control"
                    value={formData.emptySacksReturned === null ? "" : formData.emptySacksReturned}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="sackTransferRecorded">
                    २९.१ हस्तांतरित गोण्यांची नोंद ठेवली आहे काय?
                  </label>
                  <select
                    name="sackTransferRecorded"
                    id="sackTransferRecorded"
                    className="form-control"
                    value={formData.sackTransferRecorded === null ? "" : formData.sackTransferRecorded}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="sackTransferCount">
                    २९.२ हस्तांतरित गोण्यांची संख्या
                  </label>
                  <textarea
                    name="sackTransferCount"
                    id="sackTransferCount"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.sackTransferCount || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="currentFoodMaterials">
                    ३०. सध्याचे अन्न साहित्य
                  </label>
                  <textarea
                    name="currentFoodMaterials"
                    id="currentFoodMaterials"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.currentFoodMaterials || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Row 11 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="snehTithiProgram">
                    ३१. स्नेहभोजन/तिथीभोजन कार्यक्रम राबवले आहेत काय?
                  </label>
                  <select
                    name="snehTithiProgram"
                    id="snehTithiProgram"
                    className="form-control"
                    value={formData.snehTithiProgram === null ? "" : formData.snehTithiProgram}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="snehTithiProgramDetails">
                    ३१.१ स्नेह तिथी कार्यक्रम तपशील
                  </label>
                  <textarea
                    name="snehTithiProgramDetails"
                    id="snehTithiProgramDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.snehTithiProgramDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="corruptionDetails">
                    ३२. भ्रष्टाचार तपशील
                  </label>
                  <textarea
                    name="corruptionDetails"
                    id="corruptionDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.corruptionDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="corruptionActionDetails">
                    ३२.१ भ्रष्टाचार कारवाई तपशील
                  </label>
                  <textarea
                    name="corruptionActionDetails"
                    id="corruptionActionDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.corruptionActionDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Row 12 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="fieldOfficerVisits">
                    ३३. क्षेत्रीय अधिकाऱ्यांच्या भेटी झालेल्या आहेत काय?
                  </label>
                  <select
                    name="fieldOfficerVisits"
                    id="fieldOfficerVisits"
                    className="form-control"
                    value={formData.fieldOfficerVisits === null ? "" : formData.fieldOfficerVisits}
                    onChange={handleBinaryChange}
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="fieldOfficerVisitDetails">
                    ३३.१ फील्ड अधिकारी भेट तपशील
                  </label>
                  <textarea
                    name="fieldOfficerVisitDetails"
                    id="fieldOfficerVisitDetails"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.fieldOfficerVisitDetails || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="schemeSuggestions">
                    ३४. योजनेच्या सूचना
                  </label>
                  <textarea
                    name="schemeSuggestions"
                    id="schemeSuggestions"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.schemeSuggestions || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="button" className="btn btn-primary btn-lg me-2" onClick={prevStep}>
            मागे जा
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
            पुढे चला
          </button>
        </div>
      </div>
    </>
  );
};

export default SchoolFormPage2;