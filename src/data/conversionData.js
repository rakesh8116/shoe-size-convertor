// Comprehensive shoe size conversion data
export const conversionData = {
  men: {
    US: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
    UK: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5, 14.5],
    EU: [39, 39.5, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48, 49, 50],
    JP: [24.5, 25, 25.5, 25.8, 26.2, 26.7, 27.1, 27.5, 27.9, 28.3, 28.8, 29.2, 29.6, 30, 30.5, 31.4, 32.2],
    CM: [24.5, 25, 25.5, 25.8, 26.2, 26.7, 27.1, 27.5, 27.9, 28.3, 28.8, 29.2, 29.6, 30, 30.5, 31.4, 32.2]
  },
  women: {
    US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    UK: [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    EU: [35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5],
    JP: [22.5, 22.8, 23.1, 23.5, 23.8, 24.1, 24.5, 24.8, 25.1, 25.4, 25.7, 26, 26.5, 27, 27.5],
    CM: [22.5, 22.8, 23.1, 23.5, 23.8, 24.1, 24.5, 24.8, 25.1, 25.4, 25.7, 26, 26.5, 27, 27.5]
  },
  kids: {
    US: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    UK: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6, 7, 8, 9, 10, 11, 12],
    EU: [16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 30, 31],
    CM: [8.3, 9.2, 10, 10.8, 11.7, 12.5, 13.3, 14.2, 15, 15.8, 16.7, 17.5, 18.3]
  }
};

// Brand-specific adjustments (in US size units)
export const brandAdjustments = {
  Nike: { men: 0, women: 0 },
  Adidas: { men: 0.5, women: 0.5 },
  Puma: { men: 0, women: 0 },
  'New Balance': { men: 0.5, women: 0.5 },
  Converse: { men: -0.5, women: -0.5 },
  Vans: { men: 0, women: 0 },
  Reebok: { men: 0, women: 0 },
  Asics: { men: 0.5, women: 0.5 },
  'Under Armour': { men: 0, women: 0 },
  Skechers: { men: 0, women: 0 }
};

// Convert size between systems
export const convertSize = (size, fromSystem, toSystem, gender) => {
  const data = conversionData[gender];
  if (!data || !data[fromSystem] || !data[toSystem]) return null;
  
  const fromIndex = data[fromSystem].findIndex(s => Math.abs(s - size) < 0.1);
  if (fromIndex === -1) {
    // Try to find closest match
    const closest = data[fromSystem].reduce((prev, curr) => 
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
    const closestIndex = data[fromSystem].indexOf(closest);
    return data[toSystem][closestIndex];
  }
  
  return data[toSystem][fromIndex];
};

// Get all conversions for a given size
export const getAllConversions = (size, system, gender, brand = null) => {
  const data = conversionData[gender];
  if (!data || !data[system]) return null;
  
  // Apply brand adjustment if provided
  let adjustedSize = size;
  if (brand && brandAdjustments[brand]) {
    adjustedSize = size - brandAdjustments[brand][gender];
  }
  
  const systems = ['US', 'UK', 'EU', 'JP', 'CM'];
  const conversions = {};
  
  systems.forEach(targetSystem => {
    if (targetSystem === system) {
      conversions[targetSystem] = adjustedSize;
    } else {
      conversions[targetSystem] = convertSize(adjustedSize, system, targetSystem, gender);
    }
  });
  
  return conversions;
};

// Shoe fit recommendations
export const fitRecommendations = {
  'Running Shoes': 'Consider going 0.5 size up for toe room during runs',
  'Dress Shoes': 'Typically fit true to size, but leather may stretch',
  'Boots': 'May need 0.5 size up for thicker socks',
  'Sandals': 'Usually fit true to size or slightly loose',
  'High Heels': 'Often run small, consider sizing up',
  'Sneakers': 'Most brands fit true to size',
  'Hiking Boots': 'Size up 0.5-1 for thick socks and toe protection',
  'Basketball Shoes': 'Typically true to size with good lockdown'
};

// Size width recommendations
export const widthGuide = {
  narrow: 'Consider B width (women) or D width (men)',
  medium: 'Standard D width (women) or M width (men)',
  wide: 'Look for 2E width (women) or W/2E width (men)',
  'extra-wide': 'Seek 4E width options for best comfort'
};

// Kids' shoe size to age recommendations (approximate)
export const kidsAgeGuide = {
  US: {
    1: '6-12 months',
    2: '9-15 months',
    3: '12-18 months',
    4: '15-24 months',
    5: '2-2.5 years',
    6: '2.5-3 years',
    7: '3-4 years',
    8: '4-5 years',
    9: '5-6 years',
    10: '6-7 years',
    11: '7-8 years',
    12: '8-9 years',
    13: '9-10 years'
  },
  UK: {
    0.5: '6-12 months',
    1.5: '9-15 months',
    2.5: '12-18 months',
    3.5: '15-24 months',
    4.5: '2-2.5 years',
    5.5: '2.5-3 years',
    6: '3-4 years',
    7: '4-5 years',
    8: '5-6 years',
    9: '6-7 years',
    10: '7-8 years',
    11: '8-9 years',
    12: '9-10 years'
  },
  EU: {
    16: '6-12 months',
    17: '9-15 months',
    19: '12-18 months',
    20: '15-24 months',
    21: '2-2.5 years',
    22: '2.5-3 years',
    23: '3-4 years',
    25: '4-5 years',
    26: '5-6 years',
    27: '6-7 years',
    28: '7-8 years',
    30: '8-9 years',
    31: '9-10 years'
  },
  CM: {
    8.3: '6-12 months',
    9.2: '9-15 months',
    10: '12-18 months',
    10.8: '15-24 months',
    11.7: '2-2.5 years',
    12.5: '2.5-3 years',
    13.3: '3-4 years',
    14.2: '4-5 years',
    15: '5-6 years',
    15.8: '6-7 years',
    16.7: '7-8 years',
    17.5: '8-9 years',
    18.3: '9-10 years'
  },
  JP: {
    8.3: '6-12 months',
    9.2: '9-15 months',
    10: '12-18 months',
    10.8: '15-24 months',
    11.7: '2-2.5 years',
    12.5: '2.5-3 years',
    13.3: '3-4 years',
    14.2: '4-5 years',
    15: '5-6 years',
    15.8: '6-7 years',
    16.7: '7-8 years',
    17.5: '8-9 years',
    18.3: '9-10 years'
  }
};

// Helper function to get age recommendation for kids' sizes
export const getKidsAgeRecommendation = (size, system) => {
  if (!kidsAgeGuide[system]) return null;

  // Find exact match or closest size
  const availableSizes = Object.keys(kidsAgeGuide[system]).map(Number);
  const closestSize = availableSizes.reduce((prev, curr) =>
    Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
  );

  return kidsAgeGuide[system][closestSize];
};

// Adult size information (for men and women)
export const getAdultSizeInfo = (size, gender) => {
  if (gender === 'kids') return null;

  const usSize = parseFloat(size);

  // Determine size category and availability
  let category = '';
  let availability = '';
  let width = '';

  if (gender === 'women') {
    if (usSize >= 5 && usSize <= 6.5) {
      category = 'Small/Petite';
      availability = 'Less common - may need special order';
      width = 'Narrow to Standard width (B/M)';
    } else if (usSize >= 7 && usSize <= 9) {
      category = 'Average/Standard';
      availability = 'Most common size - widely available';
      width = 'Standard width (M) recommended';
    } else if (usSize >= 9.5 && usSize <= 11) {
      category = 'Large';
      availability = 'Popular size - usually in stock';
      width = 'Standard to Wide width (M/W)';
    } else if (usSize >= 11.5) {
      category = 'Extra Large';
      availability = 'Less common - specialty stores recommended';
      width = 'Wide width options available';
    }
  } else if (gender === 'men') {
    if (usSize >= 6 && usSize <= 8) {
      category = 'Small';
      availability = 'Less common - may need special order';
      width = 'Narrow to Standard width (D)';
    } else if (usSize >= 8.5 && usSize <= 10.5) {
      category = 'Average/Standard';
      availability = 'Most common size - widely available';
      width = 'Standard width (D) recommended';
    } else if (usSize >= 11 && usSize <= 12.5) {
      category = 'Large';
      availability = 'Popular size - usually in stock';
      width = 'Standard to Wide width (D/2E)';
    } else if (usSize >= 13) {
      category = 'Extra Large';
      availability = 'Athletic/specialty size - may need online order';
      width = 'Wide width options available';
    }
  }

  return {
    category,
    availability,
    width
  };
};
