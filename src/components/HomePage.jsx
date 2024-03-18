import '../styles/HomePage.css';
import UserPage from '../partials/UserPage';
import { useNavigate } from 'react-router-dom';

/**
 * Landing page component for Aviaptitude.
 * If logged out, will prompt either Login or Registration.
 * If logged in, presents the UserPage partial.
 */
const HomePage = (props) => {
    const bearer = props.bearer             //Bearer token.
    const bird = props.bird                 //Currently selected Bird.
    const birds = props.birds               //Birds associated with current User.
    const changeBird = props.changeBird     //Function for changing the current Bird.
    const user = props.user                 //Currently logged in User.
    const navigate = useNavigate();

    return (
        <div className='home-page'>
            {bearer !== "" ? (
                <UserPage bird={bird} birds={birds} user={user} changeBird={changeBird} />
            ) : (
                <div className='buttons-container'>
                    <button className='button' onClick={()=>navigate("/login")}>Login</button>
                    <button className='button' onClick={()=>navigate("/register")}>Register</button>
                </div>
            )}
        </div>
    )
}

export default HomePage