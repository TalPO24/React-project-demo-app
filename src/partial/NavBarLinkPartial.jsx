import { NavLink } from "react-router-dom";
import "./NavBarLinkPartial.scss";

const NavBarLinkPartial = ({ label, link }) => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        to={link}
        isActive={(match, location) => match && match.isExact} // a shorter way to show the color in the nav links // if the match is falsey and the match.isExact is falsey then its automatically returns truthy.
      >
        {label}
      </NavLink>
    </li>
  );
};
export default NavBarLinkPartial;
