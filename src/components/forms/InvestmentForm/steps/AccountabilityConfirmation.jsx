// src/components/forms/InvestmentForm/steps/AccountabilityConfirmation.jsx
import React from 'react';
import { useForm } from '../../../../context/FormContext';
import { Check, AlertCircle, FileText, ChevronRight } from 'lucide-react';

const AccountabilityConfirmation = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.accountability || {};

  const handleChange = (field, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'accountability',
      data: { ...formData, [field]: value }
    });
  };

  const accountabilityItems = [
    {
      id: 'quarterlyReports',
      label: 'Quarterly Progress Reports',
      description: 'Submit detailed progress reports on a quarterly basis'
    },
    {
      id: 'financialUpdates',
      label: 'Financial Updates',
      description: 'Provide regular updates on expenditure and financial management'
    },
    {
      id: 'performanceMetrics',
      label: 'Performance Metrics',
      description: 'Track and report on agreed performance indicators'
    },
    {
      id: 'governanceStandards',
      label: 'Governance Standards',
      description: 'Maintain and demonstrate compliance with governance standards'
    },
    {
      id: 'dataProtection',
      label: 'Data Protection',
      description: 'Adhere to data protection regulations and privacy requirements'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Panel */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Accountability Commitments
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Please review each accountability requirement carefully. By checking these items,
              you confirm your organisation's commitment to meet these obligations throughout
              the funding period.
            </p>
          </div>
        </div>
      </div>

      {/* Accountability Checkboxes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {accountabilityItems.map((item) => (
            <div key={item.id} className="relative flex items-start">
              <div className="flex items-center h-6">
                <input
                  id={item.id}
                  type="checkbox"
                  checked={formData[item.id] || false}
                  onChange={(e) => handleChange(item.id, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor={item.id} className="font-medium text-gray-900">
                  {item.label}
                </label>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information Review */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Review Your Information
        </h3>
        <div className="space-y-4">
          {Object.entries(state.formData).map(([section, data]) => (
            <div
              key={section}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
            >
              <button
                onClick={() => {/* Handle navigation to section */}}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-sw-blue" />
                  <span className="ml-2 font-medium text-gray-900">
                    {section.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Privacy Notice
        </h3>
        <div className="prose prose-sm max-w-none text-gray-500">
          <p className="mb-4">
            Sport Wales collects and processes your information in accordance with our privacy policy.
            By proceeding, you confirm that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>You have read and understood our privacy policy</li>
            <li>You consent to the processing of your information as described</li>
            <li>The information provided is accurate and complete</li>
            <li>You understand how your data will be used and shared</li>
          </ul>
          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id="privacy-consent"
                  type="checkbox"
                  checked={formData.privacyConsent || false}
                  onChange={(e) => handleChange('privacyConsent', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="privacy-consent" className="text-sm text-gray-700">
                  I confirm that I have read and agree to the Privacy Notice
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Confirmation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start space-x-3">
          <Check className="h-6 w-6 text-sw-green flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Final Confirmation
            </h3>
            <p className="mt-2 text-sm text-gray-600 mb-4">
              By checking this box, you confirm that all information provided is accurate
              and that your organisation commits to meeting all accountability requirements.
            </p>
            <div className="flex items-center">
              <input
                id="final-confirmation"
                type="checkbox"
                checked={formData.finalConfirmation || false}
                onChange={(e) => handleChange('finalConfirmation', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
              />
              <label htmlFor="final-confirmation" className="ml-3 text-sm font-medium text-gray-700">
                I confirm all information is accurate and complete
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountabilityConfirmation;