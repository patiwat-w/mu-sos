import React from 'react';
import { IonFooter } from '@ionic/react';

const FooterSection: React.FC = () => {
  return (
    <IonFooter>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        Preview Version for research data collection. <br />Copy right reserved by MSU Stroke Triage. 2021
      </div>
    </IonFooter>
  );
};

export default FooterSection;