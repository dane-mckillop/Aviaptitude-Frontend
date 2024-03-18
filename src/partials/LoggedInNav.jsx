import '../styles/NavPartial.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

/**
 * Partial component rendered in Nav if user is logged in.
 * Includes the button to logout the current User.
 * 
 * @todo create logout function in App.jsx, and reinitialize all states. Use in this component.
 */
const LoggedInNav = (props) => {
    const changeBearer = props.changeBearer         //Bearer token.
    const changeBird=props.changeBird               //Function for changing the current bird.
    const changeBirds=props.changeBirds             //Function for changing the list of birds.
    const changeLastSearch=props.changeLastSearch   //Function for changing the most recent search.
    const changeTricks=props.changeTricks           //Function for changing the list of tricks.
    const changeUsername = props.changeUsername     //Function for changing the username.
    const changeUser = props.changeUser             //Function for changing the current user.
    const navigate = useNavigate();

    //Logs out the current user. Reinitializes states relating to bearer, bird, trick and user.
    const logout = (e) => {
        e.preventDefault()
        changeBearer("")
        changeBird("")
        changeBirds([])
        changeLastSearch("")
        changeTricks([])
        changeUsername("")
        changeUser("")
        navigate("/")
    }

    return (
        <div className="links">
            <Link onClick={logout} className="link">Logout</Link>
        </div>
    )
}

export default LoggedInNav