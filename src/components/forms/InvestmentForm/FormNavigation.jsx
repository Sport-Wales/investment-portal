// src/components/forms/InvestmentForm/FormNavigation.jsx
import React from 'react';
import { Save, ArrowLeft, ArrowRight } from 'lucide-react';
import { getNextTaskId, getPreviousTaskId } from '../../../data/tasks';

const FormNavigation = ({ 
  onPrevious, 
  onNext, 
  onSave, 
  isFirstStep, 
  isLastStep,
  isSaving,
  isValid,
  isDirty,
  validationErrors = [],
  currentTaskId,
  totalTasks
}) => {
  const handleNext = () => {
    const nextId = getNextTaskId(currentTaskId);
    onNext(nextId);
  };

  const handlePrevious = () => {
    const prevId = getPreviousTaskId(currentTaskId);
    onPrevious(prevId);
  };


 return (
   <div className="mt-8 pt-6 border-t border-gray-200">
     <div className="flex justify-between items-center">
       {/* Previous Button */}
       <div>
         <button
           type="button"
           onClick={handlePrevious}
           disabled={isFirstStep || isSaving}
           className={`
             inline-flex items-center px-4 py-2 rounded-md 
             text-sm font-medium transition-colors duration-200 
             ${isFirstStep || isSaving
               ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
               : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
             }
           `}
         >
           <ArrowLeft className="w-4 h-4 mr-2" />
           Previous
         </button>
       </div>

       {/* Action Buttons */}
       <div className="flex space-x-4">
         {/* Save Draft Button */}
         <button
           type="button"
           onClick={onSave}
           disabled={!isDirty || isSaving}
           className={`
             inline-flex items-center px-4 py-2 rounded-md 
             text-sm font-medium transition-colors duration-200 
             ${!isDirty || isSaving
               ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
               : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
             }
           `}
         >
           <Save className="w-4 h-4 mr-2" />
           {isSaving ? 'Saving...' : 'Save Draft'}
         </button>

         {/* Next/Submit Button */}
         <button
           type="button"
           onClick={handleNext}
           disabled={!isValid || isSaving}
           className={`
             inline-flex items-center px-6 py-2 rounded-md 
             text-sm font-medium transition-colors duration-200 
             ${!isValid || isSaving
               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
               : 'bg-sw-red text-white hover:bg-opacity-90'
             }
           `}
         >
           {isLastStep ? 'Submit' : 'Next'}
           {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
         </button>
       </div>
     </div>

     {/* Status Messages */}
     <div className="mt-4">
       {/* Unsaved Changes Warning */}
       {isDirty && (
         <p className="text-sm text-amber-600 flex items-center">
           <svg 
             className="w-4 h-4 mr-2" 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               strokeWidth={2} 
               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
             />
           </svg>
           You have unsaved changes
         </p>
       )}

       {/* Validation Errors */}
       {validationErrors.length > 0 && (
         <div className="mt-2">
           <p className="text-sm text-sw-red font-medium">
             Please fix the following errors:
           </p>
           <ul className="mt-1 text-sm text-sw-red list-disc list-inside">
             {validationErrors.map((error, index) => (
               <li key={index}>{error}</li>
             ))}
           </ul>
         </div>
       )}

       {/* Saving Indicator */}
       {isSaving && (
         <p className="text-sm text-gray-500 flex items-center">
           <svg 
             className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" 
             fill="none" 
             viewBox="0 0 24 24"
           >
             <circle 
               className="opacity-25" 
               cx="12" 
               cy="12" 
               r="10" 
               stroke="currentColor" 
               strokeWidth="4" 
             />
             <path 
               className="opacity-75" 
               fill="currentColor" 
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
             />
           </svg>
           Saving your progress...
         </p>
       )}
     </div>
   </div>
 );
};

export default FormNavigation;


