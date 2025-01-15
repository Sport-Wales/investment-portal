// src/components/forms/InvestmentForm/validation/formValidation.jsx

// Validation utilities
const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };
  
  const validatePhoneNumber = (phone) => {
    return /^[0-9\s+-]{10,}$/.test(phone);
  };
  
  const validateCurrency = (value) => {
    if (!value) return true;
    return !isNaN(parseFloat(value)) && value >= 0;
  };
  
  const validateDate = (date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate instanceof Date && !isNaN(selectedDate) && selectedDate <= today;
  };
  
  // Main validation function
  export const validateStep = (stepKey, data = {}) => {
    const errors = [];
  
    switch (stepKey) {
      case 'organisationDetails':
        if (!data.organisationName?.trim()) {
          errors.push('Organisation name is required');
        }
  
        if (!data.organisationAddress?.trim()) {
          errors.push('Organisation address is required');
        }
  
        // Contact Details Validation
        if (!data.contactName?.trim()) {
          errors.push('Contact name is required');
        }
  
        if (!data.email?.trim()) {
          errors.push('Email address is required');
        } else if (!validateEmail(data.email)) {
          errors.push('Please enter a valid email address');
        }
  
        if (!data.phoneNumber?.trim()) {
          errors.push('Phone number is required');
        } else if (!validatePhoneNumber(data.phoneNumber)) {
          errors.push('Please enter a valid phone number');
        }
  
        if (data.vatRegistered === undefined) {
          errors.push('VAT registration status must be selected');
        }
  
        // Organisation Type Validation
        const hasOrgType = data.unincorporated || data.company || data.charity;
        if (!hasOrgType && !data.otherType?.trim()) {
          errors.push('Please select at least one organisation type or specify other');
        }
        break;
  
      case 'capabilityGovernance':
        // GIP Document Validation
        // if (!data.gipDocument && !data.gipLink?.trim()) {
        //   errors.push('Either upload a GIP document or provide a link');
        // }
  
        if (data.gipLink?.trim() && !data.gipLink.startsWith('http')) {
          errors.push('Please enter a valid URL for GIP link');
        }
  
        // File size validation if document exists
        if (data.gipDocument && data.gipDocument.size > 10 * 1024 * 1024) {
          errors.push('GIP document must be less than 10MB');
        }
        break;
  
      case 'progressReport':
        // Progress Updates Validation
        const requiredUpdates = [
          { key: 'financeCommittee', label: 'Finance sub-committee update' },
          { key: 'financialCapability', label: 'Financial capability actions' },
          { key: 'safeguardingStandards', label: 'CPSU Safeguarding Standards' },
          { key: 'governanceImprovement', label: 'Governance Improvement Plan' }
        ];
  
        // requiredUpdates.forEach(({ key, label }) => {
        //   if (!data[key]?.trim()) {
        //     errors.push(`${label} is required`);
        //   } else if (data[key].length < 50) {
        //     errors.push(`${label} must be at least 50 characters`);
        //   }
        // });
        break;
  
      case 'areasOfFocus':
        // Priority Areas Validation
        const priorityAreas = [
          { key: 'edi', label: 'EDI' },
          { key: 'participation', label: 'Increasing Participation' },
          { key: 'governance', label: 'Governance and Leadership' },
          { key: 'pathwayPerformance', label: 'Pathway and Performance' },
          { key: 'workforce', label: 'Workforce/Coaching/People' }
        ];
  
        // priorityAreas.forEach(({ key, label }) => {
        //   if (!data[key]?.workDescription?.trim()) {
        //     errors.push(`${label}: Work description is required`);
        //   }
        //   if (!data[key]?.dataGathering?.trim()) {
        //     errors.push(`${label}: Data gathering method is required`);
        //   }
        // });
        break;
  
      case 'financialInformation':
        // // Financial Requests Validation
        // if (!validateCurrency(data.developmentSupport)) {
        //   errors.push('Development Support must be a valid amount');
        // }
        // if (!validateCurrency(data.performanceSucceed)) {
        //   errors.push('Performance & Succeed must be a valid amount');
        // }
        // if (!data.developmentSupport && !data.performanceSucceed) {
        //   errors.push('At least one funding request is required');
        // }
  
        // // GIA Allocation Validation
        // const giaFields = [
        //   { key: 'swncFacilities', label: 'SWNC Facilities' },
        //   { key: 'swncAccommodation', label: 'SWNC Accommodation' },
        //   { key: 'swncMainFacility', label: 'SWNC Main Facility' },
        //   { key: 'swncOfficeSpace', label: 'SWNC Office Space' }
        // ];
  
        // giaFields.forEach(({ key, label }) => {
        //   if (data[key] && !validateCurrency(data[key])) {
        //     errors.push(`${label} must be a valid amount`);
        //   }
        // });
        break;
  
      case 'accountability':
        // if (!data.accountabilityConfirmation) {
        //   errors.push('You must confirm the accountability requirements');
        // }
        // if (!data.privacyConsent) {
        //   errors.push('You must accept the privacy notice');
        // }
        // if (!data.termsAccepted) {
        //   errors.push('You must accept the terms and conditions');
        // }
        break;
  
      case 'signOff':
        // First Signatory
        // if (!data.signatory1Name?.trim()) {
        //   errors.push('First signatory name is required');
        // }
        // if (!data.signatory1JobTitle?.trim()) {
        //   errors.push('First signatory job title is required');
        // }
        // if (!data.signatory1Date) {
        //   errors.push('First signatory date is required');
        // } else if (!validateDate(data.signatory1Date)) {
        //   errors.push('First signatory date must be valid and not in the future');
        // }
  
        // Second Signatory
        // if (!data.signatory2Name?.trim()) {
        //   errors.push('Second signatory name is required');
        // }
        // if (!data.signatory2JobTitle?.trim()) {
        //   errors.push('Second signatory job title is required');
        // }
        // if (!data.signatory2Date) {
        //   errors.push('Second signatory date is required');
        // } else if (!validateDate(data.signatory2Date)) {
        //   errors.push('Second signatory date must be valid and not in the future');
        // }
  
        // if (!data.electronicSignature) {
        //   errors.push('Electronic signature confirmation is required');
        // }
        break;
  
      default:
        console.warn(`No validation rules found for step: ${stepKey}`);
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // Helper function to validate form data before submission
  export const validateFullForm = (formData) => {
    const steps = [
      'organisationDetails',
      'capabilityGovernance',
      'progressReport',
      'areasOfFocus',
      'financialInformation',
      'accountability',
      'signOff'
    ];
  
    const allErrors = {};
    let isValid = true;
  
    steps.forEach(step => {
      const validation = validateStep(step, formData[step]);
      if (!validation.isValid) {
        allErrors[step] = validation.errors;
        isValid = false;
      }
    });
  
    return {
      isValid,
      errors: allErrors
    };
  };
  
  export default validateStep;