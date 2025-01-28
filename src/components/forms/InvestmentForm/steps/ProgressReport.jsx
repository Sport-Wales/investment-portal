import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { Info, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const quarters = [
  { id: 'q1', title: 'Quarter 1', period: 'April - June' },
  { id: 'q2', title: 'Quarter 2', period: 'July - September' },
  { id: 'q3', title: 'Quarter 3', period: 'October - December' },
  { id: 'q4', title: 'Quarter 4', period: 'January - March' }
];

const workAreas = [
  { id: 'edi', title: 'EDI', description: 'Equality, Diversity & Inclusion progress' },
  { id: 'participation', title: 'Increasing participation', description: 'Progress on participation initiatives' },
  { id: 'pathway', title: 'Pathway & Performance', description: 'Including performance projects' },
  { id: 'governance', title: 'Governance & Leadership', description: 'Including M2I where relevant' },
  { id: 'additional', title: 'Additional National Priorities', description: 'E.g. workforce and coaching/sustainability/health/education' }
];


const ProgressReport = () => {
  const { state, dispatch } = useForm();
  const [activeQuarter, setActiveQuarter] = useState('q1');
  const [currentQuarter, setCurrentQuarter] = useState('Quarter 1');
  const [expandedArea, setExpandedArea] = useState('edi');
  const formData = state.formData.accountabilityLog || {};
  
  const MAX_CHARS = 1000;

  const handleChange = (quarterId, areaId, field, value) => {
    
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'accountabilityLog',
      data: {
        ...formData,
        [quarterId]: {
          ...formData[quarterId],
          [areaId]: {
            ...formData[quarterId]?.[areaId],
            [field]: value
          }
        }
      }
    });
  };

  const getCharacterCount = (text = '') => text.length;

  const handleTabChange =(id) =>{
      setActiveQuarter(id)
      for (let i = 0; i < quarters.length; i++) {
        if (quarters[i].id === id) {
          const title = quarters[i].title;
          setCurrentQuarter(title)
          break;
        }
    }
  }



  const QuarterTabs = () => (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {quarters.map((quarter) => (
          <button
            key={quarter.id}
            onClick={() => handleTabChange(quarter.id)}
            className={`
              py-4 px-6 text-m font-medium border-b-4 transition-colors duration-200
              ${activeQuarter === quarter.id 
                ? 'border-sw-blue text-sw-blue '
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <span className="font-semibold">{quarter.title}</span>
            <span className="block text-s text-gray-500 mt-0.5">{quarter.period}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Introduction Panel */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">
              Accountability Progress & Learning Log
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Complete updates for each quarter to maintain your funding agreement. 
              Progress reports inform accountability discussions and payment decisions.
            </p>
          </div>
        </div>
      </div>

      <QuarterTabs />

      {/* Work Areas Accordion */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold pt-4 pb-4 text-gray-900">{ currentQuarter } </h3>
        {workAreas.map((area) => (
          <div key={area.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900">{area.title}</span>
                {formData[activeQuarter]?.[area.id]?.progress && (
                  <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sw-green text-white">
                    Updated
                  </span>
                )}
              </div>
              {expandedArea === area.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedArea === area.id && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="space-y-6">
                  {/* Progress Section */}
                  <FormField
                    label="Progress"
                    description="Detail your progress in this area during the quarter"
                    required
                  >
                    <textarea
                      value={formData[activeQuarter]?.[area.id]?.progress || ''}
                      onChange={(e) => handleChange(activeQuarter, area.id, 'progress', e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      maxLength={MAX_CHARS}
                    />
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>
                        {getCharacterCount(formData[activeQuarter]?.[area.id]?.progress)} / {MAX_CHARS}
                      </span>
                    </div>
                  </FormField>

                  {/* Learning Section */}
                  <FormField
                    label="Learning"
                    description="What have you learned from this quarter's activities?"
                    required
                  >
                    <textarea
                      value={formData[activeQuarter]?.[area.id]?.learning || ''}
                      onChange={(e) => handleChange(activeQuarter, area.id, 'learning', e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      maxLength={MAX_CHARS}
                    />
                  </FormField>

                  {/* Next Steps */}
                  <FormField
                    label="Next Steps"
                    description="Outline your planned actions based on this quarter's progress"
                    required
                  >
                    <textarea
                      value={formData[activeQuarter]?.[area.id]?.nextSteps || ''}
                      onChange={(e) => handleChange(activeQuarter, area.id, 'nextSteps', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                      maxLength={MAX_CHARS}
                    />
                  </FormField>

                  {/* Supporting Documents */}
                  <FormField
                    label="Supporting Evidence (Optional)"
                    description="Upload any relevant documentation"
                  >
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-50 file:text-sw-blue
                        hover:file:bg-gray-100"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Accepted formats: PDF, DOC, DOCX, XLS, XLSX (max 10MB)
                    </p>
                  </FormField>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="space-y-6 mt-8">
        {/* Lottery Campaigns */}
        <FormField
          label="National Lottery Campaigns"
          description="Detail any engagement with National Lottery campaigns"
        >
          <textarea
            value={formData[activeQuarter]?.lotteryEngagement || ''}
            onChange={(e) => handleChange(activeQuarter, 'general', 'lotteryEngagement', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
          />
        </FormField>

        {/* Feedback for Sport Wales */}
        <FormField
          label="Feedback for Sport Wales"
          description="Provide any feedback or suggestions for Sport Wales"
        >
          <textarea
            value={formData[activeQuarter]?.feedback || ''}
            onChange={(e) => handleChange(activeQuarter, 'general', 'feedback', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
          />
        </FormField>
      </div>
    </div>
  );
};

export default ProgressReport;