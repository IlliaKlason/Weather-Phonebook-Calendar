import PropTypes from 'prop-types';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import s from './ItemContact.module.css';

const ItemContact = ({ onDeleteContact, onEditContact, name, number, id }) => {
  return (
    <>
      <li className={s.item} id={id}>
        <div className={s.textContainer}>
          <ContactPhoneOutlinedIcon />
          <strong className={s.text}>
            {name}: {number}
          </strong>
        </div>

        <div>
          <button className={s.btnDel} onClick={onEditContact} type="button">
            <BorderColorSharpIcon />
          </button>
          <button className={s.btnDel} onClick={onDeleteContact} type="button">
            <DeleteForeverOutlinedIcon />
          </button>
        </div>
      </li>
    </>
  );
};

ItemContact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDeleteContact: PropTypes.func,
  onEditContact: PropTypes.func,
  id: PropTypes.string,
};

export default ItemContact;
