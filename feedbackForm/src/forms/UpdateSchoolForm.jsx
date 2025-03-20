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

  // Centralized handlers
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
      [name]: value === "" ? null : Number(value),
    }));
  };

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
        ...prev.beneficiaries[gradeKey],
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
    setFormData,
    handleChange,
    handleBinaryChange,
    handleTeacherChange,
    handleStudentChange,
    nextStep,
    prevStep,
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      <h2 className="text-center border-bottom pb-2">Update School Form</h2>
      {/* Progress Bar */}
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