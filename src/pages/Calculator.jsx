import React from 'react';
import CrowdfunderCalculator from '../components/calculator/CrowdfunderCalculator';

const Calculator = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">A Place for Sport - Funding Calculator</h1>
      <CrowdfunderCalculator />
    </div>
  );
};

export default Calculator;