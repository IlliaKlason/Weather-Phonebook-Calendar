import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import NavItem from './NavItem/NavItem';
import { useTranslation } from 'react-i18next';

import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import s from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const { t } = useTranslation();

  return (
    <nav className={s.container}>
      {!isLoggedIn && (
        <NavItem
          key={'HomePage'}
          name={t('userMenu.homepage')}
          icon={<CottageRoundedIcon />}
          link={''}
        />
      )}
      {isLoggedIn && (
        <>
          <NavItem
            key={'PhoneBook'}
            name={t('userMenu.phonebook')}
            icon={<ContactPhoneIcon />}
            link={'/phonebook'}
          />
          <NavItem
            key={'Calendar'}
            name={t('userMenu.calendar')}
            icon={<CalendarMonthIcon />}
            link={'/calendar'}
          />
        </>
      )}
    </nav>
  );
};

export default Navigation;
