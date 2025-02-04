

// src/components/sidebar/PartnerListSidebar.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const PartnerListSidebar = ({ partners, onPartnerSelect, onBack }) => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    'National Governing Bodies': true
  });
  
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredPartners = search
    ? Object.entries(partners).reduce((acc, [category, list]) => {
        const filtered = list.filter(partner => 
          partner.name.toLowerCase().includes(search.toLowerCase())
        );
        if (filtered.length) acc[category] = filtered;
        return acc;
      }, {})
    : partners;

  return (
    <div className="w-[520px] min-w-[520px] max-w-[520px] bg-white border-r flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -mt-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sw-blue focus:border-sw-blue"
            placeholder="Search partners..."
          />
        </div>
      </div>

      {/* Partner List */}
      <div className="flex-1 overflow-auto">
        {Object.entries(filteredPartners).map(([category, list]) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b"
            >
              <span className="font-medium text-gray-900">{category}</span>
              {expandedCategories[category] ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedCategories[category] && (
              <div className="divide-y">
                {list.map(partner => (
                  <button
                    key={partner.id}
                    onClick={() => onPartnerSelect(partner.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {partner.name}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        {partner.sport}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerListSidebar;