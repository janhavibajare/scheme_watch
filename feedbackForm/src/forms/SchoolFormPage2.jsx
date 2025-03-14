import React from "react";

const SchoolFormPage2 = ({ formData, setFormData, handleChange, nextStep, prevStep }) => {
  return (
    <>
      <div className="container-xxl">
        <div className="container my-5">
          <div className="card p-4 shadow-lg w-100 mx-auto">
            <div className="card-header bg-info text-white">
              <h3>पोषण आहाराबद्दल माहिती</h3>
            </div>
            <br />
            <form>
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "32px" }} htmlFor="q1">
                    १. शालेय आहार व्यवस्थापन समिती स्थापन आहे काय?
                  </label>
                  <select
                    name="q1"
                    id="q1"
                    className="form-control"
                    value={formData.q1}
                    onChange={handleChange}
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="q1_1">
                    १.१. असल्यास शाळा परिसरात समिती सभासदांचा फलक सर्वाना दिसण्यासाठी लावला आहे का?
                  </label>
                  <select
                    name="q1_1"
                    id="q1_1"
                    className="form-control"
                    value={formData.q1_1}
                    onChange={handleChange}
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "18px" }} htmlFor="q2">
                    २. अन्न शिजवणाऱ्या यंत्रणा :- शाळा स्तरावर बचतगटामार्फत इतर
                  </label>
                  <textarea
                    name="q2"
                    id="q2"
                    className="form-control"
                    style={{ height: "40%", width: "100%" }}
                    value={formData.q2}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "8px" }} htmlFor="q3">
                    ३. आहार शिजवणाऱ्या यंत्रणा / संस्थेसोबत केलेल्या करारनाम्याची प्रत शाळेत उपलब्ध आहे काय
                  </label>
                  <select
                    name="q3"
                    id="q3"
                    className="form-control"
                    value={formData.q3}
                    onChange={handleChange}
                  >
                    <option value="">निवडा</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>

              {/* Add more rows and form fields similarly 

              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="d-block text-start" style={{ marginBottom: "55px" }} htmlFor="q34">
                    ३४ योजनेच्या अंमलबजावणी/सनियंत्रणाबाबत सूचना अथवा शिफारशी याबाबत थोडक्यात तपशील नमूद करण्यात यावा
                  </label>
                  <textarea
                    name="q34"
                    id="q34"
                    className="form-control"
                    rows="2"
                    value={formData.q34}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div> */}
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="button" className="btn btn-primary btn-lg me-2" onClick={prevStep}>
            मागे जा
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={nextStep}>
            पुढे चला
          </button>
        </div>
      </div>
    </>
  );
};

export default SchoolFormPage2;