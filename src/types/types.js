// src/types/types.js
/**
 * @typedef {Object} WeatherData
 * @property {number} temperature
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} conditions
 * @property {string} description
 * @property {HourlyForecast[]} hourlyForecast
 */

/**
 * @typedef {Object} HourlyForecast
 * @property {string} time
 * @property {number} temperature
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {string} conditions
 */

/**
 * @typedef {Object} Location
 * @property {string} name
 * @property {string} displayName
 * @property {string} timezone
 */
