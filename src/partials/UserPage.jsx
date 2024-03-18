import "../styles/UserPage.css";
import BirdCard from './BirdCard';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Page component for presenting information of the currently logged in User.
 * Includes BirdCard components for all Birds associated with the User.
 * Requires a bearer token to access this page.
 */
const UserPage = (props) => {
    const bird = props.bird                 //Currently selected bird
    const birds = props.birds               //List of birds owned by current User
    const changeBird = props.changeBird     //Function for changing the current Bird
    const user = props.user                 //Currently logged in User
    const navigate = useNavigate()

    return (
        <div className="user-container">
            <Typography variant="h4" noWrap className="user-title"> {user.firstName} {user.lastName} </Typography>
            <div className="user-icon-border"> 
                <img className="user-icon" src="/img/icons8-user-90.png" alt="User"/>
            </div>
            <div className="user-info">
                <Typography variant="subtitle2" sx={{m: 1}} className="user-detail" > User: {user.username} </Typography>
                <Typography variant="subtitle2" sx={{m: 1, marginTop: 0}} className="user-detail" > Email: {user.email} </Typography>
            </div>
            <div className="user-birds">
                <Button sx={{m:0.8}} variant="contained" className="add-bird-button" onClick={()=>navigate("/register-bird")}
                    style={{
                        backgroundColor: "#0189C3", borderRadius: "1rem"
                    }}>
                    <div className="add-border">
                        <img className="add-bird-icon" src="/img/icons8-add-100.png" alt="Add"/>
                    </div>
                </Button>
                {birds.length > 0 && birds.map((aBird) => (
                    <BirdCard key={aBird.id} bird={aBird} changeBird={changeBird} 
                        sx={{border: bird.id === aBird.id ? "2px solid gold" : "none"}}
                    />
                ))}
            </div>
        </div>
    )
}

export default UserPage