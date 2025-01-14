// src/pages/Portal.jsx
import React, { useState, useEffect,  useRef } from 'react';
import Header from '../components/main/Header';
import Sidebar from '../components/forms/InvestmentForm/Sidebar';
import { useForm } from '../context/FormContext';
import PartnerDashboard from '../components/dashboard/PartnerDashboard';
import InvestmentForm from '../components/forms/InvestmentForm';
import { tasks as initialTasks, taskSections } from '../data/tasks'; 

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

const Portal = () => {
  const { state, dispatch } = useForm();
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [expandedSections, setExpandedSections] = useState({
    'Partner Details': true
  });

  const [currentView, setCurrentView] = useState('dashboard'); 

  const scrollContainerRef = useRef(null);

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

  // Handle task change with section management
  // Handle task change with section management
  const handleTaskChange = (taskId) => {
    if (taskId === 'dashboard') {
      setCurrentView('dashboard');
      return;
    }

    setCurrentView('form');
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

  const handleFormSubmit = async (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: 'completed' }
          : task.id === taskId + 1
          ? { ...task, status: 'active' }
          : task
      )
    );

    addNotification(`${currentTask.title} submitted successfully`);
    
    if (taskId < tasks.length) {
      
      handleTaskChange(taskId + 1);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        notifications={notifications} 
        onNotificationRead={(id) => {
          setNotifications(prev =>
            prev.map(notif =>
              notif.id === id ? { ...notif, isRead: true } : notif
            )
          );
        }}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar
          currentView={currentView}
          tasks={tasks}
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


          <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-auto bg-gray-50 p-6 scrollbar-hide">
        
        {currentView === 'dashboard' ? (
            <PartnerDashboard 
              tasks={tasks}
              notifications={notifications}
              onTaskSelect={handleTaskChange}
            />
          ) : (
        
        
          <div className="max-w-5xl mx-auto">
            {/* Task Information Banner */}
            <div className="mb-6 bg-white rounded-lg shadow p-4">
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
                {currentTask.status === 'pending' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    Pending Review
                  </span>
                )}
              </div>
            </div>
            {/* Form Content */}
            <div 
            className="bg-white rounded-lg shadow">
              <InvestmentForm 
                currentTask={currentTask}
                onSubmit={handleFormSubmit}
                onSaveDraft={() => addNotification('Draft saved successfully')}
                onTaskChange={handleTaskChange}
              />
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portal;


