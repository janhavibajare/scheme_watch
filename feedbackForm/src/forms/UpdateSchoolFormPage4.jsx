import React from "react";

const UpdateSchoolFormPage4 = ({
  formData,
  handleBinaryChange,
  handleQualityChange,
  prevStep,
  handleSubmit,
}) => {
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

  // Toggle binary field between 1 and 0
  const toggleBinary = (field) => {
    const currentValue = formData[field];
    const newValue = currentValue === 1 ? 0 : 1;
    handleBinaryChange(field, newValue.toString());
  };

  // Toggle quality field, unchecking others if one is selected
  const toggleQuality = (field, value) => {
    const currentValue = formData[field];
    const newValue = currentValue === value ? "" : value; // Uncheck if same value clicked
    handleQualityChange(field, newValue);
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
                  onChange={() => toggleBinary("hasKitchen")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasKitchen === 0}
                  onChange={() => toggleBinary("hasKitchen")}
                  disabled // Disabled to show state, but only one checkbox is needed
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
                  onChange={() => toggleBinary("hasStorageRoom")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasStorageRoom === 0}
                  onChange={() => toggleBinary("hasStorageRoom")}
                  disabled
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
                  onChange={() => toggleBinary("hasDiningHall")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasDiningHall === 0}
                  onChange={() => toggleBinary("hasDiningHall")}
                  disabled
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
                  onChange={() => toggleBinary("hasUtensils")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasUtensils === 0}
                  onChange={() => toggleBinary("hasUtensils")}
                  disabled
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
                  onChange={() => toggleBinary("hasGrainSafety")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasGrainSafety === 0}
                  onChange={() => toggleBinary("hasGrainSafety")}
                  disabled
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
                  onChange={() => toggleBinary("hasHandwashSoap")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasHandwashSoap === 0}
                  onChange={() => toggleBinary("hasHandwashSoap")}
                  disabled
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
                  onChange={() => toggleBinary("hasSeparateToilets")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasSeparateToilets === 0}
                  onChange={() => toggleBinary("hasSeparateToilets")}
                  disabled
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
                  onChange={() => toggleBinary("hasCctv")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.hasCctv === 0}
                  onChange={() => toggleBinary("hasCctv")}
                  disabled
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
                  onChange={() => toggleQuality("kitchenCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.kitchenCleanliness === "बरीचशी"}
                  onChange={() => toggleQuality("kitchenCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.kitchenCleanliness === "अतिशय"}
                  onChange={() => toggleQuality("kitchenCleanliness", "अतिशय")}
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
                  onChange={() => toggleQuality("diningHallCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.diningHallCleanliness === "बरीचशी"}
                  onChange={() => toggleQuality("diningHallCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.diningHallCleanliness === "अतिशय"}
                  onChange={() => toggleQuality("diningHallCleanliness", "अतिशय")}
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
                  onChange={() => toggleQuality("storageCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.storageCleanliness === "बरीचशी"}
                  onChange={() => toggleQuality("storageCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.storageCleanliness === "अतिशय"}
                  onChange={() => toggleQuality("storageCleanliness", "अतिशय")}
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
                  onChange={() => toggleQuality("servingAreaCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.servingAreaCleanliness === "बरीचशी"}
                  onChange={() => toggleQuality("servingAreaCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.servingAreaCleanliness === "अतिशय"}
                  onChange={() => toggleQuality("servingAreaCleanliness", "अतिशय")}
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
                  onChange={() => toggleQuality("utensilCondition", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.utensilCondition === "बरीचशी"}
                  onChange={() => toggleQuality("utensilCondition", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.utensilCondition === "अतिशय"}
                  onChange={() => toggleQuality("utensilCondition", "अतिशय")}
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
                  onChange={() => toggleQuality("waterSupply", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.waterSupply === "बरीचशी"}
                  onChange={() => toggleQuality("waterSupply", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.waterSupply === "अतिशय"}
                  onChange={() => toggleQuality("waterSupply", "अतिशय")}
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
                  onChange={() => toggleQuality("handwashFacility", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.handwashFacility === "बरीचशी"}
                  onChange={() => toggleQuality("handwashFacility", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.handwashFacility === "अतिशय"}
                  onChange={() => toggleQuality("handwashFacility", "अतिशय")}
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
                  onChange={() => toggleQuality("toiletCleanliness", "निकृष्ट")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.toiletCleanliness === "बरीचशी"}
                  onChange={() => toggleQuality("toiletCleanliness", "बरीचशी")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.toiletCleanliness === "अतिशय"}
                  onChange={() => toggleQuality("toiletCleanliness", "अतिशय")}
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
                  onChange={() => toggleBinary("cashBookUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.cashBookUpdated === 0}
                  onChange={() => toggleBinary("cashBookUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("stockRegisterUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.stockRegisterUpdated === 0}
                  onChange={() => toggleBinary("stockRegisterUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("attendanceRegisterUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceRegisterUpdated === 0}
                  onChange={() => toggleBinary("attendanceRegisterUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("bankAccountUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.bankAccountUpdated === 0}
                  onChange={() => toggleBinary("bankAccountUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("honorariumRegisterUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.honorariumRegisterUpdated === 0}
                  onChange={() => toggleBinary("honorariumRegisterUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("tasteRegisterUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.tasteRegisterUpdated === 0}
                  onChange={() => toggleBinary("tasteRegisterUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("snehTithiRegisterUpdated")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.snehTithiRegisterUpdated === 0}
                  onChange={() => toggleBinary("snehTithiRegisterUpdated")}
                  disabled
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
                  onChange={() => toggleBinary("enrollmentImprovement")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.enrollmentImprovement === 0}
                  onChange={() => toggleBinary("enrollmentImprovement")}
                  disabled
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
                  onChange={() => toggleBinary("attendanceIncrease")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.attendanceIncrease === 0}
                  onChange={() => toggleBinary("attendanceIncrease")}
                  disabled
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
                  onChange={() => toggleBinary("nutritionHealthImprovement")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.nutritionHealthImprovement === 0}
                  onChange={() => toggleBinary("nutritionHealthImprovement")}
                  disabled
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
                  onChange={() => toggleBinary("weightHeightIncrease")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.weightHeightIncrease === 0}
                  onChange={() => toggleBinary("weightHeightIncrease")}
                  disabled
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
                  onChange={() => toggleBinary("malnutritionReduction")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.malnutritionReduction === 0}
                  onChange={() => toggleBinary("malnutritionReduction")}
                  disabled
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
                  onChange={() => toggleBinary("junkFoodPrevention")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.junkFoodPrevention === 0}
                  onChange={() => toggleBinary("junkFoodPrevention")}
                  disabled
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
                  onChange={() => toggleBinary("unityBonding")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formData.unityBonding === 0}
                  onChange={() => toggleBinary("unityBonding")}
                  disabled
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

export default UpdateSchoolFormPage4;