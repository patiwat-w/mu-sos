export const getSteps = (subjectId: string) => [
  { label: 'Personal Info', url: `/personal-information/${subjectId}` },
  { label: 'Health Info', url: `/health-information/${subjectId}` },
  { label: 'Pre Diagnosis', url: `/pre-diagnosis/${subjectId}` }
];