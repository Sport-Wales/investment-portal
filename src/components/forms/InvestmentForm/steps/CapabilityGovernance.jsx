import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
// import { capabilityFrameworkData } from '../../../../data/capabilityFramework';
import { 
  ChevronDown, 
  ChevronUp, 
  Info, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';

{/* <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-4">
          The Capability Framework identifies the essential and minimum requirements expected 
          of an organisation looking to receive funding as a partner of Sport Wales.
        </p>
        <div className="flex items-center mt-4 text-sm text-sw-blue">
          <ExternalLink className="h-4 w-4 mr-2" />
          <a href="#" className="hover:underline">
            View Full Framework Documentation
          </a>
        </div>
        
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex">
            <Info className="h-5 w-5 text-sw-blue flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-sw-blue">Important Note</h3>
              <p className="mt-2 text-sm text-blue-700">
                All organisations must meet the Essential Requirements before investment can be awarded. 
                High Funded organisations must also meet the Minimum Requirements.
              </p>
            </div>
          </div>
        </div> */}

const capabilityFrameworkData = {
  principles: [
    {
      id: 'p1',
      title: 'Principle 1 - Organisational / Legal Compliance',
      description: 'This section is around legal compliance and elements of the significant risk that Sport Wales requires you to address.',
      coreRequirements: [
        {
          id: 'p1-core1',
          title: 'Governing Document(s) and Review',
          outcomeStatement: 'The organisation has Governing Document(s) that clearly shows its purpose, outlines how it operates, is understood by all, and remains fit for purpose.',
          what: 'The organisation is incorporated with Governing Document(s) that are reviewed at least every two years.',
          why: "The organisation's Governing Document(s) set its purpose and define its legal status. It also sets the rules that company officers must follow when running the company. This is vital for open and transparent governance.",
          how: "Registered organisations must provide their Governing Document(s) to Companies House and/or Charities Commission. Governing Document(s) should be reviewed, as a minimum, every two years, with any amendments approved by the board."
        },
        {
          id: 'p1-core2',
          title: 'Safeguarding Children and Adults',
          outcomeStatement: 'Everyone is protected and safe to enjoy sport without harm.',
          what: 'The organisation is totally committed and competent in providing safe sport. This commitment is embedded throughout the organisation.',
          why: 'Protection of children and adults at risk is a fundamental responsibility of any sporting organisation.',
          how: 'Through implementation of robust safeguarding policies, procedures and regular training.'
        },
        {
          id: 'p1-core3',
          title: 'Insurance',
          outcomeStatement: 'The organisation and its participants are protected legally from risk.',
          what: 'The organisation has insurance arrangements to protect its activities, resources and people.',
          why: 'To ensure proper protection against risks and liabilities.',
          how: 'Through maintaining appropriate insurance coverage and regular review of policies.'
        },
        {
          id: 'p1-core4',
          title: 'Complaints and Whistleblowing',
          outcomeStatement: 'The organisation promotes an environment where people feel free and encouraged to share concerns and complaints.',
          what: 'Clear, easy-to-understand, and accessible policies and procedures for raising issues, complaints, and grievances.',
          why: 'To ensure transparency and accountability within the organisation.',
          how: 'Through established procedures and regular communication channels.'
        },
        {
          id: 'p1-core5',
          title: 'Comply with Legal Requirements',
          outcomeStatement: "The organisation's operations abide by the law.",
          what: 'The organisation is aware and understands which legal and regulatory obligations are relevant to them.',
          why: 'To ensure compliance with all relevant laws and regulations.',
          how: 'Through regular legal reviews and updates to policies.'
        },
        {
          id: 'p1-core6',
          title: 'Clean Sport / Anti-Doping',
          outcomeStatement: 'An environment of confidence in clean sport which protects from harm and ensures fairness in competition.',
          what: 'The organisation has a clear understanding, stance and actions in ensuring sport remains clean.',
          why: 'To maintain integrity in sport and protect athletes.',
          how: 'Through anti-doping policies and education programs.'
        },
        {
          id: 'p1-core7',
          title: 'Welsh Language',
          outcomeStatement: 'The organisation considers and implements suitable arrangements for Welsh language provision.',
          what: 'The organisation shows a commitment to making a positive impact on the use Welsh language.',
          why: 'To ensure accessibility and inclusion for Welsh speakers.',
          how: 'Through Welsh language policy implementation and bilingual communication.'
        },
        {
          id: 'p1-core8',
          title: 'Environmental Sustainability',
          outcomeStatement: 'The organisation is aware of its role in environmental sustainability and biodiversity.',
          what: 'The organisation shows a commitment to making a positive impact on the environment.',
          why: 'To ensure sustainable practices and environmental responsibility.',
          how: 'Through environmental policy implementation and sustainable practices.'
        }
      ],
      goodPractices: [
        {
          id: 'p1-good1',
          title: 'Environmental, Social and Governance Framework',
          outcomeStatement: 'The organisation can outline the environmental, social, and governance considerations.',
          what: 'The board ensures it considers the impacts on people and the planet when making decisions.',
          why: 'To ensure sustainable and responsible organisational practices.',
          how: 'Through comprehensive ESG framework implementation.'
        }
      ]
    },
    {
      id: 'p2',
      title: 'Principle 2 - People and Cultures',
      description: 'This section aims to ensure that organisations are built on the foundation of great people, ensuring that a strong culture of integrity, inclusivity and diversity of skill are combined with clear values.',
      coreRequirements: [
        {
          id: 'p2-core1',
          title: 'Leadership and Culture',
          outcomeStatement: 'Strong leadership promoting positive organisational culture.',
          what: 'Leadership sets clear direction and values.',
          why: 'To ensure effective organisational development.',
          how: 'Through leadership training and cultural initiatives.'
        }
        // Add remaining core requirements (5 total)
      ],
      goodPractices: [
        {
          id: 'p2-good1',
          title: 'Board Review and Evaluation',
          outcomeStatement: 'The board can understand its strengths and areas for development as a collective.',
          what: 'The board is led by learning and insights, developing and improving in areas of weakness.',
          why: 'Increased accountability embeds organisational culture.',
          how: 'Regular board and individual reviews, annual self-reviews and board evaluations.'
        }
        // Add remaining good practices (7 total)
      ]
    },
    {
      id: 'p3',
      title: 'Principle 3 - Insight, Engagement & Strategy',
      description: 'This section focuses on how organisations use insight and engage with stakeholders to inform their strategic direction.',
      coreRequirements: [
        {
          id: 'p3-core1',
          title: 'Strategic Planning',
          outcomeStatement: 'Clear strategic direction and planning.',
          what: 'Organisation has clear strategic objectives.',
          why: 'To ensure focused development and growth.',
          how: 'Through strategic planning process and stakeholder engagement.'
        }
        // Add remaining core requirements (3 total)
      ],
      goodPractices: [
        {
          id: 'p3-good1',
          title: 'Stakeholder Engagement',
          outcomeStatement: 'Effective engagement with all stakeholders.',
          what: 'Regular stakeholder consultation and feedback.',
          why: 'To ensure inclusive decision-making.',
          how: 'Through structured engagement programs.'
        }
        // Add remaining good practices (4 total)
      ]
    },
    {
      id: 'p4',
      title: 'Principle 4 - Standards, Systems & Controls',
      description: 'This section ensures organisations have appropriate systems and controls in place.',
      coreRequirements: [
        {
          id: 'p4-core1',
          title: 'Risk Management',
          outcomeStatement: 'Effective risk management system.',
          what: 'Organisation identifies and manages risks.',
          why: 'To protect organisation and stakeholders.',
          how: 'Through risk assessment and management procedures.'
        }
        // Add remaining core requirements (4 total)
      ],
      goodPractices: [
        {
          id: 'p4-good1',
          title: 'Quality Assurance',
          outcomeStatement: 'High standards of service delivery.',
          what: 'Quality assurance processes in place.',
          why: 'To maintain service standards.',
          how: 'Through quality management systems.'
        }
        // Add remaining good practices (4 total)
      ]
    },
    {
      id: 'p5',
      title: 'Principle 5 - Finance',
      description: 'This section covers financial management and controls.',
      coreRequirements: [
        {
          id: 'p5-core1',
          title: 'Financial Management',
          outcomeStatement: 'Sound financial management practices.',
          what: 'Organisation manages finances effectively.',
          why: 'To ensure financial sustainability.',
          how: 'Through financial controls and procedures.'
        }
        // Add remaining core requirements (7 total)
      ],
      goodPractices: [
        {
          id: 'p5-good1',
          title: 'Financial Planning',
          outcomeStatement: 'Robust financial planning process.',
          what: 'Long-term financial planning.',
          why: 'To ensure financial sustainability.',
          how: 'Through budgeting and forecasting.'
        }
        // Add remaining good practices (5 total)
      ]
    }
  ]
};

const CapabilityGovernance = () => {
  const { state, dispatch } = useForm();
  const [activePrinciple, setActivePrinciple] = useState('p1');
  const [expandedRequirement, setExpandedRequirement] = useState(null);
  const formData = state.formData.capabilityFramework || {};

  const handleChange = (requirementId, field, value) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'capabilityFramework',
      data: {
        ...formData,
        [requirementId]: {
          ...formData[requirementId],
          [field]: value
        }
      }
    });
  };

  const handleFileUpload = (requirementId, files) => {
    if (!files.length) return;
    const currentFiles = formData[requirementId]?.evidence || [];
    handleChange(requirementId, 'evidence', [...currentFiles, ...Array.from(files)]);
  };

  const getCompletionStatus = (principleId) => {
    const principle = capabilityFrameworkData.principles.find(p => p.id === principleId);
    const totalRequirements = principle.coreRequirements.length + principle.goodPractices.length;
    const completedRequirements = Object.values(formData)
      .filter(data => data.status === 'met' && 
        (principle.coreRequirements.some(r => r.id === data.id) || 
         principle.goodPractices.some(r => r.id === data.id)))
      .length;

    return {
      completed: completedRequirements,
      total: totalRequirements,
      percentage: Math.round((completedRequirements / totalRequirements) * 100)
    };
  };

  const RequirementCard = ({ requirement, type = 'core' }) => {
    const isExpanded = expandedRequirement === requirement.id;
    const data = formData[requirement.id] || {};

    return (
      <div className={`border rounded-lg mb-4 ${
        type === 'core' ? 'border-sw-blue' : 'border-red-200'
      }`}>
        <button
          onClick={() => setExpandedRequirement(isExpanded ? null : requirement.id)}
          className={`w-full text-left p-4 flex items-center justify-between rounded-t-lg ${
            type === 'core' ? 'bg-sw-blue text-white' : 'bg-red-50 text-gray-900'
          }`}
        >
          <div className="flex-1">
          <div className="flex items-center justify-between flex-1 mr-4">
              <h4 className="font-medium">{requirement.title}</h4>
            </div>
            <p className="text-sm mt-1 opacity-90">{requirement.outcomeStatement}</p>
          </div>
          
          {data.status && (
                <div className={`
                  flex items-center mr-4 rounded-full px-3 py-1
                  ${data.status === 'met' 
                    ? 'bg-green-100 text-green-700' 
                    : data.status === 'not-met'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-amber-700'}
                `}>
                  {data.status === 'met' && (
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                  )}
                  {data.status === 'not-met' && (
                    <AlertCircle className="h-4 w-4 mr-1.5" />
                  )}
                  {data.status === 'need-help' && (
                    <HelpCircle className="h-4 w-4 mr-1.5" />
                  )}
                  <span className="text-xs font-medium">
                    {data.status === 'met' && 'Met'}
                    {data.status === 'not-met' && 'Not Met'}
                    {data.status === 'need-help' && 'Needs Help'}
                  </span>
                </div>
              )}
              {isExpanded ? (
            <ChevronUp className="h-5 w-5 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 flex-shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="p-6 space-y-6 bg-white rounded-b-lg">
            {/* Requirement Details */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <h5 className="text-sm font-medium text-gray-900">What</h5>
                <p className="mt-1 text-sm text-gray-600">{requirement.what}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Why</h5>
                <p className="mt-1 text-sm text-gray-600">{requirement.why}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">How</h5>
                <p className="mt-1 text-sm text-gray-600">{requirement.how}</p>
              </div>
            </div>

            {/* Assessment Section */}
            <div className="space-y-6">
              {/* Status Selection */}
              <FormField
                label="Current Status"
                required
              >
                <select
                  value={data.status || ''}
                  onChange={(e) => handleChange(requirement.id, 'status', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                >
                  <option value="">Select status...</option>
                  <option value="met">Met</option>
                  <option value="not-met">Not Met</option>
                  <option value="need-help">Need Additional Help</option>
                </select>
              </FormField>

              {/* Comments */}
              <FormField
                label="Comments"
                helpText="Please provide full comments explaining how you meet this requirement"
              >
                <textarea
                  value={data.comments || ''}
                  onChange={(e) => handleChange(requirement.id, 'comments', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sw-blue focus:ring-sw-blue"
                  placeholder="Explain how your organisation meets this requirement..."
                />
              </FormField>

              {/* Evidence Upload */}
              <FormField
                label="Supporting Evidence"
                helpText="Upload relevant documentation to support your assessment"
              >
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-sw-blue hover:text-sw-blue-dark">
                        <span>Upload files</span>
                        <input
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => handleFileUpload(requirement.id, e.target.files)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, XLS, XLSX up to 10MB each
                    </p>
                  </div>
                </div>

                {/* Evidence List */}
                {data.evidence?.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Evidence</h5>
                    <ul className="divide-y divide-gray-200">
                      {data.evidence.map((file, index) => (
                        <li key={index} className="py-2 flex items-center">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-600">{file.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormField>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Introduction Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Capability Framework</h2>
        <p className="mt-2 text-gray-600">
          The Capability Framework identifies the essential and minimum requirements expected 
          of an organisation looking to receive funding as a partner of Sport Wales.
        </p>
        <div className="mt-4 flex items-center text-sm text-sw-blue">
          <ExternalLink className="h-4 w-4 mr-2" />
          <a href="#" className="hover:underline">
            View Full Framework Documentation
          </a>
        </div>
      </div>

      {/* Principles Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {capabilityFrameworkData.principles.map((principle) => {
              const status = getCompletionStatus(principle.id);
              return (
                <button
                  key={principle.id}
                  onClick={() => setActivePrinciple(principle.id)}
                  className={`
                    py-4 px-6 border-b-2 font-medium text-sm
                    ${activePrinciple === principle.id
                      ? 'border-sw-blue text-sw-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="block text-sm">{principle.title.split('-')[0].trim()}</span>
                  <span className="mt-1 text-xs flex items-center">
                    <span 
                      className={`
                        inline-block w-2 h-2 rounded-full mr-1.5
                        ${status.completed === status.total ? 'bg-green-400' : 'bg-gray-300'}
                      `}
                    />
                    {status.completed}/{status.total} Complete
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Active Principle Content */}
      {capabilityFrameworkData.principles.map((principle) => {
        if (principle.id !== activePrinciple) return null;
        
        return (
          <div key={principle.id} className="space-y-8">
            {/* Principle Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900">{principle.title}</h3>
              <p className="mt-2 text-gray-600">{principle.description}</p>
            </div>

            {/* Core Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-6">
                Core Requirements
                <span className="ml-2 text-sm text-gray-500">
                  (Essential for funding)
                </span>
              </h4>
              <div className="space-y-4">
                {principle.coreRequirements.map(requirement => (
                  <RequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    type="core"
                  />
                ))}
              </div>
            </div>

            {/* Good Practice */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-6">
                Good Practice
                <span className="ml-2 text-sm text-gray-500">
                  (Recommended for development)
                </span>
              </h4>
              <div className="space-y-4">
                {principle.goodPractices.map(requirement => (
                  <RequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    type="good"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
        <div className="flex">
          <HelpCircle className="h-5 w-5 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-sw-blue">Need Support?</h4>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                For guidance on completing the Capability Framework, contact the 
                Governance Team at <span className="text-sw-blue">Governance@sport.wales</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilityGovernance;