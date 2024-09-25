import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LSystemParams {
  axiom: string;
  rules: Record<string, string>;
  angle: number;
  iterations: number;
}

interface ParametersFormProps {
  onParamsSubmit: (params: LSystemParams) => void;
}

const ParametersForm: React.FC<ParametersFormProps> = ({ onParamsSubmit }) => {
  const [axiom, setAxiom] = useState<string>('X');
  const [rules, setRules] = useState<Record<string, string>>({ 'X': 'F[-X][+X]' });
  const [angle, setAngle] = useState<number>(30);
  const [iterations, setIterations] = useState<number>(4);
  const [newRuleKey, setNewRuleKey] = useState<string>('');
  const [newRuleValue, setNewRuleValue] = useState<string>('');

  // handles change to existing rule's value
  const handleRuleChange = (key: string, value: string) => {
    setRules({
      ...rules,
      [key]: value,
    });
  };

  // adds a new rule 
  const handleAddRule = () => {
    if (newRuleKey.trim() !== '' && newRuleValue.trim() !== '') {
      setRules({
        ...rules,
        [newRuleKey.trim()]: newRuleValue.trim(),
      });
      setNewRuleKey('');
      setNewRuleValue('');
    }
  };

  // removes a rule based on key
  const handleRemoveRule = (key: string) => {
    const updatedRules = { ...rules };
    delete updatedRules[key];
    setRules(updatedRules);
  };

  // handle parametersForm submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onParamsSubmit({ axiom, rules, angle, iterations });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* axiom */}
      <div>
        <label>
          Axiom:
          <input
            type="text"
            value={axiom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAxiom(e.target.value)}
            required
          />
        </label>
      </div>

      {/* rules */}
      <div>
        <label>Rules:</label>
        {Object.keys(rules).map((key) => (
          <div key={key}>
            {/* key, readonly */}
            <input
              type="text"
              value={key}
              readOnly
              placeholder={`Rule for ${key}`}
            />
            =
            {/* value, editable */}
            <input
              type="text"
              value={rules[key]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleRuleChange(key, e.target.value)}
              placeholder={`Rule for ${key}`}
              required
            />
            <button type="button" onClick={() => handleRemoveRule(key)}>Remove</button>
          </div>
        ))}

        {/* add new rule */}
        <div>
          <input
            type="text"
            value={newRuleKey}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewRuleKey(e.target.value)}
            placeholder="New Rule Key"
          />
          =
          <input
            type="text"
            value={newRuleValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewRuleValue(e.target.value)}
            placeholder="New Rule Value"
          />
          <button type="button" onClick={handleAddRule}>Add Rule</button>
        </div>
      </div>

      {/* angle */}
      <div>
        <label>
          Angle:
          <input
            type="text"
            value={angle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAngle(Number(e.target.value))}
            required
          />
        </label>
      </div>

      {/* iterations */}
      <div>
        <label>
          Iterations:
          <input
            type="text"
            value={iterations}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIterations(Number(e.target.value))}
            min="0"
            required
          />
        </label>
      </div>

      {/* submit */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ParametersForm;
