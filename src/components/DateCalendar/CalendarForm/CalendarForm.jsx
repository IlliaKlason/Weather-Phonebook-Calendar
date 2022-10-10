import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Appear from 'components/Appear';
import { ThemeContext, themes } from 'components/context/themeContext';
import { getEvents, addEvent } from 'redux/event/eventOperation';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import '../DateCalendar.scss';
import { useTranslation } from 'react-i18next';

const CalendarForm = ({ data }) => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const [eventName, setEventName] = useState('');
  const [newEvent, setNewEvent] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const { t } = useTranslation();
  const lang = useTranslation();
  const checkLang = lang[1].language;

  const normalizeName = name => {
    const firstUpCaseLetter = name[0].toUpperCase();
    const anoterLetter = name.slice(1, name.lenght);
    return `${firstUpCaseLetter}${anoterLetter}`;
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const confirmContact = event => setNewEvent(event);

  useEffect(() => {
    if (!newEvent) return;

    const addEventFunc = async () => {
      try {
        dispatch(addEvent(newEvent));
        setNewEvent(null);
        toast.success(
          checkLang === 'en' ? `Well Done 💪 :))` : `Подію додано  💪 :))`,
          {
            icon: `✅`,
          }
        );
      } catch (error) {
        return error.message;
      }
    };

    addEventFunc();
  }, [dispatch, newEvent]);

  //SUBMIT_FORM
  const onSubFormData = e => {
    e.preventDefault();

    const objEvent = {
      name: normalizeName(eventName),
      id: nanoid(),
      data,
      isActive: false,
    };

    confirmContact(objEvent);
    setEventName('');
  };

  return (
    <>
      {/* {loading && <Loader loading={loading} />}  */}
      <Appear time={750}>
        <button
          onClick={() => setToggleForm(prev => !prev)}
          className="btn-add-event"
        >
          {!toggleForm ? (
            <>
              <AddBoxIcon
                sx={{
                  color: '#1fea66',
                  fontSize: '40px',
                }}
              />{' '}
              <strong
                className={theme === themes.light ? 'lightText' : 'darkText'}
              >
                {t('calendar.event')}
              </strong>
            </>
          ) : (
            <DisabledByDefaultRoundedIcon
              sx={{
                color: '#f44336',
                fontSize: '40px',
              }}
            />
          )}
        </button>
        {toggleForm && (
          <form onSubmit={onSubFormData}>
            <div className="input-group">
              <input
                className="input-main"
                name="event"
                onChange={e => setEventName(e.target.value)}
                type="text"
                placeholder={t('calendar.placeholder')}
                value={eventName}
              ></input>
              <button className="addButton btn-main" type="submit">
                +
              </button>
            </div>
          </form>
        )}
      </Appear>
    </>
  );
};

CalendarForm.propTypes = {
  data: PropTypes.string,
};

export default CalendarForm;
