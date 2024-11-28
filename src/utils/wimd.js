import wimdData from '../data/wimd_data.json'; // Assuming the spreadsheet is converted to JSON

// Create a Map for O(1) postcode lookups
const processWIMDData = () => {
  const postcodeMap = new Map();
  
  wimdData.forEach(entry => {
    // Remove spaces and convert to uppercase for consistent comparison
    const normalizedPostcode = entry['Welsh Postcode'].replace(/\s/g, '').toUpperCase();
    const wimdRank = parseInt(entry['WIMD 2019 LSOA Rank']);
    
    // Store only what we need: the WIMD rank
    postcodeMap.set(normalizedPostcode, wimdRank);
  });
  
  return postcodeMap;
};

// Initialize the postcode map
const postcodeMap = processWIMDData();

// Function to check if a postcode is in a deprived area (top 30%)
export const isInDeprivedArea = (postcode) => {
  if (!postcode) return false;
  
  // Normalize the input postcode
  const normalizedPostcode = postcode.replace(/\s/g, '').toUpperCase();
  
  // Get the WIMD rank for this postcode
  const wimdRank = postcodeMap.get(normalizedPostcode);
  
  // Check if the rank exists and is in the top 30% (ranks 1-573)
  return wimdRank && wimdRank <= 573;
};

// Validate Welsh postcodes
export const validateWelshPostcode = (postcode) => {
  if (!postcode) return false;
  
  // Normalize the input postcode
  const normalizedPostcode = postcode.replace(/\s/g, '').toUpperCase();
  
  // Check if it exists in our data
  return postcodeMap.has(normalizedPostcode);
};

// Get WIMD rank for a postcode (useful for debugging)
export const getWIMDRank = (postcode) => {
  if (!postcode) return null;
  
  const normalizedPostcode = postcode.replace(/\s/g, '').toUpperCase();
  return postcodeMap.get(normalizedPostcode) || null;
};