const config = {
  api: {
    baseUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  app: {
    defaultLocation: 'San Francisco, CA',
    updateInterval: 300000, // 5 minutes
    maxLocationsHistory: 5,
  }
};

export default config;