import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import an icon for the tick mark

const ComplainForm = () => {
  const [problemType, setProblemType] = useState('');
  const [otherProblem, setOtherProblem] = useState('');
  const [department, setDepartment] = useState('');
  const [raisedBy, setRaisedBy] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [problemDetails, setProblemDetails] = useState('');
  const [isUnderWarranty, setIsUnderWarranty] = useState('');
  const [stepsTaken, setStepsTaken] = useState('');
  const [initialAddressedBy, setInitialAddressedBy] = useState('');
  const [deptContactPhoneNumber, setDeptContactPhoneNumber] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const handleProblemChange = (e) => {
    setProblemType(e.target.value);
    if (e.target.value !== 'other') {
      setOtherProblem('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      problemType: problemType === 'other' ? otherProblem : problemType,
      department,
      raisedBy,
      phoneNumber,
      location,
      problemDetails,
      isUnderWarranty,
      stepsTaken,
      initialAddressedBy,
      deptContactPhoneNumber,
      otherInfo,
    };

    try {
      const response = await fetch('http://localhost:5000/api/complain/raisecomplaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true); // Update submission status to true
        setTimeout(() => {
          setIsSubmitted(false); // Reset the form after a few seconds
        }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('Error submitting complaint: ' + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-4">
      {isSubmitted && (
        <div className="flex items-center bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-4">
          <FaCheckCircle className="mr-2" />
          <span>Complaint raised successfully!</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Your existing form fields go here */}
        
        {/* Department Name */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Name of the Department (Eg: EEE, ECE,...)
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Raised By */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Issue Raised by (Name of the Staff Member, Designation)
          </label>
          <input
            type="text"
            value={raisedBy}
            onChange={(e) => setRaisedBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Type of Issue */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Type of Issue
          </label>
          <div className="space-y-2">
            {['hardware', 'software', 'networking', 'cc cameras', 'other'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="problemType"
                  value={option}
                  checked={problemType === option}
                  onChange={handleProblemChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                  required
                />
                <label htmlFor={option} className="ml-2 text-gray-700">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Other Problem Input */}
        {problemType === 'other' && (
          <div className="p-4 border border-gray-300 rounded-lg">
            <label htmlFor="otherProblem" className="block text-gray-700 font-medium mb-2">
              Please specify the problem:
            </label>
            <input
              type="text"
              id="otherProblem"
              value={otherProblem}
              onChange={(e) => setOtherProblem(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Specific Location */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Specific Location (Block, Lab Name, Room No, System Number & Other Details)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Problem Details */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Specific Details of the Problem / Issue
          </label>
          <input
            type="text"
            value={problemDetails}
            onChange={(e) => setProblemDetails(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Warranty Section */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Is the System / Device / Software in Warranty Period?
          </label>
          <div className="space-y-2">
            {['yes', 'no'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name="isUnderWarranty"
                  value={option}
                  checked={isUnderWarranty === option}
                  onChange={(e) => setIsUnderWarranty(e.target.value)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                  required
                />
                <label htmlFor={option} className="ml-2 text-gray-700">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Taken */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Steps taken in the respective Department to solve the Issue - Details
          </label>
          <input
            type="text"
            value={stepsTaken}
            onChange={(e) => setStepsTaken(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Initial Addressed By */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Addressed by (If any)
          </label>
          <input
            type="text"
            value={initialAddressedBy}
            onChange={(e) => setInitialAddressedBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Department Contact Phone Number */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Contact Phone Number of the Department
          </label>
          <input
            type="text"
            value={deptContactPhoneNumber}
            onChange={(e) => setDeptContactPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Other Information */}
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="block text-gray-700 font-medium mb-2">
            Other Relevant Information (If Any)
          </label>
          <input
            type="text"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Raise Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplainForm;
