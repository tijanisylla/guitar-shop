

// Create our number formatter. maximumFractionDigits: 0, // (causes 2500.99 to
// be printed as $2,501)
const formatterFunc = (val) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(val);
}


// This function to limit the text of the description
const getLimitFunc = (val) => {
  return val.substring(0, 60);
}

// Calculate 50% of each guitar 
const calculatePercentage = (val) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  const percentage = 50
  return formatter.format(percentage / 100 * val)
}


 export {
    formatterFunc,
    getLimitFunc,
    calculatePercentage
    
};

