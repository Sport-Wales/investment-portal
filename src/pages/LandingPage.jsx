// src/pages/LandingPage.jsx
import React from 'react';
import { 
  Home, 
  FileText, 
  PoundSterling, 
  Users, 
  BarChart3,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

const LandingPage = ({ user, onSectionSelect }) => {
  // Navigation tiles configuration
  const navigationTiles = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Live overview',
      icon: LayoutDashboard,
      color: 'sw-blue'
    },
    {
      id: 'Partnership form',
      title: 'Partnership Form', 
      description: 'Funding application - completion at beginning of year',
      icon: FileText,
      color: 'sw-green'
    },
    {
      id: 'Partner Investment Offer and Conditions',
      title: 'Partner Investment Offer and Conditions',
      description: 'Review and acceptance process',
      icon: PoundSterling,
      color: 'sw-yellow'
    },
    {
      id: 'Capability Area',
      title: 'Capability Area',
      description: 'Governance assurance/organisational development', 
      icon: Users,
      color: 'sw-red'
    },
    {
      id: 'Accountability Area',
      title: 'Accountability Area',
      description: 'Monitoring and evaluation / feedback',
      icon: BarChart3,
      color: 'sw-blue'
    }
  ];

  // Get appropriate greeting based on user role
  const getGreeting = () => {
    return `Sport Wales Investment Portal`;
    };


  const handleTileClick = (tileId) => {
    onSectionSelect(tileId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getGreeting()}
          </h1>
          <p className="text-xl text-gray-600">
            Select where you'd like to go:
          </p>
        </div>

        {/* Navigation Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {navigationTiles.map((tile) => {
            const IconComponent = tile.icon;
            
            return (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile.id)}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 text-left border-2 border-transparent hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-lg bg-${tile.color} bg-opacity-10`}>
                    <IconComponent className={`h-8 w-8 text-${tile.color}`} />
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700">
                    {tile.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tile.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Help Text
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg border-l-4 border-sw-blue">
            <div className="flex items-start">
              <div className="p-2 bg-sw-blue bg-opacity-10 rounded-lg mr-4">
                <Home className="h-6 w-6 text-sw-blue" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-sw-blue mb-2">Need Help?</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each section contains different aspects of your partnership with Sport Wales. 
                  You can return to this page at any time by clicking the home button in the navigation.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;


