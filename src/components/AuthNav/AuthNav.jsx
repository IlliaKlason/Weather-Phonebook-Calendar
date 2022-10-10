import NavItem from 'components/Navigation/NavItem/NavItem';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import { useTranslation } from 'react-i18next';
import s from './AuthNav.module.css'



const AuthNav = () => {
  const { t } = useTranslation();
  return (
    <nav className={s.container}>
      <NavItem
        key={"Sing In"}
        name={t("authNav.singInName")}
        icon={<LoginIcon sx={{ fontSize: 22 }} />}
        link={"/sing_in"}
      />
      <NavItem
        key={"Register"}
        name={t("authNav.registerName")}
        icon={<GroupAddSharpIcon />}
        link={"/register"}
      />
    </nav>
  )
};
export default AuthNav;
