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
