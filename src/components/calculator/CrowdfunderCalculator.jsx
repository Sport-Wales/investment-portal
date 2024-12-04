import React, { useState, useEffect } from 'react';
import { isInDeprivedArea, validateWelshPostcode, getWIMDRank } from '../../utils/wimd';

const CrowdfunderCalculator = () => {
  // Core state management
  const [postcode, setPostcode] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [fundingPercentage, setFundingPercentage] = useState(30);
  const [pledgeAmount, setPledgeAmount] = useState(0);
  const [errors, setErrors] = useState({});
  
  // UI state management
  const [calculationMode, setCalculationMode] = useState('total'); // 'total' or 'target'
  const [wimdInfo, setWimdInfo] = useState(null);

  const targetGroups = [
    { id: 'women', label: 'Women & Girls' },
    { id: 'disabled', label: 'Disabled People' },
    { id: 'young', label: 'Young People' },
    { id: 'lgbtqia', label: 'LGBTQIA+ People' },
    { id: 'elderly', label: 'Elderly People' },
    { id: 'ethnic', label: 'Ethnic Minority People' },
    { id: 'none', label: 'None of the above' }
  ];

  // Input validation
  const validateInputs = () => {
    const newErrors = {};
    
    if (!postcode) {
      newErrors.postcode = 'Postcode is required';
    } else if (!validateWelshPostcode(postcode)) {
      newErrors.postcode = 'Please enter a valid Welsh postcode';
    }

    if (!amount) {
      newErrors.amount = `Please enter ${calculationMode === 'total' ? 'total project cost' : 'target amount'}`;
    } else {
      const value = parseFloat(amount);
      if (value < 300) {
        newErrors.amount = `Minimum ${calculationMode === 'total' ? 'Sport Wales will pledge' : 'target amount'} is £300`;
      } else {
        // Calculate potential pledge based on percentage
        let percentage = 30; // Base percentage
        if (isInDeprivedArea(postcode)) {
          percentage = 50;
        } else if (selectedGroups.length > 0 && !selectedGroups.includes('none')) {
          percentage = 40;
        }
  
        let potentialPledge;
        if (calculationMode === 'total') {
          potentialPledge = (value * percentage) / 100;
        } else {
          potentialPledge = (value * percentage) / (100 - percentage);
        }
  
        // Check if potential pledge meets minimum requirement
        if (potentialPledge < 300) {
          const minRequired = Math.ceil((300 * 100) / percentage);
          newErrors.amount = `To receive minimum Sport Wales Funding (£300), you need to ${
            calculationMode === 'total' 
              ? `have a total project cost of at least £${minRequired}`
              : `raise at least £${minRequired}`
          }`;
        }
      }
    }
    
    if (selectedGroups.length === 0) {
      newErrors.groups = 'Please select at least one option';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate funding based on mode
  const calculateFunding = () => {
    if (!validateInputs()) return;

    let percentage = 30; // Base percentage

    if (isInDeprivedArea(postcode)) {
      percentage = 50;
    } else if (selectedGroups.length > 0 && !selectedGroups.includes('none')) {
      percentage = 40;
    }

    setFundingPercentage(percentage);

    const value = parseFloat(amount);
    let calculatedPledge;
    
    if (calculationMode === 'total') {
      calculatedPledge = (value * percentage) / 100;
    } else {
      calculatedPledge = (value * percentage) / (100 - percentage);
    }

    calculatedPledge = Math.min(calculatedPledge, 15000);
    setPledgeAmount(calculatedPledge);
  };

  // Handle group selection
  const handleGroupSelection = (groupId) => {
    setSelectedGroups(prev => {
      if (groupId === 'none') {
        return ['none'];
      }
      
      const newSelection = prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev.filter(id => id !== 'none'), groupId];
        
      return newSelection;
    });
  };

  // Update WIMD information
  const updateWimdInfo = (postcode) => {
    if (!postcode) return;
    const rank = getWIMDRank(postcode);
    if (rank) {
      setWimdInfo({
        rank,
        total: 1909,
        isDeprived: rank <= 573,
        percentile: Math.round((rank / 1909) * 100)
      });
    } else {
      setWimdInfo(null);
    }
  };

  // Mode switching handler
  const handleModeSwitch = (mode) => {
    setCalculationMode(mode);
    setAmount(''); // Clear amount when switching modes
    setPledgeAmount(0);
  };

  const getRequiredSupporters = (amount) => {
    const value = parseFloat(amount || 0);
    if (value <= 5000) return 25;
    if (value <= 10000) return 50;
    if (value <= 15000) return 75;
    return 100;
  };

  // Effects
  useEffect(() => {
    if (postcode) {
      updateWimdInfo(postcode);
    }
    if (postcode || amount || selectedGroups.length > 0) {
      calculateFunding();
    }
  }, [postcode, amount, selectedGroups, calculationMode]);

  // Result calculations
  const totalProjectValue = calculationMode === 'total' 
    ? parseFloat(amount || 0)
    : (parseFloat(amount || 0) + pledgeAmount);

  const targetAmount = calculationMode === 'total'
    ? parseFloat(amount || 0) - pledgeAmount
    : parseFloat(amount || 0);

    return (
      <div className="sw-container sw-card">
        {/* Header */}
        <div className="sw-header">
          <h2 className="sw-heading-primary">A Place for Sport - Funding Calculator</h2>
          <p className="mt-2 text-lg">Calculate potential match funding for your community sports project, Through the crowdfunder platform</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
          {/* Main Calculator Section */}
          <div className="lg:col-span-2 space-y-8">
           {/* Mode Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 p-6 bg-[--color-light-grey] rounded-lg">
                {[
                  { id: 'total', text: 'I know my total project cost' },
                  { id: 'target', text: 'I know how much I want to raise' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleModeSwitch(mode.id)}
                    className={`
                      sw-button flex-1 min-h-[56px] px-8
                      text-xs font-semibold tracking-wide
                      transition-all
                    
                      ${calculationMode === mode.id 
                        ? 'sw-button-primary shadow-lg' 
                        : 'bg-white border-2 border-[--color-sw-red] text-[--color-sw-red] hover:sw-bg-red hover:text-white'
                      }
                      ${calculationMode === mode.id 
                        ? 'scale-105' 
                        : 'hover:scale-102'
                      }
                    `}
                  >
                    <span className="font-['Montserrat'] font-semibold">
                      {mode.text}
                    </span>
                  </button>
                ))}
              </div>
            {/* Postcode Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="postcode" className="sw-label">
                  What is the postcode where your activities take place?
                </label>
                <a 
                  href="https://statswales.gov.wales/Catalogue/Community-Safety-and-Social-Inclusion/Welsh-Index-of-Multiple-Deprivation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-sw-red] hover:text-[--color-sw-blue] text-sm font-semibold underline"
                >
                  What is WIMD?
                </a>
              </div>
              <input
                id="postcode"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                className="sw-input w-full uppercase"
                placeholder="Enter postcode"
              />
              {errors.postcode && (
                <div className="sw-notice text-[--color-sw-red]">
                  <p className="font-semibold">{errors.postcode}</p>
                </div>
              )}
              {wimdInfo && (
                <div className="sw-results">
                  <p className="font-semibold">
                    Your area ranks {wimdInfo.rank} out of {wimdInfo.total} in Wales
                    (top {wimdInfo.percentile}%)
                    {wimdInfo.isDeprived && 
                      " - Eligible for up to 50% match funding"
                    }
                  </p>
                </div>
              )}
            </div>
  
            {/* Target Groups */}
            <div className="space-y-4">
              <label className="sw-label">
                Is your project aimed at any of the following groups? Please tick:
              </label>
              <div className="grid grid-cols-2 gap-6">
                {targetGroups.map((group) => (
                  <div key={group.id} className={`flex items-center space-x-3 ${group.id === 'none' ? 'pt-4' : ''}`}>
                    <input
                      type="checkbox"
                      id={group.id}
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => handleGroupSelection(group.id)}
                      className="sw-checkbox"
                    />
                    <label htmlFor={group.id} className="text-[--color-sw-blue]">
                      {group.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.groups && (
                <div className="sw-notice text-[--color-sw-red]">
                  <p className="font-semibold">{errors.groups}</p>
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-4 ">
              <label htmlFor="amount" className="sw-label">
                {calculationMode === 'total' 
                  ? 'What is your total project cost?' 
                  : 'How much do you want to raise from your community?'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-5 text-[--color-sw-blue] font-semibold text-lg">£</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="sw-input w-full pl-8 p-8"
                  placeholder="Enter amount"
                  min="300"
                />
              </div>
              {errors.amount && (
                <div className="sw-notice text-[--color-sw-red]">
                  <p className="font-semibold">{errors.amount}</p>
                </div>
              )}
            </div>
  
            {/* Results Display */}
            {pledgeAmount > 0 && !Object.keys(errors).length && (
              <div className="sw-results space-y-4">
                <p className="sw-heading-secondary text-white">
                  Based on your information:
                </p>
                <div className="space-y-4">
                  <p className="text-lg">
                    Sport Wales could pledge up to: 
                    <span className="font-lg text-2xl ml-2">
                      £{pledgeAmount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </p>
                  <p className="text-lg">
                    This represents {fundingPercentage}% of your project cost
                  </p>
                  <div className="sw-highlight">
                    <p className="text-lg">
                      <span className="font-bold">You need to raise:</span>
                      <span className="font-lg text-2xl ml-2">
                        £{targetAmount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </span>
                    </p>
                  </div>
                  {/* Unique Supporters */}
                  <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                    <p className="text-lg pb-2 ">
                      Required Unique Supporters:  <span className='pl-2 font-semibold'>{getRequiredSupporters(targetAmount)} </span>
                    </p>
                    <p className="text-sm mt-1">
                      This is the minimum number of different people who need to support your project
                    </p>
                  </div>
                  <p className="text-lg pt-4">
                    Total project value: 
                    <span className="font-lg text-3xl ml-2 font-semibold">
                      £{totalProjectValue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </p>
                </div>
              </div>
            )}
  
            {/* Important Notice */}
            <div className="sw-notice">
              <p className="font-bold text-[--color-sw-blue]">
                Important Notice:
              </p>
              <div className="mt-2 space-y-2 text-[--color-sw-blue]">
                <p>This tool is for illustrative purposes only and is in no way a commitment by Sport Wales or Crowdfunder UK to contribute to your project.</p>
                <p>Sport Wales will confirm any contribution to you in writing once your fundraising page is live on Crowdfunder UK and you have raised 25% of your overall target.</p>
                <p>Other terms and conditions may apply, please see our terms for details.</p>
              </div>
            </div>
          </div>
  
          {/* Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sw-sidebar-card">
              <h3 className="sw-heading-secondary">About Crowdfunder</h3>
              <p className="text-[--color-sw-blue]">
                Crowdfunder is a platform that helps you raise money from your community. 
                Sport Wales will match up to 50% of your fundraising target, depending on your location and project goals.
              </p>
            </div>
  
            <div className="sw-sidebar-card">
              <h3 className="sw-heading-secondary">About WIMD</h3>
              <p className="text-[--color-sw-blue]">
                The Welsh Index of Multiple Deprivation (WIMD) helps determine funding levels. 
                Projects in more deprived areas (top 30%) may receive up to 50% match funding.
              </p>
            </div>
  
            <div className="sw-sidebar-card">
              <h3 className="sw-heading-secondary">Funding Levels</h3>
              <ul className="text-[--color-sw-blue] space-y-2">
                <li className='pt-2'>• Base level: 30% match funding</li>
                <li className='pt-2'>• Supporting priority groups: 40% match funding</li>
                <li className='pt-2'>• Top 30% WIMD areas: 50% match funding</li>
                <li className='pt-2'>• Maximum pledge: £15,000</li>
                <li className='pt-2'>• Minimum project cost: £300</li>
              </ul>
            </div>
            <div className="sw-sidebar-card">
            <h3 className="sw-heading-secondary">Required Supporters</h3>
            <ul className="text-[--color-sw-blue] space-y-2">
              <li className='pt-2'>• Up to £5,000: 25 supporters</li>
              <li className='pt-2'>• £5,001 - £10,000: 50 supporters</li>
              <li className='pt-2'>• £10,001 - £15,000: 75 supporters</li>
              <li className='pt-2'>• Over £15,000: 100 supporters</li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
export default CrowdfunderCalculator;