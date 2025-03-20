import React, { useState } from "react";
import { db, auth } from "../components/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SchoolFormPage1 from "./SchoolFormPage1";
import SchoolFormPage2 from "./SchoolFormPage2";
import SchoolFormPage3 from "./SchoolFormPage3";
import SchoolFormPage4 from "./SchoolFormPage4";

const SchoolForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    district: "",
    taluka: "",
    schoolName: "",
    inspectionDate: "",
    inspectionTime: "",
    inspectorName: "",
    schoolFullName: "",
    headmasterName: "",
    headmasterPhone: "",
    headmasterAddress: "",
    assistantTeacherName: "",
    assistantTeacherPhone: "",
    udiseCode: "",
    teacherMale: "",
    teacherFemale: "",
    totalBoys: "",
    totalGirls: "",
    beneficiaries: {
      grade1to4: { boys: "", girls: "", total: "" },
      grade5to7: { boys: "", girls: "", total: "" },
      grade8to10: { boys: "", girls: "", total: "" },
    },
    hasMiddayMealBoard: null,
    hasMiddayMealMenu: null,
    hasManagementBoard: null,
    hasPrincipalContact: null,
    hasOfficerContact: null,
    hasComplaintBox: null,
    hasEmergencyNumber: null,
    hasKitchenShed: null,
    hasFirstAidBox: null,
    hasWaterSource: null,
    waterSourceType: "",
    hasRegularWaterSupply: null,
    hasFireExtinguisher: null,
    hasFireExtinguisherCheck: null,
    hasFireExtinguisherRefill: null,
    fireExtinguisherDetails: "",
    hasKitchenGarden: null,
    usesGardenProduce: null,
    kitchenGardenDetails: "",
    innovativeInitiatives: "",
    hasDietCommittee: null,
    hasCommitteeBoard: null,
    cookingAgency: "",
    hasAgreementCopy: null,
    hasCookTraining: null,
    cookHelperCount: "",
    isCookedAtSchool: null,
    fuelType: "",
    hasWeighingScale: null,
    hasRiceWeighed: null,
    hasStorageUnits: null,
    hasPlates: null,
    teacherPresentDuringDistribution: null,
    mdmPortalUpdated: null,
    supplementaryDiet: null,
    supplementaryDietDetails: "",
    sampleStored: null,
    cleaningDone: null,
    headmasterFoodOpinion: "",
    thirdPartySupport: null,
    basicFacilitiesAvailable: null,
    basicFacilitiesDetails: "",
    diningArrangement: "",
    followsGovtRecipe: null,
    eggsBananasRegular: null,
    usesSproutedGrains: null,
    labTestMonthly: null,
    tasteTestBeforeDistribution: null,
    smcParentVisits: null,
    hasTasteRegister: null,
    dailyTasteEntries: null,
    stockMatchesRegister: null,
    stockDiscrepancyDetails: "",
    recipesDisplayed: null,
    monitoringCommitteeMeetings: null,
    meetingCount2024_25: "",
    emptySacksReturned: null,
    sackTransferRecorded: null,
    sackTransferCount: "",
    currentFoodMaterials: "",
    snehTithiProgram: null,
    snehTithiProgramDetails: "",
    corruptionDetails: "",
    corruptionActionDetails: "",
    fieldOfficerVisits: null,
    fieldOfficerVisitDetails: "",
    schemeSuggestions: "",
    healthCheckupDone: null,
    healthCheckupStudentCount: "",
    bmiRecorded: null,
    weightHeightMeasured: null,
    cookHealthCheck: null,
    hasSmcResolution: null,
    hasHealthCertificate: null,
    helper1Name: "",
    helper2Name: "",
    beneficiariesYearly: {
      "2022-23": { boys: 0, girls: 0, total: 0 },
      "2023-24": { boys: 0, girls: 0, total: 0 },
      "2024-25": { boys: 0, girls: 0, total: 0 },
    },
    grantReceived: {
      "2022-23": 0,
      "2023-24": 0,
      "2024-25": 0,
    },
    grantExpenditure: {
      "2022-23": 0,
      "2023-24": 0,
      "2024-25": 0,
    },
    grantBalance: {
      "2022-23": 0,
      "2023-24": 0,
      "2024-25": 0,
    },
    hasKitchen: null,
    hasStorageRoom: null,
    hasDiningHall: null,
    hasUtensils: null,
    hasGrainSafety: null,
    hasHandwashSoap: null,
    hasSeparateToilets: null,
    hasCctv: null,
    kitchenCleanliness: null,
    diningHallCleanliness: null,
    storageCleanliness: null,
    servingAreaCleanliness: null,
    utensilCondition: null,
    waterSupply: null,
    handwashFacility: null,
    toiletCleanliness: null,
    cashBookUpdated: null,
    stockRegisterUpdated: null,
    attendanceRegisterUpdated: null,
    bankAccountUpdated: null,
    honorariumRegisterUpdated: null,
    tasteRegisterUpdated: null,
    snehTithiRegisterUpdated: null,
    enrollmentImprovement: null,
    attendanceIncrease: null,
    nutritionHealthImprovement: null,
    weightHeightIncrease: null,
    malnutritionReduction: null,
    junkFoodPrevention: null,
    unityBonding: null,
    submissionDate: new Date().toISOString(),
  });

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting formData:", formData);
    console.log("Current user:", auth.currentUser);
    if (!formData.helper1Name) {
      toast.error("Helper 1 Name is required!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "School_Forms"), {
        ...formData,
        submittedBy: auth.currentUser.uid, // Add UID for debugging
      });
      console.log("Document written with ID:", docRef.id);
      toast.success("School Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/dashboard");
      setFormData({
        district: "",
        taluka: "",
        schoolName: "",
        inspectionDate: "",
        inspectionTime: "",
        inspectorName: "",
        schoolFullName: "",
        headmasterName: "",
        headmasterPhone: "",
        headmasterAddress: "",
        assistantTeacherName: "",
        assistantTeacherPhone: "",
        udiseCode: "",
        teacherMale: "",
        teacherFemale: "",
        totalBoys: "",
        totalGirls: "",
        beneficiaries: {
          grade1to4: { boys: "", girls: "", total: "" },
          grade5to7: { boys: "", girls: "", total: "" },
          grade8to10: { boys: "", girls: "", total: "" },
        },
        hasMiddayMealBoard: null,
        hasMiddayMealMenu: null,
        hasManagementBoard: null,
        hasPrincipalContact: null,
        hasOfficerContact: null,
        hasComplaintBox: null,
        hasEmergencyNumber: null,
        hasKitchenShed: null,
        hasFirstAidBox: null,
        hasWaterSource: null,
        waterSourceType: "",
        hasRegularWaterSupply: null,
        hasFireExtinguisher: null,
        hasFireExtinguisherCheck: null,
        hasFireExtinguisherRefill: null,
        fireExtinguisherDetails: "",
        hasKitchenGarden: null,
        usesGardenProduce: null,
        kitchenGardenDetails: "",
        innovativeInitiatives: "",
        hasDietCommittee: null,
        hasCommitteeBoard: null,
        cookingAgency: "",
        hasAgreementCopy: null,
        hasCookTraining: null,
        cookHelperCount: "",
        isCookedAtSchool: null,
        fuelType: "",
        hasWeighingScale: null,
        hasRiceWeighed: null,
        hasStorageUnits: null,
        hasPlates: null,
        teacherPresentDuringDistribution: null,
        mdmPortalUpdated: null,
        supplementaryDiet: null,
        supplementaryDietDetails: "",
        sampleStored: null,
        cleaningDone: null,
        headmasterFoodOpinion: "",
        thirdPartySupport: null,
        basicFacilitiesAvailable: null,
        basicFacilitiesDetails: "",
        diningArrangement: "",
        followsGovtRecipe: null,
        eggsBananasRegular: null,
        usesSproutedGrains: null,
        labTestMonthly: null,
        tasteTestBeforeDistribution: null,
        smcParentVisits: null,
        hasTasteRegister: null,
        dailyTasteEntries: null,
        stockMatchesRegister: null,
        stockDiscrepancyDetails: "",
        recipesDisplayed: null,
        monitoringCommitteeMeetings: null,
        meetingCount2024_25: "",
        emptySacksReturned: null,
        sackTransferRecorded: null,
        sackTransferCount: "",
        currentFoodMaterials: "",
        snehTithiProgram: null,
        snehTithiProgramDetails: "",
        corruptionDetails: "",
        corruptionActionDetails: "",
        fieldOfficerVisits: null,
        fieldOfficerVisitDetails: "",
        schemeSuggestions: "",
        healthCheckupDone: null,
        healthCheckupStudentCount: "",
        bmiRecorded: null,
        weightHeightMeasured: null,
        cookHealthCheck: null,
        hasSmcResolution: null,
        hasHealthCertificate: null,
        helper1Name: "",
        helper2Name: "",
        beneficiariesYearly: {
          "2022-23": { boys: 0, girls: 0, total: 0 },
          "2023-24": { boys: 0, girls: 0, total: 0 },
          "2024-25": { boys: 0, girls: 0, total: 0 },
        },
        grantReceived: {
          "2022-23": 0,
          "2023-24": 0,
          "2024-25": 0,
        },
        grantExpenditure: {
          "2022-23": 0,
          "2023-24": 0,
          "2024-25": 0,
        },
        grantBalance: {
          "2022-23": 0,
          "2023-24": 0,
          "2024-25": 0,
        },
        hasKitchen: null,
        hasStorageRoom: null,
        hasDiningHall: null,
        hasUtensils: null,
        hasGrainSafety: null,
        hasHandwashSoap: null,
        hasSeparateToilets: null,
        hasCctv: null,
        kitchenCleanliness: null,
        diningHallCleanliness: null,
        storageCleanliness: null,
        servingAreaCleanliness: null,
        utensilCondition: null,
        waterSupply: null,
        handwashFacility: null,
        toiletCleanliness: null,
        cashBookUpdated: null,
        stockRegisterUpdated: null,
        attendanceRegisterUpdated: null,
        bankAccountUpdated: null,
        honorariumRegisterUpdated: null,
        tasteRegisterUpdated: null,
        snehTithiRegisterUpdated: null,
        enrollmentImprovement: null,
        attendanceIncrease: null,
        nutritionHealthImprovement: null,
        weightHeightIncrease: null,
        malnutritionReduction: null,
        junkFoodPrevention: null,
        unityBonding: null,
        submissionDate: new Date().toISOString(),
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form data:", error.code, error.message);
      toast.error("Error submitting form data: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const pageProps = {
    formData,
    setFormData,
    handleChange,
    nextStep,
    prevStep,
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">School Form</h2>
      {step === 1 && <SchoolFormPage1 {...pageProps} />}
      {step === 2 && <SchoolFormPage2 {...pageProps} />}
      {step === 3 && <SchoolFormPage3 {...pageProps} />}
      {step === 4 && <SchoolFormPage4 {...pageProps} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default SchoolForm;