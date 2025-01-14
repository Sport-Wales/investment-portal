


// src/components/forms/InvestmentForm/tasks/FinancialInformation.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { PoundSterling, Calculator, Info, AlertCircle, CheckSquare } from 'lucide-react';

const FinancialInformation = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.financialInformation || {};
  const [totals, setTotals] = useState({
    development: 0,
    giaAllocation: 0
  });

  // Add commitment state
  const handleCommitmentChange = (checked) => {
  dispatch({
    type: 'SET_FORM_DATA',
    section: 'financialInformation',
    data: { ...formData, commitmentConfirmed: checked }
  });
  }; 

  const handleChange = (field, value) => {
  const numericValue = value === '' ? 0 : parseFloat(value);
  dispatch({
    type: 'SET_FORM_DATA',
    section: 'financialInformation',
    data: { ...formData, [field]: numericValue }
  });
  };

  useEffect(() => {
  const developmentTotal = (formData.developmentSupport || 0) + 
                          (formData.performanceSucceed || 0);

  const giaTotal = (formData.swncFacilities || 0) + 
                  (formData.swncAccommodation || 0) + 
                  (formData.swncMainFacility || 0) + 
                  (formData.swncOfficeSpace || 0);

  setTotals({
    development: developmentTotal,
    giaAllocation: giaTotal
  });
  }, [formData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value || 0);
  };

  const validateNumber = (value) => {
    return /^\d*\.?\d{0,2}$/.test(value);
  };

  return (
    <div className="space-y-8">
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

      {/* Rest of the existing Financial Information code remains unchanged */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Support Request</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Development Support */}
          <FormField
            label="Development Support"
            required
            error={state.errors?.developmentSupport}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.developmentSupport || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('developmentSupport', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>

          {/* Performance & Succeed */}
          <FormField
            label="Performance & Succeed"
            required
            error={state.errors?.performanceSucceed}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.performanceSucceed || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('performanceSucceed', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>
        </div>

        {/* Development Total Display */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">Total Development Support</span>
            </div>
            <span className="text-lg font-semibold text-sw-blue">
              {formatCurrency(totals.development)}
            </span>
          </div>
        </div>
      </div>

      {/* GIA Allocation Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GIA Allocation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SWNC Facilities */}
          <FormField
            label="SWNC Facilities"
            required
            error={state.errors?.swncFacilities}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.swncFacilities || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('swncFacilities', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>

          {/* SWNC Accommodation */}
          <FormField
            label="SWNC Accommodation"
            required
            error={state.errors?.swncAccommodation}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.swncAccommodation || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('swncAccommodation', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>

          {/* SWNC Main Facility */}
          <FormField
            label="SWNC Main Facility"
            required
            error={state.errors?.swncMainFacility}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.swncMainFacility || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('swncMainFacility', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>

          {/* SWNC Office Space */}
          <FormField
            label="SWNC Office Space"
            required
            error={state.errors?.swncOfficeSpace}
          >
            <div className="mt-4 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <PoundSterling className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.swncOfficeSpace || ''}
                onChange={(e) => {
                  if (validateNumber(e.target.value)) {
                    handleChange('swncOfficeSpace', e.target.value);
                  }
                }}
                className="focus:ring-sw-blue focus:border-sw-blue block w-full pl-8 pt-2 pb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </FormField>
        </div>

        {/* GIA Total Display */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">Total GIA Allocation</span>
            </div>
            <span className="text-lg font-semibold text-sw-blue">
              {formatCurrency(totals.giaAllocation)}
            </span>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-sw-blue">Financial Information Help</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                For assistance with financial calculations or questions about allocations,
                please contact our finance team at finance@sport.wales or call 0300 300 3111.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInformation;