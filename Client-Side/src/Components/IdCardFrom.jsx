import React, { useState } from "react";
import Webcam from "react-webcam";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import html2canvas from "html2canvas";

const IdCardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    companyName: "",
    contactNo: "",
    profileImage: null,
    email: "",
    userId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    designation: "",
    companyName: "",
    contactNo: "",
    profileImage: "",
    email: "",
  });
  // const [userId, setUserId] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const webcamRef = React.useRef(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle phone number change
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      contactNo: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      contactNo: "",
    }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          profileImage: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture image using webcam
  const handleCapture = () => {
    const image = webcamRef.current.getScreenshot();
    setFormData((prevData) => ({
      ...prevData,
      profileImage: image,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      profileImage: "",
    }));
    setIsCameraOn(false);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.designation)
      newErrors.designation = "Designation is required.";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required.";
    if (!formData.contactNo)
      newErrors.contactNo = "Contact Number is required.";
    if (!formData.profileImage)
      newErrors.profileImage = "Profile Image is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/visitor/register",
          formData
        );
        if (response.status === 201 || response.data.status === "success") {
          // Store the user ID from the response
          const newUserId = response.data.data;
          console.log("User ID from API:", newUserId); // Debug: Log the new user ID from API

          // Update formData with the new user ID
          setFormData((prevData) => ({
            ...prevData,
            userId: newUserId,
          }));

          // Wait for the state to update and then console
          setTimeout(() => {
            console.log("Updated formData after setting userId:", {
              ...formData,
              userId: newUserId,
            }); // Debug: Log updated formData
          }, 0);

          setIsFormVisible(false);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    }
  };

  // Handle ID card download
  const handleDownload = async () => {
    const cardElement = document.getElementById("id-card-preview");
    const canvas = await html2canvas(cardElement);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `ID_Card_${formData.name || "User"}.png`;
    link.click();
    let response = await axios.post(
      "http://localhost:5000/api/visitor/generateIdCard",
      {userId : formData.userId}
    );
    if(response.status === 'success' || response.status === 201){
      console.log('ID Card generated successfully');
    }
  };

  return (
    <div className="flex justify-between items-start p-6 bg-gray-100 min-h-screen">
      {/* Form Section */}
      <div
        className={`flex flex-col items-start space-y-4 bg-white p-6 rounded-lg shadow-md w-1/2 ${
          isFormVisible ? "" : "hidden"
        }`}
      >
        {/* Upload Image and Camera */}
        <div className="flex items-center justify-between space-x-4 mb-4 mt-2 w-full">
          <div className="bg-gray-100 px-4 py-4 w-9/12 rounded focus:ring-yellow-500">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>
          {!isCameraOn && (
            <button
              onClick={() => setIsCameraOn(true)}
              className="bg-yellow-500 text-white px-4 py-4 rounded shadow hover:bg-green-500 transition w-24"
            >
              Camera
            </button>
          )}
        </div>
        {isCameraOn && (
          <div className="flex flex-col space-y-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="border border-gray-300 rounded-lg transform scale-x-[-1] w-80"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleCapture}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Capture
              </button>
              <button
                onClick={() => setIsCameraOn(false)}
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
              >
                Close Camera
              </button>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <PhoneInput
          country={"ke"}
          value={formData.contactNo}
          onChange={handlePhoneChange}
          inputClass="border rounded px-5 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          inputStyle={{
            width: "100%",
            height: "40px",
          }}
        />
        {errors.contactNo && (
          <p className="text-red-500 text-xs">{errors.contactNo}</p>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          className="border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          placeholder="Enter your designation"
          className="border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        {errors.designation && (
          <p className="text-red-500 text-xs">{errors.designation}</p>
        )}

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          className="border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs">{errors.companyName}</p>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your Email"
          className="border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 w-full text-white px-4 py-4 rounded"
        >
          Generate ID Card
        </button>
      </div>

      {/* ID Card Preview */}
      <div
        id="id-card-preview"
        className="flex flex-row items-center justify-start bg-white p-6 rounded-lg shadow-md ml-8"
        style={{
          backgroundImage: "url('Pass.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "365px",
          height: "510px",
        }}
      >
        <div className="w-24 h-24 border border-gray-300 rounded-full flex flex-col items-center justify-center bg-white bg-opacity-80 mt-48 ml-5">
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full transform scale-x-[-1]"
            />
          ) : null}
        </div>
        <div className="space-y-1 ml-4 mt-48">
          <h3 className="text-black text-xl font-semibold">
            {formData.companyName || "Company Name"}
          </h3>
          <p className="text-black">{formData.designation || "Designation"}</p>
          <p className="text-black">{formData.name || "Name"}</p>
          {console.log(formData)}
          <h2>TSK100{formData.userId}</h2>
        </div>
      </div>

      {/* Download Button */}
      {!isFormVisible && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Download ID Card
          </button>
        </div>
      )}
    </div>
  );
};

export default IdCardForm;
