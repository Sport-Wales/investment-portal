// src/pages/Portal.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/main/Header';
import Sidebar from '../components/forms/InvestmentForm/Sidebar';
import PartnerListSidebar from '../components/sidebar/PartnerListSidebar';
import { useForm } from '../context/FormContext';
import InvestmentForm from '../components/forms/InvestmentForm';
import PartnerDashboard from '../components/dashboard/PartnerDashboard';
import StaffDashboard from '../components/dashboard/StaffDashboard';
import { tasks as initialTasks, taskSections } from '../data/tasks';
import { partners as partnerList } from '../data/partners'; 

const initialNotifications = [
  {
    id: 1,
    message: 'Organisation Details form is ready to complete - Deadline: January 29, 2025',
    isRead: false,
    timestamp: '2h ago',
    type: 'deadline'
  },
  {
    id: 2,
    message: 'Welcome to the Investment Portal',
    isRead: true,
    timestamp: '1d ago',
    type: 'info'
  },
];

const Portal = ({ user, onLogout }) => {
  const { state, dispatch } = useForm();
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'form'
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [expandedSections, setExpandedSections] = useState({
    'Partner Details': true
  });



  const addNotification = (message, type = 'success') => {
    setNotifications(prev => [
      {
        id: Date.now(),
        message,
        isRead: false,
        timestamp: 'Just now',
        type
      },
      ...prev
    ]);
  };

  
 

  const scrollContainerRef = useRef(null);

   // Handle partner selection (for staff view)
   const handlePartnerSelect = (partnerId) => {
    const partner = Object.values(partnerList)
      .flat()
      .find(p => p.id === partnerId);
    
    setSelectedPartner(partner.name);
    console.log("Selected Partner:", partner);
    setView('dashboard');
  };

  const handleGoBack = () => {
    setSelectedPartner(null);
    handleReturnToOverview ()
  };

   // Handle return to staff dashboard
   const handleReturnToOverview = () => {
    setSelectedPartner(null);
    setView('dashboard');
  };

  const scrollToTop = () => {
    console.log("scroll up")
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top when task changes
  useEffect(() => {
    scrollToTop();
  }, [currentTask]);


  
  


  // Find section containing task
  const findSectionForTask = (taskId) => {
    return Object.entries(taskSections).find(([_, section]) => 
      section.tasks.some(task => task.id === taskId)
    )?.[0];
  };

  // Existing task handling code...
  const handleTaskChange = (taskId) => {
    if (taskId === 'dashboard') {
      setView('dashboard');
      return;
    }
    setView('form');


    console.log("Go to Task:", taskId);
    const newTask = tasks.find(t => t.id === taskId);
    if (newTask) {
      const sectionTitle = findSectionForTask(taskId);
      
      if (sectionTitle) {
        setExpandedSections(prev => {
          if (prev[sectionTitle]) {
            return prev;
          }
          return {
            [sectionTitle]: true
          };
        });
      }
      setCurrentTask(newTask);
      dispatch({ type: 'SET_CURRENT_TASK', task: newTask });
    }
  };

  // Render appropriate sidebar based on role and view
  const renderSidebar = () => {
    if (user.role === 'staff' && !selectedPartner) {
      return (
        <PartnerListSidebar
          onBack={handleGoBack}
          partners={partnerList}
          onPartnerSelect={handlePartnerSelect}
          onReturnToOverview={handleReturnToOverview}
        />
      );
    }


    return (
      <Sidebar
        tasks={tasks}
        partner={selectedPartner}
        onBack={handleGoBack}
        currentView={view}
        currentTask={currentTask}
        onTaskSelect={handleTaskChange}
        completedSteps={state.completedSteps || []}
        expandedSections={expandedSections}
        onToggleSection={(section) => {
          setExpandedSections(prev => {
            if (prev[section]) {
              return {};
            }
            return {
              [section]: true
            };
          });
        }}
      />
    );
  };

  // Render appropriate main content based on role and view
  const renderMainContent = () => {
    if (view === 'dashboard') {
      return user.role === 'staff' && !selectedPartner ? (
        <StaffDashboard
          partners={partnerList}
          onPartnerSelect={handlePartnerSelect}
        />
      ) : (
        <PartnerDashboard
          tasks={tasks}
          notifications={notifications}
          onTaskSelect={handleTaskChange}
        />
      );
    }

    return (
      <div className="max-w-5xl mx-auto">
        {/* Task Information Banner */}
        <div className="mb-2 bg-white rounded-lg shadow p-4">
          {selectedPartner && (
            <div className="mb-4">
              <button
                onClick={handleReturnToOverview}
                className="text-sm text-sw-blue hover:underline"
              >
                ← Return to Overview
              </button>
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentTask.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Deadline: {new Date(currentTask.deadline).toLocaleDateString()}
              </p>
              {currentTask.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {currentTask.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow">
          <InvestmentForm 
            currentTask={currentTask}
            onSubmit={() => {}}
            onSaveDraft={() => addNotification('Draft saved successfully')}
            onTaskChange={handleTaskChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}  // Pass the full user object
        notifications={notifications}
        onLogout={onLogout}  // Pass the logout function
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {renderSidebar()}
        
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-auto bg-gray-50 p-6 scrollbar-hide"
        >
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default Portal;