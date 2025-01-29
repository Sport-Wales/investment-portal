// src/components/forms/InvestmentForm/tasks/Evaluation.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { isPartnerView } from '../../../../utils/roleHelpers';
import { 
  ClipboardList, 
  ChevronDown, 
  ChevronUp, 
  PoundSterling,
  FileText,
  Calendar,
  Users,
  CheckCircle,
  Info
} from 'lucide-react';

const assessmentAreas = [
  {
    id: 'edi',
    title: 'EDI',
    description: 'How the partner has engaged with Sport Wales to identify EDI opportunities and challenges'
  },
  {
    id: 'participation',
    title: 'Participation',
    description: 'Progress and initiatives in increasing participation'
  },
  {
    id: 'pathwayPerformance',
    title: 'Pathway and Performance',
    description: 'Development of pathway and performance programs'
  },
  {
    id: 'governanceLeadership',
    title: 'Governance and Leadership',
    description: 'Assessment of governance structures and leadership effectiveness'
  },
  {
    id: 'workforceCoaching',
    title: 'Workforce and Coaching',
    description: 'Development of workforce and coaching initiatives'
  },
  {
    id: 'additionalPriorities',
    title: 'Additional Priorities',
    description: 'Other key priorities and initiatives'
  }
];

const Evaluation = () => {
  const { state, dispatch } = useForm();
  const [expandedSection, setExpandedSection] = useState('overview');
  const formData = state.formData.evaluation || {};
  const isPartner = isPartnerView();

  const handleChange = (field, value) => {
    if (isPartner) return; // Prevent partners from making changes
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'evaluation',
      data: {
        ...formData,
        [field]: value
      }
    });
  };

  useEffect(() => {
    if (formData.conditions || formData.expectations) {
      dispatch({ type: 'SYNC_EVALUATION_TO_OFFER' });
    }
  }, [formData.conditions, formData.expectations]);

  const formatCurrency = (value) => {
    if (!value) return '£0';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value);
  };


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Partner View Warning Banner */}
      {isPartner && (
        <div className="bg-blue-50 border-l-4 border-sw-blue p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-sw-blue" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-sw-blue">Sport Wales Staff Evaluation</h3>
              <p className="mt-1 text-sm text-gray-700">
                This evaluation is completed by Sport Wales staff. You can view the assessment and recommendations but cannot make changes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start space-x-3">
          <ClipboardList className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Partner Evaluation</h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete the evaluation form to assess partner submissions and provide recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Assessment Areas */}
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
        <div className="px-6 py-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Assessment Areas</h3>
        </div>        
            <div className="p-6">
              <div className="mb-4">
                <FormField
                  label="Partner Assessment"
                  helpText="Please provide a general overview of the application including the following areas: EDI, Participation, Pathway and Performance, Governance and Leadership, Workforce and coaching, Additional priorities, Insight and data usage, Governance Improvement Plan progress, Accountability commitment, Sport Wales relationship, and Partner feedback."
                >
          <div className="space-y-2">
                    <p className="text-sm text-gray-500">Review should cover:</p>
                    <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                      <li>Partner engagement with Sport Wales in identifying key areas and potential opportunities/issues</li>
                      <li>EDI, Participation, and Pathway & Performance initiatives</li>
                      <li>Governance, Leadership, and Workforce development</li>
                      <li>Use of insight and data</li>
                      <li>Progress on Governance Improvement Plan</li>
                      <li>Commitment to Accountability approach</li>
                      <li>Overall relationship with Sport Wales</li>
                      <li>Partner feedback on Sport Wales' support and areas for improvement</li>
                    </ul>
                  </div>
                  <textarea
                    value={formData.assessmentOverview || ''}
                    onChange={(e) => handleChange('assessmentOverview', e.target.value)}
                    rows={12}
                    disabled={isPartner}
                    className={`mt-4 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                      isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                    placeholder={isPartner ? '' : "Enter your comprehensive assessment..."}
                  />
                </FormField>
              </div>
            </div>
      </div>

      {/* Financial Recommendations */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Investment Recommendations</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Development Support */}
          <h4 className="text-base font-medium text-gray-900 mb-8">Budget Lines</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              label="Development Support (Welsh Government)"
              required
            >
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PoundSterling className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.developmentSupport || ''}
                  onChange={(e) => handleChange('developmentSupport', e.target.value)}
                  disabled={isPartner}
                  className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                    isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                  placeholder="0.00"
                />
              </div>
            </FormField>

            <FormField
              label="Performance & Succeed (Lottery)"
              required
            >
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PoundSterling className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.performanceSucceed || ''}
                  onChange={(e) => handleChange('performanceSucceed', e.target.value)}
                  disabled={isPartner}
                  className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                    isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                  placeholder="0.00"
                />
              </div>
            </FormField>
          </div>

          {/* GIA Allocations */}
          <div className="mt-8">
            <h4 className="text-base font-medium text-gray-900 mb-8 mt-8">GIA Allocations</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { id: 'facilities', label: 'SWNC Facilities' },
                { id: 'accommodation', label: 'SWNC Accommodation' },
                { id: 'mainFacility', label: 'SWNC Main Facility' },
                { id: 'officeSpace', label: 'SWNC Office Space' }
              ].map((allocation) => (
                <FormField
                  key={allocation.id}
                  label={allocation.label}
                >
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PoundSterling className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData[allocation.id] || ''}
                      onChange={(e) => handleChange(allocation.id, e.target.value)}
                      disabled={isPartner}
                      className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                        isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                </FormField>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditions & Expectations */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Conditions & Expectations</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <FormField
            label="Conditions"
            helpText="Areas to be completed within the specified timeframe for investment release. These conditions will be included in the offer letter."
          >
            <textarea
              value={formData.conditions || ''}
              onChange={(e) => handleChange('conditions', e.target.value)}
              rows={4}
              disabled={isPartner}
              className={`block w-full rounded-md p-2 border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder={isPartner ? '' : "Enter conditions or 'none'"}
            />
          </FormField>
          
          <FormField
            label="Expectations"
            helpText="Areas for the partner to aim to complete throughout the term of the offer letter. These expectations will be included in the offer letter."
          >
            <textarea
              value={formData.expectations || ''}
              onChange={(e) => handleChange('expectations', e.target.value)}
              rows={4}
              disabled={isPartner}
              className={`block w-full rounded-md p-2 border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
              }`}
              placeholder={isPartner ? '' : "Enter expectations or 'none'"}
            />
          </FormField>
        </div>
      </div>

      {/* Sign Off Section */} 
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Evaluation Sign Off</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              label="Completed By"
              required
            >
              <input
                type="text"
                value={formData.completedBy || ''}
                onChange={(e) => handleChange('completedBy', e.target.value)}
                disabled={isPartner}
                className={`mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                  isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
            </FormField>

            <FormField
              label="Date"
              required
            >
              <input
                type="date"
                value={formData.completionDate || ''}
                onChange={(e) => handleChange('completionDate', e.target.value)}
                disabled={isPartner}
                className={`mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                  isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
            </FormField>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <FormField
              label="Decision Meeting Date"
            >
              <input
                type="date"
                value={formData.decisionDate || ''}
                onChange={(e) => handleChange('decisionDate', e.target.value)}
                disabled={isPartner}
                className={`mt-1 block w-full p-2 rounded-md mb-4 border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                  isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
            </FormField>

            <FormField
              label="Decision Makers"
              helpText="Names of staff involved in decision making"
            >
              <textarea
                value={formData.decisionMakers || ''}
                onChange={(e) => handleChange('decisionMakers', e.target.value)}
                rows={2}
                disabled={isPartner}
                className={`mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm ${
                  isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
            </FormField>
          </div>
        </div>

        {/* Financial Decision */}
        <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Sport Wales Decision on Investment</h3>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Development Support */}
                <h4 className="text-base font-medium text-gray-900 mb-8">Budget Lines</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label="Development Support (Welsh Government)"
                      required
                    >
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PoundSterling className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={formData.developmentSupport || ''}
                          onChange={(e) => handleChange('developmentSupport', e.target.value)}
                          disabled={isPartner}
                          className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                            isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                    </FormField>

                    <FormField
                      label="Performance & Succeed (Lottery)"
                      required
                    >
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PoundSterling className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={formData.performanceSucceed || ''}
                          onChange={(e) => handleChange('performanceSucceed', e.target.value)}
                          disabled={isPartner}
                          className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                            isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                    </FormField>
                </div>

                {/* GIA Allocations */}
                <div className="mt-8">
                    <h4 className="text-base font-medium text-gray-900 mb-8 mt-8">GIA Allocations</h4>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {[
                        { id: 'facilities', label: 'SWNC Facilities' },
                        { id: 'accommodation', label: 'SWNC Accommodation' },
                        { id: 'mainFacility', label: 'SWNC Main Facility' },
                        { id: 'officeSpace', label: 'SWNC Office Space' }
                      ].map((allocation) => (
                        <FormField
                          key={allocation.id}
                          label={allocation.label}
                        >
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PoundSterling className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              value={formData[allocation.id] || ''}
                              onChange={(e) => handleChange(allocation.id, e.target.value)}
                              disabled={isPartner}
                              className={`block w-full pl-10 pr-12 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md focus:ring-sw-blue focus:border-sw-blue ${
                                isPartner ? 'bg-gray-50 cursor-not-allowed' : ''
                              }`}
                              placeholder="0.00"
                            />
                          </div>
                        </FormField>
                      ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
 
export default Evaluation;

  