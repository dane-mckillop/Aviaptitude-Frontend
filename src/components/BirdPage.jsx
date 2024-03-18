import "../styles/BirdPage.css"
import TricksTable from "../partials/TricksTable"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"

/**
 * Page component for presenting information of the currently selected Bird.
 * Includes a table of tricks known by the current Bird.
 * Requires a bearer token to access this page.
 */
const BirdPage = (props) => {
    const bearer = props.bearer                         //Bearer token
    const bird = props.bird                             //Bird associated with logged-in User
    const changeBird = props.changeBird                 //Function to change Bird
    const changeLastSearch = props.changeLastSearch     //Function to change Last Search
    const changeTricks = props.changeTricks             //Function to change array of Tricks
    const username = props.username                     //Username of logged-in User
    const navigate = useNavigate()

    //Event handler for searching for Tricks if current Bird knows no Tricks.
    const handleNewTricks = (e) => {
        e.preventDefault

        let url = "http://localhost:8088/tricks"
        changeLastSearch("")

        axios.get(url)
            .then(response => {
                changeTricks(response.data)
                navigate("/tricks")
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div className="bird-page-format">
            <div className="bird-container">
                <Typography variant="h4" noWrap className="bird-page-title">
                    {bird.name} 
                </Typography>
                <div className="bird-page-icon-border">
                    <img className="bird-page-icon" src="/img/icons8-bird-90.png" alt="Bird" />
                </div>
                <div className="bird-info">
                    <Typography variant="subtitle2" sx={{ m: 1 }} className="bird-detail" > Trainer: {username} </Typography>
                    <Typography variant="subtitle2" sx={{ m: 1, marginTop: 0 }} className="bird-detail" > Species: {bird.species ? bird.species : "Not set"} </Typography>
                </div>
                <Typography variant="h6" className="tricks-table-title-bird">Known Tricks: {bird.tricks.length}</Typography>
                <div className="bird-tricks">
                    {bird.tricks.length > 0 ? (
                        <TricksTable bearer={bearer} bird={bird} changeBird={changeBird} tricks={bird.tricks} />
                    ) : (
                        <Button variant="contained" sx={{m:2, color:"#D3F0FF", backgroundColor:"#333"}} onClick={handleNewTricks} >
                            Add Tricks!
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BirdPage