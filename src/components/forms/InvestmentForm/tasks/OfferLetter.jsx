import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { Calendar, Mail, Building, User, FileText, PoundSterling, Check } from 'lucide-react';

const OfferLetter = () => {
  const { state, dispatch } = useForm();
  const formData = state.formData.offerLetter || {};
  const [acceptanceConfirmed, setAcceptanceConfirmed] = useState(true);

  const handleChange = (field, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'offerLetter',
      data: { ...formData, [field]: value }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Letter Container */}
      <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
        {/* Letter Header Section */}
        <div className="mb-12 space-y-6 border-b border-gray-200 pb-8">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                Sport Wales is the trading name of the Sports Council for Wales I Chwaraeon Cymru yw enw masnachu Cyngor Chwaraeon Cymru
              </div>
              <FormField
                label="CCGT ID"
                required
              >
                <input
                  type="text"
                  value={formData.ccgtId || '4018421'}
                  onChange={(e) => handleChange('ccgtId', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 px-4"
                />
              </FormField>
            </div>
            <div className="text-right">
              <FormField
                label="Date"
                required
              >
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.letterDate || '2024-03-11'}
                    onChange={(e) => handleChange('letterDate', e.target.value)}
                    className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 pr-4"
                  />
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="mb-12 space-y-6">
          <div className="space-y-4">
            <FormField
              label="Recipient Name and Title"
              required
            >
              <input
                type="text"
                value={formData.recipientName || 'Mr James Williams'}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                className="mt-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 px-4"
              />
            </FormField>

            <FormField
              label="Position"
              required
            >
              <input
                type="text"
                value={formData.recipientPosition || 'CEO'}
                onChange={(e) => handleChange('recipientPosition', e.target.value)}
                className="mt-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 px-4"
              />
            </FormField>

            <FormField
              label="Organisation"
              required
            >
              <input
                type="text"
                value={formData.organisation || 'Welsh Athletics'}
                onChange={(e) => handleChange('organisation', e.target.value)}
                className="mt-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 px-4"
              />
            </FormField>

            <FormField
              label="Address"
              required
            >
              <textarea
                value={formData.address || 'Cardiff International Sports Stadium\nLeckwith Road\nCardiff\nCF11 8AZ'}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={4}
                className="mt-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-2.5 px-4"
              />
            </FormField>
          </div>
        </div>

        {/* Letter Content */}
        <div className="space-y-8">
          {/* Salutation and Introduction */}
          <div className="prose max-w-none">
            <p className="text-lg mb-6">Dear {formData.recipientName?.split(' ')[1] || 'James'},</p>
            <h2 className="text-xl font-bold mb-8 tracking-tight">PARTNERSHIP AGREEMENT - 1 APRIL 2024 TO 31 MARCH 2025</h2>
            
            <div className="text-gray-700 space-y-6 leading-relaxed">
              <p>Thank you for the continued contribution that you have made during the last twelve months to the delivery of the Vision for Sport in Wales. We fully appreciate that it has been another challenging year and greatly value the role that you have played to ensure that sport remains in a strong position across Wales.</p>
              
              <p>There is still much more to be done to ensure that everyone has the opportunity to participate in sport and has access to safe, enjoyable, and developmental experiences. We are committed to supporting the sector to achieve this, whilst being conscious of the current financial climate, and some of the challenges that this will bring.</p>
              
              <p>We are delighted to continue to invest in you to deliver the agreed areas of work that you identified will make the greatest contribution to the Vision for Sport in Wales.</p>
            </div>
          </div>

          {/* Investment Details Section */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-8 text-gray-900">1. Amount of Investment:</h3>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  label="Welsh Government – Development Support"
                  required
                >
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PoundSterling className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.developmentSupport || '394741'}
                      onChange={(e) => handleChange('developmentSupport', e.target.value)}
                      className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                    />
                  </div>
                </FormField>

                <FormField
                  label="Lottery – Performance & Succeed"
                  required
                >
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PoundSterling className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={formData.performanceSucceed || '590664'}
                      onChange={(e) => handleChange('performanceSucceed', e.target.value)}
                      className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                    />
                  </div>
                </FormField>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-lg font-medium mb-6 text-gray-900">Grant In Aid (GIA) Allocation</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    label="Sport Wales National Centre Facilities"
                    required
                  >
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PoundSterling className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.facilities || '1320'}
                        onChange={(e) => handleChange('facilities', e.target.value)}
                        className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="Sport Wales National Centre Accommodation"
                    required
                  >
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PoundSterling className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.accommodation || '550'}
                        onChange={(e) => handleChange('accommodation', e.target.value)}
                        className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                      />
                    </div>
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Conditions Section */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-8 text-gray-900">2. Payment Conditions:</h3>
            
            {/* Display Evaluation Conditions */}
            {state.formData.evaluation?.conditions && (
                <div className="mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-sw-blue">
                <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-sw-blue mt-0.5" />
                    <div>
                    <h4 className="text-sm font-medium text-gray-900">Conditions from Evaluation:</h4>
                    <div className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                        {state.formData.evaluation.conditions}
                    </div>
                    </div>
                </div>
                </div>
            )}
            
            <FormField
                label="Additional Payment Conditions"
                description="Add any additional conditions that must be met before payment installments"
            >
                <textarea
                value={formData.paymentConditions || ''}
                onChange={(e) => handleChange('paymentConditions', e.target.value)}
                rows={4}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                />
            </FormField>
            </div>

            {/* Specific Expectations Section */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-8 text-gray-900">3. Specific Expectations:</h3>
            
            {/* Display Evaluation Expectations */}
            {state.formData.evaluation?.expectations && (
                <div className="mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-sw-blue">
                <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-sw-blue mt-0.5" />
                    <div>
                    <h4 className="text-sm font-medium text-gray-900">Expectations from Evaluation:</h4>
                    <div className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                        {state.formData.evaluation.expectations}
                    </div>
                    </div>
                </div>
                </div>
            )}
            
            <FormField
                label="Additional Expectations"
                description="Add any additional expectations for the organisation"
            >
                <textarea
                value={formData.expectations || ''}
                onChange={(e) => handleChange('expectations', e.target.value)}
                rows={6}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                />
            </FormField>
            </div>

          {/* Sign Off Section */}
          <div className="pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Sport Wales Sign Off */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium mb-6 text-gray-900">Sport Wales Sign Off</h4>
                <FormField
                  label="Name"
                  required
                >
                  <input
                    type="text"
                    value={formData.swSignatory || 'Joanne Nicholas'}
                    onChange={(e) => handleChange('swSignatory', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                  />
                </FormField>
                
                <FormField
                  label="Position"
                  required
                >
                  <input
                    type="text"
                    value={formData.swPosition || 'Assistant Director – Sport System Delivery & Relationships'}
                    onChange={(e) => handleChange('swPosition', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                  />
                </FormField>

                <FormField
                  label="Email"
                  required
                >
                  <input
                    type="email"
                    value={formData.swEmail || 'Joanne.nicholas@sport.wales'}
                    onChange={(e) => handleChange('swEmail', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                  />
                </FormField>
              </div>

              {/* Partner Sign Off */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium mb-6 text-gray-900">Partner Acceptance</h4>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    I, the duly authorised representative of the Recipient, hereby confirm that I have read the terms of the Offer letter, T&Cs and Capability Framework and hereby accept the Offer.
                  </p>
                  
                  <FormField
                    label="Full Name"
                    required
                  >
                    <input
                      type="text"
                      value={formData.partnerSignatory || ''}
                      onChange={(e) => handleChange('partnerSignatory', e.target.value)}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                      placeholder="Enter your full name"
                    />
                  </FormField>
                  
                  <FormField
                    label="Position"
                    required
                  >
                    <input
                      type="text"
                      value={formData.partnerPosition || ''}
                      onChange={(e) => handleChange('partnerPosition', e.target.value)}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                      placeholder="Enter your position"
                    />
                  </FormField>

                  <div className="mt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted || false}
                        onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        I accept the terms and conditions
                      </span>
                    </label>

                      {/* Accept Offer Section */}
                    <div className="mt-8 border-t pt-6">
                        <div className="bg-gray-50 p-6 rounded-lg">

                    {/* Accept Button */}
                        <button
                            onClick={()=>{}}
                            
                            className={`w-full flex justify-center items-center px-4 py-3 rounded-md text-white font-medium
                            ${acceptanceConfirmed 
                                ? 'bg-sw-blue hover:bg-opacity-90' 
                                : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            <Check className="w-5 h-5 mr-2" />
                            Accept Offer
                        </button>
                        </div>
                    </div>
                  </div>

                  <FormField
                    label="Date"
                    required
                  >
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={formData.partnerSignDate || ''}
                        onChange={(e) => handleChange('partnerSignDate', e.target.value)}
                        className="block w-full pl-12 rounded-md border-gray-300 focus:border-sw-blue focus:ring-sw-blue sm:text-sm py-3 px-4"
                      />
                    </div>
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Deadlines Notice */}
          <div className="bg-blue-50 p-6 rounded-lg mt-12 border border-blue-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-sw-blue" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-sw-blue">Important Notice</h3>
                <div className="mt-2 text-sm text-gray-700 space-y-4 leading-relaxed">
                  <p>Your organisation has 28 days (four weeks) from the date of this Offer letter to accept. If an Offer is not accepted within 28 days:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>A new Offer can be issued, but the Offer amount will be reduced by one-twelfth for each month delayed</li>
                    <li>If capability or accountability requirements are not met, an offer may be made later once met at a reduced pro-rata rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;