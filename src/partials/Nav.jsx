import "../styles/Nav.css";
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import { Link } from 'react-router-dom';
import { useState } from "react";

/**
 * Partial component rendered in Header.
 * Conditionally presents LoggedInNav if a bearer token exists,
 * or LoggedOutNav if no bearer token is available.
 * Always includes the search field component SearchTricks.
 * 
 * @todo revise how props are passed to LoggedInNav. Logout function in app.jsx?
 */
const Nav = (props) => {
    const bearer = props.bearer                         //Bearer token.
    const [collapsed, setCollapsed] = useState(false)   //Collapsed state for navigation links.
    const [menuHover, setMenuHover] = useState(false)   //Hover state for the menu icon.
    const [homeHover, setHomeHover] = useState(false)   //Hover state for the home icon.

    //Inverts the collapsed state to present or hide navigation
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className="nav-container">
            {/* Toggle Menu */}
            <div className="menu-collapse"
                onClick={toggleCollapse}
                onMouseEnter={() => setMenuHover(true)}
                onMouseLeave={() => setMenuHover(false)}>
                <img className="burger" src={menuHover ? "/img/icons8-menu-hover-100.png" : "/img/icons8-menu-norm-100.png"} alt="Nav"/>
            </div>
            {/* Collapsable Navigation */}
            {!collapsed && (
                <nav className='nav'>
                    <Link to="/" className="link"
                          onMouseEnter={() => setHomeHover(true)}
                          onMouseLeave={() => setHomeHover(false)}>
                        <img className="icon-home" src={homeHover ? "/img/icons8-house-hover-98.png" : "/img/icons8-house-norm-98.png"} alt="Home"/>
                    </Link>
                    {bearer !== "" ? (
                        <LoggedInNav changeBearer={props.changeBearer} changeBird={props.changeBird}
                            changeBirds={props.changeBirds} changeTricks={props.changeTricks} changeLastSearch={props.changeLastSearch}
                            changeUsername={props.changeUsername} changeUser={props.changeUser}
                        />
                    ) : (
                        <LoggedOutNav />
                    )}
                </nav>
            )}
        </div>
    )
}

export default Nav