import "../styles/Tricks.css"
import { Typography } from "@mui/material";
import TricksTable from "../partials/TricksTable";
import NoResults from "../partials/NoResults";

/**
 * Page component for viewing available Tricks to be learnt by a Bird.
 * If logged in, will be able to assign Tricks to the currently selected Bird.
 * If logged out, can still view Tricks, but unable to interact.
 */
const Tricks = (props) => {
    const bearer = props.bearer             //Bearer token
    const bird = props.bird                 //Currently selected Bird    
    const changeBird = props.changeBird     //Function for changing the current Bird
    const lastSearch = props.lastSearch     //Last searched term from SearchTricks component.
    const tricks = props.tricks             //Current list of Tricks.
    const user = props.user                 //Logged in User

    return (
        <div className="tricks-page-format">
            <div className="tricks-container">
                <div className="tricks-bird-info">
                    <div className="bird-icon-border">
                        <img className="bird-icon" src="/img/icons8-bird-90.png" alt="Bird" />
                    </div>
                    <div className="profile-details">
                        {user === "" ? (
                            <Typography variant="subtitle2" className="no-user-prompt">
                                User not logged in
                            </Typography>
                        ) : (
                            <div className="profile-details">
                                <Typography variant="subtitle2" className="profile-detail">
                                    Trainer: {user.username}
                                </Typography>
                                {bird === "" ? (
                                    <Typography variant="subtitle2" className="profile-detail">
                                        Bird: No bird selected
                                    </Typography>
                                ) : (
                                    <Typography variant="subtitle2" className="profile-detail">
                                        Bird: {bird.name}
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Typography variant="h6" className="tricks-table-title-main" >
                    {lastSearch !== "" ? `Tricks matching: ${lastSearch}` : "All Tricks"}
                </Typography>
                <div className="tricks-table">
                    {
                        tricks.length > 0 ?
                            <TricksTable bearer={bearer} bird={bird} changeBird={changeBird} tricks={tricks} />
                            :
                            <NoResults />
                    }
                </div>
            </div>
        </div>
    )
}

export default Tricks