import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";

interface FrequencyDisplayProps {
  data: number[];
}

const FrequencyDisplay: React.FC<FrequencyDisplayProps> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Frequency Analysis</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ 
          height: '200px', 
          display: 'flex', 
          alignItems: 'flex-end',
          gap: '2px',
          padding: '10px'
        }}>
          {data.map((value, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: `${value}%`,
                backgroundColor: '#2196F3',
                minWidth: '3px'
              }}
            />
          ))}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default FrequencyDisplay;