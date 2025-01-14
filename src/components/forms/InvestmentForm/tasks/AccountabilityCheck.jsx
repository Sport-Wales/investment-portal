// src/components/forms/InvestmentForm/tasks/FinancialInformation.jsx
import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';

import { 
  AlertCircle, 
  MessageCircle, 
  Bell, 
  Info, 
  Clock, 
  ChevronRight,
  FileCheck,
  X,
  Check
} from 'lucide-react';

const checkSections = [
  {
    title: 'Capability Framework',
    items: [
      { 
        id: 'coreReqs', 
        label: 'Core Requirements Review', 
        deadline: '2025-02-28',
        reminderTemplate: 'Core requirements need to be addressed in your Capability Framework submission.',
        formLink: '/form/capability-framework'
      },
      { 
        id: 'gipSubmitted', 
        label: 'Governance Improvement Plan', 
        deadline: '2025-02-28',
        reminderTemplate: 'Please submit your Governance Improvement Plan. This is required for funding approval.',
        formLink: '/form/capability-framework'
      },
      { 
        id: 'capabilityEvidence', 
        label: 'Supporting Evidence', 
        deadline: '2025-02-28',
        reminderTemplate: 'Please provide supporting evidence for your Capability Framework submission.',
        formLink: '/form/capability-framework'
      }
    ]
  },
  {
    title: 'Progress & Learning Log',
    items: [
      { 
        id: 'q1Update', 
        label: 'Q1 Progress Update (Apr-Jun)', 
        deadline: '2025-07-15',
        reminderTemplate: 'Q1 progress update is due. Please complete your Progress & Learning Log.',
        formLink: '/form/accountability-log'
      },
      { 
        id: 'q2Update', 
        label: 'Q2 Progress Update (Jul-Sep)', 
        deadline: '2025-10-15',
        reminderTemplate: 'Q2 progress update is due. Please complete your Progress & Learning Log.',
        formLink: '/form/accountability-log'
      },
      { 
        id: 'q3Update', 
        label: 'Q3 Progress Update (Oct-Dec)', 
        deadline: '2026-01-15',
        reminderTemplate: 'Q3 progress update is due. Please complete your Progress & Learning Log.',
        formLink: '/form/accountability-log'
      },
      { 
        id: 'q4Update', 
        label: 'Q4 Progress Update (Jan-Mar)', 
        deadline: '2026-04-15',
        reminderTemplate: 'Q4 progress update is due. Please complete your Progress & Learning Log.',
        formLink: '/form/accountability-log'
      }
    ]
  },
  {
    title: 'Financial Information',
    items: [
      { 
        id: 'financeRequest', 
        label: 'Investment Request', 
        deadline: '2025-02-28',
        reminderTemplate: 'Please submit your investment request for the upcoming period.',
        formLink: '/form/financial-information'
      },
      { 
        id: 'accountsReceived', 
        label: 'Annual Accounts', 
        deadline: '2025-09-30',
        reminderTemplate: 'Annual accounts submission is required. Please upload your latest accounts.',
        formLink: '/form/financial-information'
      }
    ]
  }
];

const AccountabilityCheck = () => {
  const { state, dispatch } = useForm();
  const [activeComment, setActiveComment] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [notificationModal, setNotificationModal] = useState({
    isOpen: false,
    item: null,
    message: ''
  });
  const formData = state.formData.accountabilityCheck || {};

  const handleCheck = (itemId, checked) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'accountabilityCheck',
      data: {
        ...formData,
        checks: {
          ...formData.checks,
          [itemId]: {
            checked,
            checkedBy: 'Staff Name',
            checkedAt: new Date().toISOString()
          }
        }
      }
    });
  };

  const handleComment = (itemId, comment) => {
    if (!comment.trim()) return;
    
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'accountabilityCheck',
      data: {
        ...formData,
        comments: {
          ...formData.comments,
          [itemId]: {
            text: comment,
            addedAt: new Date().toISOString()
          }
        }
      }
    });
    setActiveComment(null);
  };

  const openNotificationModal = (item) => {
    setNotificationModal({
      isOpen: true,
      item,
      message: item.reminderTemplate
    });
  };

  const sendNotification = () => {
    // This would integrate with your notification system
    console.log('Sending notification:', notificationModal.message);
    
    // Show success toast
    setShowToast({
      message: 'Reminder sent successfully'
    });
    
    // Close modal
    setNotificationModal({
      isOpen: false,
      item: null,
      message: ''
    });
    
    // Hide toast after delay
    setTimeout(() => setShowToast(null), 3000);
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (deadline, isChecked) => {
    if (isChecked) return 'bg-yellow-50 border-yellow-100';
    const daysLeft = getDaysUntilDeadline(deadline);
    if (daysLeft < 0) return 'bg-red-50 border-red-100';
    if (daysLeft < 14) return 'bg-amber-50 border-amber-100';
    return 'bg-white border-gray-200';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Introduction */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start space-x-3">
          <FileCheck className="h-6 w-6 text-sw-blue" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Progress Overview</h2>
            <p className="mt-2 text-sm text-gray-600">
                Please review each section of the Partner Agreement carefully by checking these items,
                you confirm Sport wales commitment assessment and observations obligations throughout
                the funding period.
                </p>
          </div>
        </div>
      </div>

      {/* Check Sections */}
      <div className="space-y-8">
        {checkSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 bg-sw-blue text-white rounded-t-lg">
              <h3 className="text-lg font-medium">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {section.items.map((item) => {
                const checkData = formData.checks?.[item.id];
                const comment = formData.comments?.[item.id];
                const daysLeft = getDaysUntilDeadline(item.deadline);
                
                return (
                  <div 
                    key={item.id}
                    className={`${getStatusColor(item.deadline, checkData?.checked)} transition-colors duration-200`}
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm  font-medium text-gray-900">
                                {item.label}
                              </span>
                              <div className="mt-1 flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className={`text-xs font-medium ${
                                  daysLeft < 0 
                                    ? 'text-red-600' 
                                    : daysLeft < 14 
                                    ? 'text-amber-600' 
                                    : 'text-gray-500'
                                }`}>
                                  {daysLeft < 0 
                                    ? 'Overdue' 
                                    : daysLeft === 0 
                                    ? 'Due today' 
                                    : `${daysLeft} days remaining`}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Comment Section */}
                          {(comment || activeComment === item.id) && (
                            <div className="mt-3">
                              {comment && (
                                <div className="bg-gray-50 rounded-md p-4">
                                  <p className="text-sm text-gray-600">{comment.text}</p>
                                  <span className="text-xs text-gray-400 mt-1 block">
                                    {new Date(comment.addedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              
                              {activeComment === item.id && (
                                <div className="mt-3">
                                  <textarea
                                    placeholder="Add your comment..."
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue text-sm px-4 py-3"
                                    rows={3}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleComment(item.id, e.target.value);
                                        e.target.value = '';
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setActiveComment(
                              activeComment === item.id ? null : item.id
                            )}
                            className={`text-gray-400 hover:text-sw-blue ${
                              activeComment === item.id ? 'text-sw-blue' : ''
                            }`}
                          >
                            <MessageCircle className="h-5 w-5" />
                          </button>
                          
                          <button 
                            className="text-gray-400 hover:text-amber-500"
                            onClick={() => openNotificationModal(item)}
                          >
                            <Bell className="h-5 w-5" />
                          </button>

                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={checkData?.checked || false}
                              onChange={(e) => handleCheck(item.id, e.target.checked)}
                              className="h-5 w-5 rounded-full text-sw-blue border-gray-300 focus:ring-sw-blue"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        ))}
      </div>

      {/* Final Confirmation */}
      <div className="bg-white mt-10 rounded-lg border border-gray-200 p-6">
        <div className="flex items-start space-x-3">
        <Check className="h-6 w-6 text-sw-green flex-shrink-0" />
        <div>
            <h3 className="text-base font-semibold text-gray-900">
            Final Confirmation
            </h3>
            <p className="mt-2 text-sm text-gray-600 mb-4">
            By checking this box, you confirm that all information provided has been reviewed and all sections of the Partner Agreement has been filled in and complete.
            
            </p>
            <div className="flex items-center">
            <input
                id="final-confirmation"
                type="checkbox"
                checked={formData.finalConfirmation || false}
                onChange={(e) => handleCheck(item.id, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
            />
            <label htmlFor="final-confirmation" className="ml-3 text-sm font-medium text-gray-700">
                I confirm all information has been completed
            </label>
            </div>
        </div>
        </div>
        </div>

      

      {/* Notification Modal */}
      {notificationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Send Reminder
              </h3>
              <button
                onClick={() => setNotificationModal({
                  isOpen: false,
                  item: null,
                  message: ''
                })}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={notificationModal.message}
                    onChange={(e) => setNotificationModal(prev => ({
                      ...prev,
                      message: e.target.value
                    }))}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue text-sm px-4 py-3"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setNotificationModal({
                  isOpen: false,
                  item: null,
                  message: ''
                })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendNotification}
                className="px-4 py-2 text-sm font-medium text-white bg-sw-blue hover:bg-opacity-90 rounded-md"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="text-sm">{showToast.message}</p>
        </div>
      )}
    </div>
  );
};

export default AccountabilityCheck;



