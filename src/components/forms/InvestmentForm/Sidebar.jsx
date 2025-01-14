import { DOCUMENT_TYPES } from '../../../data/tasks';
import { taskSections } from '../../../data/tasks';

// src/components/forms/InvestmentForm/Sidebar.jsx
import React, { useState } from 'react';
import { 
  Check, 
  AlertCircle, 
  Save,
  Clock,
  FileEdit,
  UserCheck,
  ChevronDown,
  Calendar,
  History,
  RefreshCw,
  Home
} from 'lucide-react';

// Financial years available in the system
const financialYears = [
  { id: '2023-24', label: '2023/24', status: 'completed' },
  { id: '2024-25', label: '2024/25', status: 'current' },
  { id: '2025-26', label: '2025/26', status: 'upcoming' }
];


const Sidebar = ({ 
  currentView,
  tasks, 
  currentTask, 
  onTaskSelect, 
  expandedSections,
  onToggleSection 
}) => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  

  // Helper function to format the last updated date
  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Get deadline status with consideration for document type
  const getDeadlineStatus = (task) => {
    if (task.documentType === DOCUMENT_TYPES.LIVING) {
      return 'text-sw-blue'; // Living documents don't have traditional deadlines
    }

    const today = new Date();
    const dueDate = new Date(task.deadline);
    const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'text-sw-red';
    if (daysUntil <= 7) return 'text-sw-yellow';
    return 'text-gray-400';
  };

  // Get appropriate icon based on task status and type
  const getTaskIcon = (task) => {
    if (task.documentType === DOCUMENT_TYPES.LIVING) {
      return <RefreshCw className="w-4 h-4 text-sw-blue" />;
    }

    if (task.status === 'completed') return <Check className="w-4 h-4" />;
    if (task.status === 'pending') return <AlertCircle className="w-4 h-4" />;
    if (task.status === 'draft') return <Save className="w-4 h-4" />;
    return <span className="text-xs font-medium">{task.id}</span>;
  };

  const toggleSection = (section) => {
    onToggleSection(section);
  };


  return (
    <div className="w-[520px] min-w-[520px] max-w-[520px] bg-white border-r flex flex-col h-full overflow-hidden">
      {/* Year Selection */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center space-x-2">
          {financialYears.map(year => (
            <button
              key={year.id}
              onClick={() => setSelectedYear(year.id)}
              className={`
                flex-1 px-3 py-2 rounded-md text-sm font-medium
                transition-colors duration-200
                ${selectedYear === year.id
                  ? 'bg-sw-blue text-white'
                  : year.status === 'completed'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-white text-gray-700 border border-gray-300'
                }
              `}
            >
              {year.label}
            </button>
          ))}
        </div>
      </div>



      {/* Tasks List */}
      <div className="flex-1 overflow-auto scrollbar-hide">
        {/* Dashboard Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => onTaskSelect('dashboard')}
            className={`
              w-full flex items-center px-4 py-4 rounded-lg transition-colors
              ${currentView === 'dashboard' 
                ? 'bg-sw-blue text-white' 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
            `}
          >
            <Home className="w-5 h-5 mr-3" />
            <span className={`font-bold text-sm ${currentView === 'dashboard' 
                ? 'text-white ' 
                : ' text-gray-900'} text-gray-900`}>Dashboard</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          {Object.entries(taskSections).map(([sectionTitle, section]) => {
            const isLivingSection = section.type === DOCUMENT_TYPES.LIVING;
            const isQuarterlySection = section.type === DOCUMENT_TYPES.QUARTERLY;
            
            return (
              <div 
                key={sectionTitle} 
                className={`
                  border rounded-lg shadow-sm
                  ${isLivingSection ? 'bg-blue-50/30' : 'bg-gray-50'}
                `}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionTitle)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="font-bold text-sm text-gray-900">
                      {sectionTitle}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {section.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isLivingSection && (
                      <span className="text-xs text-sw-blue bg-blue-50 px-2 py-1 rounded-full">
                        Living Document
                      </span>
                    )}
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 text-gray-500
                        ${expandedSections[sectionTitle] ? 'rotate-180' : ''}
                      `}
                    />
                  </div>
                </button>

                {/* Tasks List */}
                {expandedSections[sectionTitle] && (
                  <div className="p-3 space-y-2 bg-white rounded-b-lg">
                    {section.tasks.map((task) => {
                      const isActive = task.id === currentTask?.id;
                      const deadlineStatus = getDeadlineStatus(task);

                      return (
                        <button
                          key={task.id}
                          onClick={() => onTaskSelect(task.id)}
                          className={`
                            w-full text-left p-3 rounded-lg border
                            transition-all duration-200
                            ${isActive 
                              ? 'border-sw-blue bg-blue-50/30' 
                              : 'border-gray-200 hover:border-sw-blue/30 bg-white'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center
                                ${task.status === 'completed' ? 'bg-sw-green text-white' : 
                                  task.status === 'pending' ? 'bg-sw-yellow text-white' :
                                  task.status === 'draft' ? 'bg-sw-blue text-white' :
                                  'bg-gray-100'
                                }
                              `}>
                                {getTaskIcon(task)}
                              </div>
                              
                              <div>
                                <div className="font-medium text-sm">
                                  {task.title}
                                </div>
                                
                                {task.documentType === DOCUMENT_TYPES.LIVING ? (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    Last updated: {formatLastUpdated(task.lastUpdated)}
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    Due: {new Date(task.deadline).toLocaleDateString('en-GB')}
                                  </div>
                                )}
                              </div>
                            </div>

                            {task.documentType === DOCUMENT_TYPES.QUARTERLY && (
                              <div className="flex space-x-1">
                                {task.quarters.map((quarter, index) => (
                                  <span
                                    key={quarter}
                                    className={`
                                      w-6 h-6 rounded-full flex items-center justify-center text-xs
                                      ${index === 0 ? 'bg-sw-blue text-white' : 'bg-gray-100 text-gray-500'}
                                    `}
                                  >
                                    {quarter}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Status Indicators */}
                          {task.documentType !== DOCUMENT_TYPES.LIVING && (
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center space-x-4">
                                <div className="flex flex-col items-center">
                                  <FileEdit 
                                    size={14} 
                                    className={task.status === 'active' ? 'text-sw-blue' : 'text-gray-300'} 
                                  />
                                  <span className="text-[10px] mt-0.5 text-gray-500">In Progress</span>
                                </div>
                                <div className="flex flex-col items-center">
                                <UserCheck 
                                    size={14} 
                                    className={task.status === 'signed' ? 'text-sw-blue' : 'text-gray-300'} 
                                  />
                                  <span className="text-[10px] mt-0.5 text-gray-500">Sign Off</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <Clock 
                                    size={14} 
                                    className={deadlineStatus} 
                                  />
                                  <span className="text-[10px] mt-0.5 text-gray-500">Deadline</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Living Document Status (Replaces traditional status indicators) */}
                          {task.documentType === DOCUMENT_TYPES.LIVING && (
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center space-x-4">
                                <div className="flex flex-col items-center">
                                  <History 
                                    size={14} 
                                    className="text-sw-blue" 
                                  />
                                  <span className="text-[10px] mt-0.5 text-gray-500">Version History</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <RefreshCw 
                                    size={14} 
                                    className="text-sw-green" 
                                  />
                                  <span className="text-[10px] mt-0.5 text-gray-500">Active Document</span>
                                </div>
                                {task.recentChanges && (
                                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                                    <span className="text-[10px] text-sw-blue">
                                      {task.recentChanges} recent changes
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Progress Summary */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2">
          <div className="text-xs text-gray-600">
            <span className="font-medium">
              {Object.values(taskSections)
                .flatMap(section => section.tasks)
                .filter(t => t.status === 'completed').length}
            </span> of{' '}
            <span className="font-medium">
              {Object.values(taskSections)
                .flatMap(section => section.tasks)
                .length}
            </span> tasks completed this year
          </div>
          
          {/* Year Progress */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-sw-blue rounded-full h-1.5 transition-all duration-300"
              style={{ 
                width: `${(Object.values(taskSections)
                  .flatMap(section => section.tasks)
                  .filter(t => t.status === 'completed').length / 
                  Object.values(taskSections)
                    .flatMap(section => section.tasks)
                    .length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;