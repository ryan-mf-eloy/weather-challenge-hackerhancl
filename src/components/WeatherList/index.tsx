import React, { useState } from 'react';
import { TemperatureUnits, Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnits>('C')
  const [weatherList, setWeatherList] = useState<Weather[]>(weatherData)
  const [weatherSearchInputText, setWeatherSearchInputText] = useState<string>('')
  const [favoriteWeathers, setFavoriteWeathers] = useState<Weather[]>([])

  const isFavoriteWeather = (weatherId: number): boolean => favoriteWeathers
    .some(({ id }) => id === weatherId)

  const handleAddFavorite = (weatherId: number): void => {
    const favoriteWeather = weatherList.find(({ id }) => id === weatherId)

    if (favoriteWeather) {
      setFavoriteWeathers(prevState => [...prevState, favoriteWeather])
    }
  }

  const handleRemoveFavorite = (weatherId: number): void => {
    const unFavoriteWeather = favoriteWeathers.find(({ id }) => id === weatherId)

    if (unFavoriteWeather) {
      setFavoriteWeathers(prevState => prevState.filter(({ id }) => id !== unFavoriteWeather.id))
    }
  }

  const handleTemperatureUnit = (): void => {
   if (temperatureUnit === 'C') {
    setTemperatureUnit('F')
   }
   if (temperatureUnit === 'F') {
    setTemperatureUnit('C')
   }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputText = event.target.value;
    setWeatherSearchInputText(inputText)

    const weatherList = weatherData
      .filter((weather) => {
        const city = weather.city.toLowerCase();
        const inputTextLowerCase = inputText.toLowerCase();
        return city.includes(inputTextLowerCase);
      })
    
    const foundCity = weatherList.length > 0
    
    if (foundCity) {
      setWeatherList([...weatherList])
    } else {
      setWeatherList([...weatherData])
    }
  }

  const handleClearSearch = () => setWeatherSearchInputText('')

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            value={weatherSearchInputText}
            placeholder="Search city"
            onChange={handleInputChange}
            data-testid="search-input"
          />
          <button
            onClick={handleClearSearch}
            data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              weatherList.map(weather => (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={temperatureUnit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={isFavoriteWeather(weather.id)}
                />
              ))
            }
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleTemperatureUnit} data-testid="unit-change-button" className="outlined">
            Switch to {temperatureUnit !== 'C' ? 'Celsius' : 'Fahrenheit' }
          </button>
        </section>
      </div>
      <h3>Favorite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favoriteWeathers.map(weather => (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={temperatureUnit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={true}
                />
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
