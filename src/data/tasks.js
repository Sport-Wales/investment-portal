// src/data/tasks.js

// Document type constants
export const DOCUMENT_TYPES = {
  LIVING: 'living',
  QUARTERLY: 'quarterly',
  ANNUAL: 'annual'
};


// Main tasks array
export const tasks = [
  { 
    id: 1, 
    title: 'Organisation Details',
    description: 'Basic organisation information and contact details',
    status: 'active', 
    type: 'form',
    deadline: '2025-01-29',
    component: 'OrganisationDetails',
    documentType: DOCUMENT_TYPES.ANNUAL
  },
  { 
    id: 2, 
    title: 'Areas of focus',
    description: 'Funding request and information ', 
    status: 'disabled',
    type: 'form',
    deadline: '2025-01-09',
    component: 'InvestementRequest',
  },
  {
    id: 3,
    title: 'Financial Information',
    description: 'Financial details and requirements',
    status: 'disabled',
    type: 'form',
    deadline: '2025-02-28',
    component: 'FinancialInformation',
    documentType: DOCUMENT_TYPES.ANNUAL
  },
  {
    id: 4,
    title: 'Evaluation',
    description: 'Staff evaluation process',
    status: 'disabled',
    type: 'form',
    deadline: '2025-03-14',
    component: 'Evaluation',
    staffOnly: true,
    documentType: DOCUMENT_TYPES.ANNUAL
  },
   {
    id: 5,
    title: 'Offer',
    description: 'Review and accept offer',
    status: 'disabled',
    type: 'form',
    deadline: '2025-04-01',
    component: 'OfferLetter',
    documentType: DOCUMENT_TYPES.ANNUAL
  },
  { 
    id: 6, 
    title: 'Capability Framework - Self Assessment',
    description: 'Framework assessment documentation', 
    status: 'disabled',
    type: 'form',
    deadline: '2025-02-07',
    component: 'CapabilityFramework',
    documentType: DOCUMENT_TYPES.LIVING,
    lastUpdated: '2024-01-08'
  },
  { 
    id: 7, 
    title: 'Governance Improvement Plan (linked to self-assessment)',
    description: 'GIP requirements and updates',
    status: 'disabled',
    type: 'form', 
    deadline: '2025-02-14',
    component: 'GovernanceImprovementPlan',
    documentType: DOCUMENT_TYPES.LIVING,
    lastUpdated: '2024-01-05'
  },
 
  // {
  //   id: 7,
  //   title: 'Progress Check',
  //   description: 'Staff assessment review',
  //   status: 'disabled',
  //   type: 'form',
  //   deadline: '2025-03-07',
  //   component: 'AccountabilityCheck',
  //   staffOnly: true,
  //   documentType: DOCUMENT_TYPES.ANNUAL
  // },
   { 
    id: 8, 
    title: 'Accountability Log',
    description: 'Progress and learning documentation',
    status: 'disabled',
    type: 'form',
    deadline: '2025-02-21',
    component: 'AccountabilityLog',
    documentType: DOCUMENT_TYPES.QUARTERLY,
    quarters: ['Q1', 'Q2', 'Q3', 'Q4']
  },
  {
    id: 9,
    title: 'Sign Off',
    description: 'Final approval and sign off',
    status: 'disabled',
    type: 'form',
    deadline: '2025-03-28',
    component: 'SignOff',
    documentType: DOCUMENT_TYPES.ANNUAL
  },
 
 
  // {
  //   id: 11,
  //   title: 'Additional Documentation',
  //   description: 'Supporting documents submission',
  //   status: 'disabled',
  //   type: 'upload',
  //   deadline: '2025-03-21',
  //   component: 'AdditionalDocs',
  //   documentType: DOCUMENT_TYPES.ANNUAL
  // },
];



// Export taskSections
export const taskSections = {
  'Partnership form': {
    type: DOCUMENT_TYPES.ANNUAL,
    description: 'Funding application - Completion at beginning of year',
    tasks: [tasks[0], tasks[1], tasks[2], tasks[3]]
  },
   'Partner Investment Offer and Conditions': {
    type: DOCUMENT_TYPES.ANNUAL,
    description: 'Completion and acceptance process',
    tasks: [tasks[4]]
  },
   'Capability Area': {
    type: DOCUMENT_TYPES.LIVING,
    description: 'Supporting text to say: Governance Assurance/Organisational Development',
    tasks: [tasks[5], tasks[6]]
  },
  // 'Staff Assessment': {
  //   type: DOCUMENT_TYPES.ANNUAL,
  //   description: 'Sport Wales staff review and evaluation',
  //   tasks: [tasks[5],]
  // },
 
  'Accountability Area': {
    type: DOCUMENT_TYPES.LIVING,
    description: 'monitoring and evaluation / feedback',
    tasks: [tasks[7]]
  },
};


// Add these helper functions at the bottom of your tasks.js file
export const getNextTaskId = (currentId) => {
  const flattenedTasks = Object.values(taskSections)
    .flatMap(section => section.tasks);
  const currentIndex = flattenedTasks.findIndex(task => task.id === currentId);
  return currentIndex < flattenedTasks.length - 1 
    ? flattenedTasks[currentIndex + 1].id 
    : currentId;
};

export const getPreviousTaskId = (currentId) => {
  const flattenedTasks = Object.values(taskSections)
    .flatMap(section => section.tasks);
  const currentIndex = flattenedTasks.findIndex(task => task.id === currentId);
  return currentIndex > 0 
    ? flattenedTasks[currentIndex - 1].id 
    : currentId;
};


// Form steps array for step tracking and validation
export const steps = [
  { component: 'OrganisationDetails', key: 'organisationDetails', title: 'Organisation Details' },
  { component: 'InvestementRequest', key: 'investementRequest', title: 'Investement Request' },
  { component: 'FinancialInformation', key: 'financialInformation', title: 'Financial Information' },
  { component: 'Evaluation', key: 'evaluation', title: 'Evaluation' },
  { component: 'CapabilityFramework', key: 'capabilityFramework', title: 'Capability Framework' },
  { component: 'GovernanceImprovementPlan', key: 'governanceImprovementPlan', title: 'Governance Improvement Plan' },
  { component: 'OfferLetter', key: 'offerLetter', title: 'Offer' },
  // { component: 'AccountabilityCheck', key: 'accountabilityCheck', title: 'Accountability Check' },
  // { component: 'SignOff', key: 'signOff', title: 'Sign Off' },
  { component: 'AccountabilityLog', key: 'accountabilityLog', title: 'Accountability Log' },
  // { component: 'AdditionalDocs', key: 'additionalDocumentation', title: 'Additional Documentation' },
];



