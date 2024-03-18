import '../styles/BirdCard.css'
import { Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';

/**
 * Partial component for presenting a given Bird's details.
 * Used to map birds on the UserPage.
 */
const BirdCard = (props) => {
    const { bird, changeBird } = props  //Currently selected Bird, and function to change bird.
    const navigate = useNavigate();

    /**
     * Changes the currently selected bird to the one associated with this card.
     */
    const handleBirdCard = (e) => {
        e.preventDefault()
        changeBird(bird)
        navigate("/bird-page")
    }

    return (
        <div className="bird-card">
            <Button sx={{m:0.8}} variant="contained" className="add-bird-button" onClick={handleBirdCard}
                style={{backgroundColor: "#0189C3", borderRadius: "1rem"
            }}>
                <u className="bird-name-u"><Typography variant="h6" style={{ height: "27px" }} className="bird-name" noWrap>{bird.name}</Typography></u>
                <div className="bird-box">
                    <div className="bird-details">
                        <div className="bird-card-icon-border">
                            <img className="bird-card-icon" src="/img/icons8-bird-90.png" alt="Bird" />
                        </div>
                    </div>
                    <div className="known-tricks">
                        <ul className="tricks-list">
                            {/* Maps up to 3 tricks, any more shows an ellipsis */}
                            {bird.tricks.map((trick, index) => (
                                <li key={index}>
                                    <Typography variant="caption" noWrap>
                                        {index < 3 || bird.tricks.length <= 3 ? `${trick.name} - ${trick.difficulty}` : index === 3 ? '...' : null}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Typography variant="body2" className="species" noWrap>{bird.species}</Typography>
            </Button>
        </div>
    )
}

export default BirdCard