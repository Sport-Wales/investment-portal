// // src/components/main/Sidebar.jsx
// import React, { useState } from 'react';
// import { 
//   Check, 
//   AlertCircle, 
//   Save, 
//   Menu, 
//   Clock,  
//   FileEdit,
//   UserCheck,
//   ChevronRight,
//   ChevronDown
// } from 'lucide-react';

// // New task structure with sections
// const taskSections = {
//   'Partner Details': [
//     {
//       id: 1,
//       title: 'Organisation Details',
//       description: 'Basic organisation information and contact details',
//       status: 'active',
//       type: 'form',
//       deadline: '2025-01-29',
//       component: 'OrganisationDetails'
//     }
//   ],
//   'Capability Assurance': [
//     {
//       id: 2,
//       title: 'Capability Framework',
//       description: 'Framework assessment and documentation',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-02-07',
//       component: 'CapabilityFramework'
//     },
//     {
//       id: 3,
//       title: 'Governance Improvement Plan',
//       description: 'GIP requirements and updates',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-02-14',
//       component: 'GovernanceImprovement'
//     }
//   ],
//   'Accountability': [
//     {
//       id: 4,
//       title: 'Accountability Log',
//       description: 'Progress and learning documentation',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-02-21',
//       component: 'AccountabilityLog'
//     },
//     {
//       id: 5,
//       title: 'Financial Information',
//       description: 'Financial details and requirements',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-02-28',
//       component: 'FinancialInformation'
//     }
//   ],
//   'SW Assessment Check': [
//     {
//       id: 6,
//       title: 'Accountability Check',
//       description: 'Staff assessment review',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-03-07',
//       component: 'AccountabilityCheck',
//       staffOnly: true
//     },
//     {
//       id: 7,
//       title: 'Evaluation',
//       description: 'Staff evaluation process',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-03-14',
//       component: 'Evaluation',
//       staffOnly: true
//     }
//   ],
//   'Resources and Evidence': [
//     {
//       id: 8,
//       title: 'Additional Documentation',
//       description: 'Supporting documents submission',
//       status: 'disabled',
//       type: 'upload',
//       deadline: '2025-03-21',
//       component: 'AdditionalDocs'
//     }
//   ],
//   'Acceptance': [
//     {
//       id: 9,
//       title: 'Sign Off',
//       description: 'Final approval and sign off',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-03-28',
//       component: 'SignOff'
//     },
//     {
//       id: 10,
//       title: 'Offer Letter',
//       description: 'Review and accept offer',
//       status: 'disabled',
//       type: 'form',
//       deadline: '2025-04-01',
//       component: 'OfferLetter'
//     }
//   ]
// };

// const Sidebar = ({ currentTask, onTaskSelect, completedSteps }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [expandedSections, setExpandedSections] = useState({
//     'Partner Details': true // First section expanded by default
//   });

//   const getDeadlineStatus = (deadline) => {
//     const today = new Date();
//     const dueDate = new Date(deadline);
//     const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
//     if (daysUntil < 0) return 'text-sw-red';
//     if (daysUntil <= 7) return 'text-sw-yellow';
//     return 'text-gray-400';
//   };

//   const getTaskIcon = (task) => {
//     if (task.status === 'completed') return <Check className="w-4 h-4" />;
//     if (task.status === 'pending') return <AlertCircle className="w-4 h-4" />;
//     if (task.status === 'draft') return <Save className="w-4 h-4" />;
//     return <span className="text-xs font-medium">{task.id}</span>;
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   return (
//     <div className="w-120 bg-white border-r flex flex-col h-full">
//       <div className="p-5 border-b">
//         <h2 className="font-semibold text-base text-gray-900">Tasks</h2>
//       </div>
  
//       <div className="flex-1 p-4 relative overflow-auto">
//         <div className="space-y-4">
//           {Object.entries(taskSections).map(([section, tasks]) => {
//             const isAllComplete = tasks.every(task => task.status === 'completed');
            
//             return (
//               <div key={section} className="border rounded-lg bg-gray-50 shadow-sm">
//                 <button
//                   onClick={() => toggleSection(section)}
//                   className="w-full px-4 py-4 flex items-center justify-between text-left border-b border-gray-200"
//                 >
//                   <span className="font-bold text-base text-gray-900">
//                     {section}
//                   </span>
                  
//                   <div className="flex items-center space-x-3 p-2">
//                     <ChevronDown
//                       size={16}
//                       className={`transform transition-transform duration-200 text-gray-500
//                         ${expandedSections[section] ? 'rotate-180' : ''}
//                       `}
//                     />
//                     <div className={`
//                       w-5 h-5 rounded-full border-2 flex items-center justify-center
//                       transition-all duration-200
//                       ${isAllComplete 
//                         ? 'border-sw-green bg-sw-green' 
//                         : 'border-gray-300 bg-white'
//                       }
//                     `}>
//                       <Check 
//                         size={12} 
//                         className={`transition-colors duration-200 ${
//                           isAllComplete 
//                             ? 'text-white' 
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 </button>
  
//                 {expandedSections[section] && (
//                   <div className="p-3 space-y-2.5 bg-white rounded-b-lg">
//                     {tasks.map((task) => {
//                         const isActive = task.id === currentTask?.id;
//                         const deadlineStatus = getDeadlineStatus(task.deadline);
//                         const isResourceSection = task.id === 8; // Additional Documentation ID

//                         return (
//                           <button
//                             key={task.id}
//                             onClick={() => onTaskSelect(task)}
//                             className={`
//                               w-full text-left rounded-lg
//                               border transition-all duration-200
//                               ${isActive 
//                                 ? 'border-sw-blue bg-white' 
//                                 : 'border-gray-200 hover:border-sw-blue/30 bg-white'
//                               }
//                               relative z-10
//                             `}
//                           >
//                             <div className="p-3">
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   {!isResourceSection && (
//                                     <div className={`
//                                       w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
//                                       ${task.status === 'completed' ? 'bg-sw-green text-white' : 
//                                         task.status === 'pending' ? 'bg-sw-yellow text-white' :
//                                         task.status === 'draft' ? 'bg-sw-blue text-white' :
//                                         'bg-gray-100'
//                                       }
//                                     `}>
//                                       {getTaskIcon(task)}
//                                     </div>
//                                   )}
                                  
//                                   <div className={`${isResourceSection ? '' : 'ml-3'} flex-1 min-w-0`}>
//                                     <div className="font-medium text-sm truncate">
//                                       {task.title}
//                                     </div>
//                                     {!isResourceSection && (
//                                       <div className={`text-xs mt-0.5 ${
//                                         isActive ? 'text-sw-blue' : 'text-gray-500'
//                                       }`}>
//                                         Due: {new Date(task.deadline).toLocaleDateString('en-GB')}
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex items-center justify-between space-x-4 mt-2 pt-2 border-t border-gray-100">
//                               {!isResourceSection && (
//                                 <>
//                                   <div className="flex flex-col items-center">
//                                     <FileEdit 
//                                       size={14} 
//                                       className={task.status === 'active' ? 'text-sw-blue' : 'text-gray-300'} 
//                                     />
//                                     <span className="text-[10px] mt-0.5 text-gray-500">In Progress</span>
//                                   </div>
//                                   <div className="flex flex-col items-center">
//                                     <Check 
//                                       size={14} 
//                                       className={task.status === 'completed' ? 'text-sw-green' : 'text-gray-300'} 
//                                     />
//                                     <span className="text-[10px] mt-0.5 text-gray-500">Complete</span>
//                                   </div>
//                                   <div className="flex flex-col items-center">
//                                     <UserCheck 
//                                       size={14} 
//                                       className={task.status === 'signed' ? 'text-sw-blue' : 'text-gray-300'} 
//                                     />
//                                     <span className="text-[10px] mt-0.5 text-gray-500">Sign Off</span>
//                                   </div>
//                                   <div className="flex flex-col items-center">
//                                     <Clock 
//                                       size={14} 
//                                       className={deadlineStatus} 
//                                     />
//                                     <span className="text-[10px] mt-0.5 text-gray-500">Deadline</span>
//                                   </div>
//                                 </>
//                               )}
//                               </div>
//                             </div>
//                           </button>
//                         );
//                       })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
  
//       <div className="p-4 border-t bg-gray-50">
//         <div className="text-xs text-gray-600 font-medium">
//           {Object.values(taskSections).flat().filter(t => t.status === 'completed').length} of {Object.values(taskSections).flat().length} tasks completed
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;