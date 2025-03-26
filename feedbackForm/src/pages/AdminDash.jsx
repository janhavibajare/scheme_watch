import React, { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import MidDayMealLogo from "../images/Mid_day_logo.png";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function AdminDash() {
  const [userDetails, setUserDetails] = useState(null);
  const [userData, setUserData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [observeData, setObserveData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [activeResearchOfficers, setActiveResearchOfficers] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [inactiveResearchOfficers, setInactiveResearchOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 20;
  const [researchOfficerPage, setResearchOfficerPage] = useState(1);
  const [activeUsersPage, setActiveUsersPage] = useState(1);
  const [inactiveUsersPage, setInactiveUsersPage] = useState(1);
  const [registeredUsersPage, setRegisteredUsersPage] = useState(1);
  const [researchOfficerSearch, setResearchOfficerSearch] = useState("");
  const [activeUsersSearch, setActiveUsersSearch] = useState("");
  const [inactiveUsersSearch, setInactiveUsersSearch] = useState("");
  const [registeredUsersSearch, setRegisteredUsersSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    field: "lastActive",
    direction: "desc",
  });
  const [isResearchOfficersOpen, setIsResearchOfficersOpen] = useState(true);
  const [isActiveUsersOpen, setIsActiveUsersOpen] = useState(true);
  const [isInactiveUsersOpen, setIsInactiveUsersOpen] = useState(true);
  const [isRegisteredUsersOpen, setIsRegisteredUsersOpen] = useState(true);

  const displayValue = (value) => (value != null ? value : "N/A");

  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserDetails(userData);
              await updateDoc(docRef, { lastLogin: new Date().toISOString() });
              const activeUserRef = doc(db, "activeUsers", user.uid);
              await setDoc(
                activeUserRef,
                {
                  email: user.email,
                  firstName: userData.firstName || "N/A",
                  lastName: userData.lastName || "N/A",
                  role: userData.role || "N/A",
                  lastActive: new Date().toISOString(),
                },
                { merge: true }
              );
            }
          } catch (error) {
            toast.error("Error updating user data: " + error.message);
          }
        }
      });
      return () => unsubscribe();
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "activeUsers"),
      (snapshot) => {
        const activeUserList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllActiveUsers(activeUserList);
        const researchOfficers = activeUserList.filter(
          (user) => user.role === "Research Officer"
        );
        setActiveResearchOfficers(researchOfficers);
      },
      (error) => {
        toast.error("Error fetching active users: " + error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersSnap = await getDocs(collection(db, "Users"));
        const allUsers = allUsersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(allUsers);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const inactive = allUsers.filter((user) => {
          const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          return (
            user.role === "Research Officer" &&
            (!lastLogin || lastLogin < thirtyDaysAgo)
          );
        });
        setInactiveResearchOfficers(inactive);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchSchoolData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "School_Form"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchoolData(data);
    } catch (error) {
      toast.error("Error fetching school data: " + error.message);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  async function handleLogout() {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) await deleteDoc(doc(db, "activeUsers", currentUser.uid));
      await auth.signOut();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  }

  const handleRemoveUser = async (uid) => {
    try {
      await deleteDoc(doc(db, "Users", uid));
      await deleteDoc(doc(db, "activeUsers", uid));
      toast.success("User removed successfully!");
      setInactiveResearchOfficers((prev) =>
        prev.filter((user) => user.id !== uid)
      );
      setUserData((prev) => prev.filter((user) => user.id !== uid));
    } catch (error) {
      toast.error("Error removing user: " + error.message);
    }
  };

  const handleSchoolDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "School_Forms", id));
      toast.success("School entry deleted successfully!");
      fetchSchoolData();
    } catch (error) {
      toast.error("Error deleting school entry: " + error.message);
    }
  };

  const sortData = (data, field, direction) => {
    return [...data].sort((a, b) => {
      const aValue = a[field] || "";
      const bValue = b[field] || "";
      if (field === "lastActive" || field === "lastLogin") {
        const aDate = aValue ? new Date(aValue) : new Date(0);
        const bDate = bValue ? new Date(bValue) : new Date(0);
        return direction === "asc" ? aDate - bDate : bDate - aDate;
      }
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  const handleSort = (field) => {
    const direction =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ field, direction });
  };

  const downloadExcel = (data, filename, sheetName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const fetchParentData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Parent_Form"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParentData(data);
    } catch (error) {
      toast.error("Error fetching parent data: " + error.message);
    }
  };

  const fetchObserveData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Observation_Form"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setObserveData(data);
    } catch (error) {
      toast.error("Error fetching observation data: " + error.message);
    }
  };

  useEffect(() => {
    fetchParentData();
  }, []);
  useEffect(() => {
    fetchObserveData();
  }, []);

  const handleParentDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Parent_Form", id));
      toast.success("Parent entry deleted successfully!");
      fetchParentData();
    } catch (error) {
      toast.error("Error deleting parent entry: " + error.message);
    }
  };

  const handleObservationDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Observation_Form", id));
      toast.success("Observation entry deleted successfully!");
      fetchObserveData();
    } catch (error) {
      toast.error("Error deleting observation entry: " + error.message);
    }
  };

  const updateParentForm = (id) => navigate(`/update_parent_form/${id}`);
  const updateObservationForm = (id) =>
    navigate(`/update_observation_form/${id}`);
  const updateSchoolForm = (id) => navigate(`/update_school_form/${id}`);
  const addParentEntry = () => navigate("/parent_form");
  const addObservationEntry = () => navigate("/observation_form");
  const addSchoolEntry = () => navigate("/school_form");

  const downloadParentExcel = () => {
    if (parentData.length === 0)
      return toast.warn("No parent data available to download!");
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
      {
        label: "वारंवार आजारी पडयायाचे प्रमाण कमी झाले का?",
        key: "sickFrequency",
      },
      { label: "अभ्यासातील प्रगती चागंली झाली का?", key: "studyProgress" },
      { label: "अभ्यासातील एकाग्रता वाढली का?", key: "concentration" },
      { label: "मुला-मुलींचे पोषण चागंले होत आहे का?", key: "nutrition" },
      { label: "नियमित शाळेत जाण्यामध्ये सुधारणा झाली का?", key: "attendence" },
      {
        label:
          "वि‌द्यार्थ्यांना शालेय नियमित जाण्यासाठी शालेय पोषण आहार योजनेचा प्रभाव",
        key: "impactOfNutritionScheme",
      },
      {
        label: "दुपारच्या उपस्थितीवर जेवणाचा प्रभाव",
        key: "effectOnAfternoonAttendence",
      },
      {
        label: "मुलांच्या सामाजिकीकरण प्रक्रियेवर पोषण आहार योजनेचा प्रभाव",
        key: "effectOfNutritionDietPlan",
      },
      {
        label: "योजनेमध्ये सुधारणा करण्यासाठी सूचना",
        key: "improvementSuggestions",
      },
    ];
    const excelData = [];
    parentData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        if (index === 0) excelData.push([label, record[key] || ""]);
        else excelData[fieldIndex].push(record[key] || "");
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (ws[cellRef])
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
    if (observeData.length === 0)
      return toast.warn("No observation data available to download!");
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
        if (index === 0) excelData.push([label, record[key] || ""]);
        else excelData[fieldIndex].push(record[key] || "");
      });
    });
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (ws[cellRef])
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
    if (schoolData.length === 0)
      return toast.warn("No school data available to download!");
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
      {
        label: "लाभार्थी इयत्ता १-४ मुले",
        key: "beneficiaries.grade1to4.boys",
      },
      {
        label: "लाभार्थी इयत्ता १-४ मुली",
        key: "beneficiaries.grade1to4.girls",
      },
      {
        label: "लाभार्थी इयत्ता १-४ एकूण",
        key: "beneficiaries.grade1to4.total",
      },
      {
        label: "लाभार्थी इयत्ता ५-७ मुले",
        key: "beneficiaries.grade5to7.boys",
      },
      {
        label: "लाभार्थी इयत्ता ५-७ मुली",
        key: "beneficiaries.grade5to7.girls",
      },
      {
        label: "लाभार्थी इयत्ता ५-७ एकूण",
        key: "beneficiaries.grade5to7.total",
      },
      {
        label: "लाभार्थी इयत्ता ८-१० मुले",
        key: "beneficiaries.grade8to10.boys",
      },
      {
        label: "लाभार्थी इयत्ता ८-१० मुली",
        key: "beneficiaries.grade8to10.girls",
      },
      {
        label: "लाभार्थी इयत्ता ८-१० एकूण",
        key: "beneficiaries.grade8to10.total",
      },
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
      {
        label: "वितरणादरम्यान शिक्षक उपस्थित आहे का?",
        key: "teacherPresentDuringDistribution",
      },
      { label: "MDM पोर्टल अद्ययावत आहे का?", key: "mdmPortalUpdated" },
      { label: "पूरक आहार आहे का?", key: "supplementaryDiet" },
      { label: "पूरक आहार तपशील", key: "supplementaryDietDetails" },
      { label: "नमुना साठवला आहे का?", key: "sampleStored" },
      { label: "साफसफाई झाली का?", key: "cleaningDone" },
      { label: "मुख्याध्यापकाचे अन्न मत", key: "headmasterFoodOpinion" },
      { label: "तृतीय पक्ष समर्थन आहे का?", key: "thirdPartySupport" },
      {
        label: "मूलभूत सुविधा उपलब्ध आहेत का?",
        key: "basicFacilitiesAvailable",
      },
      { label: "मूलभूत सुविधा तपशील", key: "basicFacilitiesDetails" },
      { label: "जेवणाची व्यवस्था", key: "diningArrangement" },
      { label: "सरकारी रेसिपी पाळली का?", key: "followsGovtRecipe" },
      { label: "अंडी-केळी नियमित आहेत का?", key: "eggsBananasRegular" },
      { label: "अंकुरित धान्य वापरले का?", key: "usesSproutedGrains" },
      { label: "मासिक प्रयोगशाळा चाचणी आहे का?", key: "labTestMonthly" },
      {
        label: "वितरणापूर्वी चव चाचणी आहे का?",
        key: "tasteTestBeforeDistribution",
      },
      { label: "SMC पालक भेटी आहेत का?", key: "smcParentVisits" },
      { label: "चव नोंदवही आहे का?", key: "hasTasteRegister" },
      { label: "दैनंदिन चव नोंदी आहेत का?", key: "dailyTasteEntries" },
      { label: "साठा नोंदवहीशी जुळतो का?", key: "stockMatchesRegister" },
      { label: "साठा विसंगती तपशील", key: "stockDiscrepancyDetails" },
      { label: "रेसिपी प्रदर्शित आहेत का?", key: "recipesDisplayed" },
      {
        label: "निरीक्षण समिती बैठका आहेत का?",
        key: "monitoringCommitteeMeetings",
      },
      { label: "२०२४-२५ बैठक संख्या", key: "meetingCount2024_25" },
      {
        label: "रिकाम्या पोत्यांचे परतावा झाले का?",
        key: "emptySacksReturned",
      },
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
      {
        label: "आरोग्य तपासणी विद्यार्थी संख्या",
        key: "healthCheckupStudentCount",
      },
      { label: "BMI नोंदवले आहे का?", key: "bmiRecorded" },
      { label: "वजन-उंची मोजली का?", key: "weightHeightMeasured" },
      { label: "स्वयंपाकी आरोग्य तपासणी आहे का?", key: "cookHealthCheck" },
      { label: "SMC ठराव आहे का?", key: "hasSmcResolution" },
      { label: "आरोग्य प्रमाणपत्र आहे का?", key: "hasHealthCertificate" },
      { label: "सहाय्यक १ नाव", key: "helper1Name" },
      { label: "सहाय्यक २ नाव", key: "helper2Name" },
      {
        label: "लाभार्थी २०२२-२३ मुले",
        key: "beneficiariesYearly['2022-23'].boys",
      },
      {
        label: "लाभार्थी २०२२-२३ मुली",
        key: "beneficiariesYearly['2022-23'].girls",
      },
      {
        label: "लाभार्थी २०२२-२३ एकूण",
        key: "beneficiariesYearly['2022-23'].total",
      },
      {
        label: "लाभार्थी २०२३-२४ मुले",
        key: "beneficiariesYearly['2023-24'].boys",
      },
      {
        label: "लाभार्थी २०२३-२४ मुली",
        key: "beneficiariesYearly['2023-24'].girls",
      },
      {
        label: "लाभार्थी २०२३-२४ एकूण",
        key: "beneficiariesYearly['2023-24'].total",
      },
      {
        label: "लाभार्थी २०२४-२५ मुले",
        key: "beneficiariesYearly['2024-25'].boys",
      },
      {
        label: "लाभार्थी २०२४-२५ मुली",
        key: "beneficiariesYearly['2024-25'].girls",
      },
      {
        label: "लाभार्थी २०२४-२५ एकूण",
        key: "beneficiariesYearly['2024-25'].total",
      },
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
      {
        label: "उपस्थिती नोंदवही अद्ययावत आहे का?",
        key: "attendanceRegisterUpdated",
      },
      { label: "बँक खाते अद्ययावत आहे का?", key: "bankAccountUpdated" },
      {
        label: "मानधन नोंदवही अद्ययावत आहे का?",
        key: "honorariumRegisterUpdated",
      },
      { label: "चव नोंदवही अद्ययावत आहे का?", key: "tasteRegisterUpdated" },
      {
        label: "स्नेह तिथी नोंदवही अद्ययावत आहे का?",
        key: "snehTithiRegisterUpdated",
      },
      { label: "नावनोंदणी सुधारणा आहे का?", key: "enrollmentImprovement" },
      { label: "उपस्थिती वाढ आहे का?", key: "attendanceIncrease" },
      {
        label: "पोषण आरोग्य सुधारणा आहे का?",
        key: "nutritionHealthImprovement",
      },
      { label: "वजन-उंची वाढ आहे का?", key: "weightHeightIncrease" },
      { label: "कुपोषण कमी झाले का?", key: "malnutritionReduction" },
      { label: "जंक फूड प्रतिबंध आहे का?", key: "junkFoodPrevention" },
      { label: "एकता बंधन आहे का?", key: "unityBonding" },
      { label: "सादर करण्याची तारीख", key: "submissionDate" },
    ];

    const excelData = [];
    schoolData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        const value =
          key.includes(".") || key.includes("[")
            ? eval(`record.${key.replace(/\[(\w+)\]/g, "['$1']")}`) || ""
            : record[key] || "";
        if (index === 0) excelData.push([label, value]);
        else excelData[fieldIndex].push(value);
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    fieldMappings.forEach((field, index) => {
      const cellRef = `A${index + 1}`;
      if (ws[cellRef])
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

  
  const filterAndPaginate = (data, search, page) => {
    const filtered = data.filter(
      (item) =>
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = sortData(filtered, sortConfig.field, sortConfig.direction);
    return sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  const chartData = {
    labels: ["Active ROs", "Active Users", "Inactive ROs", "Registered Users"],
    datasets: [
      {
        data: [
          activeResearchOfficers.length,
          allActiveUsers.length,
          inactiveResearchOfficers.length,
          userData.length,
        ],
        backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107"],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Statistics" },
    },
    layout: { padding: 10 },
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ padding: "10px 20px", borderBottom: "1px solid #ddd" }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src={MidDayMealLogo}
              alt="Mid Day Meal Logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <a
              className="navbar-brand text-white ms-2"
              href="/admin_dashboard"
              style={{ fontSize: "24px" }}
            >
              Admin
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

          <div className="d-flex align-items-center ms-auto">
            <form className="d-flex align-items-center me-3">
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
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body" style={{ height: "300px" }}>
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body d-flex justify-content-around text-center">
              <div>
                Total Active Research Officers:{" "}
                <strong>{activeResearchOfficers.length}</strong>
              </div>
              <div>
                Total Active Users: <strong>{allActiveUsers.length}</strong>
              </div>
              <div>
                Inactive Research Officers:{" "}
                <strong>{inactiveResearchOfficers.length}</strong>
              </div>
              <div>
                Total Registered Users: <strong>{userData.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() =>
                  setIsResearchOfficersOpen(!isResearchOfficersOpen)
                }
                style={{ cursor: "pointer" }}
              >
                Active Research Officers {isResearchOfficersOpen ? "▼" : "▲"}
              </h5>
              {isResearchOfficersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={researchOfficerSearch}
                      onChange={(e) => setResearchOfficerSearch(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() =>
                          downloadExcel(
                            activeResearchOfficers,
                            "active_research_officers",
                            "Active Research Officers"
                          )
                        }
                      >
                        Export to Excel
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() =>
                          setResearchOfficerPage((prev) =>
                            Math.max(prev - 1, 1)
                          )
                        }
                        disabled={researchOfficerPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {researchOfficerPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() =>
                          setResearchOfficerPage((prev) => prev + 1)
                        }
                        disabled={
                          researchOfficerPage * itemsPerPage >=
                          activeResearchOfficers.length
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("status")}>Status</th>
                            <th onClick={() => handleSort("email")}>
                              Email{" "}
                              {sortConfig.field === "email" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("firstName")}>
                              First Name{" "}
                              {sortConfig.field === "firstName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastName")}>
                              Last Name{" "}
                              {sortConfig.field === "lastName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastActive")}>
                              Last Active{" "}
                              {sortConfig.field === "lastActive" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(
                            activeResearchOfficers,
                            researchOfficerSearch,
                            researchOfficerPage
                          ).length > 0 ? (
                            filterAndPaginate(
                              activeResearchOfficers,
                              researchOfficerSearch,
                              researchOfficerPage
                            ).map((user, index) => (
                              <tr key={user.id}>
                                <td>
                                  {(researchOfficerPage - 1) * itemsPerPage +
                                    index +
                                    1}
                                </td>
                                <td>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor:
                                        new Date(user.lastActive) >
                                          new Date(Date.now() - 5 * 60 * 1000)
                                          ? "green"
                                          : "red",
                                    }}
                                  />
                                </td>
                                <td
                                  data-tooltip-id="tooltip"
                                  data-tooltip-content={`Last Login: ${user.lastLogin
                                    ? new Date(
                                      user.lastLogin
                                    ).toLocaleString()
                                    : "Never"
                                    }`}
                                >
                                  {user.email || "N/A"}
                                </td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>
                                  {new Date(user.lastActive).toLocaleString() ||
                                    "N/A"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No Research Officers currently logged in
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() => setIsActiveUsersOpen(!isActiveUsersOpen)}
                style={{ cursor: "pointer" }}
              >
                All Active Users {isActiveUsersOpen ? "▼" : "▲"}
              </h5>
              {isActiveUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={activeUsersSearch}
                      onChange={(e) => setActiveUsersSearch(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() =>
                          downloadExcel(
                            allActiveUsers,
                            "all_active_users",
                            "All Active Users"
                          )
                        }
                      >
                        Export to Excel
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() =>
                          setActiveUsersPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={activeUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {activeUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setActiveUsersPage((prev) => prev + 1)}
                        disabled={
                          activeUsersPage * itemsPerPage >=
                          allActiveUsers.length
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("status")}>Status</th>
                            <th onClick={() => handleSort("email")}>
                              Email{" "}
                              {sortConfig.field === "email" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("firstName")}>
                              First Name{" "}
                              {sortConfig.field === "firstName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastName")}>
                              Last Name{" "}
                              {sortConfig.field === "lastName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("role")}>
                              Role{" "}
                              {sortConfig.field === "role" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastActive")}>
                              Last Active{" "}
                              {sortConfig.field === "lastActive" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(
                            allActiveUsers,
                            activeUsersSearch,
                            activeUsersPage
                          ).length > 0 ? (
                            filterAndPaginate(
                              allActiveUsers,
                              activeUsersSearch,
                              activeUsersPage
                            ).map((user, index) => (
                              <tr key={user.id}>
                                <td>
                                  {(activeUsersPage - 1) * itemsPerPage +
                                    index +
                                    1}
                                </td>
                                <td>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor:
                                        new Date(user.lastActive) >
                                          new Date(Date.now() - 5 * 60 * 1000)
                                          ? "green"
                                          : "red",
                                    }}
                                  />
                                </td>
                                <td
                                  data-tooltip-id="tooltip"
                                  data-tooltip-content={`Last Login: ${user.lastLogin
                                    ? new Date(
                                      user.lastLogin
                                    ).toLocaleString()
                                    : "Never"
                                    }`}
                                >
                                  {user.email || "N/A"}
                                </td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{user.role || "N/A"}</td>
                                <td>
                                  {new Date(user.lastActive).toLocaleString() ||
                                    "N/A"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No users currently logged in
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() => setIsInactiveUsersOpen(!isInactiveUsersOpen)}
                style={{ cursor: "pointer" }}
              >
                Inactive Research Officers {isInactiveUsersOpen ? "▼" : "▲"}
              </h5>
              {isInactiveUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={inactiveUsersSearch}
                      onChange={(e) => setInactiveUsersSearch(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() =>
                          downloadExcel(
                            inactiveResearchOfficers,
                            "inactive_research_officers",
                            "Inactive Research Officers"
                          )
                        }
                      >
                        Export to Excel
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() =>
                          setInactiveUsersPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={inactiveUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {inactiveUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setInactiveUsersPage((prev) => prev + 1)}
                        disabled={
                          inactiveUsersPage * itemsPerPage >=
                          inactiveResearchOfficers.length
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("email")}>
                              Email{" "}
                              {sortConfig.field === "email" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("firstName")}>
                              First Name{" "}
                              {sortConfig.field === "firstName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastName")}>
                              Last Name{" "}
                              {sortConfig.field === "lastName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastLogin")}>
                              Last Login{" "}
                              {sortConfig.field === "lastLogin" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(
                            inactiveResearchOfficers,
                            inactiveUsersSearch,
                            inactiveUsersPage
                          ).length > 0 ? (
                            filterAndPaginate(
                              inactiveResearchOfficers,
                              inactiveUsersSearch,
                              inactiveUsersPage
                            ).map((user, index) => (
                              <tr key={user.id}>
                                <td>
                                  {(inactiveUsersPage - 1) * itemsPerPage +
                                    index +
                                    1}
                                </td>
                                <td
                                  data-tooltip-id="tooltip"
                                  data-tooltip-content={`Last Login: ${user.lastLogin
                                    ? new Date(
                                      user.lastLogin
                                    ).toLocaleString()
                                    : "Never"
                                    }`}
                                >
                                  {user.email || "N/A"}
                                </td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>
                                  {user.lastLogin
                                    ? new Date(user.lastLogin).toLocaleString()
                                    : "Never"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveUser(user.id)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No inactive Research Officers
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5
                className="card-title"
                onClick={() => setIsRegisteredUsersOpen(!isRegisteredUsersOpen)}
                style={{ cursor: "pointer" }}
              >
                All Registered Users {isRegisteredUsersOpen ? "▼" : "▲"}
              </h5>
              {isRegisteredUsersOpen && (
                <>
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search by email or name..."
                      value={registeredUsersSearch}
                      onChange={(e) => setRegisteredUsersSearch(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() =>
                          downloadExcel(
                            userData,
                            "all_registered_users",
                            "All Registered Users"
                          )
                        }
                      >
                        Export to Excel
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() =>
                          setRegisteredUsersPage((prev) =>
                            Math.max(prev - 1, 1)
                          )
                        }
                        disabled={registeredUsersPage === 1}
                      >
                        Previous
                      </button>
                      <span>Page {registeredUsersPage}</span>
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() =>
                          setRegisteredUsersPage((prev) => prev + 1)
                        }
                        disabled={
                          registeredUsersPage * itemsPerPage >= userData.length
                        }
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <table className="table table-striped text-center">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort("#")}>#</th>
                            <th onClick={() => handleSort("email")}>
                              Email{" "}
                              {sortConfig.field === "email" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("firstName")}>
                              First Name{" "}
                              {sortConfig.field === "firstName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("lastName")}>
                              Last Name{" "}
                              {sortConfig.field === "lastName" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => handleSort("role")}>
                              Role{" "}
                              {sortConfig.field === "role" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterAndPaginate(
                            userData,
                            registeredUsersSearch,
                            registeredUsersPage
                          ).length > 0 ? (
                            filterAndPaginate(
                              userData,
                              registeredUsersSearch,
                              registeredUsersPage
                            ).map((user, index) => (
                              <tr key={user.id}>
                                <td>
                                  {(registeredUsersPage - 1) * itemsPerPage +
                                    index +
                                    1}
                                </td>
                                <td
                                  data-tooltip-id="tooltip"
                                  data-tooltip-content={`Last Login: ${user.lastLogin
                                    ? new Date(
                                      user.lastLogin
                                    ).toLocaleString()
                                    : "Never"
                                    }`}
                                >
                                  {user.email || "N/A"}
                                </td>
                                <td>{user.firstName || "N/A"}</td>
                                <td>{user.lastName || "N/A"}</td>
                                <td>{user.role || "N/A"}</td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveUser(user.id)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11 col-md-12 mb-4">
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5 className="card-title">Parent Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={addParentEntry}
                >
                  Add Entry
                </button>
                <button
                  className="btn btn-outline-success px-4"
                  onClick={downloadParentExcel}
                >
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (

                  <table className="table table-striped text-center">
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
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
                    <tbody style={{ overflowY: 'auto' }}>
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
                              <div className="d-flex justify-content-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateParentForm(parent.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm px-3 py-1"
                                  onClick={() => handleParentDelete(parent.id)}
                                >
                                  Delete
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
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5 className="card-title">School Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={addSchoolEntry}
                >
                  Add Entry
                </button>
                <button
                  className="btn btn-outline-success px-4"
                  onClick={downloadSchoolExcel}
                >
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive overflow-x-auto">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                      <tr>
                        {/* 1 */}<th>#</th>
                        {/* 2 */}<th>जिल्हा</th>
                        {/* 3 */}<th>तालुका</th>
                        {/* 4 */}<th>शाळेचे नाव</th>
                        {/* 5 */}<th>तपासणी तारीख</th>
                        {/* 6 */}<th>तपासणी वेळ</th>
                        {/* 7 */}<th>तपासणी करणाऱ्याचे नाव</th>
                        {/* 8 */}<th>शाळेचे पूर्ण नाव</th>
                        {/* 9 */}<th>मुख्याध्यापकाचे नाव</th>
                        {/* 10 */}<th>मुख्याध्यापकाचा फोन</th>
                        {/* 11 */}<th>मुख्याध्यापकाचा पत्ता</th>
                        {/* 12 */}<th>सहाय्यक शिक्षकाचे नाव</th>
                        {/* 13 */}<th>सहाय्यक शिक्षकाचा फोन</th>
                        {/* 14 */}<th>UDISE कोड</th>
                        {/* 15 */}<th>पुरुष शिक्षक</th>
                        {/* 16 */}<th>महिला शिक्षक</th>
                        {/* 17 */}<th>एकूण शिक्षक</th>
                        {/* 18 */}<th>एकूण मुले</th>
                        {/* 19 */}<th>एकूण मुली</th>
                        {/* 20 */}<th>एकूण student</th>
                        {/* 21 */}<th>लाभार्थी इयत्ता १-४ मुले</th>
                        {/* 22 */}<th>लाभार्थी इयत्ता १-४ मुली</th>
                        {/* 23 */}<th>लाभार्थी इयत्ता १-४ एकूण</th>
                        {/* 24 */}<th>लाभार्थी इयत्ता ५-७ मुले</th>
                        {/* 25 */}<th>लाभार्थी इयत्ता ५-७ मुली</th>
                        {/* 26 */}<th>लाभार्थी इयत्ता ५-७ एकूण</th>
                        {/* 27 */}<th>लाभार्थी इयत्ता ८-१० मुले</th>
                        {/* 28 */}<th>लाभार्थी इयत्ता ८-१० मुली</th>
                        {/* 29 */}<th>लाभार्थी इयत्ता ८-१० एकूण</th>
                        {/* 30 */}<th>मध्यान्ह भोजन फलक आहे का?</th>
                        {/* 31 */}<th>मध्यान्ह भोजन मेनू आहे का?</th>
                        {/* 32 */}<th>व्यवस्थापन मंडळ आहे का?</th>
                        {/* 33 */}<th>मुख्याध्यापक संपर्क आहे का?</th>
                        {/* 34 */}<th>अधिकारी संपर्क आहे का?</th>
                        {/* 35 */}<th>तक्रार पेटी आहे का?</th>
                        {/* 36 */}<th>आपत्कालीन क्रमांक आहे का?</th>
                        {/* 37 */}<th>स्वयंपाक शेड आहे का?</th>
                        {/* 38 */}<th>प्रथमोपचार पेटी आहे का?</th>
                        {/* 39 */}<th>पाण्याचा स्रोत आहे का?</th>
                        {/* 40 */}<th>पाण्याचा स्रोत प्रकार</th>
                        {/* 41 */}<th>नियमित पाणीपुरवठा आहे का?</th>
                        {/* 42 */}<th>अग्निशामक यंत्र आहे का?</th>
                        {/* 43 */}<th>अग्निशामक तपासणी आहे का?</th>
                        {/* 44 */}<th>अग्निशामक पुनर्भरण आहे का?</th>
                        {/* 45 */}<th>अग्निशामक तपशील</th>
                        {/* 46 */}<th>स्वयंपाक बाग आहे का?</th>
                        {/* 47 */}<th>बागेची उत्पादने वापरली का?</th>
                        {/* 48 */}<th>स्वयंपाक बाग तपशील</th>
                        {/* 49 */}<th>नाविन्यपूर्ण उपक्रम</th>
                        {/* 50 */}<th>आहार समिती आहे का?</th>
                        {/* 51 */}<th>समिती फलक आहे का?</th>
                        {/* 52 */}<th>स्वयंपाक एजन्सी</th>
                        {/* 53 */}<th>कराराची प्रत आहे का?</th>
                        {/* 54 */}<th>स्वयंपाकी प्रशिक्षण आहे का?</th>
                        {/* 55 */}<th>स्वयंपाकी सहाय्यक संख्या</th>
                        {/* 56 */}<th>शाळेत स्वयंपाक होतो का?</th>
                        {/* 57 */}<th>इंधन प्रकार</th>
                        {/* 58 */}<th>वजन काटा आहे का?</th>
                        {/* 59 */}<th>तांदूळ वजन केले का?</th>
                        {/* 60 */}<th>साठवण युनिट्स आहेत का?</th>
                        {/* 61 */}<th>ताटे आहेत का?</th>
                        {/* 62 */}<th>वितरणादरम्यान शिक्षक उपस्थित आहे का?</th>
                        {/* 63 */}<th>MDM पोर्टल अद्ययावत आहे का?</th>
                        {/* 64 */}<th>पूरक आहार आहे का?</th>
                        {/* 65 */}<th>पूरक आहार तपशील</th>
                        {/* 66 */}<th>नमुना साठवला आहे का?</th>
                        {/* 67 */}<th>साफसफाई झाली का?</th>
                        {/* 68 */}<th>मुख्याध्यापकाचे अन्न मत</th>
                        {/* 69 */}<th>तृतीय पक्ष समर्थन आहे का?</th>
                        {/* 70 */}<th>मूलभूत सुविधा उपलब्ध आहेत का?</th>
                        {/* 71 */}<th>मूलभूत सुविधा तपशील</th>
                        {/* 72 */}<th>जेवणाची व्यवस्था</th>
                        {/* 73 */}<th>सरकारी रेसिपी पाळली का?</th>
                        {/* 74 */}<th>अंडी-केळी नियमित आहेत का?</th>
                        {/* 75 */}<th>अंकुरित धान्य वापरले का?</th>
                        {/* 76 */}<th>मासिक प्रयोगशाळा चाचणी आहे का?</th>
                        {/* 77 */}<th>वितरणापूर्वी चव चाचणी आहे का?</th>
                        {/* 78 */}<th>SMC पालक भेटी आहेत का?</th>
                        {/* 79 */}<th>चव नोंदवही आहे का?</th>
                        {/* 80 */}<th>दैनंदिन चव नोंदी आहेत का?</th>
                        {/* 81 */}<th>साठा नोंदवहीशी जुळतो का?</th>
                        {/* 82 */}<th>साठा विसंगती तपशील</th>
                        {/* 83 */}<th>रेसिपी प्रदर्शित आहेत का?</th>
                        {/* 84 */}<th>निरीक्षण समिती बैठका आहेत का?</th>
                        {/* 85 */}<th>२०२४-२५ बैठक संख्या</th>
                        {/* 86 */}<th>रिकाम्या पोत्यांचे परतावा झाले का?</th>
                        {/* 87 */}<th>पोत्यांचे हस्तांतरण नोंदवले का?</th>
                        {/* 88 */}<th>पोत्यांचे हस्तांतरण संख्या</th>
                        {/* 89 */}<th>सध्याचे अन्न साहित्य</th>
                        {/* 90 */}<th>स्नेह तिथी कार्यक्रम आहे का?</th>
                        {/* 91 */}<th>स्नेह तिथी कार्यक्रम तपशील</th>
                        {/* 92 */}<th>भ्रष्टाचार तपशील</th>
                        {/* 93 */}<th>भ्रष्टाचार कारवाई तपशील</th>
                        {/* 94 */}<th>फील्ड अधिकारी भेटी आहेत का?</th>
                        {/* 95 */}<th>फील्ड अधिकारी भेट तपशील</th>
                        {/* 96 */}<th>योजनेच्या सूचना</th>
                        {/* 97 */}<th>आरोग्य तपासणी झाली का?</th>
                        {/* 98 */}<th>आरोग्य तपासणी विद्यार्थी संख्या</th>
                        {/* 99 */}<th>BMI नोंदवले आहे का?</th>
                        {/* 100 */}<th>वजन-उंची मोजली का?</th>
                        {/* 101 */}<th>स्वयंपाकी आरोग्य तपासणी आहे का?</th>
                        {/* 102 */}<th>SMC ठराव आहे का?</th>
                        {/* 103 */}<th>आरोग्य प्रमाणपत्र आहे का?</th>
                        {/* 104 */}<th>सहाय्यक १ नाव</th>
                        {/* 105 */}<th>सहाय्यक २ नाव</th>
                        {/* 106 */}<th>लाभार्थी २०२२-२३ मुले</th>
                        {/* 107 */}<th>लाभार्थी २०२२-२३ मुली</th>
                        {/* 108 */}<th>लाभार्थी २०२२-२३ एकूण</th>
                        {/* 109 */}<th>लाभार्थी २०२३-२४ मुले</th>
                        {/* 110 */}<th>लाभार्थी २०२३-२४ मुली</th>
                        {/* 111 */}<th>लाभार्थी २०२३-२४ एकूण</th>
                        {/* 112 */}<th>लाभार्थी २०२४-२५ मुले</th>
                        {/* 113 */}<th>लाभार्थी २०२४-२५ मुली</th>
                        {/* 114 */}<th>लाभार्थी २०२४-२५ एकूण</th>
                        {/* 115 */}<th>अनुदान प्राप्त २०२२-२३</th>
                        {/* 116 */}<th>अनुदान प्राप्त २०२३-२४</th>
                        {/* 117 */}<th>अनुदान प्राप्त २०२४-२५</th>
                        {/* 118 */}<th>अनुदान खर्च २०२२-२३</th>
                        {/* 119 */}<th>अनुदान खर्च २०२३-२४</th>
                        {/* 120 */}<th>अनुदान खर्च २०२४-२५</th>
                        {/* 121 */}<th>अनुदान शिल्लक २०२२-२३</th>
                        {/* 122 */}<th>अनुदान शिल्लक २०२३-२४</th>
                        {/* 123 */}<th>अनुदान शिल्लक २०२४-२५</th>
                        {/* 124 */}<th>स्वयंपाकघर आहे का?</th>
                        {/* 125 */}<th>साठवण खोली आहे का?</th>
                        {/* 126 */}<th>जेवण कक्ष आहे का?</th>
                        {/* 127 */}<th>भांडी आहेत का?</th>
                        {/* 128 */}<th>धान्य सुरक्षित आहे का?</th>
                        {/* 129 */}<th>हात धुण्याचा साबण आहे का?</th>
                        {/* 130 */}<th>स्वतंत्र शौचालये आहेत का?</th>
                        {/* 131 */}<th>CCTV आहे का?</th>
                        {/* 132 */}<th>स्वयंपाकघर स्वच्छता</th>
                        {/* 133 */}<th>जेवण कक्ष स्वच्छता</th>
                        {/* 134 */}<th>साठवण स्वच्छता</th>
                        {/* 135 */}<th>सर्व्हिंग क्षेत्र स्वच्छता</th>
                        {/* 136 */}<th>भांडीची स्थिती</th>
                        {/* 137 */}<th>पाणीपुरवठा</th>
                        {/* 138 */}<th>हात धुण्याची सुविधा</th>
                        {/* 139 */}<th>शौचालय स्वच्छता</th>
                        {/* 140 */}<th>रोख नोंदवही अद्ययावत आहे का?</th>
                        {/* 141 */}<th>साठा नोंदवही अद्ययावत आहे का?</th>
                        {/* 142 */}<th>उपस्थिती नोंदवही अद्ययावत आहे का?</th>
                        {/* 143 */}<th>बँक खाते अद्ययावत आहे का?</th>
                        {/* 144 */}<th>मानधन नोंदवही अद्ययावत आहे का?</th>
                        {/* 145 */}<th>चव नोंदवही अद्ययावत आहे का?</th>
                        {/* 146 */}<th>स्नेह तिथी नोंदवही अद्ययावत आहे का?</th>
                        {/* 147 */}<th>नावनोंदणी सुधारणा आहे का?</th>
                        {/* 148 */}<th>उपस्थिती वाढ आहे का?</th>
                        {/* 149 */}<th>पोषण आरोग्य सुधारणा आहे का?</th>
                        {/* 150 */}<th>वजन-उंची वाढ आहे का?</th>
                        {/* 151 */}<th>कुपोषण कमी झाले का?</th>
                        {/* 152 */}<th>जंक फूड प्रतिबंध आहे का?</th>
                        {/* 153 */}<th>एकता बंधन आहे का?</th>
                        {/* 154 */}<th>सादर करण्याची तारीख</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ overflowY: 'auto' }}>
                      {schoolData.length > 0 ? (
                        schoolData.map((school, index) => (
                          <tr key={school.id}>

                            {/* 1 */}<td>{index + 1}</td>
                            {/* 2 */}<td>{displayValue(school.district)}</td>
                            {/* 3 */}<td>{displayValue(school.taluka)}</td>
                            {/* 4 */}<td>{displayValue(school.schoolName)}</td>
                            {/* 5 */}<td>{displayValue(school.inspectionDate)}</td>
                            {/* 6 */}<td>{displayValue(school.inspectionTime)}</td>
                            {/* 7 */}<td>{displayValue(school.inspectorName)}</td>
                            {/* 8 */}<td>{displayValue(school.schoolFullName)}</td>
                            {/* 9 */}<td>{displayValue(school.headmasterName)}</td>
                            {/* 10 */}<td>{displayValue(school.headmasterPhone)}</td>
                            {/* 11 */}<td>{displayValue(school.headmasterAddress)}</td>
                            {/* 12 */}<td>{displayValue(school.assistantTeacherName)}</td>
                            {/* 13 */}<td>{displayValue(school.assistantTeacherPhone)}</td>
                            {/* 14 */}<td>{displayValue(school.udiseCode)}</td>
                            {/* 15 */}<td>{displayValue(school.teacherMale)}</td>
                            {/* 16 */}<td>{displayValue(school.teacherFemale)}</td>
                            {/* 17 */}<td>{displayValue(school.totalTeachers)}</td>
                            {/* 18 */}<td>{displayValue(school.totalBoys)}</td>
                            {/* 19 */}<td>{displayValue(school.totalGirls)}</td>
                            {/* 20 */}<td>{displayValue(school.totalStudents)}</td>
                            {/* 21 */}<td>{displayValue(school.gradeStudents?.grade1to4?.female)}</td>
                            {/* 22 */}<td>{displayValue(school.gradeStudents?.grade1to4?.male)}</td>
                            {/* 23 */}<td>{displayValue(school.gradeStudents?.grade1to4?.total)}</td>
                            {/* 24 */}<td>{displayValue(school.gradeStudents?.grade5to7?.female)}</td>
                            {/* 25 */}<td>{displayValue(school.gradeStudents?.grade5to7?.male)}</td>
                            {/* 26 */}<td>{displayValue(school.gradeStudents?.grade5to7?.total)}</td>
                            {/* 27 */}<td>{displayValue(school.gradeStudents?.grade8to10?.female)}</td>
                            {/* 28 */}<td>{displayValue(school.gradeStudents?.grade8to10?.male)}</td>
                            {/* 29 */}<td>{displayValue(school.gradeStudents?.grade8to10?.total)}</td>
                            {/* 30 */}<td>{displayValue(school.hasMiddayMealBoard)}</td>
                            {/* 31 */}<td>{displayValue(school.hasMiddayMealMenu)}</td>
                            {/* 32 */}<td>{displayValue(school.hasManagementBoard)}</td>
                            {/* 33 */}<td>{displayValue(school.hasPrincipalContact)}</td>
                            {/* 34 */}<td>{displayValue(school.hasOfficerContact)}</td>
                            {/* 35 */}<td>{displayValue(school.hasComplaintBox)}</td>
                            {/* 36 */}<td>{displayValue(school.hasEmergencyNumber)}</td>
                            {/* 37 */}<td>{displayValue(school.hasKitchenShed)}</td>
                            {/* 38 */}<td>{displayValue(school.hasFirstAidBox)}</td>
                            {/* 39 */}<td>{displayValue(school.hasWaterSource)}</td>
                            {/* 40 */}<td>{displayValue(school.waterSourceType)}</td>
                            {/* 41 */}<td>{displayValue(school.hasRegularWaterSupply)}</td>
                            {/* 42 */}<td>{displayValue(school.hasFireExtinguisher)}</td>
                            {/* 43 */}<td>{displayValue(school.hasFireExtinguisherCheck)}</td>
                            {/* 44 */}<td>{displayValue(school.hasFireExtinguisherRefill)}</td>
                            {/* 45 */}<td>{displayValue(school.fireExtinguisherDetails)}</td>
                            {/* 46 */}<td>{displayValue(school.hasKitchenGarden)}</td>
                            {/* 47 */}<td>{displayValue(school.usesGardenProduce)}</td>
                            {/* 48 */}<td>{displayValue(school.kitchenGardenDetails)}</td>
                            {/* 49 */}<td>{displayValue(school.innovativeInitiatives)}</td>
                            {/* 50 */}<td>{displayValue(school.hasDietCommittee)}</td>
                            {/* 51 */}<td>{displayValue(school.hasCommitteeBoard)}</td>
                            {/* 52 */}<td>{displayValue(school.cookingAgency)}</td>
                            {/* 53 */}<td>{displayValue(school.hasAgreementCopy)}</td>
                            {/* 54 */}<td>{displayValue(school.hasCookTraining)}</td>
                            {/* 55 */}<td>{displayValue(school.cookHelperCount)}</td>
                            {/* 56 */}<td>{displayValue(school.isCookedAtSchool)}</td>
                            {/* 57 */}<td>{displayValue(school.fuelType)}</td>
                            {/* 58 */}<td>{displayValue(school.hasWeighingScale)}</td>
                            {/* 59 */}<td>{displayValue(school.hasRiceWeighed)}</td>
                            {/* 60 */}<td>{displayValue(school.hasStorageUnits)}</td>
                            {/* 61 */}<td>{displayValue(school.hasPlates)}</td>
                            {/* 62 */}<td>{displayValue(school.teacherPresentDuringDistribution)}</td>
                            {/* 63 */}<td>{displayValue(school.mdmPortalUpdated)}</td>
                            {/* 64 */}<td>{displayValue(school.supplementaryDiet)}</td>
                            {/* 65 */}<td>{displayValue(school.supplementaryDietDetails)}</td>
                            {/* 66 */}<td>{displayValue(school.sampleStored)}</td>
                            {/* 67 */}<td>{displayValue(school.cleaningDone)}</td>
                            {/* 68 */}<td>{displayValue(school.headmasterFoodOpinion)}</td>
                            {/* 69 */}<td>{displayValue(school.thirdPartySupport)}</td>
                            {/* 70 */}<td>{displayValue(school.basicFacilitiesAvailable)}</td>
                            {/* 71 */}<td>{displayValue(school.basicFacilitiesDetails)}</td>
                            {/* 72 */}<td>{displayValue(school.diningArrangement)}</td>
                            {/* 73 */}<td>{displayValue(school.followsGovtRecipe)}</td>
                            {/* 74 */}<td>{displayValue(school.eggsBananasRegular)}</td>
                            {/* 75 */}<td>{displayValue(school.usesSproutedGrains)}</td>
                            {/* 76 */}<td>{displayValue(school.labTestMonthly)}</td>
                            {/* 77 */}<td>{displayValue(school.tasteTestBeforeDistribution)}</td>
                            {/* 78 */}<td>{displayValue(school.smcParentVisits)}</td>
                            {/* 79 */}<td>{displayValue(school.hasTasteRegister)}</td>
                            {/* 80 */}<td>{displayValue(school.dailyTasteEntries)}</td>
                            {/* 81 */}<td>{displayValue(school.stockMatchesRegister)}</td>
                            {/* 82 */}<td>{displayValue(school.stockDiscrepancyDetails)}</td>
                            {/* 83 */}<td>{displayValue(school.recipesDisplayed)}</td>
                            {/* 84 */}<td>{displayValue(school.monitoringCommitteeMeetings)}</td>
                            {/* 85 */}<td>{displayValue(school.meetingCount2024_25)}</td>
                            {/* 86 */}<td>{displayValue(school.emptySacksReturned)}</td>
                            {/* 87 */}<td>{displayValue(school.sackTransferRecorded)}</td>
                            {/* 88 */}<td>{displayValue(school.sackTransferCount)}</td>
                            {/* 89 */}<td>{displayValue(school.currentFoodMaterials)}</td>
                            {/* 90 */}<td>{displayValue(school.snehTithiProgram)}</td>
                            {/* 91 */}<td>{displayValue(school.snehTithiProgramDetails)}</td>
                            {/* 92 */}<td>{displayValue(school.corruptionDetails)}</td>
                            {/* 93 */}<td>{displayValue(school.corruptionActionDetails)}</td>
                            {/* 94 */}<td>{displayValue(school.fieldOfficerVisits)}</td>
                            {/* 95 */}<td>{displayValue(school.fieldOfficerVisitDetails)}</td>
                            {/* 96 */}<td>{displayValue(school.schemeSuggestions)}</td>
                            {/* 97 */}<td>{displayValue(school.healthCheckupDone)}</td>
                            {/* 98 */}<td>{displayValue(school.healthCheckupStudentCount)}</td>
                            {/* 99 */}<td>{displayValue(school.bmiRecorded)}</td>
                            {/* 100 */}<td>{displayValue(school.weightHeightMeasured)}</td>
                            {/* 101 */}<td>{displayValue(school.cookHealthCheck)}</td>
                            {/* 102 */}<td>{displayValue(school.hasSmcResolution)}</td>
                            {/* 103 */}<td>{displayValue(school.hasHealthCertificate)}</td>
                            {/* 104 */}<td>{displayValue(school.helper1Name)}</td>
                            {/* 105 */}<td>{displayValue(school.helper2Name)}</td>
                            {/* 106 */}<td>{displayValue(school.beneficiaries?.["2022-23"]?.boys)}</td>
                            {/* 107 */}<td>{displayValue(school.beneficiaries?.["2022-23"]?.girls)}</td>
                            {/* 108 */}<td>{displayValue(school.beneficiaries?.["2022-23"]?.total)}</td>
                            {/* 109 */}<td>{displayValue(school.beneficiaries?.["2023-24"]?.boys)}</td>
                            {/* 110 */}<td>{displayValue(school.beneficiaries?.["2023-24"]?.girls)}</td>
                            {/* 111 */}<td>{displayValue(school.beneficiaries?.["2023-24"]?.total)}</td>
                            {/* 112 */}<td>{displayValue(school.beneficiaries?.["2024-25"]?.boys)}</td>
                            {/* 113 */}<td>{displayValue(school.beneficiaries?.["2024-25"]?.girls)}</td>
                            {/* 114 */}<td>{displayValue(school.beneficiaries?.["2024-25"]?.total)}</td>
                            {/* 115 */}<td>{displayValue(school.grantReceived?.["2022-23"])}</td>
                            {/* 116 */}<td>{displayValue(school.grantReceived?.["2023-24"])}</td>
                            {/* 117 */}<td>{displayValue(school.grantReceived?.["2024-25"])}</td>
                            {/* 118 */}<td>{displayValue(school.grantExpenditure?.["2022-23"])}</td>
                            {/* 119 */}<td>{displayValue(school.grantExpenditure?.["2023-24"])}</td>
                            {/* 120 */}<td>{displayValue(school.grantExpenditure?.["2024-25"])}</td>
                            {/* 121 */}<td>{displayValue(school.grantBalance?.["2022-23"])}</td>
                            {/* 122 */}<td>{displayValue(school.grantBalance?.["2023-24"])}</td>
                            {/* 123 */}<td>{displayValue(school.grantBalance?.["2024-25"])}</td>
                            {/* 124 */}<td>{displayValue(school.basicFacilities?.hasKitchen)}</td>
                            {/* 125 */}<td>{displayValue(school.basicFacilities?.hasStorageRoom)}</td>
                            {/* 126 */}<td>{displayValue(school.basicFacilities?.hasDiningHall)}</td>
                            {/* 127 */}<td>{displayValue(school.basicFacilities?.hasUtensils)}</td>
                            {/* 128 */}<td>{displayValue(school.basicFacilities?.hasGrainSafety)}</td>
                            {/* 129 */}<td>{displayValue(school.basicFacilities?.hasHandwashSoap)}</td>
                            {/* 130 */}<td>{displayValue(school.basicFacilities?.hasSeparateToilets)}</td>
                            {/* 131 */}<td>{displayValue(school.basicFacilities?.hasCctv)}</td>
                            {/* 132 */}<td>{displayValue(school.quality?.kitchenCleanliness)}</td>
                            {/* 133 */}<td>{displayValue(school.quality?.diningHallCleanliness)}</td>
                            {/* 134 */}<td>{displayValue(school.quality?.storageCleanliness)}</td>
                            {/* 135 */}<td>{displayValue(school.quality?.servingAreaCleanliness)}</td>
                            {/* 136 */}<td>{displayValue(school.quality?.utensilCondition)}</td>
                            {/* 137 */}<td>{displayValue(school.quality?.waterSupply)}</td>
                            {/* 138 */}<td>{displayValue(school.quality?.handwashFacility)}</td>
                            {/* 139 */}<td>{displayValue(school.quality?.toiletCleanliness)}</td>
                            {/* 140 */}<td>{displayValue(school.repairing?.cashBookUpdated)}</td>
                            {/* 141 */}<td>{displayValue(school.repairing?.stockRegisterUpdated)}</td>
                            {/* 142 */}<td>{displayValue(school.repairing?.attendanceRegisterUpdated)}</td>
                            {/* 143 */}<td>{displayValue(school.repairing?.bankAccountUpdated)}</td>
                            {/* 144 */}<td>{displayValue(school.repairing?.honorariumRegisterUpdated)}</td>
                            {/* 145 */}<td>{displayValue(school.repairing?.tasteRegisterUpdated)}</td>
                            {/* 146 */}<td>{displayValue(school.repairing?.snehTithiRegisterUpdated)}</td>
                            {/* 147 */}<td>{displayValue(school.profitFromScheme?.enrollmentImprovement)}</td>
                            {/* 148 */}<td>{displayValue(school.profitFromScheme?.attendanceIncrease)}</td>
                            {/* 149 */}<td>{displayValue(school.profitFromScheme?.nutritionHealthImprovement)}</td>
                            {/* 150 */}<td>{displayValue(school.profitFromScheme?.weightHeightIncrease)}</td>
                            {/* 151 */}<td>{displayValue(school.profitFromScheme?.malnutritionReduction)}</td>
                            {/* 152 */}<td>{displayValue(school.profitFromScheme?.junkFoodPrevention)}</td>
                            {/* 153 */}<td>{displayValue(school.profitFromScheme?.unityBonding)}</td>
                            {/* 154 */}<td>{displayValue(school.submissionDate)}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() => updateSchoolForm(school.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm px-3 py-1"
                                  onClick={() => handleSchoolDelete(school.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="151" className="text-center">
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
        <div className="card shadow" style={{transform: 'none', transition: 'none' }}>
            <div className="card-body">
              <h5 className="card-title">Observation Feedback Form</h5>
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={addObservationEntry}
                >
                  Add Entry
                </button>
                <button
                  className="btn btn-outline-success px-4"
                  onClick={downloadObservationExcel}
                >
                  Download Sheet
                </button>
              </div>
              <div className="table-responsive">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <table className="table table-striped text-center">
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa', zIndex: 1 }}>
                      <tr>
                        <th>#</th>
                        <th>UDISE No</th>
                        <th>School Name</th>
                        <th>Taluka</th>
                        <th>District</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ overflowY: 'auto' }}>
                      {observeData.length > 0 ? (
                        observeData.map((observe, index) => (
                          <tr key={observe.id}>
                            <td>{index + 1}</td>
                            <td>{observe.schoolUdiseNumber || "N/A"}</td>
                            <td>{observe.schoolName || "N/A"}</td>
                            <td>{observe.taluka || "N/A"}</td>
                            <td>{observe.district || "N/A"}</td>
                            <td>{observe.remarks || "N/A"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="d-flex justify-content-center gap-2">
                                <button
                                  className="btn btn-primary btn-sm px-3 py-1"
                                  onClick={() =>
                                    updateObservationForm(observe.id)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm px-3 py-1"
                                  onClick={() =>
                                    handleObservationDelete(observe.id)
                                  }
                                >
                                  Delete
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

      <Tooltip id="tooltip" place="top" effect="solid" />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AdminDash;
