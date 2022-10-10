import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Appear from 'components/Appear';
import { ThemeContext, themes } from 'components/context/themeContext';
import { useTranslation } from 'react-i18next';

import s from './ContactForm.module.css';

const ContactForm = ({ confirmContact }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const normalizeName = name =>
    name
      .split(' ')
      .map(word => {
        const firstUpCaseLetter = word.charAt(0).toUpperCase();
        const anoterLetter = word.substring(1);
        return `${firstUpCaseLetter}${anoterLetter}`;
      })
      .join(' ');

  const onSubFormData = e => {
    e.preventDefault();

    const objData = {
      name: normalizeName(name),
      number,
    };

    confirmContact(objData);
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Appear time={300}>
      <h1 className={theme === themes.light ? s.headerLight : s.headerDark}>
        {t('contactForm.headerForm')}
      </h1>
      <form
        onSubmit={onSubFormData}
        className={theme === themes.light ? s.formLight : s.formDark}
      >
        <Input
          label={t('contactForm.name')}
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <Input
          label={t('contactForm.number')}
          type="tel"
          name="number"
          onChange={e => setNumber(e.target.value)}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button type="submit" className={s.btnAdd}>
          {t('contactForm.button')}
        </button>
      </form>
      <h2
        className={
          theme === themes.light ? s.headerListLight : s.headerListDark
        }
      >
        {t('contactForm.headerList')}
      </h2>
    </Appear>
  );
};

ContactForm.propTypes = {
  confirmContact: PropTypes.func,
};

export default ContactForm;
