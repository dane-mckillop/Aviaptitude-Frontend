import '../styles/Header.css';
import Nav from "./Nav";
import SearchTricks from "./SearchTricks";

/**
 * Partial component rendered at the top of all pages.
 * Contains the Nav and SearchTricks components.
 */
const Header = (props) => {

    return (
        <div className='header-container'>
            <Nav bearer={props.bearer} changeBearer={props.changeBearer} changeBird={props.changeBird} 
                changeBirds={props.changeBirds} changeLastSearch={props.changeLastSearch} changeTricks={props.changeTricks} 
                changeUsername={props.changeUsername} changeUser={props.changeUser}
            />
            <div className="search-field">
                <SearchTricks changeLastSearch={props.changeLastSearch} tricks={props.tricks} changeTricks={props.changeTricks} />
            </div>
        </div>
    )
}

export default Header