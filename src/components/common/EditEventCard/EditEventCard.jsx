import React, { useEffect, useRef, useState } from 'react';

import s from './EditEventCard.module.css';

const EditEventCard = ({ activeElement, onSubmit }) => {
  const [id, setId] = useState(activeElement ? activeElement.id : '');
  const [name, setName] = useState(activeElement ? activeElement.name : '');
  const [data, setData] = useState(activeElement ? activeElement.data : '');
  const [isActive, setIsActive] = useState(
    activeElement ? activeElement.isActive : false
  );
  const [createdAt, setCreatedAt] = useState(
    activeElement ? activeElement.createdAt : ''
  );

  // USE REF
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // SUBMIT FORM

  const handlerSubmit = e => {
    e.preventDefault();

    onSubmit({ id, name, data, isActive, createdAt });

    // resetInputs();
  };

  // RESET INPUT

  const resetInputs = () => {
    setName('');
  };

  const disabledBtn = !name;

  return (
    <form onSubmit={handlerSubmit} className={s.container}>
      <label className={s.label}>
        <input
          ref={inputRef}
          className={s.input}
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
        />
      </label>

      <button className={!disabledBtn ? s.btn : s.disabled} type="submit">
        Save
      </button>
    </form>
  );
};

EditEventCard.propTypes = {};

export default EditEventCard;
