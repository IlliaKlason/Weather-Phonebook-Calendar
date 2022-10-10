import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext, themes } from "components/context/themeContext";
import PropTypes from "prop-types";
import s from "./NavItem.module.css";

const NavItem = ({ name, icon, link }) => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={s.NavItem}>
      <span className={s.iconWrapper}>
       
        <NavLink
          to={link}
          className={theme === themes.light ? s.itemNameLight : s.itemNameDark}
          activeclassname={theme === themes.light ? s.NavItemActiveLight : s.NavItemActiveDark}
        >
          {name}
          <span className={s.span}>{icon}</span>
          
        </NavLink>
        
      </span>
    </div>
  );
}
NavItem.propTypes = {
  link: PropTypes.string.isRequired,
};

export default NavItem;