import { useEffect } from 'react';
import { useLockBodyScroll } from 'react-use';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import s from './Modal.module.css';
import { useTranslation } from 'react-i18next';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, children }) => {
  useLockBodyScroll(true);
  const { t } = useTranslation();
  useEffect(() => {
    const handlerKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handlerKeyDown);

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [closeModal]);

  const handlerBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handlerBtnCloseClick = () => {
    closeModal();
  };
  return createPortal(
    <div onClick={handlerBackdropClick} className={s.backdrop}>
      <div className={s.modal}>
        <button onClick={handlerBtnCloseClick} className={s.btnClose}>
          <CancelRoundedIcon />
        </button>
        <h2 className={s.title}>{t('EditCard.title')}</h2>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
