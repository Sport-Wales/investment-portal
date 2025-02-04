// src/utils/roleHelpers.js
const PARTNER_TOKENS = {
  'PnCqXcNPF2E': { 
    name: 'Basketball Wales',
    organisation: 'Basketball Wales',
    role: 'partner'
  },
  'CnCFgTSKLQJ': { 
    name: 'Colegau Cymru',
    organisation: 'Colegau Cymru',
    role: 'partner'
  },
  'JkXaSWSJOQR': { 
    name: 'West Wales Sport Partnership',
    organisation: 'West Wales Sport Partnership',
    role: 'partner'
  }
};

export const isPartnerView = () => {
  const url = window.location.href;
  return url.includes('sw?v=');
};

export const getPartnerDetails = () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('v');
  return PARTNER_TOKENS[token] || null;
};
