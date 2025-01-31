import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { Info, ChevronDown, ChevronUp, PoundSterling } from 'lucide-react';
import CurrencyInput from '../shared/CurrencyInput';

const workAreas = [
  { 
    id: 'edi', 
    title: 'EDI', 
    description: 'Equality, Diversity & Inclusion initiatives',
    helpText: 'Describe your plans to promote equality, diversity and inclusion in your sport'
  },
  { 
    id: 'participation', 
    title: 'Increasing Participation', 
    description: 'Growing engagement in sport',
    helpText: 'Detail your strategies for increasing participation across different demographics'
  },
  { 
    id: 'pathway', 
    title: 'Pathway & Performance', 
    description: 'Sport development and excellence',
    helpText: 'Outline your athlete development pathway and performance goals'
  },
  { 
    id: 'governance', 
    title: 'Governance & Leadership', 
    description: 'Organizational development',
    helpText: 'Describe improvements to governance structure and leadership development'
  },
  { 
    id: 'additional', 
    title: 'Additional National Priorities', 
    description: 'Other key priorities',
    helpText: 'Detail any additional national priorities'
  }
];

const InvestmentRequest = () => {
  const { state, dispatch } = useForm();
  const [expandedArea, setExpandedArea] = useState(null);
  const formData = state.formData.investmentRequest || {};
  const MAX_CHARS = 1000;

  // Updated handleChange to use the new work areas structure
  const handleWorkAreaChange = (areaId, field, value) => {
    dispatch({
      type: 'UPDATE_WORK_AREA',
      areaId,
      data: {
        [field]: value
      }
    });
  };

  const handleTotalInvestmentChange = (value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'investmentRequest',
      data: {
        ...formData,
        totalInvestment: value
      }
    });
  };

  const calculateAreaTotal = () => {
    if (!formData.workAreas) return 0;
    return Object.values(formData.workAreas).reduce((total, area) => 
      total + (area.allocation || 0), 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">What Are You Applying For?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Please outline your investment requirements and how they align with Sport Wales' key areas.
              Your responses will form the basis of your quarterly accountability reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Total Investment Request */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Total Investment Required</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Total Investment Amount"
            required
            helpText="Enter the total amount of investment you are requesting"
          >
            <CurrencyInput
              value={formData.totalInvestment || ''}
              onChange={handleTotalInvestmentChange}
              className="mt-1 block w-full"
            />
          </FormField>
        </div>
      </div>

      {/* Investment Areas */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Investment Areas</h4>
        {workAreas.map((area) => (
          <div key={area.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">{area.title}</span>
                  <div className="flex items-center space-x-4">
                    {formData.workAreas?.[area.id]?.allocation > 0 && (
                      <span className="text-sm font-medium text-sw-blue">
                        £{formData.workAreas[area.id].allocation?.toLocaleString()}
                      </span>
                    )}
                    {expandedArea === area.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{area.description}</p>
              </div>
            </button>

            {expandedArea === area.id && (
              <div className="p-6 border-t border-gray-200 bg-white space-y-6">
                {/* Key Objectives */}
                <FormField
                  label="Key Objectives"
                  required
                  helpText="What are your main objectives for this area? These will be used to track progress in your quarterly reviews."
                >
                  <textarea
                    value={formData.workAreas?.[area.id]?.objectives || ''}
                    onChange={(e) => handleWorkAreaChange(area.id, 'objectives', e.target.value)}
                    rows={4}
                    maxLength={MAX_CHARS}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue"
                    placeholder="Enter your key objectives..."
                  />
                  <div className="mt-1 text-sm text-gray-500">
                    {(formData.workAreas?.[area.id]?.objectives?.length || 0)}/{MAX_CHARS} characters
                  </div>
                </FormField>

                {/* Activities */}
                <FormField
                  label="Planned Activities"
                  required
                  helpText="Detail the specific activities and initiatives planned"
                >
                  <textarea
                    value={formData.workAreas?.[area.id]?.activities || ''}
                    onChange={(e) => handleWorkAreaChange(area.id, 'activities', e.target.value)}
                    rows={4}
                    maxLength={MAX_CHARS}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue"
                  />
                </FormField>

                {/* Expected Outcomes */}
                <FormField
                  label="Expected Outcomes"
                  required
                  helpText="What outcomes do you expect to achieve?"
                >
                  <textarea
                    value={formData.workAreas?.[area.id]?.outcomes || ''}
                    onChange={(e) => handleWorkAreaChange(area.id, 'outcomes', e.target.value)}
                    rows={3}
                    maxLength={MAX_CHARS}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue"
                  />
                </FormField>

                {/* Measurement */}
                <FormField
                  label="Measurement & Impact"
                  required
                  helpText="How will you measure success and impact?"
                >
                  <textarea
                    value={formData.workAreas?.[area.id]?.measurement || ''}
                    onChange={(e) => handleWorkAreaChange(area.id, 'measurement', e.target.value)}
                    rows={3}
                    maxLength={MAX_CHARS}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue"
                  />
                </FormField>

              </div>
            )}
          </div>
        ))}
      </div>

       {/* Commitment Confirmation Section */}
       <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Accountability Commitment</h3>
          <p className="text-sm text-gray-600">
            Partners are responsible for collating progress and learning on a minimum quarterly basis 
            and meeting with Sport Wales to discuss this.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-sm text-amber-700">
              This forms part of your contractual agreement with Sport Wales and failure to comply 
              with this will affect funding.
            </p>
          </div>
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="commitment"
                type="checkbox"
                checked={formData.commitmentConfirmed || false}
                onChange={(e) => handleCommitmentChange(e.target.checked)}
                className="h-6 w-6 mt-4 text-sw-blue focus:ring-sw-blue border-gray-300 rounded"
              />
            </div>
            <label htmlFor="commitment" className="ml-3 text-sm">
              <span className="font-medium text-gray-700">
                Please confirm your commitment to completing Accountability, progress and learning 
                and discussing this with Sport Wales
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-medium text-gray-900">Investment Summary</h4>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-sw-blue">
              £{formData.totalInvestment?.toLocaleString() || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentRequest;