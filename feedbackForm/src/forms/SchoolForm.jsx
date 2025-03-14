import React, { useState } from "react";
import SchoolFormPage1 from "./SchoolFormPage1";
import SchoolFormPage2 from "./SchoolFormPage2";
import SchoolFormPage3 from "./SchoolFormPage3";
import SchoolFormPage4 from "./SchoolFormPage4";

const SchoolForm = () => {
  const [formData, setFormData] = useState({
    schoolInfo: {
      district: "",
      taluka: "",
      udisecode: "", // शाळेचा युडास क्र.
      
      schoolName: "",
      name: "", // शाळेचे नाव
      visitDate: "", // भेटीचा दिनांक (YYYY-MM-DD)
      visitTime: "", // वेळ (HH:MM)
      auditorName: "", // अंकेक्षण करणाऱ्याचे नाव
      fullAddress: "", // शाळेचे पूर्ण नाव (संपूर्ण पत्त्यासह)
      principal: {
        name: "", // मुख्याध्यापकाचे नाव
        contact: "", // मो.क्र.
        address: "", // मुख्याध्यापकांचा निवास पत्ता
      },
      nutritionTeacher: {
        name: "", // शालेय पोषण आहार शिक्षकाचे नाव
        contact: "", // संपर्क क्रमांक
      },
      teachers: {
        female: 0, // महिला शिक्षक संख्या
        male: 0, // पुरुष शिक्षक संख्या
        total: 0, // एकूण शिक्षक संख्या
      },
      students: {
        female: 0, // मुलींची संख्या
        male: 0, // मुलांचे संख्या
        total: 0, // एकूण विद्यार्थी संख्या
        grade1to4: {
          female: 0,
          male: 0,
          total: 0,
        },
        grade5to7: {
          female: 0,
          male: 0,
          total: 0,
        },
        grade8to10: {
          female: 0,
          male: 0,
          total: 0,
        },
      },
    },
    schoolInfrastructure: {
      hasMiddayMealBoard: "", // मध्यान्ह भोजन माहिती फलक आहे का?
      hasMiddayMealMenu: "", // मध्यान्ह भोजन मेनू आहे का?
      hasSchoolManagementBoard: "", // शाळा व्यवस्थापन समिती बोर्ड आहे का?
      hasPrincipalContactDisplay: "", // मुख्याध्यापक यांचा संपर्क क्रमांक आहे का?
      hasOfficerContactDisplay: "", // तालुका/जिल्हास्तरीय अधिकाऱ्यांचा क्रमांक आहे का?
      hasComplaintBox: "", // तक्रार पेटी आहे का?
      hasEmergencyNumbers: "", // आपत्कालीन दूरध्वनी क्रमांक आहेत का?
      hasKitchenShed: "", // किचनशेड आहे का?
      hasFirstAidKit: "", // प्राथमिक उपचार पेटी आहे का?
      drinkingWater: {
        available: "", // पिण्याचे पाणी उपलब्ध आहे का?
        source: "", // पाणी स्रोत (हातपंप, नळ, विहीर, बोअरवेल, इतर)
        regularSupply: "", // नियमित पुरवठा आहे का?
      },
      hasFireExtinguishers: "", // अग्निशमन उपकरणे उपलब्ध आहेत का?
      equipmentInspection: "",  // असल्यास विहित कालावधीनंतर उपकरणाची मुदत/इतर अनुषंनगक बाबीची तपासणीच्या रजिस्टरवर नोंदी घेण्यात येतात का? (होय-१/नाही-०)
      equipmentRefill: "",       // तसेच उपकरणाचे पुनर्भरण नियमित करण्यात येते काय ? (होय-१/नाही-०)
      schoolGarden: "",          // शाळेमध्ये परसबाग विकसित करण्यात आलेली आहे काय? (होय-१/नाही-०)
      gardenUsage: "",           // असलयास परसबागेतील पालेभाज्या/फळे इत्यादीचा वापर नियमितपणाने आहारात करण्यात येतो काय ? (होय-१/नाही-०)
      innovativeInitiatives: ""  // शाळे मध्ये काही नाविन्यपूर्ण उपक्रम राबविला असल्यास त्या बद्दल तपशील द्यावा.
    },
    nutritionInfo: {
      q1: "",
      q1_1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q6_1: "",
      q7: "",
      q7_1: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
      q12: "",
      q12_1: "",
      q13: "",
      q14: "",
      q15: "",
      q16: "",
      q17: "",
      q17_1: "",
      q18: "",
      q19: "",
      q20: "",
      q21: "",
      q22: "",
      q23: "",
      q24: "",
      q25: "",
      q25_1: "",
      q26: "",
      q26_1: "",
      q27: "",
      q28: "",
      q28_1: "",
      q29: "",
      q29_1: "",
      q29_2: "",
      q30: "",
      q31: "",
      q31_1: "",
      q32: "",
      q32_1: "",
      q33: "",
      q33_1: "",
      q34: "",
    },

    healthRelatedInfo: {
      student_health_check: "",
      student_count: "",
      bmi_check: "",
      weight_measurement: "",
      kitchen_health_check: "",
    },
    helper: {
      q1: "", //शालेय व्यवस्थापन समिती ठराव (आहे/नाही)
      q2: "", //दर सहा महिन्यास तपासणीचे आरोग्य प्रमाणपत्र (आहे/नाही)
    },
    schemeBeneficiary: {
      beneficiary_2022_23_boys: "",
      beneficiary_2022_23_girls: "",
      beneficiary_2022_23_total: 0, // Added total
      beneficiary_2023_24_boys: "",
      beneficiary_2023_24_girls: "",
      beneficiary_2023_24_total: 0, // Added total
      beneficiary_2024_25_boys: "",
      beneficiary_2024_25_girls: "",
      beneficiary_2024_25_total: 0, // Added total
    },
    grantAmount: {
      financial_2022_23_deposited: "",
      financial_2022_23_spent: "",
      financial_2022_23_balance: 0, // Added balance
      financial_2023_24_deposited: "",
      financial_2023_24_spent: "",
      financial_2023_24_balance: 0, // Added balance
      financial_2024_25_deposited: "",
      financial_2024_25_spent: "",
      financial_2024_25_balance: 0, // Added balance
    },
    basicFacilities: {
      kitchen: "", // स्वयंपाकगृह
      grainStorageRoom: "", // धान्यसाठा खोली
      diningHall: "", // भोजन हॉल
      utensilAvailability: "", // भांड्याची उपलब्धता
      grainSecurity: "", // धान्यादी मालाची सुरक्षितता (कोठ्या)
      handwashAvailability: "", // हात स्वच्छ करण्यासाठी हॅन्डवाँश, साबण उपलब्धता
      separateToilets: "", // मुले आणि मुली यांना स्वतंत्र शौचालय
      cctvAvailability: "", // विद्यार्थ्यांच्या सुरक्षिततेच्या अनुषंगाने CCTV उपलब्धता
    },
    quality: {
      kitchenHygiene: "", // स्वयंपाकगृहाची स्वच्छता
      diningHallHygiene: "", // भोजन हॉल स्वच्छता
      grainStorageHygiene: "", // धान्यादी साठा खोलीची स्वच्छता
      foodDistributionArea: "", // शिजवलेला आहार वितरीत करण्याची जागा
      utensilCondition: "", // भांड्याची स्थिती
      utensilHygiene: "", // भांड्याची स्वच्छता
      drinkingWaterSupply: "", // पिण्याच्या शुद्ध पाण्याचा नियमित पुरवठा
      handwashingFacilities: "", // विद्यार्थ्यांसाठी हात धुण्याची सुविधा
      separateToiletHygiene: "", // मुले आणि मुली यासाठी स्वतंत्र शौचालय स्वच्छता
    },
    repairing: {
      cashBookUpdated: "", // कॅश बुक आणि इतर आर्थिक बाबींच्या नोंदवह्या अद्यावत आहेत काय?
      stockRegisterUpdated: "", // तांदूळ व धान्यादी माल तसेच इतर माल साठा नोंदवही अद्ययावत आहेत काय?
      attendanceRegisterUpdated: "", // उपस्थिती नोंदणी, लाभार्थी संख्या पोषण आहार रजिस्टर अद्यावत आहेत काय?
      nutritionBankUpdated: "", // पोषण आहार योजना बँक खाते अद्ययावत आहे काय?
      cookSalaryRegisterUpdated: "", // स्वयंपाकी/मदतनीस मानधन नोंदवही अद्ययावत आहे काय?
      tasteRegisterUpdated: "", // चव नोंदवही अद्ययावत आहे काय?
      snehaBhojanRegisterUpdated: "", // स्नेह भोजन/तिथी भोजन कार्यक्रम नोंदवही
    },
    profitFromScheme: {
      enrollmentImprovement: "", // शाळेच्या पटनोंदणीमध्ये सुधारणा
      attendanceIncrease: "", // दैनंदिन उपस्थितीमध्ये वाढ
      nutritionHealthImprovement: "", // मुलांचे पोषण आणि आरोग्य सुधारणा होण्यामध्ये वाढ
      weightHeightIncrease: "", // विद्यार्थ्यांच्या वजन-उंची यामध्ये वाढ
      malnutritionSupport: "", // कुपोषण मुक्त होण्यासाठी मदत
      junkFoodBan: "", // फेरीवाले यांच्याकडील जंक फूड घेणे/खाणे यास प्रतिबंत
      unityBrotherhood: "", // एकता आणि बंधूभाव जोपासना
    },
  });

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">School Form</h2>

      {step === 1 && (
        <SchoolFormPage1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <SchoolFormPage2
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <SchoolFormPage3
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <SchoolFormPage4
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SchoolForm;


{/* 
  const initialFormState = {
  district: '',
  taluka: '',
  schoolName: '',
  inspectionDate: null,
  inspectionTime: null,
  inspectorName: '',
  schoolFullName: '',
  headmasterName: '',
  headmasterPhone: '',
  headmasterAddress: '',
  assistantTeacherName: '',
  assistantTeacherPhone: '',
  udiseCode: '',
  teacherMale: 0,
  teacherFemale: 0,
  totalBoys: 0,
  totalGirls: 0,
  hasMiddayMealBoard: 0,
  hasMiddayMealMenu: 0,
  hasManagementBoard: 0,
  hasPrincipalContact: 0,
  hasOfficerContact: 0,
  hasComplaintBox: 0,
  hasEmergencyNumber: 0,
  hasKitchenShed: 0,
  hasFirstAidBox: 0,
  hasWaterSource: 0,
  waterSourceType: 0,
  hasRegularWaterSupply: 0,
  hasFireExtinguisher: 0,
  hasFireExtinguisherCheck: 0,
  hasFireExtinguisherRefill: 0,
  fireExtinguisherDetails: '',
  hasKitchenGarden: 0,
  usesGardenProduce: 0,
  kitchenGardenDetails: '',
  innovativeInitiatives: '',


  hasDietCommittee: 0,
  hasCommitteeBoard: 0,
  cookingAgency: 0,
  hasAgreementCopy: 0,
  hasCookTraining: 0,
  cookHelperCount: '',
  isCookedAtSchool: 0,
  fuelType: '',
  hasWeighingScale: 0,
  hasRiceWeighed: 0,
  hasStorageUnits: 0,
  hasPlates: 0,
  teacherPresentDuringDistribution: 0,
  mdmPortalUpdated: 0,
  supplementaryDiet: 0,
  sampleStored: 0,
  cleaningDone: 0,
  headmasterFoodOpinion: '',
  thirdPartySupport: 0,
  basicFacilitiesAvailable: 0,
  basicFacilitiesDetails: '',
  diningArrangement: 0,
  followsGovtRecipe: 0,
  eggsBananasRegular: 0,
  usesSproutedGrains: 0,
  labTestMonthly: 0,
  tasteTestBeforeDistribution: 0,
  smcParentVisits: 0,
  hasTasteRegister: 0,
  dailyTasteEntries: 0,
  stockMatchesRegister: 0,
  stockDiscrepancyDetails: '',
  recipesDisplayed: 0,
  monitoringCommitteeMeetings: 0,
  meetingCount2024_25: '',
  emptySacksReturned: 0,
  sackTransferRecorded: 0,
  sackTransferCount: '',
  currentFoodMaterials: '',
  snehTithiProgram: 0,
  snehTithiProgramDetails: '',
  corruptionDetails: '',
  corruptionActionDetails: '',
  fieldOfficerVisits: 0,
  fieldOfficerVisitDetails: '',
  schemeSuggestions: '',


  
  healthCheckupDone: 0,
  healthCheckupStudentCount: '',
  bmiRecorded: 0,
  weightHeightMeasured: 0,
  cookHealthCheck: 0,
  hasSmcResolution: 0,
  hasHealthCertificate: 0,
  helper1Name: '',
  helper2Name: '',
  beneficiaries: {
    '2022-23': { boys: 0, girls: 0, total: 0 },
    '2023-24': { boys: 0, girls: 0, total: 0 },
    '2024-25': { boys: 0, girls: 0, total: 0 },
  },
  grantReceived: { '2022-23': 0, '2023-24': 0, '2024-25': 0 },
  grantExpenditure: { '2022-23': 0, '2023-24': 0, '2024-25': 0 },
  grantBalance: { '2022-23': 0, '2023-24': 0, '2024-25': 0 },
  hasKitchen: 0,
  hasStorageRoom: 0,
  hasDiningHall: 0,
  hasUtensils: 0,
  hasGrainSafety: 0,
  hasHandwashSoap: 0,
  hasSeparateToilets: 0,
  hasCctv: 0,
  kitchenCleanliness: 0,
  diningHallCleanliness: 0,
  storageCleanliness: 0,
  servingAreaCleanliness: 0,
  utensilCondition: 0,
  waterSupply: 0,
  handwashFacility: 0,
  toiletCleanliness: 0,
  cashBookUpdated: 0,
  stockRegisterUpdated: 0,
  attendanceRegisterUpdated: 0,
  bankAccountUpdated: 0,
  honorariumRegisterUpdated: 0,
  tasteRegisterUpdated: 0,
  snehTithiRegisterUpdated: 0,
  enrollmentImprovement: 0,
  attendanceIncrease: 0,
  nutritionHealthImprovement: 0,
  weightHeightIncrease: 0,
  malnutritionReduction: 0,
  junkFoodPrevention: 0,
  unityBonding: 0,
};
  */}