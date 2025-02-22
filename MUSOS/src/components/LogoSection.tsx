import React from 'react';

const LogoSection: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src="images/icons/icon-384x384.png"
        alt="MSU Stroke Triage"
        style={{
          width: '160px',
          marginBottom: '20px',
          borderRadius: '50%',
          border: '5px solid rgb(231, 9, 9)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        }}
      />
      <h2 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '30px' }}>
        Stroke Triage Data Collection (Beta.)
      </h2>
    </div>
  );
};

export default LogoSection;