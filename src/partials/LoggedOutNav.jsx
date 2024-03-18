import '../styles/NavPartial.css';
import { Link } from 'react-router-dom';

/**
 * Partial component in Nav if user is logged out.
 * Provides links for Login and Register.
 */
const LoggedOutNav = () => {
    return (
        <div className="links">
            <Link to="/login" className="link">Login</Link>
            <Link to="/register" className="link">Register</Link>
        </div>
    )
}

export default LoggedOutNav