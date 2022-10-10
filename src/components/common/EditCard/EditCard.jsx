import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import s from './EditCard.module.css';

const EditCard = ({ onSubmit, activeElement }) => {
  const [id, setId] = useState(activeElement.id);
  const [name, setName] = useState(activeElement.name);
  const [number, setNumber] = useState(activeElement.number);

  // USE REF
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // SUBMIT FORM

  const handlerSubmitNumber = e => {
    e.preventDefault();

    onSubmit({ id, name, number });

    resetInputs();
  };

  // RESET INPUT

  const resetInputs = () => {
    setName('');
    setNumber('');
  };

  const disabledBtn = !name || !number;

  return (
    <form onSubmit={handlerSubmitNumber} className={s.container}>
      <label className={s.label}>
        <input
          ref={inputRef}
          className={s.input}
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
        />
      </label>
      <label className={s.label}>
        <input
          ref={inputRef}
          className={s.input}
          onChange={e => setNumber(e.target.value)}
          value={number}
          type="text"
        />
      </label>
      <button className={!disabledBtn ? s.btn : s.disabled} type="submit">
        Save
      </button>
    </form>
  );
};

EditCard.propTypes = {
  onSubmit: PropTypes.func,
  activeContact: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default EditCard;
