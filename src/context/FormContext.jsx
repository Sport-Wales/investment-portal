// src/context/FormContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentStep: 0,
  formData: {
    // Partner Details
    organisationDetails: { isDraft: false },
    
    // Investment Request with Work Areas
    investmentRequest: {
      totalInvestment: '',
      workAreas: {
        edi: { 
          objectives: '',
          activities: '',
          outcomes: '',
          measurement: '',
          allocation: 0
        },
        participation: {
          objectives: '',
          activities: '',
          outcomes: '',
          measurement: '',
          allocation: 0
        },
        pathway: {
          objectives: '',
          activities: '',
          outcomes: '',
          measurement: '',
          allocation: 0
        },
        governance: {
          objectives: '',
          activities: '',
          outcomes: '',
          measurement: '',
          allocation: 0
        },
        additional: {
          objectives: '',
          activities: '',
          outcomes: '',
          measurement: '',
          allocation: 0
        }
      },
      isDraft: false
    },
    
    // Living Documents
    capabilityFramework: { isDraft: false },
    governanceImprovementPlan: { isDraft: false },
    
    // Quarterly Review with shared objectives
    accountabilityLog: {
      q1: {},
      q2: {},
      q3: {},
      q4: {},
      isDraft: false
    },
    
    financialInformation: { isDraft: false },
    additionalDocumentation: { isDraft: false },
    
    // Staff Assessment
    accountabilityCheck: { isDraft: false },
    evaluation: { 
      isDraft: false,
      conditions: '',
      expectations: '',
      developmentSupport: '',
      performanceSucceed: '',
      facilities: '',
      accommodation: '',
      mainFacility: '',
      officeSpace: '',
      isDraft: false 
    },

    
    // Final Steps
    signOff: { isDraft: false },
    offerLetter: { 
      isDraft: false,
      conditions: '', // Additional conditions beyond evaluation
      expectations: '', // Additional expectations beyond evaluation
      developmentSupport: '',
      performanceSucceed: '',
      facilities: '',
      accommodation: '',
       isDraft: false 
      }
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

      case 'SYNC_EVALUATION_TO_OFFER':
        return {
          ...state,
          formData: {
            ...state.formData,
            offerLetter: {
              ...state.formData.offerLetter,
              developmentSupport: state.formData.evaluation.developmentSupport,
              performanceSucceed: state.formData.evaluation.performanceSucceed,
              facilities: state.formData.evaluation.facilities,
              accommodation: state.formData.evaluation.accommodation,
              // Any other fields that should sync
            }
          },
          isDirty: true
        };
      
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: {
            ...state.formData[action.section],
            ...action.data
          }
        },
        isDirty: true
      };

    case 'UPDATE_WORK_AREA':
      return {
        ...state,
        formData: {
          ...state.formData,
          investmentRequest: {
            ...state.formData.investmentRequest,
            workAreas: {
              ...state.formData.investmentRequest.workAreas,
              [action.areaId]: {
                ...state.formData.investmentRequest.workAreas[action.areaId],
                ...action.data
              }
            }
          }
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