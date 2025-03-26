import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"; // Added 'doc' import
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Added Bootstrap CSS for styling

function SchoolFormTable() {
  const [schoolData, setSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchSchoolData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "School_Form"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSchoolData(data);
    } catch (error) {
      toast.error("Error fetching school data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const handleSchoolDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "School_Form", id));
      toast.success("School entry deleted successfully!");
      fetchSchoolData();
    } catch (error) {
      toast.error("Error deleting school entry: " + error.message);
    }
  };

  const updateSchoolForm = (id) => navigate(`/update_school_form/${id}`);
  const addSchoolEntry = () => navigate("/school_form");

  const displayValue = (value) => (value != null ? value : "N/A");

  // Helper function to safely access nested properties
  const getNestedValue = (obj, path) => {
    return path.split(/[\.\[\]]/).reduce((acc, part) => {
      if (!part) return acc; // Skip empty parts from splitting
      return acc && acc[part] !== undefined ? acc[part] : "N/A";
    }, obj);
  };

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

  const downloadSchoolExcel = () => {
    if (schoolData.length === 0)
      return toast.warn("No school data available to download!");
    const excelData = [];
    schoolData.forEach((record, index) => {
      fieldMappings.forEach(({ label, key }, fieldIndex) => {
        const value = getNestedValue(record, key);
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

  const downloadSchoolCSV = () => {
    if (schoolData.length === 0)
      return toast.warn("No school data available to download!");
    const csvRows = [];
    const headers = fieldMappings.map((field) => field.label);
    csvRows.push(headers.join(","));

    schoolData.forEach((record) => {
      const values = fieldMappings.map((field) => {
        const value = getNestedValue(record, field.key);
        return `"${value.toString().replace(/"/g, '""')}"`; // Escape quotes
      });
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "school_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = schoolData.filter((school) =>
    (school.schoolName?.toLowerCase().includes(search.toLowerCase()) ||
     school.udiseCode?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">School Feedback Form</h5>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by school name or UDISE code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <button className="btn btn-outline-success me-2" onClick={addSchoolEntry}>
                Add Entry
              </button>
              <button className="btn btn-outline-success me-2" onClick={downloadSchoolExcel}>
                Download Excel
              </button>
              <button className="btn btn-outline-success" onClick={downloadSchoolCSV}>
                Download CSV
              </button>
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <table className="table table-striped text-center">
                <thead style={{ position: "sticky", top: 0, background: "#f8f9fa", zIndex: 1 }}>
                  <tr>
                    <th>#</th>
                    {fieldMappings.map((field, index) => (
                      <th key={index}>{field.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((school, index) => (
                      <tr key={school.id}>
                        <td>{index + 1}</td>
                        {fieldMappings.map((field, idx) => (
                          <td key={idx}>{displayValue(getNestedValue(school, field.key))}</td>
                        ))}
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => updateSchoolForm(school.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleSchoolDelete(school.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={fieldMappings.length + 2} className="text-center">
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
      <ToastContainer />
    </div>
  );
}

export default SchoolFormTable;