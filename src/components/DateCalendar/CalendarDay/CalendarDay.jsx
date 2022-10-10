import { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { ThemeContext, themes } from 'components/context/themeContext';
import { eventsState } from 'redux/event/eventsSelectors';
import '../DateCalendar.scss';



const CalendarDay = ({ selected, days, setDay, data }) => {
  
  const allEvents = useSelector(eventsState);
  const { theme } = useContext(ThemeContext);

  let cls = selected ? " day-active" : "";


  for (const item of allEvents) {
    if (item.data.slice(0, 2) === String(days)) {
       cls += " has-events"
    } 
  };

  return days > 0 ? (
      <div
      className={"day" + cls }
      style={theme === themes.light ? {
        color: "black",
      } : {
          color: "white"
      }}
        onClick={(e) => setDay(days, e)}
      >
        {days}
      </div>
    ) : (
      <div className="day day-empty"></div>
    );
  
}

CalendarDay.propTypes = {
  selected: PropTypes.bool,
  days: PropTypes.number,
  setDay: PropTypes.func,
  data:PropTypes.string
}

export default CalendarDay