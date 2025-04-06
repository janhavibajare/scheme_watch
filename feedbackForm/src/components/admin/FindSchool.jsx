import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase"; // Ensure auth is imported from your Firebase config
import { getDocs, collection, deleteDoc, query, where, doc } from "firebase/firestore"; // Added doc import
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import { Accordion, Button, Form, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth"; // Import to monitor auth state

function FindSchool() {
  const [searchType, setSearchType] = useState("udise"); // "udise" or "name"
  const [searchValue, setSearchValue] = useState("");
  const [parentData, setParentData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentFilter, setParentFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [observeFilter, setObserveFilter] = useState("");
  const [parentPage, setParentPage] = useState(1);
  const [schoolPage, setSchoolPage] = useState(1);
  const [observePage, setObservePage] = useState(1);
  const [user, setUser] = useState(null); // Track authenticated user
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        toast.error("Please log in to access school data.");
        navigate("/login"); // Redirect to your login page
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const displayValue = (value) => (value != null ? value : "N/A");

  const handleSearch = async () => {
    const trimmedSearchValue = searchValue.trim(); // Remove leading/trailing spaces
    if (!trimmedSearchValue) {
      toast.warn("Please enter a value to search!");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to search for school data.");
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    setLoading(true);
    try {
      // Parent_Form Query
      const parentQuery = query(
        collection(db, "Parent_Form"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const parentSnap = await getDocs(parentQuery);
      console.log("Parent_Form - Docs found:", parentSnap.size, "Data:", parentSnap.docs.map((doc) => doc.data()));
      setParentData(parentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // School_Forms Query (Updated to schoolUdiseNumber)
      const schoolQuery = query(
        collection(db, "School_Forms"),

        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)

      );
      const schoolSnap = await getDocs(schoolQuery);
      console.log("School_Forms - Docs found:", schoolSnap.size, "Data:", schoolSnap.docs.map((doc) => doc.data()));
      setSchoolData(schoolSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Observation_Form Query (Updated to schoolUdiseNumber)
      const observeQuery = query(
        collection(db, "Observation_Form"),
        searchType === "udise" ? where("schoolUdiseNumber", "==", trimmedSearchValue) : where("schoolName", "==", trimmedSearchValue)
      );
      const observeSnap = await getDocs(observeQuery);
      console.log("Observation_Form - Docs found:", observeSnap.size, "Data:", observeSnap.docs.map((doc) => doc.data()));
      setObserveData(observeSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      if (parentSnap.empty && schoolSnap.empty && observeSnap.empty) {
        toast.info("No records found for this school!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching school data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (collectionName, id, successMessage) => {
    if (!user) {
      toast.error("You must be logged in to delete data.");
      navigate("/login");
      return;
    }

    try {
      await deleteDoc(doc(db, collectionName, id)); // Use doc() for reference
      toast.success(successMessage);
      handleSearch();
    } catch (error) {
      toast.error(`Error deleting entry: ${error.message}`);
    }
  };

  const parentFieldMappings = [
    { label: "District", key: "district" },
    { label: "Taluka", key: "taluka" },
    { label: "School UDISE Number", key: "schoolUdiseNumber" },
    { label: "पालकाचे संपूर्ण नाव", key: "parentName" },
    { label: "शाळेचे नाव", key: "schoolName" },
    { label: "Child 1", key: "child1" },
    { label: "इयत्ता व तुकडी (Child 1)", key: "child1Sec" },
    { label: "Child 2", key: "child2" },
    { label: "इयत्ता व तुकडी (Child 2)", key: "child2Sec" },
    { label: "पालकाची शैक्षणिक पात्रता", key: "parentEducation" },
    { label: "पालकाचा निवासाचा संपूर्ण पत्ता", key: "address" },
    { label: "मुलांना दररोज शाळेत पाठवतात का?", key: "sendChildDaily" },
    { label: "नसल्यास कारण नमूद करयायात यावेः", key: "reason" },
    { label: "मुलांचे/ मुलींचे वजन वाढले का?", key: "weightGain" },
    { label: "वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?", key: "sickFrequency" },
    { label: "अभ्यासातील प्रगती चागंली झाली का?", key: "studyProgress" },
    { label: "अभ्यासातील एकाग्रता वाढली का?", key: "concentration" },
    { label: "मुला-मुलींचे पोषण चागंले होत आहे का?", key: "nutrition" },
    { label: "नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?", key: "attendence" },
    { label: "वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार योजनेचा प्रभाव", key: "impactOfNutritionScheme" },
    { label: "दुपारच्या उपस्थितीवर जेवणाचा प्रभाव", key: "effectOnAfternoonAttendence" },
    { label: "मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव", key: "effectOfNutritionDietPlan" },
    { label: "योजनेमध्ये सुधारणा करण्यासाठी सूचना", key: "improvementSuggestions" },
  ];

  const schoolFieldMappings = [
    { label: "जिल्हा", key: "district" },
    { label: "तालुका", key: "taluka" },
    { label: "शाळेचे नाव", key: "schoolName" },
    { label: "तपासणी तारीख", key: "inspectionDate" },
    { label: "तपासणी वेळ", key: "inspectionTime" },
    { label: "तपासणी करणाऱ्याचे नाव", key: "inspectorName" },
    { label: "शाळेचे पूर्ण नाव", key: "schoolFullName" },
    { label: "मुख्याध्यापकाचे नाव", key: "headmasterName" },
    { label: "मुख्याध्यापकाचा फोन", key: "headmasterPhone" },
    { label: "मुख्याध्यापकाचा पत्ता", key: "headmasterAddress" },
    { label: "सहाय्यक शिक्षकाचे नाव", key: "assistantTeacherName" },
    { label: "सहाय्यक शिक्षकाचा फोन", key: "assistantTeacherPhone" },
    { label: "UDISE कोड", key: "schoolUdiseNumber" }, // Updated from udiseCode
    { label: "पुरुष शिक्षक", key: "teacherMale" },
    { label: "महिला शिक्षक", key: "teacherFemale" },
    { label: "एकूण मुले", key: "totalBoys" },
    { label: "एकूण मुली", key: "totalGirls" },
    { label: "लाभार्थी इयत्ता १-४ मुले", key: "beneficiaries.grade1to4.boys" },
    { label: "लाभार्थी इयत्ता १-४ मुली", key: "beneficiaries.grade1to4.girls" },
    { label: "लाभार्थी इयत्ता १-४ एकूण", key: "beneficiaries.grade1to4.total" },
    { label: "लाभार्थी इयत्ता ५-७ मुले", key: "beneficiaries.grade5to7.boys" },
    { label: "लाभार्थी इयत्ता ५-७ मुली", key: "beneficiaries.grade5to7.girls" },
    { label: "लाभार्थी इयत्ता ५-७ एकूण", key: "beneficiaries.grade5to7.total" },
    { label: "लाभार्थी इयत्ता ८-१० मुले", key: "beneficiaries.grade8to10.boys" },
    { label: "लाभार्थी इयत्ता ८-१० मुली", key: "beneficiaries.grade8to10.girls" },
    { label: "लाभार्थी इयत्ता ८-१० एकूण", key: "beneficiaries.grade8to10.total" },
    { label: "मध्यान्ह भोजन फलक आहे का?", key: "hasMiddayMealBoard" },
    { label: "मध्यान्ह भोजन मेनू आहे का?", key: "hasMiddayMealMenu" },
    { label: "व्यवस्थापन मंडळ आहे का?", key: "hasManagementBoard" },
    { label: "मुख्याध्यापक संपर्क आहे का?", key: "hasPrincipalContact" },
    { label: "अधिकारी संपर्क आहे का?", key: "hasOfficerContact" },
    { label: "तक्रार पेटी आहे का?", key: "hasComplaintBox" },
    { label: "आपत्कालीन क्रमांक आहे का?", key: "hasEmergencyNumber" },
    { label: "स्वयंपाक शेड आहे का?", key: "hasKitchenShed" },
    { label: "प्रथमोपचार पेटी आहे का?", key: "hasFirstAidBox" },
    { label: "पाण्याचा स्रोत आहे का?", key: "hasWaterSource" },
    { label: "पाण्याचा स्रोत प्रकार", key: "waterSourceType" },
    { label: "नियमित पाणीपुरवठा आहे का?", key: "hasRegularWaterSupply" },
    { label: "अग्निशामक यंत्र आहे का?", key: "hasFireExtinguisher" },
    { label: "अग्निशामक तपासणी आहे का?", key: "hasFireExtinguisherCheck" },
    { label: "अग्निशामक पुनर्भरण आहे का?", key: "hasFireExtinguisherRefill" },
    { label: "अग्निशामक तपशील", key: "fireExtinguisherDetails" },
    { label: "स्वयंपाक बाग आहे का?", key: "hasKitchenGarden" },
    { label: "बागेची उत्पादने वापरली का?", key: "usesGardenProduce" },
    { label: "स्वयंपाक बाग तपशील", key: "kitchenGardenDetails" },
    { label: "नाविन्यपूर्ण उपक्रम", key: "innovativeInitiatives" },
    { label: "आहार समिती आहे का?", key: "hasDietCommittee" },
    { label: "समिती फलक आहे का?", key: "hasCommitteeBoard" },
    { label: "स्वयंपाक एजन्सी", key: "cookingAgency" },
    { label: "कराराची प्रत आहे का?", key: "hasAgreementCopy" },
    { label: "स्वयंपाकी प्रशिक्षण आहे का?", key: "hasCookTraining" },
    { label: "स्वयंपाकी सहाय्यक संख्या", key: "cookHelperCount" },
    { label: "शाळेत स्वयंपाक होतो का?", key: "isCookedAtSchool" },
    { label: "इंधन प्रकार", key: "fuelType" },
    { label: "वजन काटा आहे का?", key: "hasWeighingScale" },
    { label: "तांदूळ वजन केले का?", key: "hasRiceWeighed" },
    { label: "साठवण युनिट्स आहेत का?", key: "hasStorageUnits" },
    { label: "ताटे आहेत का?", key: "hasPlates" },
    { label: "वितरणादरम्यान शिक्षक उपस्थित आहे का?", key: "teacherPresentDuringDistribution" },
    { label: "MDM पोर्टल अद्ययावत आहे का?", key: "mdmPortalUpdated" },
    { label: "पूरक आहार आहे का?", key: "supplementaryDiet" },
    { label: "पूरक आहार तपशील", key: "supplementaryDietDetails" },
    { label: "नमुना साठवला आहे का?", key: "sampleStored" },
    { label: "साफसफाई झाली का?", key: "cleaningDone" },
    { label: "मुख्याध्यापकाचे अन्न मत", key: "headmasterFoodOpinion" },
    { label: "तृतीय पक्ष समर्थन आहे का?", key: "thirdPartySupport" },
    { label: "मूलभूत सुविधा उपलब्ध आहेत का?", key: "basicFacilitiesAvailable" },
    { label: "मूलभूत सुविधा तपशील", key: "basicFacilitiesDetails" },
    { label: "जेवणाची व्यवस्था", key: "diningArrangement" },
    { label: "सरकारी रेसिपी पाळली का?", key: "followsGovtRecipe" },
    { label: "अंडी-केळी नियमित आहेत का?", key: "eggsBananasRegular" },
    { label: "अंकुरित धान्य वापरले का?", key: "usesSproutedGrains" },
    { label: "मासिक प्रयोगशाळा चाचणी आहे का?", key: "labTestMonthly" },
    { label: "वितरणापूर्वी चव चाचणी आहे का?", key: "tasteTestBeforeDistribution" },
    { label: "SMC पालक भेटी आहेत का?", key: "smcParentVisits" },
    { label: "चव नोंदवही आहे का?", key: "hasTasteRegister" },
    { label: "दैनंदिन चव नोंदी आहेत का?", key: "dailyTasteEntries" },
    { label: "साठा नोंदवहीशी जुळतो का?", key: "stockMatchesRegister" },
    { label: "साठा विसंगती तपशील", key: "stockDiscrepancyDetails" },
    { label: "रेसिपी प्रदर्शित आहेत का?", key: "recipesDisplayed" },
    { label: "निरीक्षण समिती बैठका आहेत का?", key: "monitoringCommitteeMeetings" },
    { label: "२०२४-२५ बैठक संख्या", key: "meetingCount2024_25" },
    { label: "रिकाम्या पोत्यांचे परतावा झाले का?", key: "emptySacksReturned" },
    { label: "पोत्यांचे हस्तांतरण नोंदवले का?", key: "sackTransferRecorded" },
    { label: "पोत्यांचे हस्तांतरण संख्या", key: "sackTransferCount" },
    { label: "सध्याचे अन्न साहित्य", key: "currentFoodMaterials" },
    { label: "स्नेह तिथी कार्यक्रम आहे का?", key: "snehTithiProgram" },
    { label: "स्नेह तिथी कार्यक्रम तपशील", key: "snehTithiProgramDetails" },
    { label: "भ्रष्टाचार तपशील", key: "corruptionDetails" },
    { label: "भ्रष्टाचार कारवाई तपशील", key: "corruptionActionDetails" },
    { label: "फील्ड अधिकारी भेटी आहेत का?", key: "fieldOfficerVisits" },
    { label: "फील्ड अधिकारी भेट तपशील", key: "fieldOfficerVisitDetails" },
    { label: "योजनेच्या सूचना", key: "schemeSuggestions" },
    { label: "आरोग्य तपासणी झाली का?", key: "healthCheckupDone" },
    { label: "आरोग्य तपासणी विद्यार्थी संख्या", key: "healthCheckupStudentCount" },
    { label: "BMI नोंदवले आहे का?", key: "bmiRecorded" },
    { label: "वजन-उंची मोजली का?", key: "weightHeightMeasured" },
    { label: "स्वयंपाकी आरोग्य तपासणी आहे का?", key: "cookHealthCheck" },
    { label: "SMC ठराव आहे का?", key: "hasSmcResolution" },
    { label: "आरोग्य प्रमाणपत्र आहे का?", key: "hasHealthCertificate" },
    { label: "सहाय्यक १ नाव", key: "helper1Name" },
    { label: "सहाय्यक २ नाव", key: "helper2Name" },
    { label: "लाभार्थी २०२२-२३ मुले", key: "beneficiariesYearly['2022-23'].boys" },
    { label: "लाभार्थी २०२२-२३ मुली", key: "beneficiariesYearly['2022-23'].girls" },
    { label: "लाभार्थी २०२२-२३ एकूण", key: "beneficiariesYearly['2022-23'].total" },
    { label: "लाभार्थी २०२३-२४ मुले", key: "beneficiariesYearly['2023-24'].boys" },
    { label: "लाभार्थी २०२३-२४ मुली", key: "beneficiariesYearly['2023-24'].girls" },
    { label: "लाभार्थी २०२३-२४ एकूण", key: "beneficiariesYearly['2023-24'].total" },
    { label: "लाभार्थी २०२४-२५ मुले", key: "beneficiariesYearly['2024-25'].boys" },
    { label: "लाभार्थी २०२४-२५ मुली", key: "beneficiariesYearly['2024-25'].girls" },
    { label: "लाभार्थी २०२४-२५ एकूण", key: "beneficiariesYearly['2024-25'].total" },
    { label: "अनुदान प्राप्त २०२२-२३", key: "grantReceived['2022-23']" },
    { label: "अनुदान प्राप्त २०२३-२४", key: "grantReceived['2023-24']" },
    { label: "अनुदान प्राप्त २०२४-२५", key: "grantReceived['2024-25']" },
    { label: "अनुदान खर्च २०२२-२३", key: "grantExpenditure['2022-23']" },
    { label: "अनुदान खर्च २०२३-२४", key: "grantExpenditure['2023-24']" },
    { label: "अनुदान खर्च २०२४-२५", key: "grantExpenditure['2024-25']" },
    { label: "अनुदान शिल्लक २०२२-२३", key: "grantBalance['2022-23']" },
    { label: "अनुदान शिल्लक २०२३-२४", key: "grantBalance['2023-24']" },
    { label: "अनुदान शिल्लक २०२४-२५", key: "grantBalance['2024-25']" },
    { label: "स्वयंपाकघर आहे का?", key: "hasKitchen" },
    { label: "साठवण खोली आहे का?", key: "hasStorageRoom" },
    { label: "जेवण कक्ष आहे का?", key: "hasDiningHall" },
    { label: "भांडी आहेत का?", key: "hasUtensils" },
    { label: "धान्य सुरक्षित आहे का?", key: "hasGrainSafety" },
    { label: "हात धुण्याचा साबण आहे का?", key: "hasHandwashSoap" },
    { label: "स्वतंत्र शौचालये आहेत का?", key: "hasSeparateToilets" },
    { label: "CCTV आहे का?", key: "hasCctv" },
    { label: "स्वयंपाकघर स्वच्छता", key: "kitchenCleanliness" },
    { label: "जेवण कक्ष स्वच्छता", key: "diningHallCleanliness" },
    { label: "साठवण स्वच्छता", key: "storageCleanliness" },
    { label: "सर्व्हिंग क्षेत्र स्वच्छता", key: "servingAreaCleanliness" },
    { label: "भांडीची स्थिती", key: "utensilCondition" },
    { label: "पाणीपुरवठा", key: "waterSupply" },
    { label: "हात धुण्याची सुविधा", key: "handwashFacility" },
    { label: "शौचालय स्वच्छता", key: "toiletCleanliness" },
    { label: "रोख नोंदवही अद्ययावत आहे का?", key: "cashBookUpdated" },
    { label: "साठा नोंदवही अद्ययावत आहे का?", key: "stockRegisterUpdated" },
    { label: "उपस्थिती नोंदवही अद्ययावत आहे का?", key: "attendanceRegisterUpdated" },
    { label: "बँक खाते अद्ययावत आहे का?", key: "bankAccountUpdated" },
    { label: "मानधन नोंदवही अद्ययावत आहे का?", key: "honorariumRegisterUpdated" },
    { label: "चव नोंदवही अद्ययावत आहे का?", key: "tasteRegisterUpdated" },
    { label: "स्नेह तिथी नोंदवही अद्ययावत आहे का?", key: "snehTithiRegisterUpdated" },
    { label: "नावनोंदणी सुधारणा आहे का?", key: "enrollmentImprovement" },
    { label: "उपस्थिती वाढ आहे का?", key: "attendanceIncrease" },
    { label: "पोषण आरोग्य सुधारणा आहे का?", key: "nutritionHealthImprovement" },
    { label: "वजन-उंची वाढ आहे का?", key: "weightHeightIncrease" },
    { label: "कुपोषण कमी झाले का?", key: "malnutritionReduction" },
    { label: "जंक फूड प्रतिबंध आहे का?", key: "junkFoodPrevention" },
    { label: "एकता बंधन आहे का?", key: "unityBonding" },
    { label: "सादर करण्याची तारीख", key: "submissionDate" },
  ];

  const observeFieldMappings = [
    { label: "School Name", key: "schoolName" },
    { label: "UDISE No", key: "schoolUdiseNumber" }, // Updated from udiseNo
    { label: "Taluka", key: "taluka" },
    { label: "District", key: "district" },
    { label: "Feedback", key: "voiceInput" },
  ];

  const downloadExcel = (data, fieldMappings, sheetName, fileName) => {
    if (data.length === 0) return toast.warn(`No ${sheetName.toLowerCase()} data available to download!`);
    const excelData = [];
    data.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        const value = key.includes(".") || key.includes("[")
          ? eval(`record.${key.replace(/\[(\w+)\]/g, "['$1']")}`) || ""
          : record[key] || "";
        if (index === 0) excelData.push([label, value]);
        else excelData[fieldIndex].push(value);
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const downloadCSV = (data, fieldMappings, fileName) => {
    if (data.length === 0) return toast.warn(`No ${fileName.split('_')[0]} data available to download!`);
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));
    data.forEach((record) => {
      const values = fieldMappings.map((field) => {
        const value = field.key.includes(".") || field.key.includes("[")
          ? eval(`record.${field.key.replace(/\[(\w+)\]/g, "['$1']")}`) || ""
          : record[field.key] || "";
        return `"${value.toString().replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(","));
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllExcel = () => {
    if (!user) {
      toast.error("You must be logged in to download data.");
      navigate("/login");
      return;
    }

    if (parentData.length === 0 && schoolData.length === 0 && observeData.length === 0)
      return toast.warn("No data available to download!");
    const wb = XLSX.utils.book_new();

    if (parentData.length > 0) {
      const parentExcelData = [];
      parentData.forEach((record, index) => {
        parentFieldMappings.forEach(({ label, key }, fieldIndex) => {
          if (index === 0) parentExcelData.push([label, record[key] || ""]);
          else parentExcelData[fieldIndex].push(record[key] || "");
        });
      });
      const parentWs = XLSX.utils.aoa_to_sheet(parentExcelData);
      XLSX.utils.book_append_sheet(wb, parentWs, "Parent Data");
    }

    if (schoolData.length > 0) {
      const schoolExcelData = [];
      schoolData.forEach((record, index) => {
        schoolFieldMappings.forEach(({ label, key }, fieldIndex) => {
          const value = key.includes(".") || key.includes("[")
            ? eval(`record.${key.replace(/\[(\w+)\]/g, "['$1']")}`) || ""
            : record[key] || "";
          if (index === 0) schoolExcelData.push([label, value]);
          else schoolExcelData[fieldIndex].push(value);
        });
      });
      const schoolWs = XLSX.utils.aoa_to_sheet(schoolExcelData);
      XLSX.utils.book_append_sheet(wb, schoolWs, "School Data");
    }

    if (observeData.length > 0) {
      const observeExcelData = [];
      observeData.forEach((record, index) => {
        observeFieldMappings.forEach(({ label, key }, fieldIndex) => {
          if (index === 0) observeExcelData.push([label, record[key] || ""]);
          else observeExcelData[fieldIndex].push(record[key] || "");
        });
      });
      const observeWs = XLSX.utils.aoa_to_sheet(observeExcelData);
      XLSX.utils.book_append_sheet(wb, observeWs, "Observation Data");
    }

    XLSX.writeFile(wb, "all_school_data.xlsx");
  };

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const filteredParentData = parentData.filter((parent) =>
    parent.parentName?.toLowerCase().includes(parentFilter.toLowerCase()) ||
    parent.schoolName?.toLowerCase().includes(parentFilter.toLowerCase())
  );
  const filteredSchoolData = schoolData.filter((school) =>
    school.schoolName?.toLowerCase().includes(schoolFilter.toLowerCase()) ||
    school.schoolUdiseNumber?.toLowerCase().includes(schoolFilter.toLowerCase()) // Updated filter to schoolUdiseNumber
  );
  const filteredObserveData = observeData.filter((observe) =>
    observe.schoolName?.toLowerCase().includes(observeFilter.toLowerCase()) ||
    observe.schoolUdiseNumber?.toLowerCase().includes(observeFilter.toLowerCase()) // Updated filter to schoolUdiseNumber
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Find a School</h5>
          <div className="d-flex mb-4 align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Form.Select
                className="w-25 me-2"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="udise">UDISE Number</option>
                <option value="name">School Name</option>
              </Form.Select>
              <Form.Control
                type="text"
                className="w-50 me-2"
                placeholder={`Enter ${searchType === "udise" ? "UDISE Number" : "School Name"}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch} disabled={loading || !user}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Search"}
              </Button>
            </div>
            <Button variant="outline-success" onClick={downloadAllExcel} disabled={!user}>
              Download All (Excel)
            </Button>
          </div>

          <Accordion defaultActiveKey="0">
            {/* Parent Feedback Section */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Parent Feedback ({filteredParentData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by parent or school name..."
                    value={parentFilter}
                    onChange={(e) => setParentFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(parentData, parentFieldMappings, "Parent Data", "parent_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(parentData, parentFieldMappings, "parent_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredParentData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {parentFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredParentData, parentPage).map((parent, index) => (
                            <tr key={parent.id}>
                              <td>{(parentPage - 1) * itemsPerPage + index + 1}</td>
                              {parentFieldMappings.map((field, idx) => (
                                <td key={idx}>{displayValue(parent[field.key])}</td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_parent_form/${parent.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("Parent_Form", parent.id, "Parent entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={parentPage === 1} onClick={() => setParentPage(parentPage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {parentPage} of {Math.ceil(filteredParentData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={parentPage === Math.ceil(filteredParentData.length / itemsPerPage)} onClick={() => setParentPage(parentPage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No parent feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* School Feedback Section */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>School Feedback ({filteredSchoolData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by school name or UDISE..."
                    value={schoolFilter}
                    onChange={(e) => setSchoolFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(schoolData, schoolFieldMappings, "School Data", "school_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(schoolData, schoolFieldMappings, "school_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredSchoolData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {schoolFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredSchoolData, schoolPage).map((school, index) => (
                            <tr key={school.id}>
                              <td>{(schoolPage - 1) * itemsPerPage + index + 1}</td>
                              {schoolFieldMappings.map((field, idx) => (
                                <td key={idx}>
                                  {displayValue(
                                    field.key.includes(".") || field.key.includes("[")
                                      ? eval(`school.${field.key.replace(/\[(\w+)\]/g, "['$1']")}`) || ""
                                      : school[field.key]
                                  )}
                                </td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_school_forms/${school.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("School_Forms", school.id, "School entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={schoolPage === 1} onClick={() => setSchoolPage(schoolPage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {schoolPage} of {Math.ceil(filteredSchoolData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={schoolPage === Math.ceil(filteredSchoolData.length / itemsPerPage)} onClick={() => setSchoolPage(schoolPage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No school feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* Observation Feedback Section */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Observation Feedback ({filteredObserveData.length})</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by school name or UDISE..."
                    value={observeFilter}
                    onChange={(e) => setObserveFilter(e.target.value)}
                    className="w-25"
                  />
                  <div>
                    <Button variant="outline-success" className="me-2" onClick={() => downloadExcel(observeData, observeFieldMappings, "Observation Data", "observation_data")}>
                      Download Excel
                    </Button>
                    <Button variant="outline-success" onClick={() => downloadCSV(observeData, observeFieldMappings, "observation_data")}>
                      Download CSV
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
                ) : filteredObserveData.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            {observeFieldMappings.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginate(filteredObserveData, observePage).map((observe, index) => (
                            <tr key={observe.id}>
                              <td>{(observePage - 1) * itemsPerPage + index + 1}</td>
                              {observeFieldMappings.map((field, idx) => (
                                <td key={idx}>{displayValue(observe[field.key])}</td>
                              ))}
                              <td>
                                <OverlayTrigger overlay={<Tooltip>Edit Entry</Tooltip>}>
                                  <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/update_observation_form/${observe.id}`)}>
                                    Edit
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete Entry</Tooltip>}>
                                  <Button variant="danger" size="sm" onClick={() => handleDelete("Observation_Form", observe.id, "Observation entry deleted successfully!")}>
                                    Delete
                                  </Button>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="outline-primary" disabled={observePage === 1} onClick={() => setObservePage(observePage - 1)} className="me-2">
                        Previous
                      </Button>
                      <span className="align-self-center">Page {observePage} of {Math.ceil(filteredObserveData.length / itemsPerPage)}</span>
                      <Button variant="outline-primary" disabled={observePage === Math.ceil(filteredObserveData.length / itemsPerPage)} onClick={() => setObservePage(observePage + 1)} className="ms-2">
                        Next
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>No observation feedback found for this school.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FindSchool;