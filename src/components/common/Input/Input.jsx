import { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import s from './Input.module.css';
import { ThemeContext, themes } from 'components/context/themeContext';

const Input = ({ label, ...arg }) => {
  const { current: id } = useRef(nanoid());
  const { theme } = useContext(ThemeContext);

  return (
    <div className={s.wrapperInput}>
      <label
        className={
          theme === themes.light ? s.labelTitleLight : s.labelTitleDark
        }
        htmlFor={id}
      >
        {label}:
      </label>
      <input className={s.input} id={id} {...arg} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  arg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
};

export default Input;
