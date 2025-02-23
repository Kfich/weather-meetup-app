
export const DEFAULT_TIME_RANGE = {
    label: 'Next Week',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
  
  export const TIME_RANGE_OPTIONS = [
    {
      label: 'Next Week',
      days: 7
    },
    {
      label: 'Next 2 Weeks',
      days: 14
    },
    {
      label: 'Next Month',
      days: 30
    }
  ];