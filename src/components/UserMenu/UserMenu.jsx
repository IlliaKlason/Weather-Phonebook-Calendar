import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { ThemeContext, themes } from 'components/context/themeContext';
import { useTranslation } from 'react-i18next';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import s from './UserMenu.module.css'




const UserMenu = () => {

  
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const { t } = useTranslation();


  return (
    <div className={s.container}>
      <span
        className={theme === themes.light ? s.itemNameLight : s.itemNameDark}
        // 
      >
        {t("userMenu.welcome")}, { name }
        
        <span className={s.span}>
          <AccountCircleSharpIcon />
        </span>
      </span>
      <button
        className={s.btn}
        type='button'
        onClick={() => dispatch(authOperations.logOut())}
      >
        <span className={s.btnText}> {
          t("userMenu.btnOut")}
        </span>
        <span className={s.spanOut}> <LogoutIcon /></span>
        
      </button>
    </div>
  )
}

export default UserMenu;