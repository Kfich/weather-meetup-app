# Weather Comparison App

## Overview
A sophisticated React-based weather comparison application that allows users to compare weather conditions across different locations with an intuitive, responsive interface.

## Features
- 🌍 Location-based weather forecasting
- 📊 Detailed weather comparisons
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 🗺️ Geolocation support

## Technology Stack
- React 18
- Tailwind CSS
- Recharts
- Axios
- Visual Crossing Weather API

## Prerequisites
- Node.js (v18+)
- npm (v9+)

## Environment Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-comparison-app.git
cd weather-comparison-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
REACT_APP_VISUAL_CROSSING_API_KEY=your_api_key_here
```

## Running the Application
```bash
npm start
```

## Building for Production
```bash
npm run build
```

## Testing
```bash
npm test
```

## Project Structure
```
src/
├── components/
│   ├── layout/
│   ├── location/
│   ├── weather/
│   └── common/
├── contexts/
├── hooks/
├── services/
│   ├── api/
│   └── utils/
├── constants/
└── styles/
```

## API Integration
The application uses the Visual Crossing Weather API for fetching weather data. You'll need to sign up for an API key at [Visual Crossing](https://www.visualcrossing.com/).

## Error Handling
- Comprehensive error handling for API failures
- Geolocation service errors
- Network connectivity issues

## Performance Optimizations
- Data caching
- Memoized components
- Lazy loading
- Optimized re-renders

## Accessibility
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License

## Contact
Kevin Fich - kfich7@gmail.com

Project Link: [https://github.com/yourusername/weather-comparison-app](https://github.com/yourusername/weather-comparison-app)