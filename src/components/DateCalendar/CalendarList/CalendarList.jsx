import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'components/common/Modal';
import Appear from 'components/Appear';
import EditEventCard from 'components/common/EditEventCard/EditEventCard';
import { ThemeContext, themes } from 'components/context/themeContext';
import { eventsState } from 'redux/event/eventsSelectors';
import {
  toggleEvent,
  deleteEvent,
  editEvent,
} from 'redux/event/eventOperation';
import { canvasStyles } from '../../../data/confetti';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { ToastContainer, toast } from 'react-toastify';
import { Checkbox } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import 'react-toastify/dist/ReactToastify.css';
import '../DateCalendar.scss';
import { useTranslation } from 'react-i18next';

const ACTION = {
  NONE: 'none',
  EDIT: 'edit',
};
const CalendarList = ({ data }) => {
  const dispatch = useDispatch();
  const events = useSelector(eventsState);
  const { theme } = useContext(ThemeContext);

  const [activeEvent, setActiveEvent] = useState(null);
  const [editActiveEvent, setEditActiveEvent] = useState(null);
  const [removeEvent, setRemoveEvent] = useState(null);

  const [action, setAction] = useState(ACTION.NONE);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const lang = useTranslation();
  const checkLang = lang[1].language;
  // let now = new Date().getDate();

  // let incomeData = data[0] !== '0' ? +data.slice(0, 2) : +data.slice(1, 2);

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(700 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.9, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.9, {
      spread: 60,
    });

    makeShot(0.95, {
      spread: 100,
      decay: 0.91,
      scalar: 2.8,
    });

    makeShot(0.9, {
      spread: 120,
      startVelocity: 50,
      decay: 3.92,
      scalar: 2.2,
    });

    makeShot(0.9, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const openEditModal = () => setIsOpenModal(true);

  const closeEditModal = () => setIsOpenModal(false);

  const onClickDone = currentEvent => {
    setActiveEvent({ ...currentEvent, isActive: !currentEvent.isActive });
    if (currentEvent.isActive) return;
    fire();
    toast.success(
      checkLang === 'en' ? 'Well Done 👌 :))`' : 'Молодець 👌 :))`',
      {
        icon: `✅`,
      }
    );
  };

  useEffect(() => {
    if (!activeEvent) return;
    dispatch(toggleEvent(activeEvent));
    setActiveEvent(null);
  }, [activeEvent, dispatch]);

  const onEditEvent = activeItem => {
    setEditActiveEvent(activeItem);
    openEditModal();
  };

  const confirmEdit = editedName => {
    if (editedName.name === editActiveEvent.name) {
      toast.warning(`IT'S the same TODO 👐:))`);
      setEditActiveEvent(null);
      return;
    }
    setAction(ACTION.EDIT);
    setEditActiveEvent({ ...editedName, name: editedName.name });
  };

  useEffect(() => {
    if (!editActiveEvent || action !== ACTION.EDIT) return;

    dispatch(editEvent(editActiveEvent));

    toast.success(
      checkLang === 'en'
        ? 'Task changed successfully !!`'
        : 'Завдання успішно змінене !!`'
    );
    setAction(ACTION.NONE);
    setEditActiveEvent(null);

    closeEditModal();
  }, [action, dispatch, editActiveEvent]);

  //DELETE_EVENT

  const onRemoveEvent = activeDeleteEvent => setRemoveEvent(activeDeleteEvent);

  useEffect(() => {
    if (!removeEvent) return;
    dispatch(deleteEvent(removeEvent));
  }, [dispatch, removeEvent]);

  return (
    <>
      <Appear time={1000}>
        <div className="events">
          {isOpenModal && (
            <Modal closeModal={closeEditModal}>
              <EditEventCard
                activeElement={editActiveEvent}
                onSubmit={confirmEdit}
              />
            </Modal>
          )}
          <ul>
            {events &&
              events.map(item => {
                if (data !== item.data) {
                  return null;
                } else {
                  return (
                    <li
                      className={
                        theme === themes.light ? 'lightText' : 'darkText'
                      }
                      key={item.id}
                    >
                      <Checkbox
                        checked={item.isActive}
                        onClick={() => onClickDone(item)}
                        color="success"
                        icon={<PublishedWithChangesRoundedIcon />}
                        checkedIcon={<VerifiedRoundedIcon />}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 38 } }}
                      />
                      <ReactCanvasConfetti
                        refConfetti={getInstance}
                        style={canvasStyles}
                      />
                      <strong>{item.name}</strong>
                      <div className="correct-todo">
                        <BorderColorRoundedIcon
                          onClick={() => onEditEvent(item)}
                          sx={{
                            color: '#008CBA',
                            fontSize: '30px',
                            marginRight: '10px',
                          }}
                        />
                        <BackspaceIcon
                          onClick={() => onRemoveEvent(item)}
                          sx={{
                            color: '#f44336',
                            fontSize: '30px',
                          }}
                        />
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
        <ToastContainer theme="dark" />
      </Appear>
    </>
  );
};

CalendarList.propTypes = {
  data: PropTypes.string,
};

export default CalendarList;
