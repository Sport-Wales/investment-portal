// src/context/FormContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentStep: 0,
  formData: {
    // Partner Details
    organisationDetails: { isDraft: false },
    
    // Living Documents
    capabilityFramework: { isDraft: false },
    governanceImprovementPlan: { isDraft: false },
    
    // Quarterly Review
    accountabilityLog: { isDraft: false },
    financialInformation: { isDraft: false },
    additionalDocumentation: { isDraft: false },
    
    // Staff Assessment
    accountabilityCheck: { isDraft: false },
    evaluation: { isDraft: false },
    
    // Final Steps
    signOff: { isDraft: false },
    offerLetter: { isDraft: false }
  },
  isDirty: false,
  isSubmitting: false,
  errors: {},
  deadlines: {
    submission: '2025-01-29',
    staffReview: '2025-02-07',
    finalSignOff: '2025-02-28',
    offerAcceptance: '2025-04-01'
  }
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SAVE_DRAFT':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: {
            ...state.formData[action.section],
            isDraft: true
          }
        },
        isDirty: false
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: action.data
        },
        isDirty: true
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isDirty: false
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        errors: {
          ...state.errors,
          submit: action.error
        }
      };
    case 'SET_CURRENT_TASK':
      return {
        ...state,
        currentTask: action.task
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

const FormContext = createContext(null);
export default FormContext;