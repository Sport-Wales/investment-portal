// src/components/forms/InvestmentForm/index.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from '../../../context/FormContext';
import FormNavigation from './FormNavigation';
import { AlertTriangle } from 'lucide-react';
import { validateStep } from './validation/formValidation';
import { steps, taskSections } from '../../../data/tasks';



import OrganisationDetails from './tasks/OrganisationDetails';
import InvestementRequest from './tasks/InvestementRequest';
import CapabilityFramework from './tasks/CapabilityFramework';
import GovernanceImprovementPlan from './tasks/GovernanceImprovementPlan';
import AccountabilityLog from './tasks/AccountabilityLog';
import FinancialInformation from './tasks/FinancialInformation';
import AccountabilityCheck from './tasks/AccountabilityCheck';
import Evaluation from './tasks/Evaluation';
import AdditionalDocs from './tasks/AdditionalDocs';
import SignOff from './tasks/SignOff';
import OfferLetter from './tasks/OfferLetter';


const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

const InvestmentForm = ({ currentTask, onSubmit, onSaveDraft, onTaskChange }) => {
  const { state, dispatch } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');



  const componentMap = {
    'OrganisationDetails': OrganisationDetails,
    'InvestementRequest': InvestementRequest,
    'FinancialInformation': FinancialInformation,
    'CapabilityFramework': CapabilityFramework,
    'GovernanceImprovementPlan': GovernanceImprovementPlan,
    'Evaluation': AccountabilityCheck,
    'AccountabilityCheck': Evaluation,
    'SignOff': SignOff,
    'OfferLetter': OfferLetter,
    'AccountabilityLog': AccountabilityLog,
    'AdditionalDocs': AdditionalDocs,
  };
 

  const CurrentStepComponent = componentMap[currentTask.component];

  // Calculate time until deadline
  useEffect(() => {
    const calculateTimeUntilDeadline = () => {
      const deadline = new Date(currentTask.deadline);
      const now = new Date();
      const difference = deadline - now;

      if (difference <= 0) {
        setTimeUntilDeadline('Deadline has passed');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setTimeUntilDeadline(`${days} days remaining`);
    };

    calculateTimeUntilDeadline();
    const timer = setInterval(calculateTimeUntilDeadline, 86400000); // Update daily

    return () => clearInterval(timer);
  }, [currentTask.deadline]);

  // Auto-save functionality
  useEffect(() => {
    if (state.isDirty) {
      const timer = setTimeout(() => {
        handleSaveDraft();
      }, AUTO_SAVE_INTERVAL);

      return () => clearTimeout(timer);
    }
  }, [state.formData, state.isDirty]);

  // Exit warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (state.isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.isDirty]);


  useEffect(() => {
    const currentStepIndex = steps.findIndex(step => step.component === currentTask.component);
    if (currentStepIndex !== -1) {
      dispatch({ type: 'SET_STEP', step: currentStepIndex });
    }
  }, [currentTask, dispatch]);


  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await onSaveDraft?.();
      dispatch({ type: 'SAVE_DRAFT' });
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async (nextTaskId) => {
    const currentStepKey = steps[state.currentStep].key;
    const validationResult = validateStep(currentStepKey, state.formData[currentStepKey]);

    // if (!validationResult.isValid) {
    //   setIsValid(false);
    //   setValidationErrors(validationResult.errors);
    //   return;
    // }

    await handleSaveDraft();
    setCompletedSteps(prev => [...new Set([...prev, state.currentStep])]);
    onTaskChange(nextTaskId);
  };

  const handlePrevious = (prevTaskId) => {
    onTaskChange(prevTaskId);
  };



  const handleSubmit = async () => {
    // const allValidationResults = steps.map(step => 
    //   validateStep(step.key, state.formData[step.key])
    // );

    // const hasErrors = allValidationResults.some(result => !result.isValid);
    // if (hasErrors) {
    //   const errors = allValidationResults
    //     .flatMap(result => result.errors)
    //     .filter(Boolean);
    //   setValidationErrors(errors);
    //   return;
    // }

    try {
      dispatch({ type: 'SUBMIT_START' });
      await onSubmit?.(currentTask.id);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      console.error('Error submitting form:', error);
      dispatch({ type: 'SUBMIT_ERROR', error });
      setValidationErrors(['Failed to submit form. Please try again.']);
    }
  };

  // Components remain the same...
  const DeadlineWarning = () => {
    if (!timeUntilDeadline.includes('days')) return null;
    
    const daysRemaining = parseInt(timeUntilDeadline);
    if (daysRemaining > 14) return null;

    return (
      <div className={`mb-6  p-4 rounded-md ${
        daysRemaining <= 7 ? 'bg-red-50' : 'bg-amber-50'
      }`}>
        <div className="flex mt-2 items-start">
          <AlertTriangle className={`w-5 h-5 mt- ${
            daysRemaining <= 7 ? 'text-sw-red' : 'text-amber-500'
          }`} />
          <div className="ml-3 ">
            <h3 className={`text-sm font-medium ${
              daysRemaining <= 7 ? 'text-sw-red' : 'text-amber-800'
            }`}>
              Submission Deadline Approaching
            </h3>
            <div className={`mt-1 text-sm ${
              daysRemaining <= 7 ? 'text-red-700' : 'text-amber-700'
            }`}>
              <p>You have {timeUntilDeadline} to complete and submit your form.</p>
              {daysRemaining <= 7 && (
                <p className="mt-1">Please ensure all sections are completed accurately before the deadline.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <DeadlineWarning />
{/*       
      <StepIndicator
        currentStep={state.currentStep}
        completedSteps={completedSteps}
        steps={steps}
      /> */}
      
      <div className="mt-4 bg-white rounded-lg shadow-sm">
        <div className="">
          {isSaving && (
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving your progress...
            </div>
          )}


        {/* Currennt task/step component */}
        <CurrentStepComponent />
          
        <FormNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSave={handleSaveDraft}
            isFirstStep={currentTask.id === 1}
            isLastStep={currentTask.id === steps.length}
            isSaving={isSaving}
            isValid={isValid}
            isDirty={state.isDirty}
            // validationErrors={validationErrors}
            currentTaskId={currentTask.id}
            totalTasks={steps.length}
          />

        </div>
      </div>

      {showExitWarning && (
        <ExitWarningModal
          onConfirm={() => setShowExitWarning(false)}
          onCancel={() => setShowExitWarning(false)}
        />
      )}
    </div>
  );
};

export default InvestmentForm;



