import PropTypes from 'prop-types';
import ItemContact from './ItemContact';
import s from './ContactList.module.css';
import Appear from 'components/Appear';

const ContactList = ({
  onDeleteContact,
  onEditContact,
  openEditModal,
  filterContacts }) => {

  return (
    <Appear time={400}>
    <ul className={s.list}>
      {filterContacts && filterContacts.map(({ id, name, number }) => {
        return (
          <ItemContact
            id={id}
            key={id}
            name={name}
            number={number}
            onDeleteContact={() => onDeleteContact(id)}
            onEditContact={() => onEditContact({id,name, number})}
            openEditModal={openEditModal}
          />
        );
      })}
      </ul>
      </Appear>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  filterContactsName: PropTypes.array,
};

export default ContactList;
