import React, { useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import './ToggleButtonGroupDynamic.css';

interface ToggleButtonGroupDynamicProps {
  options: { label: string; value: string; selected: boolean }[];
  onChange: (value: string) => void;
}

const ToggleButtonGroupDynamic: React.FC<ToggleButtonGroupDynamicProps> = ({ options, onChange }) => {
  const [activeValue, setActiveValue] = useState(options.find(option => option.selected)?.value || '');

  const handleChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setActiveValue(value);
    onChange(value);
  };

  return (
    <IonSegment value={activeValue} onIonChange={handleChange} className="toggle-button-group">
      {options.map((option) => (
        <IonSegmentButton
          key={option.value}
          value={option.value}
          className={`toggle-button ${option.value === activeValue ? 'ion-activated' : ''}`}
        >
          <IonLabel>{option.label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default ToggleButtonGroupDynamic;
