import React from "react";

const UpdateSchoolFormPage4 = ({
  formData,
  setFormData,
  prevStep,
  handleSubmit,
}) => {
  // Helper function to update nested objects
  const updateNestedObject = (obj, path, value) => {
    const [head, ...rest] = path.split(".");
    if (rest.length === 0) {
      return { ...obj, [head]: value };
    }
    return {
      ...obj,
      [head]: updateNestedObject(obj[head] || {}, rest.join("."), value),
    };
  };

  // Handler for binary (yes/no) fields
  const handleBinaryChange = (field, value) => {
    const newValue = value === "होय" ? 1 : value === "नाही" ? 0 : null;
    setFormData((prev) => updateNestedObject(prev, field, newValue));
  };

  // Handler for quality fields
  const handleQualityChange = (field, value) => {
    const qualityMap = { "निकृष्ट": "1", "बऱ्यापैकी": "2", "अतिउत्तम": "3" };
    const newValue = qualityMap[value] || "";
    setFormData((prev) => updateNestedObject(prev, field, newValue));
  };

  // Form submission handler
  const handleFormSubmit = async () => {
    try {
      console.log("Form data before submission:", formData);
      console.log("Calling handleSubmit...");
      await handleSubmit(formData);
      console.log("Form submission successful!");
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Form submission failed. Please check the console for details.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Basic Facilities */}
      <div className="card p-4 shadow-lg w-80 mx-auto">
        <div className="card-header bg-primary text-white">
          <h3>पायाभूत सुविधा (होय/नाही)</h3>
        </div>
        <table className="table table-bordered mt-3">
          <thead className="table-secondary">
            <tr>
              <th className="text-start">अ.क्र.</th>
              <th className="text-start">तपशील</th>
              <th className="text-start">होय</th>
              <th className="text-start">नाही</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start">BS-1</td>
              <td className="text-start">स्वयंपाकगृह</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasKitchen === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasKitchen",
                      formData.basicFacilities?.hasKitchen === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasKitchen === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasKitchen",
                      formData.basicFacilities?.hasKitchen === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-2</td>
              <td className="text-start">धान्यासाठी खोली</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasStorageRoom === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasStorageRoom",
                      formData.basicFacilities?.hasStorageRoom === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasStorageRoom === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasStorageRoom",
                      formData.basicFacilities?.hasStorageRoom === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-3</td>
              <td className="text-start">भोजन हॉल</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasDiningHall === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasDiningHall",
                      formData.basicFacilities?.hasDiningHall === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasDiningHall === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasDiningHall",
                      formData.basicFacilities?.hasDiningHall === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-4</td>
              <td className="text-start">भांड्याची उपलब्धता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasUtensils === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasUtensils",
                      formData.basicFacilities?.hasUtensils === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasUtensils === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasUtensils",
                      formData.basicFacilities?.hasUtensils === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-5</td>
              <td className="text-start">धान्याची मालाची सुरक्षितता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasGrainSafety === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasGrainSafety",
                      formData.basicFacilities?.hasGrainSafety === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasGrainSafety === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasGrainSafety",
                      formData.basicFacilities?.hasGrainSafety === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-6</td>
              <td className="text-start">हात स्वच्छ करण्यासाठी हँडवॉश, साबण</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasHandwashSoap === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasHandwashSoap",
                      formData.basicFacilities?.hasHandwashSoap === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasHandwashSoap === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasHandwashSoap",
                      formData.basicFacilities?.hasHandwashSoap === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-7</td>
              <td className="text-start">स्वतंत्र शौचालय</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasSeparateToilets === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasSeparateToilets",
                      formData.basicFacilities?.hasSeparateToilets === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasSeparateToilets === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasSeparateToilets",
                      formData.basicFacilities?.hasSeparateToilets === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">BS-8</td>
              <td className="text-start">CCTV उपलब्धता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasCctv === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasCctv",
                      formData.basicFacilities?.hasCctv === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.basicFacilities?.hasCctv === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "basicFacilities.hasCctv",
                      formData.basicFacilities?.hasCctv === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quality Section */}
      <div className="card p-4 shadow-lg w-80 mx-auto mt-4">
        <div className="card-header bg-primary text-white">
          <h3>शाळा गुणवत्ता, स्वच्छता व इत्यादी :- निकृष्ट, बऱ्यापैकी, अतिउत्तम</h3>
        </div>
        <table className="table table-bordered mt-3">
          <thead className="table-secondary">
            <tr>
              <th className="text-start">अ.क्र.</th>
              <th className="text-start">तपशील</th>
              <th className="text-start">निकृष्ट</th>
              <th className="text-start">बऱ्यापैकी</th>
              <th className="text-start">अतिउत्तम</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>स्वयंपाकगृहाची स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.kitchenCleanliness === "1"}
                  onChange={() =>
                    handleQualityChange("quality.kitchenCleanliness", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.kitchenCleanliness === "2"}
                  onChange={() =>
                    handleQualityChange("quality.kitchenCleanliness", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.kitchenCleanliness === "3"}
                  onChange={() =>
                    handleQualityChange("quality.kitchenCleanliness", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>भोजन हॉल स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.diningHallCleanliness === "1"}
                  onChange={() =>
                    handleQualityChange("quality.diningHallCleanliness", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.diningHallCleanliness === "2"}
                  onChange={() =>
                    handleQualityChange(
                      "quality.diningHallCleanliness",
                      "बऱ्यापैकी"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.diningHallCleanliness === "3"}
                  onChange={() =>
                    handleQualityChange(
                      "quality.diningHallCleanliness",
                      "अतिउत्तम"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>धान्यादी साठा खोलीची स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.storageCleanliness === "1"}
                  onChange={() =>
                    handleQualityChange("quality.storageCleanliness", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.storageCleanliness === "2"}
                  onChange={() =>
                    handleQualityChange("quality.storageCleanliness", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.storageCleanliness === "3"}
                  onChange={() =>
                    handleQualityChange("quality.storageCleanliness", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>शिजवलेला आहार वितरित करण्याची जागा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.servingAreaCleanliness === "1"}
                  onChange={() =>
                    handleQualityChange(
                      "quality.servingAreaCleanliness",
                      "निकृष्ट"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.servingAreaCleanliness === "2"}
                  onChange={() =>
                    handleQualityChange(
                      "quality.servingAreaCleanliness",
                      "बऱ्यापैकी"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.servingAreaCleanliness === "3"}
                  onChange={() =>
                    handleQualityChange(
                      "quality.servingAreaCleanliness",
                      "अतिउत्तम"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>भांड्यांची स्थिती आणि स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.utensilCondition === "1"}
                  onChange={() =>
                    handleQualityChange("quality.utensilCondition", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.utensilCondition === "2"}
                  onChange={() =>
                    handleQualityChange("quality.utensilCondition", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.utensilCondition === "3"}
                  onChange={() =>
                    handleQualityChange("quality.utensilCondition", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>पिण्याच्या शुद्ध पाण्याचा नियमित पुरवठा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.waterSupply === "1"}
                  onChange={() =>
                    handleQualityChange("quality.waterSupply", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.waterSupply === "2"}
                  onChange={() =>
                    handleQualityChange("quality.waterSupply", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.waterSupply === "3"}
                  onChange={() =>
                    handleQualityChange("quality.waterSupply", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>विद्यार्थ्यांसाठी हात धुण्याची सुविधा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.handwashFacility === "1"}
                  onChange={() =>
                    handleQualityChange("quality.handwashFacility", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.handwashFacility === "2"}
                  onChange={() =>
                    handleQualityChange("quality.handwashFacility", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.handwashFacility === "3"}
                  onChange={() =>
                    handleQualityChange("quality.handwashFacility", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>स्वतंत्र शौचालय स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.toiletCleanliness === "1"}
                  onChange={() =>
                    handleQualityChange("quality.toiletCleanliness", "निकृष्ट")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.toiletCleanliness === "2"}
                  onChange={() =>
                    handleQualityChange("quality.toiletCleanliness", "बऱ्यापैकी")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.quality?.toiletCleanliness === "3"}
                  onChange={() =>
                    handleQualityChange("quality.toiletCleanliness", "अतिउत्तम")
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Repairing Section */}
      <div className="card p-4 shadow-lg w-80 mx-auto mt-4">
        <div className="card-header bg-primary text-white">
          <h3>पुस्तके नोंदवहया रजिस्टर वापर आणि दुरुस्ती</h3>
        </div>
        <table className="table table-bordered mt-3">
          <thead className="table-secondary">
            <tr>
              <th className="text-start">अ.क्र.</th>
              <th className="text-start">तपशील</th>
              <th className="text-start">होय</th>
              <th className="text-start">नाही</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R-1</td>
              <td>कॅशबुक अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.cashBookUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.cashBookUpdated",
                      formData.repairing?.cashBookUpdated === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.cashBookUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.cashBookUpdated",
                      formData.repairing?.cashBookUpdated === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-2</td>
              <td>साठा नोंदवही अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.stockRegisterUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.stockRegisterUpdated",
                      formData.repairing?.stockRegisterUpdated === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.stockRegisterUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.stockRegisterUpdated",
                      formData.repairing?.stockRegisterUpdated === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-3</td>
              <td>उपस्थिती रजिस्टर अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.attendanceRegisterUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.attendanceRegisterUpdated",
                      formData.repairing?.attendanceRegisterUpdated === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.attendanceRegisterUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.attendanceRegisterUpdated",
                      formData.repairing?.attendanceRegisterUpdated === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-4</td>
              <td>बँक खाते अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.bankAccountUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.bankAccountUpdated",
                      formData.repairing?.bankAccountUpdated === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.bankAccountUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.bankAccountUpdated",
                      formData.repairing?.bankAccountUpdated === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-5</td>
              <td>मानधन नोंदवही अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.honorariumRegisterUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.honorariumRegisterUpdated",
                      formData.repairing?.honorariumRegisterUpdated === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.honorariumRegisterUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.honorariumRegisterUpdated",
                      formData.repairing?.honorariumRegisterUpdated === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-6</td>
              <td>चव नोंदवही अद्ययावत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.tasteRegisterUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.tasteRegisterUpdated",
                      formData.repairing?.tasteRegisterUpdated === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.tasteRegisterUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.tasteRegisterUpdated",
                      formData.repairing?.tasteRegisterUpdated === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>R-7</td>
              <td>स्नेह भोजन/तिथी भोजन नोंदवही</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.snehTithiRegisterUpdated === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.snehTithiRegisterUpdated",
                      formData.repairing?.snehTithiRegisterUpdated === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.repairing?.snehTithiRegisterUpdated === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "repairing.snehTithiRegisterUpdated",
                      formData.repairing?.snehTithiRegisterUpdated === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Profit From Scheme */}
      <div className="card p-4 shadow-lg w-80 mx-auto mt-4">
        <div className="card-header bg-primary text-white">
          <h3>योजनांची फलनिष्पत्ती (होय/नाही)</h3>
        </div>
        <table className="table table-bordered mt-3">
          <thead className="table-secondary">
            <tr>
              <th className="text-start">अ.क्र.</th>
              <th className="text-start">तपशील</th>
              <th className="text-center">होय</th>
              <th className="text-center">नाही</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PS-1</td>
              <td>पटनोंदणी मध्ये सुधारणा</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.enrollmentImprovement === 1
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.enrollmentImprovement",
                      formData.profitFromScheme?.enrollmentImprovement === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.enrollmentImprovement === 0
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.enrollmentImprovement",
                      formData.profitFromScheme?.enrollmentImprovement === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-2</td>
              <td>दैनंदिन उपस्थितीमध्ये वाढ</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.attendanceIncrease === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.attendanceIncrease",
                      formData.profitFromScheme?.attendanceIncrease === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.attendanceIncrease === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.attendanceIncrease",
                      formData.profitFromScheme?.attendanceIncrease === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-3</td>
              <td>पोषण आणि आरोग्य सुधारणा</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.nutritionHealthImprovement === 1
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.nutritionHealthImprovement",
                      formData.profitFromScheme?.nutritionHealthImprovement === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.nutritionHealthImprovement === 0
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.nutritionHealthImprovement",
                      formData.profitFromScheme?.nutritionHealthImprovement === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-4</td>
              <td>वजन उंची यामध्ये वाढ</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.weightHeightIncrease === 1
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.weightHeightIncrease",
                      formData.profitFromScheme?.weightHeightIncrease === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.weightHeightIncrease === 0
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.weightHeightIncrease",
                      formData.profitFromScheme?.weightHeightIncrease === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-5</td>
              <td>कुपोषण मुक्त होण्यासाठी मदत</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.malnutritionReduction === 1
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.malnutritionReduction",
                      formData.profitFromScheme?.malnutritionReduction === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    formData.profitFromScheme?.malnutritionReduction === 0
                  }
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.malnutritionReduction",
                      formData.profitFromScheme?.malnutritionReduction === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-6</td>
              <td>जंक फूड प्रतिबंध</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.junkFoodPrevention === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.junkFoodPrevention",
                      formData.profitFromScheme?.junkFoodPrevention === 1
                        ? "नाही"
                        : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.junkFoodPrevention === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.junkFoodPrevention",
                      formData.profitFromScheme?.junkFoodPrevention === 0
                        ? "होय"
                        : "नाही"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PS-7</td>
              <td>एकता आणि बंधुभाव जोपासना</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.unityBonding === 1}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.unityBonding",
                      formData.profitFromScheme?.unityBonding === 1 ? "नाही" : "होय"
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.profitFromScheme?.unityBonding === 0}
                  onChange={() =>
                    handleBinaryChange(
                      "profitFromScheme.unityBonding",
                      formData.profitFromScheme?.unityBonding === 0 ? "होय" : "नाही"
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-primary btn-lg me-2"
          onClick={prevStep}
        >
          मागे जा
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleFormSubmit}
        >
          सबमिट करा
        </button>
      </div>
    </div>
  );
};

export default UpdateSchoolFormPage4;