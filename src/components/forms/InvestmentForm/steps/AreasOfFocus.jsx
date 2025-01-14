// src/components/forms/InvestmentForm/steps/AreasOfFocus.jsx
import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { ChevronDown, ChevronUp, Info, AlertCircle } from 'lucide-react';

const priorityAreas = [
  {
    id: 'edi',
    title: 'EDI',
    fullTitle: 'Equality, Diversity & Inclusion',
    description: 'Detail your EDI initiatives and their impact on participation'
  },
  {
    id: 'participation',
    title: 'Increasing Participation',
    fullTitle: 'Increasing Participation',
    description: 'Outline strategies to increase participation across different demographics'
  },
  {
    id: 'governance',
    title: 'Governance and Leadership',
    fullTitle: 'Governance and Leadership',
    description: 'Describe your governance structure and leadership development plans'
  },
  {
    id: 'pathwayPerformance',
    title: 'Pathway and Performance',
    fullTitle: 'Pathway and Performance',
    description: 'Detail your athlete development pathway and performance targets'
  },
  {
    id: 'workforce',
    title: 'Workforce/Coaching/People',
    fullTitle: 'Workforce, Coaching and People Development',
    description: 'Outline your workforce development and coaching strategies'
  },
  {
    id: 'additionalPriorities',
    title: 'Additional National Priorities',
    fullTitle: 'Additional National Priorities',
    description: 'Address any other national priorities relevant to your organisation'
  }
];

const AreasOfFocus = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.areasOfFocus || {};
  const [expandedSection, setExpandedSection] = useState('edi');

  const handleChange = (areaId, field, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'areasOfFocus',
      data: {
        ...formData,
        [areaId]: {
          ...formData[areaId],
          [field]: value
        }
      }
    });
  };

  const getCharacterCount = (text = '') => {
    return text.length;
  };

  const MAX_CHARS = 1500;

  return (
    <div className="space-y-8">
      {/* Introduction Panel */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              Priority Areas Guidelines
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              For each priority area, please provide:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Specific objectives and planned activities</li>
                <li>How you will measure success</li>
                <li>Methods for data collection and analysis</li>
                <li>Timeline for implementation</li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      {/* Priority Areas Accordion */}
      <div className="space-y-4">
        {priorityAreas.map((area) => (
          <div
            key={area.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => setExpandedSection(expandedSection === area.id ? null : area.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900">{area.title}</span>
                {formData[area.id]?.workDescription && formData[area.id]?.dataGathering && (
                  <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sw-green text-white">
                    Complete
                  </span>
                )}
              </div>
              {expandedSection === area.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {/* Section Content */}
            {expandedSection === area.id && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="space-y-6">
                  {/* Work Description */}
                  <div>
                    <FormField
                      label="What is the work?"
                      description={`Describe your planned activities and objectives for ${area.fullTitle}`}
                      required
                      error={state.errors?.[`${area.id}WorkDescription`]}
                    >
                      <textarea
                        value={formData[area.id]?.workDescription || ''}
                        onChange={(e) => handleChange(area.id, 'workDescription', e.target.value)}
                        rows={5}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                        placeholder="Detail your specific plans and objectives..."
                        maxLength={MAX_CHARS}
                      />
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {getCharacterCount(formData[area.id]?.workDescription)} / {MAX_CHARS} characters
                        </span>
                        {getCharacterCount(formData[area.id]?.workDescription) >= MAX_CHARS * 0.9 && (
                          <span className="flex items-center text-amber-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Approaching limit
                          </span>
                        )}
                      </div>
                    </FormField>
                  </div>

                  {/* Data Gathering */}
                  <div>
                    <FormField
                      label="How will insight/data be gathered?"
                      description="Describe your methods for collecting and analyzing data"
                      required
                      error={state.errors?.[`${area.id}DataGathering`]}
                    >
                      <textarea
                        value={formData[area.id]?.dataGathering || ''}
                        onChange={(e) => handleChange(area.id, 'dataGathering', e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                        placeholder="Explain your data collection and analysis methods..."
                        maxLength={MAX_CHARS}
                      />
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {getCharacterCount(formData[area.id]?.dataGathering)} / {MAX_CHARS} characters
                        </span>
                      </div>
                    </FormField>
                  </div>

                  {/* File Upload */}
                  <div>
                    <FormField
                      label="Supporting Documents (Optional)"
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
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-sw-blue">Need Help?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                For guidance on completing this section or questions about priority areas,
                contact your Sport Wales Partnership Manager or email priorities@sport.wales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreasOfFocus;