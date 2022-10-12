import { useEffect, useState, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Loader from '../common/Loader';
import Modal from 'components/common/Modal';
import EditCard from 'components/common/EditCard';
import { ThemeContext, themes } from 'components/context/themeContext';
import {
  getContacts,
  addContact,
  editContact,
  deleteContact,
} from 'redux/phoneBook/operation';

import { filterContacts } from 'redux/phoneBook/phoneBookActions';

import { authSelectors } from 'redux/auth';
import {
  contactsState,
  filterPhoneBook,
  loadingSelector,
} from '../../redux/phoneBook/phonebook-selectors';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Contacts.module.css';
import { useTranslation } from 'react-i18next';

const ACTION = {
  NONE: 'none',
  EDIT: 'edit',
  DELETE: 'delete',
};

const Contacts = () => {
  const userToken = useSelector(authSelectors.getToken);
  const loading = useSelector(loadingSelector);
  const contactsBook = useSelector(contactsState);
  const filterValueName = useSelector(filterPhoneBook);
  const dispatch = useDispatch();

  const [newContact, setNewContact] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const { theme } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(ACTION.NONE);
  const [action, setAction] = useState(ACTION.NONE);

  const [editModal, setEditModal] = useState(false);
  const { t } = useTranslation();
  const lang = useTranslation();
  const checkLang = lang[1].language;
  const openEditModal = () => setEditModal(true);

  const closeEditModal = () => {
    setEditModal(false);
    setOpenModal(ACTION.NONE);
  };

  useEffect(() => {
    if (!userToken) return;

    dispatch(getContacts(userToken));
  }, [dispatch, userToken]);

  const confirmContact = contact => setNewContact(contact);

  useEffect(() => {
    if (!newContact) return;
    const isHaveName = contactsBook.some(
      ({ name }) => name === newContact.name
    );

    if (isHaveName) {
      toast.error(
        checkLang === 'en'
          ? `Contact ${newContact.name} already exists :((`
          : `Контакт ${newContact.name} вже існує :((`,
        { icon: `❌` }
      );
      setNewContact(null);
    }

    if (!isHaveName || !userToken) {
      dispatch(addContact(newContact));
      toast.success(
        checkLang === 'en'
          ? `Contact ${newContact.name} added`
          : `Контакт ${newContact.name} додано`,
        {
          icon: `✅`,
        }
      );
      setNewContact(null);
    }
    // eslint-disable-next-line
  }, [contactsBook, dispatch, newContact, userToken]);

  const onEditContact = activeItem => {
    setActiveContact(activeItem);
    setOpenModal(ACTION.EDIT);
  };

  const confirmEdit = editedItem => {
    if (
      editedItem.name === activeContact.name &&
      editedItem.number === activeContact.number
    ) {
      setOpenModal(ACTION.NONE);
      setActiveContact(null);
      return;
    }
    setAction(ACTION.EDIT);
    setActiveContact(editedItem);
  };

  useEffect(() => {
    if (action !== ACTION.EDIT || !activeContact) return;
    const saveEditContact = () => {
      dispatch(editContact(activeContact));

      toast.success(
        checkLang === 'en'
          ? `Contact changed successfully`
          : `Контакт успішно змінено`
      );
      setAction(ACTION.NONE);
      setActiveContact(null);
      setOpenModal(ACTION.NONE);

      closeEditModal();
    };

    saveEditContact();
    // eslint-disable-next-line
  }, [action, activeContact, dispatch]);

  const filterChangeInput = value => dispatch(filterContacts(value));
  const normalizedFilter = filterValueName.toLowerCase();

  const finalArray =
    contactsBook &&
    contactsBook.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

  const filterContactsName = useMemo(() => {
    if (finalArray.length === 0 && filterValueName !== '') {
      toast.warning(
        checkLang === 'en'
          ? 'Clear the query field to see all contacts :)))'
          : 'Очистіть поле для запиту, щоб побачити усі контакти :)))'
      );
    }
    return finalArray;
  }, [checkLang, filterValueName, finalArray]);

  const onDeleteContact = id => setDeleteContactId(id);

  useEffect(() => {
    if (!deleteContactId) return;
    dispatch(deleteContact(deleteContactId));
    toast.success(
      checkLang === 'en'
        ? 'The contact has been removed from the contact list :))'
        : 'Контакт видалений зі списку контактів :))',
      {
        icon: `❎`,
      }
    );

    setDeleteContactId(null);
  }, [checkLang, deleteContactId, dispatch]);

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className={s.container}>
        {<ContactForm confirmContact={confirmContact} />}
        {contactsBook.length > 0 && (
          <Filter
            filterChangeInput={filterChangeInput}
            value={filterValueName}
          />
        )}
        {!contactsBook.length && !loading && (
          <p className={theme === themes.light ? s.titleLight : s.titleDark}>
            {t('contactForm.title')}
          </p>
        )}
        {finalArray.length ? (
          <ContactList
            openEditModal={openEditModal}
            onEditContact={onEditContact}
            filterContacts={filterContactsName}
            onDeleteContact={onDeleteContact}
          />
        ) : (
          ''
        )}
        {openModal === ACTION.EDIT && (
          <Modal closeModal={closeEditModal}>
            <EditCard activeElement={activeContact} onSubmit={confirmEdit} />
          </Modal>
        )}
        <ToastContainer theme="dark" />
      </div>
    </>
  );
};

export default Contacts;
