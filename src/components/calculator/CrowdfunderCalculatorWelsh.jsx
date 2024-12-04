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
        newErrors.postcode = 'Mae angen cod post';
      } else if (!validateWelshPostcode(postcode)) {
        newErrors.postcode = 'Rhowch god post dilys yng Nghymru';
      }
    

    
      if (!amount) {
        newErrors.amount = `Rhowch ${calculationMode === 'total' ? 'gyfanswm cost y prosiect' : 'y swm targed'}`;
      } else {
        const value = parseFloat(amount);
        if (value < 300) {
          newErrors.amount = `Isafswm ${calculationMode === 'total' ? 'cost prosiect' : 'swm targed'} yw £300`;
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
          newErrors.amount = `I dderbyn isafswm cyllid Chwaraeon Cymru (£300), mae angen i chi ${
            calculationMode === 'total' 
              ? `gael cyfanswm cost prosiect o o leiaf £${minRequired}`
              : `godi o leiaf £${minRequired}`
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
            <h2 className="sw-heading-primary">Cyfrifiannell Codi Arian Chwaraeon Cymru</h2>
            <p className="mt-2 text-lg">Cyfrifwch gyllid cyfatebol posibl ar gyfer eich prosiect chwaraeon cymunedol</p>
          </div>
      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
            {/* Main Calculator Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mode Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 p-6 bg-[--color-light-grey] rounded-lg">
                {[
                  { id: 'total', text: "Rwy'n gwybod cyfanswm cost fy mhrosiect" },
                  { id: 'target', text: "Rwy'n gwybod faint rydw i eisiau ei godi" }
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
                    Beth yw'r cod post lle mae eich gweithgareddau'n digwydd?
                  </label>
                  <a 
                    href="https://statswales.gov.wales/Catalogue/Community-Safety-and-Social-Inclusion/Welsh-Index-of-Multiple-Deprivation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[--color-sw-red] hover:text-[--color-sw-blue] text-sm font-semibold underline"
                  >
                    Beth yw MALlC?
                  </a>
                </div>
                <input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="sw-input w-full uppercase"
                  placeholder="Rhowch god post"
                />
                {errors.postcode && (
                  <div className="sw-notice text-[--color-sw-red]">
                    <p className="font-semibold">{errors.postcode}</p>
                  </div>
                )}
                {wimdInfo && (
                  <div className="sw-results">
                    <p className="font-semibold">
                      Mae eich ardal yn safle {wimdInfo.rank} allan o {wimdInfo.total} yng Nghymru
                      (uchaf {wimdInfo.percentile}%)
                      {wimdInfo.isDeprived && 
                        " - Yn gymwys am hyd at 50% o gyllid cyfatebol"
                      }
                    </p>
                  </div>
                )}
              </div>
      
              {/* Target Groups */}
              <div className="space-y-4">
                <label className="sw-label">
                  A yw eich prosiect wedi'i anelu at unrhyw un o'r grwpiau canlynol? Ticiwch:
                </label>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: 'women', label: 'Menywod a Merched' },
                    { id: 'disabled', label: 'Pobl Anabl' },
                    { id: 'young', label: 'Pobl Ifanc' },
                    { id: 'lgbtqia', label: 'Pobl LHDTC+' },
                    { id: 'elderly', label: 'Pobl Hŷn' },
                    { id: 'ethnic', label: 'Pobl o Leiafrifoedd Ethnig' },
                    { id: 'none', label: 'Dim un o\'r uchod' }
                  ].map((group) => (
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
              <div className="space-y-4">
                <label htmlFor="amount" className="sw-label">
                  {calculationMode === 'total' 
                    ? 'Beth yw cyfanswm cost eich prosiect?' 
                    : 'Faint ydych chi eisiau ei godi gan eich cymuned?'}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-5 text-[--color-sw-blue] font-semibold text-lg">£</span>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="sw-input w-full pl-8 p-8"
                    placeholder="Rhowch swm"
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
                    Yn seiliedig ar eich gwybodaeth:
                  </p>
                  <div className="space-y-4">
                    <p className="text-lg">
                      Gallai Chwaraeon Cymru gyfrannu hyd at:
                      <span className="font-lg text-2xl ml-2">
                        £{pledgeAmount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </span>
                    </p>
                    <p className="text-lg">
                      Mae hyn yn cynrychioli {fundingPercentage}% o gost eich prosiect
                    </p>
                    <div className="sw-highlight">
                      <p className="text-lg">
                        <span className="font-bold">Mae angen i chi godi:</span>
                        <span className="font-lg text-2xl ml-2">
                          £{targetAmount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                        </span>
                      </p>
                    </div>
                    {/* Unique Supporters */}
                    <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                      <p className="text-lg pb-2">
                        Cefnogwyr Unigryw Gofynnol: <span className='pl-2 font-semibold'>{getRequiredSupporters(targetAmount)}</span>
                      </p>
                      <p className="text-sm mt-1">
                        Dyma'r nifer lleiaf o wahanol bobl sydd angen cefnogi eich prosiect
                      </p>
                    </div>
                    <p className="text-lg pt-4">
                      Cyfanswm gwerth y prosiect:
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
                  Hysbysiad Pwysig:
                </p>
                <div className="mt-2 space-y-2 text-[--color-sw-blue]">
                  <p>Mae'r offeryn hwn at ddibenion darluniadol yn unig ac nid yw'n ymrwymiad gan Chwaraeon Cymru na Crowdfunder UK i gyfrannu at eich prosiect.</p>
                  <p>Bydd Chwaraeon Cymru yn cadarnhau unrhyw gyfraniad i chi yn ysgrifenedig unwaith y bydd eich tudalen codi arian yn fyw ar Crowdfunder UK ac rydych wedi codi 25% o'ch targed cyffredinol.</p>
                  <p>Gall telerau ac amodau eraill fod yn berthnasol, gweler ein telerau am fanylion.</p>
                </div>
              </div>
            </div>
      
            {/* Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sw-sidebar-card">
                <h3 className="sw-heading-secondary">Am Crowdfunder</h3>
                <p className="text-[--color-sw-blue]">
                  Mae Crowdfunder yn llwyfan sy'n eich helpu i godi arian o'ch cymuned. 
                  Bydd Chwaraeon Cymru yn cyfateb hyd at 50% o'ch targed codi arian, yn dibynnu ar eich lleoliad a nodau'r prosiect.
                </p>
              </div>
      
              <div className="sw-sidebar-card">
                <h3 className="sw-heading-secondary">Am MALlC</h3>
                <p className="text-[--color-sw-blue]">
                  Mae Mynegai Amddifadedd Lluosog Cymru (MALlC) yn helpu i bennu lefelau cyllid. 
                  Gall prosiectau mewn ardaloedd mwy difreintiedig (30% uchaf) dderbyn hyd at 50% o gyllid cyfatebol.
                </p>
              </div>
      
              <div className="sw-sidebar-card">
                <h3 className="sw-heading-secondary">Lefelau Cyllido</h3>
                <ul className="text-[--color-sw-blue] space-y-2">
                  <li className='pt-2'>• Lefel sylfaenol: 30% o gyllid cyfatebol</li>
                  <li className='pt-2'>• Cefnogi grwpiau blaenoriaeth: 40% o gyllid cyfatebol</li>
                  <li className='pt-2'>• Ardaloedd MALlC 30% uchaf: 50% o gyllid cyfatebol</li>
                  <li className='pt-2'>• Uchafswm cyfraniad: £15,000</li>
                  <li className='pt-2'>• Isafswm cost prosiect: £300</li>
                </ul>
              </div>
      
              <div className="sw-sidebar-card">
                <h3 className="sw-heading-secondary">Cefnogwyr Gofynnol</h3>
                <ul className="text-[--color-sw-blue] space-y-2">
                  <li className='pt-2'>• Hyd at £5,000: 25 cefnogwr</li>
                  <li className='pt-2'>• £5,001 - £10,000: 50 cefnogwr</li>
                  <li className='pt-2'>• £10,001 - £15,000: 75 cefnogwr</li>
                  <li className='pt-2'>• Dros £15,000: 100 cefnogwr</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  };
  
export default CrowdfunderCalculator;