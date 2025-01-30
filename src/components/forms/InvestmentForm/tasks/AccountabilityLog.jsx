// src/components/forms/InvestmentForm/tasks/AccountabilityLog.jsx

import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { Info, ChevronDown, ChevronUp, AlertCircle, ClipboardList } from 'lucide-react';

const quarters = [
  { id: 'q1', title: 'Quarter 1', period: 'April - June' },
  { id: 'q2', title: 'Quarter 2', period: 'July - September' },
  { id: 'q3', title: 'Quarter 3', period: 'October - December' },
  { id: 'q4', title: 'Quarter 4', period: 'January - March' }
];

const workAreas = [
  { id: 'edi', title: 'EDI', description: 'Equality, Diversity & Inclusion progress' },
  { id: 'participation', title: 'Increasing participation', description: 'Progress on participation initiatives' },
  { id: 'pathway', title: 'Pathway & Performance', description: 'Including performance projects' },
  { id: 'governance', title: 'Governance & Leadership', description: 'Including M2I where relevant' },
  { id: 'additional', title: 'Additional National Priorities', description: 'E.g. workforce and coaching/sustainability/health/education' }
];

const progressPeriods = [
  { id: '6month', title: '6-Month Progress' },
  { id: '12month', title: '12-Month Progress' }
]

const AccountabilityLog = () => {
    const { state, dispatch } = useForm();
    const [activeQuarter, setActiveQuarter] = useState('q4');
    const [currentQuarter, setCurrentQuarter] = useState('Quarter 4');
    const [expandedArea, setExpandedArea] = useState('edi');
    const [activeProgressPeriod, setActiveProgressPeriod] = useState('6month');
    const formData = state.formData.accountabilityLog || {};
    
    const MAX_CHARS = 1000;
  
    const handleChange = (quarterId, areaId, field, value) => {
      
      dispatch({
        type: 'SET_FORM_DATA',
        section: 'accountabilityLog',
        data: {
          ...formData,
          [quarterId]: {
            ...formData[quarterId],
            [areaId]: {
              ...formData[quarterId]?.[areaId],
              [field]: value
            }
          }
        }
      });
    };
  
    const getCharacterCount = (text = '') => text.length;
  
    const handleTabChange =(id) =>{
        setActiveQuarter(id)
        for (let i = 0; i < quarters.length; i++) {
          if (quarters[i].id === id) {
            const title = quarters[i].title;
            setCurrentQuarter(title)
            break;
          }
      }
    }
  
  
  
    const QuarterTabs = () => (
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {quarters.map((quarter) => (
            <button
              key={quarter.id}
              onClick={() => handleTabChange(quarter.id)}
              className={`
                py-4 px-6 text-m font-medium border-b-4 transition-colors duration-200
                ${activeQuarter === quarter.id 
                  ? 'border-sw-blue text-sw-blue '
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span className="font-semibold">{quarter.title}</span>
              <span className="block text-s text-gray-500 mt-0.5">{quarter.period}</span>
            </button>
          ))}
        </nav>
      </div>
    );

    const ObjectivesDisplay = ({ objectives }) => {
      if (!objectives) return null;
    
      return (
        <div className="mb-6 bg-gray-50 rounded-lg p-4 border-l-4 border-sw-blue">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <ClipboardList className="h-5 w-5 text-sw-blue mt-0.5" />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-5 text-gray-900">Key Objectives for this Area:</h4>
              <div className="mt-2 text-sm font-bold text-gray-600 whitespace-pre-wrap">
                {objectives}
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="space-y-6">
        {/* Introduction Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-sw-blue flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                Accountability Progress & Learning Log
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Complete updates for each quarter to maintain your funding agreement. 
                Progress reports inform accountability discussions and payment decisions.
              </p>
            </div>
          </div>
        </div>
  
        <QuarterTabs />
  
        {/* Work Areas Accordion */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold pt-4 pb-4 text-gray-900">{ currentQuarter } </h3>
          {workAreas.map((area) => (
            <div key={area.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900">{area.title}</span>
                  {formData[activeQuarter]?.[area.id]?.progress && (
                    <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sw-green text-white">
                      Updated
                    </span>
                  )}
                </div>
                {expandedArea === area.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
  
              {expandedArea === area.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  {/* Display objectives from InvestmentRequest */}
                  <ObjectivesDisplay 
                    objectives={state.formData.investmentRequest?.workAreas?.[area.id]?.objectives}
                  />
                  <div className="space-y-6">
                    {/* Progress Section */}
                    <FormField
                    label="Progress"
                    description="Update your progress against the objectives above"
                    required
                  >
                    <textarea
                      value={formData[activeQuarter]?.[area.id]?.progress || ''}
                      onChange={(e) => handleChange(activeQuarter, area.id, 'progress', e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      maxLength={MAX_CHARS}
                      placeholder="Describe your progress in relation to the key objectives..."
                    />
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>
                        {getCharacterCount(formData[activeQuarter]?.[area.id]?.progress)} / {MAX_CHARS}
                      </span>
                    </div>
                  </FormField>
  
                   {/* Learning Section */}
                  <FormField
                    label="Learning"
                    description="What have you learned while working towards these objectives?"
                    required
                  >
                    <textarea
                      value={formData[activeQuarter]?.[area.id]?.learning || ''}
                      onChange={(e) => handleChange(activeQuarter, area.id, 'learning', e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      maxLength={MAX_CHARS}
                      placeholder="Share your learnings based on the objectives above..."
                    />
                  </FormField>
  
                    {/* Next Steps */}
                    <FormField
                      label="Next Steps"
                      description="What are your next steps to achieve the objectives?"
                      required
                    >
                      <textarea
                        value={formData[activeQuarter]?.[area.id]?.nextSteps || ''}
                        onChange={(e) => handleChange(activeQuarter, area.id, 'nextSteps', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                        maxLength={MAX_CHARS}
                        placeholder="Outline your next steps towards achieving the objectives..."
                      />
                    </FormField>
  
                    {/* Supporting Documents */}
                    <FormField
                      label="Supporting Evidence (Optional)"
                      description="Upload any relevant documentation"
                    >
                      <input
                        type="file"
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-gray-50 file:text-sw-blue
                          hover:file:bg-gray-100"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Accepted formats: PDF, DOC, DOCX, XLS, XLSX (max 10MB)
                      </p>
                    </FormField>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
  
        {/* Additional Sections */}
        <div className="space-y-6 mt-8">
          {/* Lottery Campaigns */}
          <FormField
            label="National Lottery Campaigns"
            description="Detail any engagement with National Lottery campaigns"
          >
            <textarea
              value={formData[activeQuarter]?.lotteryEngagement || ''}
              onChange={(e) => handleChange(activeQuarter, 'general', 'lotteryEngagement', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
            />
          </FormField>
  
          {/* Feedback for Sport Wales */}
          <FormField
            label="Feedback for Sport Wales"
            description="Provide any feedback or suggestions for Sport Wales"
          >
            <textarea
              value={formData[activeQuarter]?.feedback || ''}
              onChange={(e) => handleChange(activeQuarter, 'general', 'feedback', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
            />
          </FormField>
        </div>

        {/* Progress Sign-off Section */}
          <div className="space-y-6 mt-8 bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveProgressPeriod('6month')}
                  className={`
                    py-4 px-6 text-m font-medium border-b-4 transition-colors duration-200
                    ${activeProgressPeriod === '6month' 
                      ? 'border-sw-blue text-sw-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <span className="font-semibold">6-Month Progress</span>
                </button>
                <button
                  onClick={() => setActiveProgressPeriod('12month')}
                  className={`
                    py-4 px-6 text-m font-medium border-b-4 transition-colors duration-200
                    ${activeProgressPeriod === '12month' 
                      ? 'border-sw-blue text-sw-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <span className="font-semibold">12-Month Progress</span>
                </button>
              </nav>
            </div>

            <div className="p-6 space-y-6">
              {/* Common Progress Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-sm text-gray-700">
                    Has the partner regularly discussed and completed the progress and learning log?
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-sw-blue h-4 w-4"
                        name={`progressLog-${activeProgressPeriod}`}
                        value="yes"
                        checked={formData[activeProgressPeriod]?.progressLogComplete === 'yes'}
                        onChange={(e) => handleChange(activeProgressPeriod, 'progressLogComplete', e.target.value)}
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-sw-blue h-4 w-4"
                        name={`progressLog-${activeProgressPeriod}`}
                        value="no"
                        checked={formData[activeProgressPeriod]?.progressLogComplete === 'no'}
                        onChange={(e) => handleChange(activeProgressPeriod, 'progressLogComplete', e.target.value)}
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <label className="text-sm text-gray-700">
                    Is the partner continuing to progress against their Governance Improvement Plan?
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-sw-blue h-4 w-4"
                        name={`governancePlan-${activeProgressPeriod}`}
                        value="yes"
                        checked={formData[activeProgressPeriod]?.governancePlanProgress === 'yes'}
                        onChange={(e) => handleChange(activeProgressPeriod, 'governancePlanProgress', e.target.value)}
                      />
                      <span className="ml-2 text-sm">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-sw-blue h-4 w-4"
                        name={`governancePlan-${activeProgressPeriod}`}
                        value="no"
                        checked={formData[activeProgressPeriod]?.governancePlanProgress === 'no'}
                        onChange={(e) => handleChange(activeProgressPeriod, 'governancePlanProgress', e.target.value)}
                      />
                      <span className="ml-2 text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Period Specific Questions */}
              {activeProgressPeriod === '6month' ? (
                <div className="space-y-6 mt-6">
                  <div className="bg-sw-blue bg-opacity-5 p-4 rounded-lg">
                    <h4 className="text-m font-medium text-sw-blue">6-Month Review Areas</h4>
                  </div>

                  <FormField
                    label="Government Improvement Plan Risks"
                    description="Identify any risks or concerns within the Government Improvement Plan"
                  >
                    <textarea
                      value={formData['6month']?.gipRisks || ''}
                      onChange={(e) => handleChange('6month', 'gipRisks', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      placeholder="Detail any identified risks or concerns..."
                    />
                  </FormField>

                  <FormField
                    label="Capability Framework Review"
                    description="Note any concerns or issues within the Capability Framework"
                  >
                    <textarea
                      value={formData['6month']?.capabilityFrameworkIssues || ''}
                      onChange={(e) => handleChange('6month', 'capabilityFrameworkIssues', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      placeholder="Detail any capability framework concerns..."
                    />
                  </FormField>
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  <div className="bg-sw-blue bg-opacity-5 p-4 rounded-lg">
                    <h4 className="text-m font-medium text-sw-blue">12-Month Review Areas</h4>
                  </div>

                  <FormField
                    label="Annual Underspend Assessment"
                    description="Review of annual financial position and underspend"
                  >
                    <textarea
                      value={formData['12month']?.annualUnderspend || ''}
                      onChange={(e) => handleChange('12month', 'annualUnderspend', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      placeholder="Detail the annual underspend position..."
                    />
                  </FormField>

                  <div className="space-y-4">
                    <div className="flex items-center my-8 justify-between p-4 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">
                        Request to carry forward underspend to next year?
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio py-2 text-sw-blue h-4 w-4"
                            name="carryForward"
                            value="yes"
                            checked={formData['12month']?.carryForwardRequest === 'yes'}
                            onChange={(e) => handleChange('12month', 'carryForwardRequest', e.target.value)}
                          />
                          <span className="ml-2 text-sm">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio py-2 text-sw-blue h-4 w-4"
                            name="carryForward"
                            value="no"
                            checked={formData['12month']?.carryForwardRequest === 'no'}
                            onChange={(e) => handleChange('12month', 'carryForwardRequest', e.target.value)}
                          />
                          <span className="ml-2 text-sm">No</span>
                        </label>
                      </div>
                  </div>

                    
                  <FormField
                    label="Current Underspend Review"
                    description="Review current financial position and any underspend concerns"
                  >
                    <textarea
                      value={formData['6month']?.underspendCheck || ''}
                      onChange={(e) => handleChange('6month', 'underspendCheck', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      placeholder="Detail any current underspend issues..."
                    />
                  </FormField>

                    {formData['12month']?.carryForwardRequest === 'yes' && (
                      <FormField
                        label="Carry Forward Details"
                        description="Provide details and justification for carry forward request"
                      >
                        <textarea
                          value={formData['12month']?.carryForwardDetails || ''}
                          onChange={(e) => handleChange('12month', 'carryForwardDetails', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                          placeholder="Provide details and justification for the carry forward request..."
                        />
                      </FormField>
                    )}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <FormField
                label="Comments"
                description="Are there any concerns or significant updates/risks involving the partner?"
              >
                <textarea
                  value={formData[activeProgressPeriod]?.comments || ''}
                  onChange={(e) => handleChange(activeProgressPeriod, 'comments', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                  placeholder="Detail any concerns or significant updates..."
                />
              </FormField>

              {/* Sign Off Section */}
              <div className="mt-8 space-y-6">
                <div className="border-t pt-6">
                  <h4 className="text-base font-medium text-gray-900">Sign Off</h4>
                  <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField label="Sport Wales Officer sign of (name)">
                      <input
                        type="text"
                        value={formData[activeProgressPeriod]?.officerName || ''}
                        onChange={(e) => handleChange(activeProgressPeriod, 'officerName', e.target.value)}
                        className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm"
                        placeholder="Enter officer name"
                      />
                    </FormField>
                    <FormField label="Date">
                      <input
                        type="date"
                        value={formData[activeProgressPeriod]?.officerDate || ''}
                        onChange={(e) => handleChange(activeProgressPeriod, 'officerDate', e.target.value)}
                        className="mt-1 block w-full  py-2  rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm"
                      />
                    </FormField>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField label="AD/ HoS sign off (name)">
                      <input
                        type="text"
                        value={formData[activeProgressPeriod]?.hosName || ''}
                        onChange={(e) => handleChange(activeProgressPeriod, 'hosName', e.target.value)}
                        className="mt-1 block w-full  py-2 rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm"
                        placeholder="Enter AD/HoS name"
                      />
                    </FormField>
                    <FormField label="Date">
                      <input
                        type="date"
                        value={formData[activeProgressPeriod]?.hosDate || ''}
                        onChange={(e) => handleChange(activeProgressPeriod, 'hosDate', e.target.value)}
                        className="mt-1 block w-full  py-2 rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };
  

export default AccountabilityLog;