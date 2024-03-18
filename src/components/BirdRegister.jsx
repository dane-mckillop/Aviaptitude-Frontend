import { useState } from 'react';
import '../styles/BirdRegister.css'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

/**
 * Page component for registering a new Bird to the currently logged in User.
 * Requires a bearer token to access this page.
 */
const BirdRegister = (props) => {
    const bearer = props.bearer                         //Bearer token.
    const user = props.user                             //Currently logged in User.
    const changeBird = props.changeBird                 //Function for changing the current Bird.
    const [name, setName] = useState("")                //Name of the Bird to be registered.
    const [species, setSpecies] = useState("")          //Species of the Bird to be registered.
    const [focus, setFocus] = useState("")              //Focus of the currently selected form field.
    const [message, setMessage] = useState("")          //Error message for the Alert component.
    const [showWarning, setShowWarning] = useState("")  //Shows Alert if true, else is hidden.
    const navigate = useNavigate()
    const url = "http://localhost:8088/birds/save"      //Endpoint for registering a new bird to a user.

    //Field currently selected
    const handleFocus = (elementName) => {
        setFocus(elementName)
    }

    //Clears the focus when deselecting field
    const handleBlur = () => {
        setFocus("")
    }

    //Validates input of provided Bird details
    const handleAddBird = (e) => {
        e.preventDefault()
        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/      //Letters seperated by single whitespaces.
        let isValid = true
        let warning = ""
        
        if (!nameRegex.test(name))
        {
            isValid = false
            warning = "name"
        }
        if (species!== "" && !nameRegex.test(species))
        {
            isValid = false
            warning = warning === "" ? "species" : warning + ", species"
        }

        if (isValid)
        {
            const bird = {
                name: name,
                species: species,
                user: user
            }

            authorize(bird)
        }
        else
        {
            warning = "Fields requiring attention:\n" + warning
            setMessage(warning)
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
        }
    }

    //If fields are valid, will persist the Bird, update current Bird and navigate to home.
    const authorize = (newBird) => {
        const auth = {
            headers:{
                Authorization: bearer
            }
        }

        axios.post(url, newBird, auth)
            .then(response=>{
                changeBird(response.data)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                let warning = err.response && err.response.data && err.response.data.message ? err.response.data.message : "Network error. Try again later.";
                setMessage("Registration Failed:\n" + warning)
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 3000);
            })
    }

    return (
        <div className="bird-register-container">
            <Typography variant="h3" sx={{m: 3}} className="bird-register-title"> Add Bird </Typography>
            <form className="input-form" onSubmit={handleAddBird}>
                <Stack className="inputs" spacing={3}>
                    <TextField required id="bird-name" className="input-field" 
                        label="Name" onChange={(e)=>setName(e.target.value)} 
                        variant="outlined" onFocus={() => handleFocus('name')} onBlur={handleBlur}
                        helperText={focus==="name" ? "Letters and whitespaces only." : ""} 
                        inputProps={{maxLength:50}}
                    />
                    <TextField id="bird-species" className="input-field" 
                        label="Species (optional)" onChange={(e)=>setSpecies(e.target.value)}
                        variant="outlined" onFocus={() => handleFocus('species')} onBlur={handleBlur}
                        helperText={focus==="species" ? "Letters and whitespaces only." : ""} 
                        inputProps={{maxLength:50}}
                    />
                    <Button type="submit" className="submit-button" variant="contained">Submit</Button>
                </Stack>
            </form>
            {showWarning && (
                <div className="bird-register-warning">
                    <Alert severity="info">{message}</Alert>
                </div>
            )}
        </div>
    )
}

export default BirdRegister