// src/components/forms/InvestmentForm/StepIndicator.jsx
import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { 
    number: 1, 
    label: 'Organisation Details',
    description: 'Basic organisation information and contact details'
  },
  { 
    number: 2, 
    label: 'Capability & Governance',
    description: 'GIP requirements and documentation'
  },
  { 
    number: 3, 
    label: 'Progress Report',
    description: 'Updates on financial and governance progress'
  },
  { 
    number: 4, 
    label: 'Areas of Focus',
    description: 'Priority areas and strategic objectives'
  },
  { 
    number: 5, 
    label: 'Financial Information',
    description: 'Funding requests and allocations'
  },
  { 
    number: 6, 
    label: 'Accountability',
    description: 'Terms and conditions review'
  },
  { 
    number: 7, 
    label: 'Sign Off',
    description: 'Final review and submission'
  }
];

const StepIndicator = ({ currentStep, completedSteps }) => {
  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              const isUpcoming = !isCompleted && !isCurrent;

              return (
                <li key={step.label} className={`relative ${
                  index !== steps.length - 1 ? 'w-full' : ''
                }`}>
                  {index !== steps.length - 1 && (
                    <div className="absolute top-4 left-0 -ml-px mt-0.5 w-full h-0.5">
                      <div className={`h-0.5 ${isCompleted ? 'bg-sw-green' : 'bg-gray-200'}`} />
                    </div>
                  )}
                  
                  <div className="relative flex flex-col items-center group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-sw-green' :
                      isCurrent ? 'bg-sw-red' :
                      'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span className={`text-sm font-semibold ${
                          isCurrent ? 'text-white' : 'text-gray-500'
                        }`}>
                          {step.number}
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute -bottom-10 w-32 text-center">
                      <p className={`text-sm font-medium truncate ${
                        isCurrent ? 'text-sw-red' :
                        isCompleted ? 'text-sw-green' :
                        'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-14 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded py-1 px-2 z-10">
                      {step.description}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default StepIndicator;