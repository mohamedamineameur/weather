'use client';

import { useEffect, useState } from 'react';
import emotion from '@emotion/styled';
import translation from './page.json'

const Container = emotion.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 40px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #4A90E2, #187BCD);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
`;

const CityName = emotion.h2`
  font-size: 24px;
  font-weight: normal;
  cursor: pointer;
`;

const Temp = emotion.div`
  font-size: 80px;
  font-weight: 200;
`;

const Description = emotion.div`
  font-size: 24px;
  text-transform: capitalize;
  margin-top: -15px;
`;

const MinMaxTemp = emotion.div`
  font-size: 18px;
  color: #e0e0e0;
  margin: 5px 0 20px 0;
`;

const HourlyForecastContainer = emotion.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 90%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  margin: 20px 0;
`;

const ForecastItem = emotion.div`
  text-align: center;
  color: white;
  min-width: 50px;
`;

const ForecastTime = emotion.div`
  font-size: 14px;
`;

const ForecastTemp = emotion.div`
  font-size: 18px;
  font-weight: bold;
`;

const WeatherIcon = emotion.img`
  width: 40px;
  height: 40px;
`;

const DailyForecastContainer = emotion.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  width: 90%;
  margin-top: 20px;
`;

const DailyForecastItem = emotion.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  &:last-of-type {
    border-bottom: none;
  }
`;

const DayLabel = emotion.div`
  font-size: 16px;
  flex: 1;
`;

const DailyTemp = emotion.div`
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

const ModalOverlay = emotion.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = emotion.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #333;
`;

const ModalInput = emotion.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  width: 100%;
  text-align: center;
`;

const ModalButton = emotion.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  &:hover {
    background-color: #357ABD;
  }
`;

interface WeatherData {
  city: {
    name: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

interface HomeProps {
  locale: "fr" | "en";
}

export default function Home({ locale }: HomeProps) {
if (!locale) {
  locale = "fr";
}


  const [cityName, setCityName] = useState('Paris');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputCity, setInputCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWeatherData = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(cityName);
  }, [cityName]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCityName(inputCity); // Met à jour la ville et déclenche la recherche
      setIsModalOpen(false); // Ferme le modal
    }
  };

  return (
    <Container>
      <CityName onClick={() => setIsModalOpen(true)}>{weatherData?.city.name || cityName}</CityName>
      
      {loading && <div>{translation[locale].loading}</div>}
      
      {weatherData && (
        <>
          <Temp>{Math.round(weatherData.list[0].main.temp)}°</Temp>
          <Description>{weatherData.list[0].weather[0].description}</Description>
          <MinMaxTemp>
            ↑ {Math.round(weatherData.list[0].main.temp_max)}° ↓ {Math.round(weatherData.list[0].main.temp_min)}°
          </MinMaxTemp>

          <HourlyForecastContainer>
            {weatherData.list.slice(0, 5).map((item) => (
              <ForecastItem key={item.dt}>
                <ForecastTime>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}</ForecastTime>
                <WeatherIcon src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <ForecastTemp>{Math.round(item.main.temp)}°</ForecastTemp>
              </ForecastItem>
            ))}
          </HourlyForecastContainer>

          <DailyForecastContainer>
            {weatherData.list.slice(0, 5).map((item, index) => (
              <DailyForecastItem key={index}>
                <DayLabel>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</DayLabel>
                <WeatherIcon src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <DailyTemp>
                  ↑ {Math.round(item.main.temp_max)}° ↓ {Math.round(item.main.temp_min)}°
                </DailyTemp>
              </DailyForecastItem>
            ))}
          </DailyForecastContainer>
        </>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>{translation[locale].cityChange}</h3>
            <ModalInput
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Entrez le nom de la ville"
            />
            <ModalButton onClick={handleSearch}>{translation[locale].search}</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
