// src/components/dashboard/PartnerDashboard.jsx
import React from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Bell,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  PoundSterling,
  Users
} from 'lucide-react';

const PartnerDashboard = ({ tasks, notifications, onTaskSelect }) => {
  // Mock data (replace with real data)
  const progressStats = {
    completion: 65,
    daysRemaining: 15,
    tasksCompleted: 12,
    totalTasks: 47,
    pendingDocs: 2,
    currentQuarter: 'Q1',
    year: '2024/25'
  };

  const timelineEvents = [
    { 
      id: 1, 
      title: 'Capability Framework Submission', 
      date: '2025-02-28',
      status: 'urgent', // urgent, warning, complete
      type: 'deadline'
    },
    { 
      id: 2, 
      title: 'Q1 Progress Update', 
      date: '2025-03-15',
      status: 'warning',
      type: 'review'
    },
    { 
      id: 3, 
      title: 'Annual Review Meeting', 
      date: '2025-03-20',
      status: 'upcoming',
      type: 'meeting'
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'Capability Framework',
      status: 'In Progress',
      lastUpdated: '2024-01-10',
      completion: 75
    },
    {
      id: 2,
      title: 'Q1 Accountability Log',
      status: 'Pending',
      lastUpdated: '2024-01-08',
      completion: 30
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Quarterly Review Meeting',
      date: '2025-03-15',
      time: '10:00 AM'
    }
  ];

  const payments = [
    {
      id: 1,
      amount: 25000,
      status: 'Scheduled',
      date: '2025-04-01',
      quarter: 'Q1'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Progress Circle */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-sw-blue"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${2 * Math.PI * 42 * progressStats.completion / 100} ${2 * Math.PI * 42}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-sw-blue">
                  {progressStats.completion}%
                </span>
              </div>
            </div>
            <span className="mt-4 text-sm font-medium text-gray-600">Overall Progress</span>
          </div>
        </div>

      
        {/* Stats Grid */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Current Investment Period */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col text-center">
            <div className="flex items-center justify-center mb-2">
            <Calendar className="h-5 w-5 text-sw-blue" />
            <span className="ml-2 text-sm text-gray-500">Current Period</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
            <div>
                <span className="text-4xl font-bold text-gray-900">{progressStats.currentQuarter}</span>
                <span className="block text-sm text-gray-500">{progressStats.year}</span>
            </div>
            </div>
        </div>

        {/* Quarterly Update Deadline */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col text-center">
            <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-sw-blue" />
            <span className="ml-2 text-sm text-gray-500">Q1 Update Due In</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
            <div>
                <span className="text-4xl font-bold text-gray-900">{progressStats.daysRemaining}</span>
                <span className="block text-sm text-gray-500">days</span>
            </div>
            </div>
        </div>

        {/* Required Forms Status */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col text-center">
            <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-5 w-5 text-sw-green" />
            <span className="ml-2 text-sm text-gray-500">Capability Requirements</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
            <div>
                <span className="text-4xl font-bold text-gray-900">
                {progressStats.tasksCompleted}/{progressStats.totalTasks}
                </span>
                <span className="block text-sm text-gray-500">completed</span>
            </div>
            </div>
        </div>

        {/* Action Required */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col text-center">
            <div className="flex items-center justify-center mb-2">
            <AlertCircle className="h-5 w-5 text-sw-yellow" />
            <span className="ml-2 text-sm text-gray-500">Action Required</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
            <div>
                <span className="text-4xl font-bold text-sw-yellow">
                {progressStats.pendingDocs}
                </span>
                <span className="block text-sm text-gray-500">urgent items</span>
            </div>
            </div>
        </div>
        </div>
                
        
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timeline & Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              {timelineEvents.map(event => (
                <div 
                  key={event.id}
                  className={`flex items-center p-4 rounded-lg border ${
                    event.status === 'urgent' ? 'bg-red-50 border-sw-red' :
                    event.status === 'warning' ? 'bg-amber-50 border-sw-yellow' :
                    'bg-green-50 border-sw-green'
                  }`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Active Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Documents</h3>
            <div className="space-y-4">
              {documents.map(doc => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.title}</h4>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-sw-blue">
                      {doc.completion}% Complete
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-sw-blue rounded-full"
                      style={{ width: `${doc.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Notifications, Meetings & Payments */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
                <Bell className="h-5 w-5 text-sw-blue mb-4 mr-2" />
                <h3 className="text-m font-semibold text-gray-900 mb-4">Recent Notifications / Updates</h3>
            </div>
            <div className="space-y-4">
              {notifications.slice(0, 3).map(notif => (
                <div key={notif.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meetings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
            <div className="space-y-4">
              {upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-sw-blue" />
                  <div className="ml-3">
                    <h4 className="font-medium mb-2 text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule</h3>
            <div className="space-y-4">
              {payments.map(payment => (
                <div key={payment.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <PoundSterling className="h-5 w-5 text-sw-green mt-0.5" />
                  <div className="ml-3">
                    <h4 className="font-medium mb-2 text-gray-900">
                      £{payment.amount.toLocaleString()}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Scheduled for {payment.quarter}: {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;