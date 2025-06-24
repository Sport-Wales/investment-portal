
// src/components/dashboard/PartnerDashboard.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  User,
  Mail,
  Clock, 
  AlertTriangle, 
  FileText, 
  Bell,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  PoundSterling,
  Users,
  Info
} from 'lucide-react';

// Improved Annotation Component
const AnnotationIcon = ({ id, note, className='' }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="relative inline-flex">
      <Info 
        className={`h-10 w-10 text-sw-green ${className}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      {isHovering && (
        <div className="absolute z-50 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-700 left-full ml-2">
          {note}
        </div>
      )}
    </div>
  );
};

const PartnerDashboard = ({ tasks, notifications, onTaskSelect }) => {
  // Mock data (replace with real data)
  const progressStats = {
    completion: 65,
    daysRemaining: 15,
    tasksCompleted: 12,
    totalTasks: 47,
    pendingDocs: 2,
    currentQuarter: 'Q4',
    year: '2024/25'
  };

  const timelineEvents = [
    { 
      id: 1, 
      title: 'Capability Framework Self-Assessment', 
      date: '2025-02-28',
      status: 'urgent', // urgent, warning, complete
      type: 'deadline'
    },
    { 
      id: 2, 
      title: 'Accountability: Q4 progress update', 
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
      title: 'Q4 Accountability Log',
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
    <div className="max-w-full mx-32 space-y-6">
      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Grid */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
          {/* Quarterly Update Deadline */}
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-sw-blue" />
              <span className="ml-2 text-sm text-gray-500">Q4 Update Due In</span>
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
              <FileText className="h-5 w-5 text-sw-yellow" />
              <span className="ml-2 text-sm text-gray-500">Supporting Evidence</span>
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
          {/* Timeline with Annotation #2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
              <AnnotationIcon 
                id="rag-rating" 
                note="RAG rate against anything where there is a date linked to it e.g. where there's an overdue tasks/submission it would turn red" 
              />
            </div>
            <div className="space-y-4">
              {timelineEvents.map(event => (
                <div 
                  key={event.id}
                  className="flex items-center p-4 rounded-lg border"
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

          {/* Active Documents with Annotation #1 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
              <AnnotationIcon 
                id="progress-indicator" 
                note="The Progress indicator at the bottom of the page should help to provide the user with an indication of partner progress against portal tasks, Allow for drilldown or hover to show more detail and deadlines data. be able to click on the to go to the task"
                className="ml-2" 
              />
            </div>
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

          {/* Add Annotation #4 - Budget and Condition Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Budget & Conditions</h3>
              <AnnotationIcon 
                id="budget-conditions" 
                note="Addition area to add which shows budget and condition progress (i.e. how much more money will be paid to parter that financial year and how many conditions left to be completed)" 
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 italic">This section will display budget information and condition progress</p>
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

          {/* Payment Schedule with Annotation #3 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
              <AnnotationIcon 
                id="payment-conditions" 
                note="Payment schedule should also include payment conditions from the (Evaluation) relevant for the year, in addition to the payment amounts and any further information needed related to the partner payment installments."
                className="ml-2" 
              />
            </div>
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

          {/* Point of Contact */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Point of Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-sw-blue mt-0.5" />
                <div className="ml-3">
                  <h4 className="font-medium mb-2 text-gray-900">
                    Have a question? Get in touch below
                  </h4>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-sw-blue mt-0.5" />
                <div className="ml-3">
                  <h4 className="font-medium mb-2 text-gray-900">
                    Jane Cooper
                  </h4>
                  <a 
                    href="mailto:investment@sportwales.org" 
                    className="text-sm text-sw-blue hover:underline inline-block"
                  >
                    <p className="text-sm text-sw-blue mt-2">
                      jane.cooper@sports.org
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;