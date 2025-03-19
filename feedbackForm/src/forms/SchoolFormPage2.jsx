import React from "react";

const SchoolFormPage2 = ({ formData, setFormData, handleChange, nextStep, prevStep }) => {
  // Handler for binary (yes/no) fields (converts to number for Firebase)
  const handleBinaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value), // "1" -> 1, "0" -> 0
    }));
  };

  // Next step handler (alert removed)
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
                    value={formData.hasDietCommittee}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasCommitteeBoard">
                    १.१. असल्यास शाळा परिसरात समिती सभासदांचा फलक सर्वाना दिसण्यासाठी लावला आहे का?
                  </label>
                  <select
                    name="hasCommitteeBoard"
                    id="hasCommitteeBoard"
                    className="form-control"
                    value={formData.hasCommitteeBoard}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="cookingAgency">
                    २. अन्न शिजवणाऱ्या यंत्रणा :- शाळा स्तरावर बचतगटामार्फत इतर
                  </label>
                  <textarea
                    name="cookingAgency"
                    id="cookingAgency"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.cookingAgency || ""}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasAgreementCopy">
                    ३. आहार शिजवणाऱ्या यंत्रणा / संस्थेसोबत केलेल्या करारनाम्याची प्रत शाळेत उपलब्ध आहे काय
                  </label>
                  <select
                    name="hasAgreementCopy"
                    id="hasAgreementCopy"
                    className="form-control"
                    value={formData.hasAgreementCopy}
                    onChange={handleBinaryChange}
                    required
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
                    ४. आहार शिजविणाऱ्या स्वयंपाकी / मदतनीस यांना अन्न सुरक्षा मानदे काय‌द्यानुसार प्रशिक्षण देण्यात आले आहे का?
                  </label>
                  <select
                    name="hasCookTraining"
                    id="hasCookTraining"
                    className="form-control"
                    value={formData.hasCookTraining}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="cookHelperCount">
                    ५. आहार शिजवणाऱ्या यंत्रणा संस्थेमार्फत आहार वितरीत करण्यासाठी शाळा स्तरावर नियमितपणे उपस्थित राहणाऱ्या स्वयंपाकी मदतनीस संख्या :-
                  </label>
                  <textarea
                    name="cookHelperCount"
                    id="cookHelperCount"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.cookHelperCount || ""}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="isCookedAtSchool">
                    ६. आहार शाळेमध्ये शिजवला जातो काय?
                  </label>
                  <textarea
                    name="isCookedAtSchool"
                    id="isCookedAtSchool"
                    className="form-control"
                    style={{ height: "60px", width: "100%" }}
                    value={formData.isCookedAtSchool || ""}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="fuelType">
                    ६.१ इंधनाचा वापर :-
                  </label>
                  <select
                    name="fuelType"
                    id="fuelType"
                    className="form-control"
                    value={formData.fuelType || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="एलपीजी गँस">एलपीजी गँस</option>
                    <option value="चलू">चलू</option>
                    <option value="स्टोव्ह">स्टोव्ह</option>
                    <option value="इतर">इतर</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="hasWeighingScale">
                    ७. शाळेमध्ये वजनकाटा उपलब्ध आहे काय?
                  </label>
                  <select
                    name="hasWeighingScale"
                    id="hasWeighingScale"
                    className="form-control"
                    value={formData.hasWeighingScale}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasRiceWeighed">
                    ७.१. असल्यास आहार शिजवण्यासाठी वि‌द्यार्थ्यांच्या प्रमाणात तांदूळ व धान्यादी वस्तू वजन करून वापरल्या जातात काय?
                  </label>
                  <select
                    name="hasRiceWeighed"
                    id="hasRiceWeighed"
                    className="form-control"
                    value={formData.hasRiceWeighed}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="hasStorageUnits">
                    ८. धान्य साठविण्याकरीता पुरेशा कोठ्या आहेत का?
                  </label>
                  <select
                    name="hasStorageUnits"
                    id="hasStorageUnits"
                    className="form-control"
                    value={formData.hasStorageUnits}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasPlates">
                    ९. शाळा स्तरावर विद्यार्थ्यांना आहाराचा लाभ देण्यासाठी शाळेत ताटे प्लेट्स उपलब्ध आहेत काय?
                  </label>
                  <select
                    name="hasPlates"
                    id="hasPlates"
                    className="form-control"
                    value={formData.hasPlates}
                    onChange={handleBinaryChange}
                    required
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="teacherPresentDuringDistribution">
                    १०. विद्यार्थ्यांना आहार वितरीत करतेवेळी शिक्षक उपस्थित असतात का?
                  </label>
                  <select
                    name="teacherPresentDuringDistribution"
                    id="teacherPresentDuringDistribution"
                    className="form-control"
                    value={formData.teacherPresentDuringDistribution}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="mdmPortalUpdated">
                    ११. शाळा स्तरावर देण्यात आलेल्या दैनंदिन लाभार्थ्यांची माहिती शाळा स्तरावरुन एमडीएम पोर्टलवर नियमितपणे नोंदवली जाते काय?
                  </label>
                  <select
                    name="mdmPortalUpdated"
                    id="mdmPortalUpdated"
                    className="form-control"
                    value={formData.mdmPortalUpdated}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="supplementaryDiet">
                    १२. आहार शिजवणाऱ्या यंत्रणा/संस्थेमार्फत आठवड्यातून एकदा पूरक आहार दिला जातो काय?
                  </label>
                  <select
                    name="supplementaryDiet"
                    id="supplementaryDiet"
                    className="form-control"
                    value={formData.supplementaryDiet}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="supplementaryDietDetails">
                    १२.१ तपशील थोडक्यात नमूद करावाः
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="sampleStored">
                    १३. आहाराचा नमुना बंद डब्यात ठेवून पुढील दिवसांपर्यंत जतन केला जातो काय?
                  </label>
                  <select
                    name="sampleStored"
                    id="sampleStored"
                    className="form-control"
                    value={formData.sampleStored}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="cleaningDone">
                    १४. स्वयंपाकी मदतनीस यांच्यामार्फत वि‌द्यार्थ्यांच्या जेवणानंतर परिसर आणि भांड्याची स्वच्छता केली जाते काय किंवा कसे?
                  </label>
                  <select
                    name="cleaningDone"
                    id="cleaningDone"
                    className="form-control"
                    value={formData.cleaningDone}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="headmasterFoodOpinion">
                    १५. आहार शिजवणान्या यंत्रणा/संस्थेमार्फत पुरवठा होत असलेल्या आहाराबाबत (वजन/दर्जा/गुणवत्ता) याब‌द्दल शाळेच्या मुख्याध्यापक यांचा थोडक्यात अभिप्रायः-
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
                    १६. त्रयस्थ किंवा अन्य कोणत्याही NGO/SHG इत्यादी संस्थांकडून वेळोवेळी आहार आणि पिण्याच्या पाण्याची देखरेख/देखभाल याकरीता सहकार्य (CSR निधी) करतात का?
                  </label>
                  <select
                    name="thirdPartySupport"
                    id="thirdPartySupport"
                    className="form-control"
                    value={formData.thirdPartySupport}
                    onChange={handleBinaryChange}
                    required
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="basicFacilitiesAvailable">
                    १७. पायाभूत सुविधा उपलब्ध आहेत का?
                  </label>
                  <select
                    name="basicFacilitiesAvailable"
                    id="basicFacilitiesAvailable"
                    className="form-control"
                    value={formData.basicFacilitiesAvailable}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="basicFacilitiesDetails">
                    १७.१ असल्यास थोडक्यात नमूद करावीः-
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="diningArrangement">
                    १८. विद्यार्थ्यांना भोजन व्यवस्था असल्यास स्थिती थोडक्यात नमूद करावी-
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
                    १९. शासनाने दिनांक ११ जून, २०२४ च्या निर्णया‌द्वारे निश्चित करून दिलेल्या पाककृतीनुसार आहाराचा लाभ देण्यात येत आहे काय?
                  </label>
                  <select
                    name="followsGovtRecipe"
                    id="followsGovtRecipe"
                    className="form-control"
                    value={formData.followsGovtRecipe}
                    onChange={handleBinaryChange}
                    required
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="eggsBananasRegular">
                    २०. अंडी/केळीचा लाभ वि‌द्यार्थ्यांना नियमित देण्यात येत आहे काय?
                  </label>
                  <select
                    name="eggsBananasRegular"
                    id="eggsBananasRegular"
                    className="form-control"
                    value={formData.eggsBananasRegular}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="usesSproutedGrains">
                    २१. आहारामध्ये मोड आलेल्या कडधान्याचा वापर?
                  </label>
                  <select
                    name="usesSproutedGrains"
                    id="usesSproutedGrains"
                    className="form-control"
                    value={formData.usesSproutedGrains}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="labTestMonthly">
                    २२. शिजविलेल्या आहाराची दरमहा प्रयोगशाळा तपासणी करण्यात येते काय?
                  </label>
                  <select
                    name="labTestMonthly"
                    id="labTestMonthly"
                    className="form-control"
                    value={formData.labTestMonthly}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="tasteTestBeforeDistribution">
                    २३. विद्यार्थ्यांना आहार वितरणच्या अगोदर शिक्षक/शाळा व्यवस्थापन समिती सदस्य त्रयस्त व्यक्तीकडून अन्नाची चव घेतली जाते काय?
                  </label>
                  <select
                    name="tasteTestBeforeDistribution"
                    id="tasteTestBeforeDistribution"
                    className="form-control"
                    value={formData.tasteTestBeforeDistribution}
                    onChange={handleBinaryChange}
                    required
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="smcParentVisits">
                    २४. शालेय व्यवस्थापन समिती/माता-पालक संघ यांनी शालेय पोषण आहार संबंधात शाळेला भेटी दिल्या आहेत काय?
                  </label>
                  <select
                    name="smcParentVisits"
                    id="smcParentVisits"
                    className="form-control"
                    value={formData.smcParentVisits}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="hasTasteRegister">
                    २५. शाळा स्तरावर चव रजिस्टर ठेवण्यात जतन करण्यात आले आहे काय?
                  </label>
                  <select
                    name="hasTasteRegister"
                    id="hasTasteRegister"
                    className="form-control"
                    value={formData.hasTasteRegister}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="dailyTasteEntries">
                    २५.१ असल्यास दैनंदिन नोंदी घेण्यात येतात का?
                  </label>
                  <select
                    name="dailyTasteEntries"
                    id="dailyTasteEntries"
                    className="form-control"
                    value={formData.dailyTasteEntries}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="stockMatchesRegister">
                    २६. नोंदवहीतील तांदूळ साठा/धान्यादी मालाची शिल्लक बरोबर आहे काय?
                  </label>
                  <select
                    name="stockMatchesRegister"
                    id="stockMatchesRegister"
                    className="form-control"
                    value={formData.stockMatchesRegister}
                    onChange={handleBinaryChange}
                    required
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="stockDiscrepancyDetails">
                    २६.१ नसल्यास तफावतीचा तपशील नमूद करावा:-
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
                    २७. शाळेच्या दर्शनी भागात आठवड्‌यातील दैनंदिन आहाराच्या पाककृतीचे प्रकार प्रदर्शित करण्यात आले आहे काय?
                  </label>
                  <select
                    name="recipesDisplayed"
                    id="recipesDisplayed"
                    className="form-control"
                    value={formData.recipesDisplayed}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="monitoringCommitteeMeetings">
                    २८. शालेय आहार व्यवस्थापन समितीच्या बैठक घेण्यात आल्या आहेत काय?
                  </label>
                  <select
                    name="monitoringCommitteeMeetings"
                    id="monitoringCommitteeMeetings"
                    className="form-control"
                    value={formData.monitoringCommitteeMeetings}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="meetingCount2024_25">
                    २८.१ असल्यास सन २०२४-२५ या कालावधीत झालेल्या बैठकांची संख्या नमूद करावीः-
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="emptySacksReturned">
                    २९. तांदुळाच्या रिकाम्या गोण्या पुढील पुरवठ्‌यावेळी वर्गीकरण करून पुरवठादारास दिल्या आहेत काय?
                  </label>
                  <select
                    name="emptySacksReturned"
                    id="emptySacksReturned"
                    className="form-control"
                    value={formData.emptySacksReturned}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="sackTransferRecorded">
                    २९.१ असलयास हस्तांतरित गोण्यांची नोंद ठेवली आहे काय?
                  </label>
                  <select
                    name="sackTransferRecorded"
                    id="sackTransferRecorded"
                    className="form-control"
                    value={formData.sackTransferRecorded}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="sackTransferCount">
                    २९.२ हस्तांतरित केलेल्या गोण्यांची संख्या नमूद करण्यात यावी.
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="currentFoodMaterials">
                    ३०. सद्यस्थितीमध्ये शाळेत दिल्या जाणाऱ्या आहारात वापरण्यात येत असलेल्या धान्य व इतर साहित्याचा थोड्यक्यात तपशील नमूद करण्यात यावा
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="snehTithiProgram">
                    ३१. स्नेहभोजन/तिथीभोजन कार्यक्रम राबवले आहेत काय?
                  </label>
                  <select
                    name="snehTithiProgram"
                    id="snehTithiProgram"
                    className="form-control"
                    value={formData.snehTithiProgram}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="snehTithiProgramDetails">
                    ३१.१ असल्यास वर्षनिहाय तपशील नमूद करण्यात यावा
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="corruptionDetails">
                    ३२. योजनेत काही भ्रष्टाचार/अनियमितता/अपहार आढळला असल्यास सविस्तर माहिती द्या?:-
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="corruptionActionDetails">
                    ३२.१ याबाबत कोणत्या प्रकारची कारवाई करण्यात आली त्याब‌द्दल थोडक्यात माहिती नमूद करावी.:-
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
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="fieldOfficerVisits">
                    ३३. क्षेत्रीय अधिकाऱ्यांच्या भेटी झालेल्या आहेत काय?
                  </label>
                  <select
                    name="fieldOfficerVisits"
                    id="fieldOfficerVisits"
                    className="form-control"
                    value={formData.fieldOfficerVisits}
                    onChange={handleBinaryChange}
                    required
                  >
                    <option value="">निवडा</option>
                    <option value="1">होय</option>
                    <option value="0">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="fieldOfficerVisitDetails">
                    ३३.१ असल्यास वर्षनिहाय तपशील देण्यात यावा. (२०२२ ते २०२४):-
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
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="schemeSuggestions">
                    ३४. योजनेच्या अंमलबजावणी/सनियंत्रणाबाबत सूचना अथवा शिफारशी याबाबत थोडक्यात तपशील नमूद करण्यात यावा
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