import { useState } from 'react';
import axios from 'axios';

import {
  CityName,
  CitySearch,
  WeatherName,
  WeatherWrapper,
  DateWrapper,
  IconStyled,
  DegStyled,
  ErroreMessage,
  WindStyled,
} from './WeatherStyled';
import { useTranslation } from 'react-i18next';
import Loader from 'components/common/Loader';

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    data: {},
    error: false,
    loading: false,
  });
  const { t } = useTranslation();
  const lang = useTranslation();

  const actLang = lang[1].language;
  const toDate = () => {
    const months = [
      actLang === 'en' ? 'January' : 'Січень',
      actLang === 'en' ? 'February' : 'Лютий',
      actLang === 'en' ? 'March' : 'Березень',
      actLang === 'en' ? 'April' : 'Квітень',
      actLang === 'en' ? 'May' : 'Травень',
      actLang === 'en' ? 'June' : 'Червень',
      actLang === 'en' ? 'July' : 'Липень',
      actLang === 'en' ? 'August' : 'Серпень',
      actLang === 'en' ? 'September' : 'Вересень',
      actLang === 'en' ? 'October' : 'Жовтень',
      actLang === 'en' ? 'November' : 'Листопад',
      actLang === 'en' ? 'December' : 'Грудень',
    ];

    const days = [
      actLang === 'en' ? 'Sunday' : 'Неділя',
      actLang === 'en' ? 'Monday' : 'Понеділок',
      actLang === 'en' ? 'Tuesday' : 'Вівторок',
      actLang === 'en' ? 'Wednesday' : 'Середа',
      actLang === 'en' ? 'Thursday' : 'Четвер',
      actLang === 'en' ? 'Friday' : "П'ятниця",
      actLang === 'en' ? 'Saturday' : 'Субота',
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
      const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

      await axios
        .get(baseUrl, {
          params: {
            q: query,
            units: 'metric',
            appid: apiKey,
          },
        })
        .then(res => {
          if (res.data.name === 'Perm')
            return setWeather({ data: res.data, error: false, loading: false });
          if (res.data.sys.country === 'RU')
            return setWeather({
              ...weather,
              data: {},
              error: true,
              loading: false,
            });
          setWeather({ data: res.data, error: false, loading: false });
        })
        .catch(error => {
          setWeather({ ...weather, data: {}, error: true, loading: false });
          setQuery('');
        });
    }
  };

  return (
    <WeatherWrapper>
      {weather.loading && <Loader />}
      <WeatherName>
        {t('Weather.title')} <span> 🌤 </span>
      </WeatherName>
      <div>
        <CitySearch
          autoFocus
          type="text"
          placeholder={t('Weather.placeholder')}
          name="query"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyPress={search}
        ></CitySearch>
      </div>

      {weather.error && (
        <>
          <ErroreMessage>
            <span style={{ fontSize: '26px' }}> Sorry, City not found</span>
          </ErroreMessage>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <CityName>
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </CityName>
          <DateWrapper>
            <span>{toDate()}</span>
          </DateWrapper>
          <IconStyled>
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <DegStyled> &deg;C </DegStyled>
          </IconStyled>
          <WindStyled>
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>
              {t('Weather.Wind')}: {weather.data.wind.speed}{' '}
              {t('Weather.Winds')}
            </p>
          </WindStyled>
        </div>
      )}
    </WeatherWrapper>
  );
}

export default Weather;
