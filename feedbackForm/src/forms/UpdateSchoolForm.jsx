import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { toast } from "react-toastify";
import UpdateSchoolFormPage1 from "./UpdateSchoolFormPage1.jsx";
import UpdateSchoolFormPage2 from "./UpdateSchoolFormPage2.jsx";
import UpdateSchoolFormPage3 from "./UpdateSchoolFormPage3.jsx";
import UpdateSchoolFormPage4 from "./UpdateSchoolFormPage4.jsx";

const UpdateSchoolForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const docRef = doc(db, "School_Forms", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          toast.error("No such school form exists!");
          navigate("/admin_dashboard");
        }
      } catch (error) {
        toast.error("Error fetching school data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolData();
  }, [id, navigate]);

  // Handlers for UpdateSchoolFormPage3
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBinaryChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value);
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleBeneficiaryChange = (year, field, value) => {
    const numericValue = value === "" ? "" : Number(value);
    setFormData((prev) => {
      const updatedBeneficiaries = {
        ...prev.beneficiariesYearly,
        [year]: {
          ...prev.beneficiariesYearly?.[year] || {},
          [field]: numericValue,
        },
      };
      
      // Calculate total
      const boys = field === "boys" ? numericValue : updatedBeneficiaries[year].boys || 0;
      const girls = field === "girls" ? numericValue : updatedBeneficiaries[year].girls || 0;
      updatedBeneficiaries[year].total = (boys || 0) + (girls || 0);

      return {
        ...prev,
        beneficiariesYearly: updatedBeneficiaries,
      };
    });
  };

  const handleFinancialChange = (year, field, value) => {
    const numericValue = value === "" ? "" : Number(value);
    setFormData((prev) => {
      const key = field === "deposited" ? "grantReceived" : "grantExpenditure";
      const updatedFinancial = {
        ...prev[key],
        [year]: numericValue,
      };

      const received = field === "deposited" ? numericValue : prev.grantReceived?.[year] || 0;
      const spent = field === "spent" ? numericValue : prev.grantExpenditure?.[year] || 0;
      const updatedBalance = {
        ...prev.grantBalance,
        [year]: (received || 0) - (spent || 0),
      };

      return {
        ...prev,
        [key]: updatedFinancial,
        grantBalance: updatedBalance,
      };
    });
  };

  // Handlers for other pages
  const handleTeacherChange = (name, value) => {
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleStudentChange = (gradeKey, field, value) => {
    const numericValue = value === "" ? "" : Number(value) || "";
    setFormData((prev) => {
      const updatedGrade = {
        ...prev.beneficiaries?.[gradeKey] || {},
        [field]: numericValue,
      };
      updatedGrade.total =
        (updatedGrade.boys === "" ? 0 : updatedGrade.boys) +
        (updatedGrade.girls === "" ? 0 : updatedGrade.girls);

      const allGrades = { ...prev.beneficiaries, [gradeKey]: updatedGrade };
      const totalBoys = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.boys === "" ? 0 : grade.boys),
        0
      );
      const totalGirls = Object.values(allGrades).reduce(
        (sum, grade) => sum + (grade.girls === "" ? 0 : grade.girls),
        0
      );

      return {
        ...prev,
        beneficiaries: allGrades,
        totalBoys,
        totalGirls,
      };
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!formData.helper1Name) {
      toast.error("Helper 1 Name is required!");
      return;
    }
    try {
      const docRef = doc(db, "School_Forms", id);
      await updateDoc(docRef, {
        ...formData,
        submissionDate: new Date().toISOString(),
      });
      toast.success("School Form updated successfully!");
      navigate("/admin_dashboard");
    } catch (error) {
      toast.error("Error updating school form: " + error.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  const pageProps = {
    formData,
    handleChange,
    handleBinaryChange,
    handleNumberChange,
    handleBeneficiaryChange,
    handleFinancialChange,
    handleTeacherChange,
    handleStudentChange,
    nextStep,
    prevStep,
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">Update School Form</h2>
      <div className="progress mb-4">
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${(step / 4) * 100}%` }}
          aria-valuenow={step}
          aria-valuemin="1"
          aria-valuemax="4"
        >
          Step {step} of 4
        </div>
      </div>
      {step === 1 && <UpdateSchoolFormPage1 {...pageProps} />}
      {step === 2 && <UpdateSchoolFormPage2 {...pageProps} />}
      {step === 3 && <UpdateSchoolFormPage3 {...pageProps} />}
      {step === 4 && <UpdateSchoolFormPage4 {...pageProps} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default UpdateSchoolForm;