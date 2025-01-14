
// src/components/forms/InvestmentForm/tasks/OrganisationDetails.jsx
import React from 'react'; 
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';

const OrganisationDetails = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.organisationDetails || {};

  const handleChange = (field, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'organisationDetails',
      data: { ...formData, [field]: value }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Form Content */}
      <div className="space-y-6">
        {/* Organisation & Contact Details Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Organisation Name"
            required
            helpText="Official registered name as it appears on legal documents"
          >
            <input
              type="text"
              value={formData.organisationName || ''}
              onChange={(e) => handleChange('organisationName', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue"
              placeholder="Enter organisation name"
            />
          </FormField>
  
          <FormField
            label="Contact Name"
            required
            helpText="Primary contact for this application"
          >
            <input
              type="text"
              value={formData.contactName || ''}
              onChange={(e) => handleChange('contactName', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue"
              placeholder="Full name"
            />
          </FormField>
  
          <div className="md:col-span-2">
            <FormField
              label="Organisation Address"
              required
              helpText="Main registered address"
            >
              <textarea
                value={formData.organisationAddress || ''}
                onChange={(e) => handleChange('organisationAddress', e.target.value)}
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue"
                placeholder="Enter full address including postcode"
              />
            </FormField>
          </div>
  
          <FormField
            label="Phone Number"
            required
            helpText="Business contact number"
          >
            <input
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue"
              placeholder="02920 123456"
            />
          </FormField>
  
          <FormField
            label="Email Address"
            required
            helpText="Official contact email"
          >
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue"
              placeholder="contact@organisation.com"
            />
          </FormField>
        </div>
  
        {/* VAT and Organisation Type Group */}
        <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-gray-200">
          {/* VAT Status */}
          <div className="flex-1">
            <FormField
              label="VAT Status"
              required
              helpText="VAT registration information"
            >
              <div className="space-y-2 mt-2">
                <label className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="vatRegistered"
                    checked={formData.vatRegistered === true}
                    onChange={() => handleChange('vatRegistered', true)}
                    className="h-4 w-4 text-sw-blue focus:ring-sw-blue"
                  />
                  <span className="ml-2 text-sm">VAT Registered</span>
                </label>
                <label className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="vatRegistered"
                    checked={formData.vatRegistered === false}
                    onChange={() => handleChange('vatRegistered', false)}
                    className="h-4 w-4 text-sw-blue focus:ring-sw-blue"
                  />
                  <span className="ml-2 text-sm">Not VAT Registered</span>
                </label>
              </div>
            </FormField>
          </div>
  
          {/* Organisation Type */}
          <div className="flex-1">
            <FormField
              label="Organisation Type"
              required
              helpText="Select all that apply"
            >
              <div className="space-y-2 mt-2">
                {[
                  { id: 'unincorporated', label: 'Unincorporated with Constitution' },
                  { id: 'company', label: 'Company with Articles of Association' },
                  { id: 'charity', label: 'Registered Charity' }
                ].map(({ id, label }) => (
                  <label key={id} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[id] || false}
                      onChange={(e) => handleChange(id, e.target.checked)}
                      className="h-4 w-4 rounded text-sw-blue focus:ring-sw-blue"
                    />
                    <span className="ml-2 text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </FormField>
  
            {/* Other Type Description */}
            <div className="mt-3">
              <textarea
                value={formData.otherType || ''}
                onChange={(e) => handleChange('otherType', e.target.value)}
                placeholder="Other organisation type (if applicable)"
                rows={2}
                className="w-full p-2.5 border border-gray-300 rounded focus:border-sw-blue focus:ring-1 focus:ring-sw-blue text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationDetails;