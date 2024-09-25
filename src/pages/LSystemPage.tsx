import React, { useState } from 'react';
import ParametersForm from '../components/ParametersForm';
import LSystem from '../components/LSystem';

interface LSystemParams {
  axiom: string;
  rules: Record<string, string>;
  angle: number;
  iterations: number;
}

const LSystemPage: React.FC = () => {
  const [lsystemParams, setLsystemParams] = useState<LSystemParams>({
    axiom: 'X',
    rules: { 'X': 'F[-X][+X]' }, 
    angle: 30,
    iterations: 4,
  });

  const handleParamsSubmit = (newParams: LSystemParams): void => {
    setLsystemParams(newParams);
  };

  return (
    <div className="App">
      <h1>L-System Generator</h1>
      <ParametersForm onParamsSubmit={handleParamsSubmit} />
      <LSystem params={lsystemParams} />
    </div>
  );
};

export default LSystemPage;
