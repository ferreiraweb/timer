import { HeaderContainer } from "./header-styles";
import logIgnite from "../../assets/logo-ignite.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
        <img src={logIgnite} alt="Logo Ignite" />
        <nav>
            <NavLink to="/" title="Timer">
                <Timer size={24} />
            </NavLink>
            <NavLink to="/history" title="Histórico">
                <Scroll size={24} />
            </NavLink>
        </nav>
    </HeaderContainer>
  );
}
