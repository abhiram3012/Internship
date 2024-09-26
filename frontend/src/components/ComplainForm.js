import React, { useState } from 'react';

const ComplainForm = () => {
  const [problemType, setProblemType] = useState('');
  const [otherProblem, setOtherProblem] = useState('');
  const [isUnderWarranty, setIsUnderWarranty] = useState('');
  const [identifiedBy, setIdentifiedBy] = useState('');
  const [resolutionAction, setResolutionAction] = useState('');
  const [identifiedDate, setIdentifiedDate] = useState('');

  const handleProblemChange = (e) => {
    setProblemType(e.target.value);
    if (e.target.value !== 'other') {
      setOtherProblem('');
    }
  };

  const handleOtherProblemChange = (e) => {
    setOtherProblem(e.target.value);
  };

  const handleWarrantyChange = (e) => {
    setIsUnderWarranty(e.target.value);
  };

  const handleIdentifiedByChange = (e) => {
    setIdentifiedBy(e.target.value);
  };

  const handleResolutionActionChange = (e) => {
    setResolutionAction(e.target.value);
  };

  const handleIdentifiedDateChange = (e) => {
    setIdentifiedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      problemType,
      otherProblem: problemType === 'other' ? otherProblem : null,
      isUnderWarranty,
      identifiedBy,
      resolutionAction,
      identifiedDate,
    };
    console.log('Form Data:', formData);
    // Submit formData to your backend or perform other actions here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Problem Type Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          What kind of problem is it?
        </label>
        <div className="space-y-2">
          {['hardware', 'software', 'server', 'router', 'other'].map((option) => (
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
        <div className="mb-4">
          <label htmlFor="otherProblem" className="block text-gray-700 font-medium mb-2">
            Please specify the problem:
          </label>
          <input
            type="text"
            id="otherProblem"
            value={otherProblem}
            onChange={handleOtherProblemChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {/* Warranty Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Is the system under warranty?
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
                onChange={handleWarrantyChange}
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

      {/* Identified By Section */}
      <div className="mb-4">
        <label htmlFor="identifiedBy" className="block text-gray-700 font-medium mb-2">
          Who identified the problem?
        </label>
        <input
          type="text"
          id="identifiedBy"
          value={identifiedBy}
          onChange={handleIdentifiedByChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Resolution Action Section */}
      <div className="mb-4">
        <label htmlFor="resolutionAction" className="block text-gray-700 font-medium mb-2">
          What have you done to resolve this problem?
        </label>
        <input
          type="text"
          id="resolutionAction"
          value={resolutionAction}
          onChange={handleResolutionActionChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Date Identified Section */}
      <div className="mb-4">
        <label htmlFor="identifiedDate" className="block text-gray-700 font-medium mb-2">
          Date the problem was identified:
        </label>
        <input
          type="date"
          id="identifiedDate"
          value={identifiedDate}
          onChange={handleIdentifiedDateChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Warranty Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Is the system under warranty?
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
                onChange={handleWarrantyChange}
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

      {/* Identified By Section */}
      <div className="mb-4">
        <label htmlFor="identifiedBy" className="block text-gray-700 font-medium mb-2">
          Who identified the problem?
        </label>
        <input
          type="text"
          id="identifiedBy"
          value={identifiedBy}
          onChange={handleIdentifiedByChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ComplainForm;
