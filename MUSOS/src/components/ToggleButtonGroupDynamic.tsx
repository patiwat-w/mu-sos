import React, { useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import './ToggleButtonGroupDynamic.css';

interface ToggleButtonGroupDynamicProps {
  options: { label: string; value: string; selected: boolean }[];
  onChange: (value: string) => void;
  maxOptions?: number; // New prop to specify the maximum number of options for equal sizing
}

const ToggleButtonGroupDynamic: React.FC<ToggleButtonGroupDynamicProps> = ({ options, onChange, maxOptions = options.length }) => {
  const [activeValue, setActiveValue] = useState(options.find(option => option.selected)?.value || '');

  const handleChange = (event: CustomEvent) => {
    const value = event.detail.value;
    if (value !== activeValue) {
      setActiveValue(value);
      onChange(value);
    }
  };

  // const buttonWidth = 100 / maxOptions; // Calculate button width based on maxOptions

  return (
    <IonSegment value={activeValue} onIonChange={handleChange} className="toggle-button-group">
      {options.map((option) => (
        <IonSegmentButton
          key={option.value}
          value={option.value}
          disabled={option.value === activeValue} // Disable the button if it matches the active value
          // style={{ width: `${buttonWidth}%` }} // Apply calculated width
          className={`toggle-button ${option.value === activeValue ? 'ion-activated' : 'reset-color'}`}
        >
          <IonLabel>{option.label} </IonLabel>
        </IonSegmentButton>
      ))}
      {/* Add disabled buttons to fill up to maxOptions */}
      {Array.from({ length: maxOptions - options.length }).map((_, index) => (
        <IonSegmentButton
          key={`placeholder-${index}`}
          disabled
          // style={{ width: `${buttonWidth}%` }}
          className="toggle-button placeholder"
        >
          <IonLabel>&nbsp;</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default ToggleButtonGroupDynamic;
