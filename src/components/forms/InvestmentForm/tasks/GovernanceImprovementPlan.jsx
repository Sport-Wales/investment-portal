// src/components/forms/InvestmentForm/tasks/GovernanceImprovementPlan.jsx

import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { Upload, Link, HelpCircle, X, FileText, Calendar, User, Clock } from 'lucide-react';

const GovernanceImprovementPlan = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.governanceImprovementPlan || {};
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (field, value) => {
    dispatch({
      type: 'SET_FORM_DATA', 
      section: 'governanceImprovementPlan',
      data: { ...formData, [field]: value }
    });
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      handleChange('gipDocument', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
         <h4 className="font-extrabold text-2xl text-gray-900 mb-2">Auto-Generated Governance Improvement Plan</h4>
        <div className="bg-white border border-blue-200 rounded-lg p-10 mb-4">
          <p className="text-lg text-gray-800">
            Your Governance Improvement Plan will be automatically generated based on your responses 
            in the Capability Framework self assessment. As the partner completes and updates thier capability assessments, 
            this plan will populate with relevant development areas and actions and generated the report.
          </p>
        </div>
        {/* <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Minimum Requirements:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <Calendar className="w-4 h-4 text-sw-blue mr-2" />
              Governance development areas for next 12 months
            </li>
            <li className="flex items-center">
              <User className="w-4 h-4 text-sw-blue mr-2" />
              Responsible personnel for each area
            </li>
            <li className="flex items-center">
              <Clock className="w-4 h-4 text-sw-blue mr-2" />
              Development timelines for each area
            </li>
          </ul>
        </div> */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - GIP Upload */}
        {/* <div className="space-y-6">
          <FormField
            label="Upload Your GIP Document"
            helpText="Please upload your current Governance Improvement Plan"
          >
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 ${
                dragActive ? 'border-sw-blue bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.gipDocument ? (
                <div className="flex items-center justify-between bg-white p-4 rounded-md">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-sw-blue" />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{formData.gipDocument.name}</p>
                      <p className="text-sm text-gray-500">
                        {Math.round(formData.gipDocument.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleChange('gipDocument', null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-sw-blue hover:text-sw-blue-dark">
                        Upload a file
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF or Word document up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </FormField>

          <FormField
            label="Or Provide GIP Link"
            helpText="Share a link to your GIP if stored online"
          >
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={formData.gipLink || ''}
                onChange={(e) => handleChange('gipLink', e.target.value)}
                className="block w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue"
                placeholder="https://"
              />
            </div>
          </FormField>
        </div> */}

        {/* Right Column - Requirements and Support */}
        <div className="space-y-6">
          {/* Key Development Areas */}
          {/* <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Key Development Areas</h4>
            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-start">
                <span className="w-1.5 h-1.5 bg-sw-blue rounded-full mt-1.5 mr-2 flex-shrink-0" />
                Decision-making framework review
              </p>
              <p className="flex items-start">
                <span className="w-1.5 h-1.5 bg-sw-blue rounded-full mt-1.5 mr-2 flex-shrink-0" />
                Governance Handbook development
              </p>
              <p className="flex items-start">
                <span className="w-1.5 h-1.5 bg-sw-blue rounded-full mt-1.5 mr-2 flex-shrink-0" />
                Board evaluation process
              </p>
              <p className="flex items-start">
                <span className="w-1.5 h-1.5 bg-sw-blue rounded-full mt-1.5 mr-2 flex-shrink-0" />
                Volunteer succession planning
              </p>
              <p className="flex items-start">
                <span className="w-1.5 h-1.5 bg-sw-blue rounded-full mt-1.5 mr-2 flex-shrink-0" />
                Annual appraisal process
              </p>
            </div>
          </div> */}

          {/* Support Information */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex">
              <HelpCircle className="h-5 w-5 text-sw-blue flex-shrink-0" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-sw-blue">Need Support?</h4>
                <div className="mt-2 text-sm text-gray-600">
                  <p>For guidance on your GIP, contact the Governance Team:</p>
                  <a 
                    href="mailto:Governance@sport.wales"
                    className="text-sw-blue hover:underline mt-2 block"
                  >
                    Governance@sport.wales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceImprovementPlan;