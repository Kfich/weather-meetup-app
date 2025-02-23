
export const apiUtils = {
    handleResponse: async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'API request failed');
      }
      return response.json();
    },
  
    buildQueryString: (params) => {
      return Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }
  };