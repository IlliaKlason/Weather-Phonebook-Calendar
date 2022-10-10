import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Appear from 'components/Appear';
import { ThemeContext, themes } from 'components/context/themeContext';
import { nanoid } from 'nanoid';

import '../DateCalendar.scss';

const CalendarDaysForm = ({
  prevYear,
  prevMonth,
  activeMonth,
  getYear,
  nextMonth,
  nextYear,
  days,
  resetDate,
}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const lang = useTranslation();

  const actLang = lang[1].language;

  const ukDays = ['Пон', 'Вів', 'Сер', 'Чет', "П'ят", 'Суб', 'Нед'];
  const enDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const checkdayName = actLang === 'en' ? enDays : ukDays;

  ///GET_MONTH

  const getMonthName = activeMonth => {
    return [
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
    ][activeMonth];
  };

  ////CHECK_NAME_DAY

  let dayNames = checkdayName.map((item, i) => {
    return (
      <div key={nanoid()} className="day">
        {item}
      </div>
    );
  });

  ////CHECK_THEME

  const checkThemes =
    theme === themes.light ? { color: 'black' } : { color: 'white' };
  const checkThemesArrow =
    theme === themes.light ? { color: 'black' } : { color: 'gold' };
  const checkThemesBtnBack =
    theme === themes.light
      ? { backgroundColor: '#000000aa' }
      : { backgroundColor: '#0000004f' };

  return (
    <>
      <Appear time={750}>
        {/* Month selector */}
        <div className="month" style={checkThemes}>
          <span className="month-selector">
            <a
              className="prevYear"
              style={checkThemesArrow}
              href="/"
              onClick={prevYear}
            >
              «
            </a>
            <a
              className="prev"
              style={checkThemesArrow}
              href="/"
              onClick={prevMonth}
            >
              ᐊ
            </a>
            <span className="month-active">
              <span>{getMonthName(activeMonth)}</span>
              <span
                style={
                  theme === themes.light
                    ? { color: 'yellow' }
                    : { color: 'yellow' }
                }
              >
                {' ' + getYear}
              </span>
            </span>

            <a
              className="next"
              style={checkThemesArrow}
              href="#/"
              onClick={nextMonth}
            >
              ᐅ
            </a>
            <a
              className="nextYear"
              style={checkThemesArrow}
              href="/"
              onClick={nextYear}
            >
              »
            </a>
          </span>
        </div>

        {/* Days grid */}

        <div className="weekdays" style={checkThemes}>
          {dayNames}
        </div>
        <div className="days">
          {days}
          <div className="btn-back-wrap">
            <button
              className="reset"
              href="#"
              onClick={resetDate}
              style={checkThemesBtnBack}
            >
              {t('calendar.buttonBackToday')}
            </button>
          </div>
        </div>
      </Appear>
    </>
  );
};

CalendarDaysForm.propTypes = {
  prevYear: PropTypes.func,
  prevMonth: PropTypes.func,
  activeMonth: PropTypes.number,
  getYear: PropTypes.number,
  nextMonth: PropTypes.func,
  nextYear: PropTypes.func,
  days: PropTypes.array,
  resetDate: PropTypes.func,
};

export default CalendarDaysForm;
