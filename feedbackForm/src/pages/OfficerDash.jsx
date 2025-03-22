import React, { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import MidDayMealLogo from "../images/Mid_day_logo.png";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDash() {
  const [userDetails, setUserDetails] = useState(null);
  const [parentData, setParentData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Graph data states
  const [dailyParentData, setDailyParentData] = useState({});
  const [weeklyParentData, setWeeklyParentData] = useState({});
  const [monthlyParentData, setMonthlyParentData] = useState({});
  const [dailyObserveData, setDailyObserveData] = useState({});
  const [weeklyObserveData, setWeeklyObserveData] = useState({});
  const [monthlyObserveData, setMonthlyObserveData] = useState({});
  const [dailySchoolData, setDailySchoolData] = useState({});
  const [weeklySchoolData, setWeeklySchoolData] = useState({});
  const [monthlySchoolData, setMonthlySchoolData] = useState({});

  // Function to safely display values
  const displayValue = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
  };

  // Helper function to process form data for graphs
  const processFormData = (data, type) => {
    const daily = {};
    const weekly = {};
    const monthly = {};

    data.forEach((item) => {
      const date = new Date(item.submissionDate || Date.now()); // Assuming submissionDate field exists
      const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const weekKey = `${date.getFullYear()}-W${Math.ceil((date.getDate() + (date.getDay() === 0 ? 6 : date.getDay() - 1)) / 7)}`; // Year-Week
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM

      daily[dayKey] = (daily[dayKey] || 0) + 1;
      weekly[weekKey] = (weekly[weekKey] || 0) + 1;
      monthly[monthKey] = (monthly[monthKey] || 0) + 1;
    });

    if (type === "parent") {
      setDailyParentData(daily);
      setWeeklyParentData(weekly);
      setMonthlyParentData(monthly);
    } else if (type === "observe") {
      setDailyObserveData(daily);
      setWeeklyObserveData(weekly);
      setMonthlyObserveData(monthly);
    } else if (type === "school") {
      setDailySchoolData(daily);
      setWeeklySchoolData(weekly);
      setMonthlySchoolData(monthly);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            } else {
              console.log("User document not found");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.log("User not logged in");
          navigate("/login");
        }
      });
      return () => unsubscribe();
    };
    fetchUserData();
  }, [navigate]);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Parent_Form"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParentData(data);
        processFormData(data, "parent");
        console.log("Parent data:", data);
      } catch (error) {
        console.error("Error fetching parent data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParentData();
  }, []);

  useEffect(() => {
    const fetchObserveData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Observation_Form"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setObserveData(data);
        processFormData(data, "observe");
        console.log("Observation data:", data);
      } catch (error) {
        console.error("Error fetching observation data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchObserveData();
  }, []);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "School_Form"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchoolData(data);
        processFormData(data, "school");
        console.log("School data:", data);
      } catch (error) {
        console.error("Error fetching school data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolData();
  }, []);

  const updateParentForm = async (id) => {
    navigate(`/update_parent_form/${id}`);
  };

  const updateObservationForm = async (id) => {
    navigate(`/update_observation_form/${id}`);
  };

  const updateSchoolForm = async (id) => {
    navigate(`/update_school_form/${id}`);
  };

  const addParentEntry = () => {
    navigate("/parent_form");
  };

  const addObservationEntry = () => {
    navigate("/observation_form");
  };

  const addSchoolEntry = () => {
    navigate("/school_form");
  };

  const downloadParentExcel = () => {
    if (parentData.length === 0) {
      alert("No data available to download!");
      return;
    }

    const fieldMappings = [
      { label: "District", key: "district" },
      { label: "Taluka", key: "taluka" },
      { label: "School UDISE Number", key: "schoolUdiseNumber" },
      { label: "पालकाचे संपूर्ण नाव", key: "parentName" },
      { label: "शाळेचे नाव", key: "schoolName" },
      { label: "Child 1", key: "child1" },
      { label: "इयत्ता व तुकडी", key: "child1Sec" },
      { label: "Child 2", key: "child2" },
      { label: "इयत्ता व तुकडी", key: "child2Sec" },
      { label: "पालकाची शैक्षणिक पात्रता", key: "parentEducation" },
      { label: "पालकाचा निवासाचा संपूर्ण पत्ता", key: "address" },
      { label: "मुलांना दररोज शाळेत पाठवतात का?", key: "sendChildDaily" },
      { label: "नसल्यास कारण नमूद करयायात यावेः", key: "reason" },
      { label: "मुलांचे/ मुलींचे वजन वाढले का?", key: "weightGain" },
      { label: "वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?", key: "sickFrequency" },
      { label: "अभ्यासातील प्रगती चागंली झाली का?", key: "studyProgress" },
      { label: "अभ्यासातील एकाग्रता वाढली का?", key: "concentration" },
      { label: "मुला-मुलींचे पोषण चागंले होत आहे का?", key: "nutrition" },
      { label: "नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?", key: "attendance" },
      { label: "शालेय पोषण आहार योजनेचा प्रभाव", key: "impactOfNutritionScheme" },
      { label: "दुपारच्या उपस्थितीवर जेवणाचा प्रभाव", key: "effectOnAfternoonAttendance" },
      { label: "सामाजिकीकरण प्रक्रियेवर प्रभाव", key: "effectOfNutritionDietPlan" },
      { label: "सुधारणा सूचना", key: "improvementSuggestions" },
    ];

    const excelData = [];
    parentData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) {
          excelData.push([label, displayValue(record[key])]);
        } else {
          excelData[fieldIndex].push(displayValue(record[key]));
        }
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parent Data");
    XLSX.writeFile(wb, "parent_data.xlsx");
  };

  const downloadObservationExcel = () => {
    if (observeData.length === 0) {
      alert("No data available to download!");
      return;
    }

    const fieldMappings = [
      { label: "School Name", key: "schoolName" },
      { label: "UDISENo", key: "udiseNo" },
      { label: "Taluka", key: "taluka" },
      { label: "District", key: "district" },
      { label: "Feedback", key: "voiceInput" },
    ];

    const excelData = [];
    observeData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) {
          excelData.push([label, displayValue(record[key])]);
        } else {
          excelData[fieldIndex].push(displayValue(record[key]));
        }
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Observation Data");
    XLSX.writeFile(wb, "observation_data.xlsx");
  };

  const downloadSchoolExcel = () => {
    if (schoolData.length === 0) {
      alert("No data available to download!");
      return;
    }

    const fieldMappings = [
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
      { label: "UDISE कोड", key: "udiseCode" },
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

    const excelData = [];
    schoolData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        const value = key.includes(".") || key.includes("[")
          ? eval(`record.${key.replace(/\[(\w+)\]/g, "['$1']")}`)
          : record[key];
        if (index === 0) {
          excelData.push([label, displayValue(value)]);
        } else {
          excelData[fieldIndex].push(displayValue(value));
        }
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (!ws[cellRef]) return;
      ws[cellRef].s = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    });
    ws["!cols"] = [{ wch: 25 }, { wch: 30 }];
    ws["!rows"] = fieldMappings.map(() => ({ hpx: 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "School Data");
    XLSX.writeFile(wb, "school_data.xlsx");
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Form Submission Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Forms",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  // Chart data preparation
  const prepareChartData = (daily, weekly, monthly, label) => ({
    labels: Object.keys(daily).sort(), // Daily labels for simplicity; adjust for weekly/monthly as needed
    datasets: [
      {
        label: `${label} (Daily)`,
        data: Object.keys(daily).sort().map((key) => daily[key]),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: `${label} (Weekly)`,
        data: Object.keys(weekly).sort().map((key) => weekly[key]),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: `${label} (Monthly)`,
        data: Object.keys(monthly).sort().map((key) => monthly[key]),
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  });

  const parentChartData = prepareChartData(dailyParentData, weeklyParentData, monthlyParentData, "Parent Forms");
  const observeChartData = prepareChartData(dailyObserveData, weeklyObserveData, monthlyObserveData, "Observation Forms");
  const schoolChartData = prepareChartData(dailySchoolData, weeklySchoolData, monthlySchoolData, "School Forms");

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={MidDayMealLogo}
            alt="Mid Day Meal Logo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <a
            className="navbar-brand text-white ms-2"
            href="/officer_dashboard"
            style={{ fontSize: "24px" }}
          >
            Research Officer
          </a>
          <div className="d-flex align-items-center ms-3">
            <Link to="/dashboard" className="nav-link text-white mx-2">
              Home
            </Link>
            <Link to="/profile" className="nav-link text-white mx-2">
              Profile
            </Link>
            <Link to="/about_us" className="nav-link text-white mx-2">
              About Us
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex align-items-center mx-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "300px" }}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <div className="ms-2">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Graphs Section */}
      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center">Form Submission Trends</h5>
              <div className="row">
                <div className="col-md-4">
                  <h6 className="text-center">Parent Forms</h6>
                  <Line data={parentChartData} options={chartOptions} />
                </div>
                <div className="col-md-4">
                  <h6 className="text-center">Observation Forms</h6>
                  <Line data={observeChartData} options={chartOptions} />
                </div>
                <div className="col-md-4">
                  <h6 className="text-center">School Forms</h6>
                  <Line data={schoolChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Parent Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button className="btn btn-outline-success px-4" onClick={addParentEntry}>
                  Add Entry
                </button>
                <button className="btn btn-outline-success px-4" onClick={downloadParentExcel}>
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive overflow-x-auto">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Udise Number</th>
                        <th>District</th>
                        <th>Taluka</th>
                        <th>पालकाचे नाव</th>
                        <th>शाळेचे नाव</th>
                        <th>पाल्याांचे नाव 1</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पाल्याांचे नाव 2</th>
                        <th>इयत्ता व तुकडी</th>
                        <th>पालकाची शैक्षणिक पात्रता</th>
                        <th>पालकाचा निवासाचा संपूर्ण पत्ता</th>
                        <th>मुलांना दररोज शाळेत पाठवतात का?</th>
                        <th>नसल्यास कारण</th>
                        <th>मुलांचे/मुलींचे वजन वाढले का?</th>
                        <th>वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?</th>
                        <th>अभ्यासातील प्रगती चागंली झाली का?</th>
                        <th>अभ्यासातील एकाग्रता वाढली का?</th>
                        <th>मुला-मुलींचे पोषण चागंले होत आहे का?</th>
                        <th>नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?</th>
                        <th>शालेय पोषण आहार योजनेचा प्रभाव</th>
                        <th>दुपारच्या उपस्थितीवर जेवणाचा प्रभाव</th>
                        <th>सामाजिकीकरण प्रक्रियेवर प्रभाव</th>
                        <th>सुधारणा सूचना</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parentData.length > 0 ? (
                        parentData.map((parent, index) => (
                          <tr key={parent.id}>
                            <td>{index + 1}</td>
                            <td>{displayValue(parent.schoolUdiseNumber)}</td>
                            <td>{displayValue(parent.district)}</td>
                            <td>{displayValue(parent.taluka)}</td>
                            <td>{displayValue(parent.parentName)}</td>
                            <td>{displayValue(parent.schoolName)}</td>
                            <td>{displayValue(parent.child1)}</td>
                            <td>{displayValue(parent.child1Sec)}</td>
                            <td>{displayValue(parent.child2)}</td>
                            <td>{displayValue(parent.child2Sec)}</td>
                            <td>{displayValue(parent.parentEducation)}</td>
                            <td>{displayValue(parent.address)}</td>
                            <td>{displayValue(parent.sendChildDaily)}</td>
                            <td>{displayValue(parent.reason)}</td>
                            <td>{displayValue(parent.weightGain)}</td>
                            <td>{displayValue(parent.sickFrequency)}</td>
                            <td>{displayValue(parent.studyProgress)}</td>
                            <td>{displayValue(parent.concentration)}</td>
                            <td>{displayValue(parent.nutrition)}</td>
                            <td>{displayValue(parent.attendance)}</td>
                            <td>{displayValue(parent.impactOfNutritionScheme)}</td>
                            <td>{displayValue(parent.effectOnAfternoonAttendance)}</td>
                            <td>{displayValue(parent.effectOfNutritionDietPlan)}</td>
                            <td>{displayValue(parent.improvementSuggestions)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateParentForm(parent.id)}
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="25" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Observation Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button className="btn btn-outline-success px-4" onClick={addObservationEntry}>
                  Add Entry
                </button>
                <button className="btn btn-outline-success px-4" onClick={downloadObservationExcel}>
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive overflow-x-auto">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>शाळेचे नाव</th>
                        <th>UDISE क्रमांक</th>
                        <th>तालुका</th>
                        <th>जिल्हा</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {observeData.length > 0 ? (
                        observeData.map((observer, index) => (
                          <tr key={observer.id}>
                            <td>{index + 1}</td>
                            <td>{displayValue(observer.schoolName)}</td>
                            <td>{displayValue(observer.udiseNo)}</td>
                            <td>{displayValue(observer.taluka)}</td>
                            <td>{displayValue(observer.district)}</td>
                            <td>{displayValue(observer.voiceInput)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateObservationForm(observer.id)}
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">School Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button className="btn btn-outline-success px-4" onClick={addSchoolEntry}>
                  Add Entry
                </button>
                <button className="btn btn-outline-success px-4" onClick={downloadSchoolExcel}>
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive overflow-x-auto">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>जिल्हा</th>
                        <th>तालुका</th>
                        <th>शाळेचे नाव</th>
                        <th>तपासणी तारीख</th>
                        <th>तपासणी वेळ</th>
                        <th>तपासणी करणाऱ्याचे नाव</th>
                        <th>शाळेचे पूर्ण नाव</th>
                        <th>मुख्याध्यापकाचे नाव</th>
                        <th>मुख्याध्यापकाचा फोन</th>
                        <th>मुख्याध्यापकाचा पत्ता</th>
                        <th>सहाय्यक शिक्षकाचे नाव</th>
                        <th>सहाय्यक शिक्षकाचा फोन</th>
                        <th>UDISE कोड</th>
                        <th>पुरुष शिक्षक</th>
                        <th>महिला शिक्षक</th>
                        <th>एकूण शिक्षक</th>
                        <th>एकूण मुले</th>
                        <th>एकूण मुली</th>
                        <th>एकूण student</th>
                        <th>लाभार्थी इयत्ता १-४ मुले</th>
                        <th>लाभार्थी इयत्ता १-४ मुली</th>
                        <th>लाभार्थी इयत्ता १-४ एकूण</th>
                        <th>लाभार्थी इयत्ता ५-७ मुले</th>
                        <th>लाभार्थी इयत्ता ५-७ मुली</th>
                        <th>लाभार्थी इयत्ता ५-७ एकूण</th>
                        <th>लाभार्थी इयत्ता ८-१० मुले</th>
                        <th>लाभार्थी इयत्ता ८-१० मुली</th>
                        <th>लाभार्थी इयत्ता ८-१० एकूण</th>
                        <th>मध्यान्ह भोजन फलक आहे का?</th>
                        <th>मध्यान्ह भोजन मेनू आहे का?</th>
                        <th>व्यवस्थापन मंडळ आहे का?</th>
                        <th>मुख्याध्यापक संपर्क आहे का?</th>
                        <th>अधिकारी संपर्क आहे का?</th>
                        <th>तक्रार पेटी आहे का?</th>
                        <th>आपत्कालीन क्रमांक आहे का?</th>
                        <th>स्वयंपाक शेड आहे का?</th>
                        <th>प्रथमोपचार पेटी आहे का?</th>
                        <th>पाण्याचा स्रोत आहे का?</th>
                        <th>पाण्याचा स्रोत प्रकार</th>
                        <th>नियमित पाणीपुरवठा आहे का?</th>
                        <th>अग्निशामक यंत्र आहे का?</th>
                        <th>अग्निशामक तपासणी आहे का?</th>
                        <th>अग्निशामक पुनर्भरण आहे का?</th>
                        <th>अग्निशामक तपशील</th>
                        <th>स्वयंपाक बाग आहे का?</th>
                        <th>बागेची उत्पादने वापरली का?</th>
                        <th>स्वयंपाक बाग तपशील</th>
                        <th>नाविन्यपूर्ण उपक्रम</th>
                        <th>आहार समिती आहे का?</th>
                        <th>समिती फलक आहे का?</th>
                        <th>स्वयंपाक एजन्सी</th>
                        <th>कराराची प्रत आहे का?</th>
                        <th>स्वयंपाकी प्रशिक्षण आहे का?</th>
                        <th>स्वयंपाकी सहाय्यक संख्या</th>
                        <th>शाळेत स्वयंपाक होतो का?</th>
                        <th>इंधन प्रकार</th>
                        <th>वजन काटा आहे का?</th>
                        <th>तांदूळ वजन केले का?</th>
                        <th>साठवण युनिट्स आहेत का?</th>
                        <th>ताटे आहेत का?</th>
                        <th>वितरणादरम्यान शिक्षक उपस्थित आहे का?</th>
                        <th>MDM पोर्टल अद्ययावत आहे का?</th>
                        <th>पूरक आहार आहे का?</th>
                        <th>पूरक आहार तपशील</th>
                        <th>नमुना साठवला आहे का?</th>
                        <th>साफसफाई झाली का?</th>
                        <th>मुख्याध्यापकाचे अन्न मत</th>
                        <th>तृतीय पक्ष समर्थन आहे का?</th>
                        <th>मूलभूत सुविधा उपलब्ध आहेत का?</th>
                        <th>मूलभूत सुविधा तपशील</th>
                        <th>जेवणाची व्यवस्था</th>
                        <th>सरकारी रेसिपी पाळली का?</th>
                        <th>अंडी-केळी नियमित आहेत का?</th>
                        <th>अंकुरित धान्य वापरले का?</th>
                        <th>मासिक प्रयोगशाळा चाचणी आहे का?</th>
                        <th>वितरणापूर्वी चव चाचणी आहे का?</th>
                        <th>SMC पालक भेटी आहेत का?</th>
                        <th>चव नोंदवही आहे का?</th>
                        <th>दैनंदिन चव नोंदी आहेत का?</th>
                        <th>साठा नोंदवहीशी जुळतो का?</th>
                        <th>साठा विसंगती तपशील</th>
                        <th>रेसिपी प्रदर्शित आहेत का?</th>
                        <th>निरीक्षण समिती बैठका आहेत का?</th>
                        <th>२०२४-२५ बैठक संख्या</th>
                        <th>रिकाम्या पोत्यांचे परतावा झाले का?</th>
                        <th>पोत्यांचे हस्तांतरण नोंदवले का?</th>
                        <th>पोत्यांचे हस्तांतरण संख्या</th>
                        <th>सध्याचे अन्न साहित्य</th>
                        <th>स्नेह तिथी कार्यक्रम आहे का?</th>
                        <th>स्नेह तिथी कार्यक्रम तपशील</th>
                        <th>भ्रष्टाचार तपशील</th>
                        <th>भ्रष्टाचार कारवाई तपशील</th>
                        <th>फील्ड अधिकारी भेटी आहेत का?</th>
                        <th>फील्ड अधिकारी भेट तपशील</th>
                        <th>योजनेच्या सूचना</th>
                        <th>आरोग्य तपासणी झाली का?</th>
                        <th>आरोग्य तपासणी विद्यार्थी संख्या</th>
                        <th>BMI नोंदवले आहे का?</th>
                        <th>वजन-उंची मोजली का?</th>
                        <th>स्वयंपाकी आरोग्य तपासणी आहे का?</th>
                        <th>SMC ठराव आहे का?</th>
                        <th>आरोग्य प्रमाणपत्र आहे का?</th>
                        <th>सहाय्यक १ नाव</th>
                        <th>सहाय्यक २ नाव</th>
                        <th>लाभार्थी २०२२-२३ मुले</th>
                        <th>लाभार्थी २०२२-२३ मुली</th>
                        <th>लाभार्थी २०२२-२३ एकूण</th>
                        <th>लाभार्थी २०२३-२४ मुले</th>
                        <th>लाभार्थी २०२३-२४ मुली</th>
                        <th>लाभार्थी २०२३-२४ एकूण</th>
                        <th>लाभार्थी २०२४-२५ मुले</th>
                        <th>लाभार्थी २०२४-२५ मुली</th>
                        <th>लाभार्थी २०२४-२५ एकूण</th>
                        <th>अनुदान प्राप्त २०२२-२३</th>
                        <th>अनुदान प्राप्त २०२३-२४</th>
                        <th>अनुदान प्राप्त २०२४-२५</th>
                        <th>अनुदान खर्च २०२२-२३</th>
                        <th>अनुदान खर्च २०२३-२४</th>
                        <th>अनुदान खर्च २०२४-२५</th>
                        <th>अनुदान शिल्लक २०२२-२३</th>
                        <th>अनुदान शिल्लक २०२३-२४</th>
                        <th>अनुदान शिल्लक २०२४-२५</th>
                        <th>स्वयंपाकघर आहे का?</th>
                        <th>साठवण खोली आहे का?</th>
                        <th>जेवण कक्ष आहे का?</th>
                        <th>भांडी आहेत का?</th>
                        <th>धान्य सुरक्षित आहे का?</th>
                        <th>हात धुण्याचा साबण आहे का?</th>
                        <th>स्वतंत्र शौचालये आहेत का?</th>
                        <th>CCTV आहे का?</th>
                        <th>स्वयंपाकघर स्वच्छता</th>
                        <th>जेवण कक्ष स्वच्छता</th>
                        <th>साठवण स्वच्छता</th>
                        <th>सर्व्हिंग क्षेत्र स्वच्छता</th>
                        <th>भांडीची स्थिती</th>
                        <th>पाणीपुरवठा</th>
                        <th>हात धुण्याची सुविधा</th>
                        <th>शौचालय स्वच्छता</th>
                        <th>रोख नोंदवही अद्ययावत आहे का?</th>
                        <th>साठा नोंदवही अद्ययावत आहे का?</th>
                        <th>उपस्थिती नोंदवही अद्ययावत आहे का?</th>
                        <th>बँक खाते अद्ययावत आहे का?</th>
                        <th>मानधन नोंदवही अद्ययावत आहे का?</th>
                        <th>चव नोंदवही अद्ययावत आहे का?</th>
                        <th>स्नेह तिथी नोंदवही अद्ययावत आहे का?</th>
                        <th>नावनोंदणी सुधारणा आहे का?</th>
                        <th>उपस्थिती वाढ आहे का?</th>
                        <th>पोषण आरोग्य सुधारणा आहे का?</th>
                        <th>वजन-उंची वाढ आहे का?</th>
                        <th>कुपोषण कमी झाले का?</th>
                        <th>जंक फूड प्रतिबंध आहे का?</th>
                        <th>एकता बंधन आहे का?</th>
                        <th>सादर करण्याची तारीख</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schoolData.length > 0 ? (
                        schoolData.map((school, index) => (
                          <tr key={school.id}>
                            <td>{index + 1}</td>
                            <td>{displayValue(school.district)}</td>
                            <td>{displayValue(school.taluka)}</td>
                            <td>{displayValue(school.schoolName)}</td>
                            <td>{displayValue(school.inspectionDate)}</td>
                            <td>{displayValue(school.inspectionTime)}</td>
                            <td>{displayValue(school.inspectorName)}</td>
                            <td>{displayValue(school.schoolFullName)}</td>
                            <td>{displayValue(school.headmasterName)}</td>
                            <td>{displayValue(school.headmasterPhone)}</td>
                            <td>{displayValue(school.headmasterAddress)}</td>
                            <td>{displayValue(school.assistantTeacherName)}</td>
                            <td>{displayValue(school.assistantTeacherPhone)}</td>
                            <td>{displayValue(school.udiseCode)}</td>
                            <td>{displayValue(school.teacherMale)}</td>
                            <td>{displayValue(school.teacherFemale)}</td>
                            <td>{displayValue(school.totalTeachers)}</td>
                            <td>{displayValue(school.totalBoys)}</td>
                            <td>{displayValue(school.totalGirls)}</td>
                            <td>{displayValue(school.totalStudents)}</td>
                            <td>{displayValue(school.beneficiaries?.grade1to4?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.grade1to4?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.grade1to4?.total)}</td>
                            <td>{displayValue(school.beneficiaries?.grade5to7?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.grade5to7?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.grade5to7?.total)}</td>
                            <td>{displayValue(school.beneficiaries?.grade8to10?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.grade8to10?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.grade8to10?.total)}</td>
                            <td>{displayValue(school.hasMiddayMealBoard)}</td>
                            <td>{displayValue(school.hasMiddayMealMenu)}</td>
                            <td>{displayValue(school.hasManagementBoard)}</td>
                            <td>{displayValue(school.hasPrincipalContact)}</td>
                            <td>{displayValue(school.hasOfficerContact)}</td>
                            <td>{displayValue(school.hasComplaintBox)}</td>
                            <td>{displayValue(school.hasEmergencyNumber)}</td>
                            <td>{displayValue(school.hasKitchenShed)}</td>
                            <td>{displayValue(school.hasFirstAidBox)}</td>
                            <td>{displayValue(school.hasWaterSource)}</td>
                            <td>{displayValue(school.waterSourceType)}</td>
                            <td>{displayValue(school.hasRegularWaterSupply)}</td>
                            <td>{displayValue(school.hasFireExtinguisher)}</td>
                            <td>{displayValue(school.hasFireExtinguisherCheck)}</td>
                            <td>{displayValue(school.hasFireExtinguisherRefill)}</td>
                            <td>{displayValue(school.fireExtinguisherDetails)}</td>
                            <td>{displayValue(school.hasKitchenGarden)}</td>
                            <td>{displayValue(school.usesGardenProduce)}</td>
                            <td>{displayValue(school.kitchenGardenDetails)}</td>
                            <td>{displayValue(school.innovativeInitiatives)}</td>
                            <td>{displayValue(school.hasDietCommittee)}</td>
                            <td>{displayValue(school.hasCommitteeBoard)}</td>
                            <td>{displayValue(school.cookingAgency)}</td>
                            <td>{displayValue(school.hasAgreementCopy)}</td>
                            <td>{displayValue(school.hasCookTraining)}</td>
                            <td>{displayValue(school.cookHelperCount)}</td>
                            <td>{displayValue(school.isCookedAtSchool)}</td>
                            <td>{displayValue(school.fuelType)}</td>
                            <td>{displayValue(school.hasWeighingScale)}</td>
                            <td>{displayValue(school.hasRiceWeighed)}</td>
                            <td>{displayValue(school.hasStorageUnits)}</td>
                            <td>{displayValue(school.hasPlates)}</td>
                            <td>{displayValue(school.teacherPresentDuringDistribution)}</td>
                            <td>{displayValue(school.mdmPortalUpdated)}</td>
                            <td>{displayValue(school.supplementaryDiet)}</td>
                            <td>{displayValue(school.supplementaryDietDetails)}</td>
                            <td>{displayValue(school.sampleStored)}</td>
                            <td>{displayValue(school.cleaningDone)}</td>
                            <td>{displayValue(school.headmasterFoodOpinion)}</td>
                            <td>{displayValue(school.thirdPartySupport)}</td>
                            <td>{displayValue(school.basicFacilitiesAvailable)}</td>
                            <td>{displayValue(school.basicFacilitiesDetails)}</td>
                            <td>{displayValue(school.diningArrangement)}</td>
                            <td>{displayValue(school.followsGovtRecipe)}</td>
                            <td>{displayValue(school.eggsBananasRegular)}</td>
                            <td>{displayValue(school.usesSproutedGrains)}</td>
                            <td>{displayValue(school.labTestMonthly)}</td>
                            <td>{displayValue(school.tasteTestBeforeDistribution)}</td>
                            <td>{displayValue(school.smcParentVisits)}</td>
                            <td>{displayValue(school.hasTasteRegister)}</td>
                            <td>{displayValue(school.dailyTasteEntries)}</td>
                            <td>{displayValue(school.stockMatchesRegister)}</td>
                            <td>{displayValue(school.stockDiscrepancyDetails)}</td>
                            <td>{displayValue(school.recipesDisplayed)}</td>
                            <td>{displayValue(school.monitoringCommitteeMeetings)}</td>
                            <td>{displayValue(school.meetingCount2024_25)}</td>
                            <td>{displayValue(school.emptySacksReturned)}</td>
                            <td>{displayValue(school.sackTransferRecorded)}</td>
                            <td>{displayValue(school.sackTransferCount)}</td>
                            <td>{displayValue(school.currentFoodMaterials)}</td>
                            <td>{displayValue(school.snehTithiProgram)}</td>
                            <td>{displayValue(school.snehTithiProgramDetails)}</td>
                            <td>{displayValue(school.corruptionDetails)}</td>
                            <td>{displayValue(school.corruptionActionDetails)}</td>
                            <td>{displayValue(school.fieldOfficerVisits)}</td>
                            <td>{displayValue(school.fieldOfficerVisitDetails)}</td>
                            <td>{displayValue(school.schemeSuggestions)}</td>
                            <td>{displayValue(school.healthCheckupDone)}</td>
                            <td>{displayValue(school.healthCheckupStudentCount)}</td>
                            <td>{displayValue(school.bmiRecorded)}</td>
                            <td>{displayValue(school.weightHeightMeasured)}</td>
                            <td>{displayValue(school.cookHealthCheck)}</td>
                            <td>{displayValue(school.hasSmcResolution)}</td>
                            <td>{displayValue(school.hasHealthCertificate)}</td>
                            <td>{displayValue(school.helper1Name)}</td>
                            <td>{displayValue(school.helper2Name)}</td>
                            <td>{displayValue(school.beneficiaries?.["2022-23"]?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.["2022-23"]?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.["2022-23"]?.total)}</td>
                            <td>{displayValue(school.beneficiaries?.["2023-24"]?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.["2023-24"]?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.["2023-24"]?.total)}</td>
                            <td>{displayValue(school.beneficiaries?.["2024-25"]?.boys)}</td>
                            <td>{displayValue(school.beneficiaries?.["2024-25"]?.girls)}</td>
                            <td>{displayValue(school.beneficiaries?.["2024-25"]?.total)}</td>
                            <td>{displayValue(school.grantReceived?.["2022-23"])}</td>
                            <td>{displayValue(school.grantReceived?.["2023-24"])}</td>
                            <td>{displayValue(school.grantReceived?.["2024-25"])}</td>
                            <td>{displayValue(school.grantExpenditure?.["2022-23"])}</td>
                            <td>{displayValue(school.grantExpenditure?.["2023-24"])}</td>
                            <td>{displayValue(school.grantExpenditure?.["2024-25"])}</td>
                            <td>{displayValue(school.grantBalance?.["2022-23"])}</td>
                            <td>{displayValue(school.grantBalance?.["2023-24"])}</td>
                            <td>{displayValue(school.grantBalance?.["2024-25"])}</td>
                            <td>{displayValue(school.hasKitchen)}</td>
                            <td>{displayValue(school.hasStorageRoom)}</td>
                            <td>{displayValue(school.hasDiningHall)}</td>
                            <td>{displayValue(school.hasUtensils)}</td>
                            <td>{displayValue(school.hasGrainSafety)}</td>
                            <td>{displayValue(school.hasHandwashSoap)}</td>
                            <td>{displayValue(school.hasSeparateToilets)}</td>
                            <td>{displayValue(school.hasCctv)}</td>
                            <td>{displayValue(school.kitchenCleanliness)}</td>
                            <td>{displayValue(school.diningHallCleanliness)}</td>
                            <td>{displayValue(school.storageCleanliness)}</td>
                            <td>{displayValue(school.servingAreaCleanliness)}</td>
                            <td>{displayValue(school.utensilCondition)}</td>
                            <td>{displayValue(school.waterSupply)}</td>
                            <td>{displayValue(school.handwashFacility)}</td>
                            <td>{displayValue(school.toiletCleanliness)}</td>
                            <td>{displayValue(school.cashBookUpdated)}</td>
                            <td>{displayValue(school.stockRegisterUpdated)}</td>
                            <td>{displayValue(school.attendanceRegisterUpdated)}</td>
                            <td>{displayValue(school.bankAccountUpdated)}</td>
                            <td>{displayValue(school.honorariumRegisterUpdated)}</td>
                            <td>{displayValue(school.tasteRegisterUpdated)}</td>
                            <td>{displayValue(school.snehTithiRegisterUpdated)}</td>
                            <td>{displayValue(school.enrollmentImprovement)}</td>
                            <td>{displayValue(school.attendanceIncrease)}</td>
                            <td>{displayValue(school.nutritionHealthImprovement)}</td>
                            <td>{displayValue(school.weightHeightIncrease)}</td>
                            <td>{displayValue(school.malnutritionReduction)}</td>
                            <td>{displayValue(school.junkFoodPrevention)}</td>
                            <td>{displayValue(school.unityBonding)}</td>
                            <td>{displayValue(school.submissionDate)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateSchoolForm(school.id)}
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="154" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;