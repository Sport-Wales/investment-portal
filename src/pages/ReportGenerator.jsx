// src/pages/ReportGenerator.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, FileSearch, AlertCircle } from 'lucide-react';

// Partner data organized by category
const partners = {
    'National Governing Bodies': [
      { id: 'angling-cymru', name: 'Sport Angling Cymru', sport: 'Fishing' },
      { id: 'badminton-wales', name: 'Badminton Wales', sport: 'Badminton' },
      { id: 'basketball-wales', name: 'Basketball Wales', sport: 'Basketball' },
      { id: 'bowls-wales', name: 'Bowls Wales', sport: 'Bowls' },
      { id: 'canoe-wales', name: 'Canoe Wales', sport: 'Canoeing' },
      { id: 'commonwealth-games-wales', name: 'Commonwealth Games Wales', sport: 'Multi-sport' },
      { id: 'cricket-wales', name: 'Cricket Wales', sport: 'Cricket' },
      { id: 'faw', name: 'Football Association of Wales', sport: 'Football' },
      { id: 'hockey-wales', name: 'Hockey Wales', sport: 'Hockey' },
      { id: 'rya-cymru', name: 'RYA-Cymru Wales', sport: 'Sailing' },
      { id: 'snowsport-cymru', name: 'Snowsport Cymru Wales', sport: 'Snowsports' },
      { id: 'squash-wales', name: 'Squash Wales', sport: 'Squash' },
      { id: 'surf-ls-wales', name: 'Surf Life Saving Association Wales', sport: 'Surf Life Saving' },
      { id: 'swim-wales', name: 'Swim Wales', sport: 'Swimming' },
      { id: 'tt-wales', name: 'Table Tennis Wales', sport: 'Table Tennis' },
      { id: 'tennis-wales', name: 'Tennis Wales', sport: 'Tennis' },
      { id: 'volleyball-wales', name: 'Volleyball Wales', sport: 'Volleyball' },
      { id: 'wales-golf', name: 'Wales Golf', sport: 'Golf' },
      { id: 'wales-lacrosse', name: 'Wales Lacrosse', sport: 'Lacrosse' },
      { id: 'wales-netball', name: 'Wales Netball', sport: 'Netball' },
      { id: 'wales-rugby-league', name: 'Wales Rugby League', sport: 'Rugby League' },
      { id: 'wru', name: 'Welsh Rugby Union', sport: 'Rugby Union' },
      { id: 'wales-weightlifting', name: 'Wales Weightlifting', sport: 'Weightlifting' },
      { id: 'welsh-archery', name: 'Welsh Archery Association', sport: 'Archery' },
      { id: 'welsh-athletics', name: 'Welsh Athletics', sport: 'Athletics' },
      { id: 'welsh-billiards', name: 'Welsh Billiards & Snooker Association', sport: 'Billiards & Snooker' },
      { id: 'welsh-boxing', name: 'Welsh Boxing', sport: 'Boxing' },
      { id: 'welsh-curling', name: 'Welsh Curling Association', sport: 'Curling' },
      { id: 'welsh-cycling', name: 'Welsh Cycling', sport: 'Cycling' },
      { id: 'welsh-fencing', name: 'Welsh Fencing', sport: 'Fencing' },
      { id: 'welsh-gymnastics', name: 'Welsh Gymnastics', sport: 'Gymnastics' },
      { id: 'welsh-judo', name: 'Welsh Judo Association', sport: 'Judo' },
      { id: 'welsh-karate', name: 'Welsh Karate Governing Body', sport: 'Karate' },
      { id: 'welsh-orienteering', name: 'Welsh Orienteering Association', sport: 'Orienteering' },
      { id: 'welsh-rowing', name: 'Welsh Rowing', sport: 'Rowing' },
      { id: 'welsh-shooting', name: 'Welsh Target Shooting Federation', sport: 'Shooting' },
      { id: 'welsh-triathlon', name: 'Welsh Triathlon', sport: 'Triathlon' },
      { id: 'welsh-wrestling', name: 'Welsh Wrestling', sport: 'Wrestling' },
      { id: 'tenpin-bowling', name: 'Tenpin Bowls', sport: 'Bowling' },
      { id: 'tug-of-war', name: 'Tug of War', sport: 'Tug of War' },
      { id: 'welsh-motorcycling', name: 'Motorcycling', sport: 'Motorcycling' },
      { id: 'welsh-pool', name: 'Pool', sport: 'Pool' },
      { id: 'welsh-caving', name: 'Caving', sport: 'Caving' }
    ],
    'National Partners': [
      { id: 'colegau-cymru', name: 'Colegau Cymru', sport: 'Education' },
      { id: 'black-swimming', name: 'Black Swimming Association', sport: 'Swimming' },
      { id: 'streetgames', name: 'StreetGames', sport: 'Multi-sport' },
      { id: 'disability-sport-wales', name: 'Disability Sport Wales', sport: 'Multi-sport' },
      { id: 'welsh-sports-association', name: 'Welsh Sports Association', sport: 'Multi-sport' },
      { id: 'sportsaid-cymru', name: 'SportsAid Cymru Wales', sport: 'Multi-sport' },
      { id: 'girlguiding-cymru', name: 'Girlguiding Cymru', sport: 'Multi-sport' },
      { id: 'leadership-skills', name: 'Leadership Skills Foundation', sport: 'Multi-sport' },
      { id: 'udoit-dance', name: 'UDOIT Dance Foundation', sport: 'Dance' },
      { id: 'wcva', name: 'Welsh Charity Voluntary Action', sport: 'Multi-sport' },
      { id: 'youth-sport-trust', name: 'Youth Sport Trust', sport: 'Multi-sport' },
      { id: 'outdoor-partnership', name: 'The Outdoor Partnership', sport: 'Multi-sport' },
      { id: 'urdd', name: 'The Urdd', sport: 'Multi-sport' },
      { id: 'welsh-football-trust', name: 'Welsh Football Trust', sport: 'Football' }
    ],
    'Sport Partnerships': [
      { id: 'gwent-sp', name: 'Gwent Sport Partnership', sport: 'Multi-sport' },
      { id: 'north-wales-sp', name: 'North Wales Sport Partnership', sport: 'Multi-sport' },
      { id: 'west-wales-sp', name: 'West Wales Sport Partnership', sport: 'Multi-sport' },
      { id: 'central-south-sp', name: 'Central South Sport Partnership', sport: 'Multi-sport' },
      { id: 'mid-wales-sp', name: 'Mid Wales Sport Partnership', sport: 'Multi-sport' }
    ]
  };

const ReportGenerator = () => {
  const [expandedCategories, setExpandedCategories] = useState(Object.keys(partners));
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [generatingReport, setGeneratingReport] = useState(false);

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const togglePartner = (partnerId) => {
    if (selectedPartners.includes(partnerId)) {
      setSelectedPartners(selectedPartners.filter(id => id !== partnerId));
    } else {
      setSelectedPartners([...selectedPartners, partnerId]);
    }
  };

  const selectAllInCategory = (category) => {
    const categoryPartnerIds = partners[category].map(p => p.id);
    const newSelected = new Set([...selectedPartners]);
    
    const allSelected = categoryPartnerIds.every(id => selectedPartners.includes(id));
    
    if (allSelected) {
      categoryPartnerIds.forEach(id => newSelected.delete(id));
    } else {
      categoryPartnerIds.forEach(id => newSelected.add(id));
    }
    
    setSelectedPartners([...newSelected]);
  };

  const generateReport = () => {
    setGeneratingReport(true);
    // Simulated report generation
    setTimeout(() => {
      setGeneratingReport(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Partner Selection</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select partners to include in the report
          </p>
        </div>

        <div className="p-4">
          {Object.entries(partners).map(([category, categoryPartners]) => (
            <div key={category} className="mb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-sw-blue"
                >
                  {expandedCategories.includes(category) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span>{category}</span>
                </button>
                <button
                  onClick={() => selectAllInCategory(category)}
                  className="text-xs text-sw-blue hover:text-sw-blue-dark"
                >
                  Select All
                </button>
              </div>

              {expandedCategories.includes(category) && (
                <div className="mt-2 ml-6 space-y-2">
                  {categoryPartners.map((partner) => (
                    <div key={partner.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={partner.id}
                        checked={selectedPartners.includes(partner.id)}
                        onChange={() => togglePartner(partner.id)}
                        className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
                      />
                      <label htmlFor={partner.id} className="ml-2 text-sm text-gray-600">
                        {partner.name}
                        <span className="ml-1 text-xs text-gray-400">
                          ({partner.sport})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={generateReport}
            disabled={selectedPartners.length === 0 || generatingReport}
            className={`
              w-full flex items-center justify-center px-4 py-2 rounded-md
              ${selectedPartners.length === 0 || generatingReport
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-sw-blue text-white hover:bg-opacity-90'}
            `}
          >
            <FileSearch className="w-4 h-4 mr-2" />
            {generatingReport ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {selectedPartners.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FileText className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">Select partners to generate a report</p>
            <p className="mt-1 text-sm">
              Choose one or more partners from the sidebar to begin
            </p>
          </div>
        ) : !generatingReport ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Selected Partners ({selectedPartners.length})
              </h2>
            </div>
            <div className="space-y-2">
              {/* Report content will appear here */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sw-blue"></div>
            <p className="mt-4 text-sm text-gray-600">Generating report...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;