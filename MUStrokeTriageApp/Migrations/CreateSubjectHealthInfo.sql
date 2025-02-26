CREATE TABLE SubjectHealthInfo (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    SubjectId INT NOT NULL,
    Comorbidities_Hypertension BIT DEFAULT 0,
    Comorbidities_Diabetes BIT DEFAULT 1,
    Comorbidities_Hyperlipidemia BIT DEFAULT 0,
    Comorbidities_HeartDisease BIT DEFAULT 0,
    Comorbidities_PreviousStroke BIT DEFAULT 1,
    Symptoms_SpeechDifficulties BIT DEFAULT 0,
    Symptoms_FacialDrooping BIT DEFAULT 1,
    Symptoms_VisualProblems BIT DEFAULT 0,
    Symptoms_ArmLt BIT DEFAULT 1,
    Symptoms_ArmRt BIT DEFAULT 0,
    Symptoms_LegLt BIT DEFAULT 0,
    Symptoms_LegRt BIT DEFAULT 1,
    NHISS_Consciousness INT,
    NHISS_Question INT,
    NHISS_Commands INT,
    NHISS_Gaze INT,
    NHISS_VisualField INT,
    NHISS_FacialPalsy INT,
    NHISS_ArmStrengthLeft INT,
    NHISS_ArmStrengthRight INT,
    NHISS_LegStrengthLeft INT,
    NHISS_LegStrengthRight INT,
    NHISS_Ataxia INT,
    NHISS_Sensory INT,
    Created_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Modified_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Created_By NVARCHAR(50),
    Modified_By NVARCHAR(50),
    State_Code INT DEFAULT 1
);

-- Add foreign key constraint
ALTER TABLE SubjectHealthInfo
ADD FOREIGN KEY (SubjectId) REFERENCES Subject(Id);
