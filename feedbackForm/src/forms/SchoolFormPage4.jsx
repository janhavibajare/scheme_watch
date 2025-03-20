import React from "react";

const SchoolFormPage4 = ({ formData, setFormData, handleChange, prevStep, handleSubmit }) => {
  const handleBinaryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === "होय" ? 1 : 0,
    }));
  };

  const handleQualityChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    const requiredFields = [
      "hasKitchen",
      "hasStorageRoom",
      "hasDiningHall",
      "hasUtensils",
      "hasGrainSafety",
      "hasHandwashSoap",
      "hasSeparateToilets",
      "hasCctv",
      "kitchenCleanliness",
      "diningHallCleanliness",
      "storageCleanliness",
      "servingAreaCleanliness",
      "utensilCondition",
      "waterSupply",
      "handwashFacility",
      "toiletCleanliness",
      "cashBookUpdated",
      "stockRegisterUpdated",
      "attendanceRegisterUpdated",
      "bankAccountUpdated",
      "honorariumRegisterUpdated",
      "tasteRegisterUpdated",
      "snehTithiRegisterUpdated",
      "enrollmentImprovement",
      "attendanceIncrease",
      "nutritionHealthImprovement",
      "weightHeightIncrease",
      "malnutritionReduction",
      "junkFoodPrevention",
      "unityBonding",
    ];

    // Allow null for checkbox fields, as they're optional in SchoolForm
    const missingFields = requiredFields.filter((field) => {
      const value = formData[field];
      return value === "" || value === undefined; // Exclude null to allow unchecked boxes
    });

    console.log("Form data before submission:", formData);
    console.log("Missing fields (excluding null):", missingFields);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    console.log("Calling handleSubmit...");
    handleSubmit();
  };

  return (
    <div className="container mt-4">
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
              <td className="text-start">1</td>
              <td className="text-start">स्वयंपाकगृह</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasKitchen === 1}
                  onChange={() => handleBinaryChange("hasKitchen", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasKitchen === 0}
                  onChange={() => handleBinaryChange("hasKitchen", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">2</td>
              <td className="text-start">धान्यासाठी खोली</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasStorageRoom === 1}
                  onChange={() => handleBinaryChange("hasStorageRoom", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasStorageRoom === 0}
                  onChange={() => handleBinaryChange("hasStorageRoom", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">3</td>
              <td className="text-start">भोजन हॉल</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasDiningHall === 1}
                  onChange={() => handleBinaryChange("hasDiningHall", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasDiningHall === 0}
                  onChange={() => handleBinaryChange("hasDiningHall", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">4</td>
              <td className="text-start">भांड्याची उपलब्धता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasUtensils === 1}
                  onChange={() => handleBinaryChange("hasUtensils", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasUtensils === 0}
                  onChange={() => handleBinaryChange("hasUtensils", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">5</td>
              <td className="text-start">धान्याची मालाची सुरक्षितता (कोठ्या)</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasGrainSafety === 1}
                  onChange={() => handleBinaryChange("hasGrainSafety", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasGrainSafety === 0}
                  onChange={() => handleBinaryChange("hasGrainSafety", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">6</td>
              <td className="text-start">हात स्वच्छ करण्यासाठी हँडवॉश, साबण उपलब्धता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasHandwashSoap === 1}
                  onChange={() => handleBinaryChange("hasHandwashSoap", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasHandwashSoap === 0}
                  onChange={() => handleBinaryChange("hasHandwashSoap", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">7</td>
              <td className="text-start">मुले आणि मुली यांना स्वतंत्र शौचालय</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasSeparateToilets === 1}
                  onChange={() => handleBinaryChange("hasSeparateToilets", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasSeparateToilets === 0}
                  onChange={() => handleBinaryChange("hasSeparateToilets", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td className="text-start">8</td>
              <td className="text-start">विद्यार्थ्यांच्या सुरक्षिततेच्या अनुषंगाने CCTV उपलब्धता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasCctv === 1}
                  onChange={() => handleBinaryChange("hasCctv", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasCctv === 0}
                  onChange={() => handleBinaryChange("hasCctv", "नाही")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
              <th className="text-start">बरीचशी</th>
              <th className="text-start">अतिशय</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>स्वयंपाकगृहाची स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.kitchenCleanliness === "निकृष्ट"}
                  onChange={() => handleQualityChange("kitchenCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.kitchenCleanliness === "बरीचशी"}
                  onChange={() => handleQualityChange("kitchenCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.kitchenCleanliness === "अतिशय"}
                  onChange={() => handleQualityChange("kitchenCleanliness", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>भोजन हॉल स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.diningHallCleanliness === "निकृष्ट"}
                  onChange={() => handleQualityChange("diningHallCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.diningHallCleanliness === "बरीचशी"}
                  onChange={() => handleQualityChange("diningHallCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.diningHallCleanliness === "अतिशय"}
                  onChange={() => handleQualityChange("diningHallCleanliness", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>धान्यादी साठा खोलीची स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.storageCleanliness === "निकृष्ट"}
                  onChange={() => handleQualityChange("storageCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.storageCleanliness === "बरीचशी"}
                  onChange={() => handleQualityChange("storageCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.storageCleanliness === "अतिशय"}
                  onChange={() => handleQualityChange("storageCleanliness", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>शिजवलेला आहार वितरित करण्याची जागा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.servingAreaCleanliness === "निकृष्ट"}
                  onChange={() => handleQualityChange("servingAreaCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.servingAreaCleanliness === "बरीचशी"}
                  onChange={() => handleQualityChange("servingAreaCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.servingAreaCleanliness === "अतिशय"}
                  onChange={() => handleQualityChange("servingAreaCleanliness", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>भांड्यांची स्थिती आणि स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.utensilCondition === "निकृष्ट"}
                  onChange={() => handleQualityChange("utensilCondition", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.utensilCondition === "बरीचशी"}
                  onChange={() => handleQualityChange("utensilCondition", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.utensilCondition === "अतिशय"}
                  onChange={() => handleQualityChange("utensilCondition", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>पिण्याच्या शुद्ध पाण्याचा नियमित पुरवठा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.waterSupply === "निकृष्ट"}
                  onChange={() => handleQualityChange("waterSupply", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.waterSupply === "बरीचशी"}
                  onChange={() => handleQualityChange("waterSupply", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.waterSupply === "अतिशय"}
                  onChange={() => handleQualityChange("waterSupply", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>विद्यार्थ्यांसाठी हात धुण्याची सुविधा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.handwashFacility === "निकृष्ट"}
                  onChange={() => handleQualityChange("handwashFacility", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.handwashFacility === "बरीचशी"}
                  onChange={() => handleQualityChange("handwashFacility", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.handwashFacility === "अतिशय"}
                  onChange={() => handleQualityChange("handwashFacility", "अतिशय")}
                />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>मुले आणि मुली यासाठी स्वतंत्र शौचालय स्वच्छता</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.toiletCleanliness === "निकृष्ट"}
                  onChange={() => handleQualityChange("toiletCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.toiletCleanliness === "बरीचशी"}
                  onChange={() => handleQualityChange("toiletCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.toiletCleanliness === "अतिशय"}
                  onChange={() => handleQualityChange("toiletCleanliness", "अतिशय")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
              <td>1</td>
              <td>कॅशबुक आणि इतर आर्थिक बाबींच्या नोंदवया अद्ययावत आहेत काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.cashBookUpdated === 1}
                  onChange={() => handleBinaryChange("cashBookUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.cashBookUpdated === 0}
                  onChange={() => handleBinaryChange("cashBookUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>तांदूळ व धान्यादी माल तसेच इतर माल साठा नोंदवही अद्ययावत आहेत काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.stockRegisterUpdated === 1}
                  onChange={() => handleBinaryChange("stockRegisterUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.stockRegisterUpdated === 0}
                  onChange={() => handleBinaryChange("stockRegisterUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>उपस्थित नोंदणी लाभार्थी संख्या पोषण आहार रजिस्टर अद्ययावत आहेत काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceRegisterUpdated === 1}
                  onChange={() => handleBinaryChange("attendanceRegisterUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceRegisterUpdated === 0}
                  onChange={() => handleBinaryChange("attendanceRegisterUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>पोषण आहार योजना बँक खाते अद्ययावत आहे काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.bankAccountUpdated === 1}
                  onChange={() => handleBinaryChange("bankAccountUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.bankAccountUpdated === 0}
                  onChange={() => handleBinaryChange("bankAccountUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>स्वयंपाकी/मदतनीस मानधन नोंदवही अद्ययावत आहे काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.honorariumRegisterUpdated === 1}
                  onChange={() => handleBinaryChange("honorariumRegisterUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.honorariumRegisterUpdated === 0}
                  onChange={() => handleBinaryChange("honorariumRegisterUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>चव नोंदवही अद्यावत आहे काय?</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.tasteRegisterUpdated === 1}
                  onChange={() => handleBinaryChange("tasteRegisterUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.tasteRegisterUpdated === 0}
                  onChange={() => handleBinaryChange("tasteRegisterUpdated", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>स्नेह भोजन/तिथी भोजन कार्यक्रम नोंदवही</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.snehTithiRegisterUpdated === 1}
                  onChange={() => handleBinaryChange("snehTithiRegisterUpdated", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.snehTithiRegisterUpdated === 0}
                  onChange={() => handleBinaryChange("snehTithiRegisterUpdated", "नाही")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
              <td>1</td>
              <td>शाळेच्या पटनोंदणी मध्ये सुधारणा</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.enrollmentImprovement === 1}
                  onChange={() => handleBinaryChange("enrollmentImprovement", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.enrollmentImprovement === 0}
                  onChange={() => handleBinaryChange("enrollmentImprovement", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>दैनंदिन उपस्थितीमध्ये वाढ</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceIncrease === 1}
                  onChange={() => handleBinaryChange("attendanceIncrease", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceIncrease === 0}
                  onChange={() => handleBinaryChange("attendanceIncrease", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>मुलांचे पोषण आणि आरोग्य सुधारणा होण्यामध्ये वाढ</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.nutritionHealthImprovement === 1}
                  onChange={() => handleBinaryChange("nutritionHealthImprovement", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.nutritionHealthImprovement === 0}
                  onChange={() => handleBinaryChange("nutritionHealthImprovement", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>विद्यार्थ्यांच्या वजन उंची यामध्ये वाढ</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.weightHeightIncrease === 1}
                  onChange={() => handleBinaryChange("weightHeightIncrease", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.weightHeightIncrease === 0}
                  onChange={() => handleBinaryChange("weightHeightIncrease", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>कुपोषण मुक्त होण्यासाठी मदत</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.malnutritionReduction === 1}
                  onChange={() => handleBinaryChange("malnutritionReduction", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.malnutritionReduction === 0}
                  onChange={() => handleBinaryChange("malnutritionReduction", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>फेरीवाले यांच्याकडील जंक फूड घेणे खाणे यास प्रतिबंध</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.junkFoodPrevention === 1}
                  onChange={() => handleBinaryChange("junkFoodPrevention", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.junkFoodPrevention === 0}
                  onChange={() => handleBinaryChange("junkFoodPrevention", "नाही")}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>एकता आणि बंधुभाव जोपासना</td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.unityBonding === 1}
                  onChange={() => handleBinaryChange("unityBonding", "होय")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.unityBonding === 0}
                  onChange={() => handleBinaryChange("unityBonding", "नाही")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button type="button" className="btn btn-primary btn-lg me-2" onClick={prevStep}>
          मागे जा
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={handleFormSubmit}>
          सबमिट करा
        </button>
      </div>
    </div>
  );
};

export default SchoolFormPage4;