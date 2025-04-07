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
    //{label:"प्रदेश", key: "region"},
    { label: "A", key: "district" },
  { label: "B", key: "taluka" },
 // { label: "शाळेचे नाव", key: "schoolName" },
 // { label: "तपासणी तारीख", key: "inspectionDate" },
 // { label: "तपासणी वेळ", key: "inspectionTime" },
  //{ label: "तपासणी करणाऱ्याचे नाव", key: "inspectorName" },
 // { label: "शाळेचे पूर्ण नाव", key: "schoolFullName" },
  //{ label: "मुख्याध्यापकाचे नाव", key: "headmasterName" },
  //{ label: "मुख्याध्यापकाचा फोन", key: "headmasterPhone" },
  //{ label: "मुख्याध्यापकाचा पत्ता", key: "headmasterAddress" },
  //{ label: "सहाय्यक शिक्षकाचे नाव", key: "assistantTeacherName" },
  //{ label: "सहाय्यक शिक्षकाचा फोन", key: "assistantTeacherPhone" },
  { label: "C", key: "schoolUdiseNumber" },
  { label: "D-1", key: "teacherMale" },
  { label: "D-2", key: "teacherFemale" },
  { label: "D-3", key: "totalTeachers" },
  { label: "E-1", key: "totalBoys" },
  { label: "E-2", key: "totalGirls" },
  { label: "E-3", key: "totalStudents" },
  { label: "F-1", key: "gradeStudents.grade1to4.female" },
  { label: "F-2", key: "gradeStudents.grade1to4.male" },
  { label: "F-3", key: "gradeStudents.grade1to4.total" },
  { label: "G-1", key: "gradeStudents.grade5to7.female" },
  { label: "G-2", key: "gradeStudents.grade5to7.male" },
  { label: "G-3", key: "gradeStudents.grade5to7.total" },
  { label: "H-1", key: "gradeStudents.grade8to10.female" },
  { label: "H-2", key: "gradeStudents.grade8to10.male" },
  { label: "H-3", key: "gradeStudents.grade8to10.total" },
  { label: "SP-1", key: "hasMiddayMealBoard" },
  { label: "SP-2", key: "hasMiddayMealMenu" },
  { label: "SP-3", key: "hasManagementBoard" },
  { label: "SP-4", key: "hasPrincipalContact" },
  { label: "SP-5", key: "hasOfficerContact" },
  { label: "SP-6", key: "hasComplaintBox" },
  { label: "SP-7", key: "hasEmergencyNumber" },
  { label: "SP-8", key: "hasKitchenShed" },
  { label: "SP-9", key: "hasFirstAidBox" },
  { label: "SP-10", key: "hasWaterSource" },
  { label: "SP-10.1", key: "waterSourceType" },
  { label: "SP-10.2", key: "hasRegularWaterSupply" },
  { label: "SP-11", key: "hasFireExtinguisher" },
  { label: "SP-11.1", key: "hasFireExtinguisherCheck" },
  { label: "SP-11.2", key: "hasFireExtinguisherRefill" },
 // { label: "अग्निशामक तपशील", key: "fireExtinguisherDetails" },
  { label: "SP-12", key: "hasKitchenGarden" },
  { label: "SP-12.1", key: "usesGardenProduce" },
  //{ label: "स्वयंपाक बाग तपशील", key: "kitchenGardenDetails" },
  { label: "SP-13", key: "innovativeInitiatives" },
  { label: "ND-1", key: "hasDietCommittee" },
  { label: "ND-1.1", key: "hasCommitteeBoard" },
  { label: "ND-2", key: "cookingAgency" },
  { label: "ND-3", key: "hasAgreementCopy" },
  { label: "ND-4", key: "hasCookTraining" },
  { label: "ND-5", key: "cookHelperCount" },
  { label: "ND-6", key: "isCookedAtSchool" },
  { label: "ND-6.1", key: "fuelType" },
  { label: "ND-7", key: "hasWeighingScale" },
  { label: "ND-7.1", key: "hasRiceWeighed" },
  { label: "ND-8", key: "hasStorageUnits" },
  { label: "ND-9", key: "hasPlates" },
  { label: "ND-10", key: "teacherPresentDuringDistribution" },
  { label: "ND-11", key: "mdmPortalUpdated" },
  { label: "ND-12", key: "supplementaryDiet" },
  //{ label: "पूरक आहार तपशील", key: "supplementaryDietDetails" },
  { label: "ND-13", key: "sampleStored" },
  { label: "ND-14", key: "cleaningDone" },
  //{ label: "मुख्याध्यापकाचे अन्न मत", key: "headmasterFoodOpinion" },
  { label: "ND-15", key: "thirdPartySupport" },
  { label: "ND-16", key: "basicFacilitiesAvailable" },
 // { label: "मूलभूत सुविधा तपशील", key: "basicFacilitiesDetails" },
  { label: "ND-17", key: "diningArrangement" },
  { label: "ND-18", key: "followsGovtRecipe" },
  { label: "ND-19", key: "eggsBananasRegular" },
  { label: "ND-20", key: "usesSproutedGrains" },
  { label: "ND-21", key: "labTestMonthly" },
  { label: "ND-22", key: "tasteTestBeforeDistribution" },
  { label: "ND-23", key: "smcParentVisits" },
  { label: "ND-24", key: "hasTasteRegister" },
  { label: "ND-24.1", key: "dailyTasteEntries" },
  { label: "ND-25", key: "stockMatchesRegister" },
  //{ label: "साठा विसंगती तपशील", key: "stockDiscrepancyDetails" },
  { label: "ND-26", key: "recipesDisplayed" },
  { label: "ND-27", key: "monitoringCommitteeMeetings" },
  { label: "ND-27.1", key: "meetingCount2024_25" },
  { label: "ND-28", key: "emptySacksReturned" },
  { label: "ND-28.1", key: "sackTransferRecorded" },
  { label: "ND-28.2", key: "sackTransferCount" },
 // { label: "सध्याचे अन्न साहित्य", key: "currentFoodMaterials" },
  { label: "ND-29", key: "snehTithiProgram" },
 // { label: "स्नेह तिथी कार्यक्रम तपशील", key: "snehTithiProgramDetails" },
 // { label: "भ्रष्टाचार तपशील", key: "corruptionDetails" },
  //{ label: "भ्रष्टाचार कारवाई तपशील", key: "corruptionActionDetails" },
  { label: "ND-30", key: "fieldOfficerVisits" },
 // { label: "फील्ड अधिकारी भेट तपशील", key: "fieldOfficerVisitDetails" },
 // { label: "योजनेच्या सूचना", key: "schemeSuggestions" },
  { label: "HC-1", key: "healthCheckupDone" },
  { label: "HC-1.1", key: "healthCheckupStudentCount" },
  { label: "HC-2", key: "bmiRecorded" },
  { label: "HC-3", key: "weightHeightMeasured" },
  { label: "HC-4", key: "cookHealthCheck" },
  { label: "HC-5", key: "hasSmcResolution" },
  { label: "HC-6", key: "hasHealthCertificate" },
  //{ label: "सहाय्यक १ नाव", key: "helper1Name" },
  //{ label: "सहाय्यक २ नाव", key: "helper2Name" },
  { label: "SB-1", key: "beneficiaries.2022-23.boys" },
  { label: "SB-1.1", key: "beneficiaries.2022-23.girls" },
  { label: "SB-1.3", key: "beneficiaries.2022-23.total" },
  { label: "SB-2", key: "beneficiaries.2023-24.boys" },
  { label: "SB-2.1", key: "beneficiaries.2023-24.girls" },
  { label: "SB-2.2", key: "beneficiaries.2023-24.total" },
  { label: "SB-3", key: "beneficiaries.2024-25.boys" },
  { label: "SB-3.1", key: "beneficiaries.2024-25.girls" },
  { label: "SB-3.2", key: "beneficiaries.2024-25.total" },
  { label: "GA-1", key: "grantReceived.2022-23" },
  { label: "GA-1.1", key: "grantReceived.2023-24" },
  { label: "GA-1.3", key: "grantReceived.2024-25" },
  { label: "GA-2", key: "grantExpenditure.2022-23" },
  { label: "GA-2.1", key: "grantExpenditure.2023-24" },
  { label: "GA-2.2", key: "grantExpenditure.2024-25" },
  { label: "GA-3", key: "grantBalance.2022-23" },
  { label: "GA-3.1", key: "grantBalance.2023-24" },
  { label: "GA-3.2", key: "grantBalance.2024-25" },
  { label: "BS-1", key: "basicFacilities.hasKitchen" },
  { label: "BS-2", key: "basicFacilities.hasStorageRoom" },
  { label: "BS-3", key: "basicFacilities.hasDiningHall" },
  { label: "BS-4", key: "basicFacilities.hasUtensils" },
  { label: "BS-5", key: "basicFacilities.hasGrainSafety" },
  { label: "BS-6", key: "basicFacilities.hasHandwashSoap" },
  { label: "BS-7", key: "basicFacilities.hasSeparateToilets" },
  { label: "BS-8", key: "basicFacilities.hasCctv" },
  { label: "Q1", key: "quality.kitchenCleanliness" },
  { label: "Q2", key: "quality.diningHallCleanliness" },
  { label: "Q3", key: "quality.storageCleanliness" },
  { label: "Q4", key: "quality.servingAreaCleanliness" },
  { label: "Q5", key: "quality.utensilCondition" },
  { label: "Q6", key: "quality.waterSupply" },
  { label: "Q7", key: "quality.handwashFacility" },
  { label: "Q8", key: "quality.toiletCleanliness" },
  { label: "R-1", key: "repairing.cashBookUpdated" },
  { label: "R-2", key: "repairing.stockRegisterUpdated" },
  { label: "R-3", key: "repairing.attendanceRegisterUpdated" },
  { label: "R-4", key: "repairing.bankAccountUpdated" },
  { label: "R-5", key: "repairing.honorariumRegisterUpdated" },
  { label: "R-6", key: "repairing.tasteRegisterUpdated" },
  { label: "R-7", key: "repairing.snehTithiRegisterUpdated" },
  { label: "PS-1", key: "profitFromScheme.enrollmentImprovement" },
  { label: "PS-2", key: "profitFromScheme.attendanceIncrease" },
  { label: "PS-3", key: "profitFromScheme.nutritionHealthImprovement" },
  { label: "PS-4", key: "profitFromScheme.weightHeightIncrease" },
  { label: "PS-5", key: "profitFromScheme.malnutritionReduction" },
  { label: "PS-6", key: "profitFromScheme.junkFoodPrevention" },
  { label: "PS-7", key: "profitFromScheme.unityBonding" },
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
              placeholder="UDISE क्रमांक शोधा..."
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