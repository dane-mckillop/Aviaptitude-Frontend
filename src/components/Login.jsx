import '../styles/Login.css';
import axios from "axios";
import { Alert, Button, TextField, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Page component for logging into Aviaptitude.
 * Obtains the Bearer token from the SpringSecurity endpoint.
 */
const Login = (props) => {
    const bearer = props.bearer                             //Bearer token.
    const changeBearer = props.changeBearer                 //Function for changing the bearer token.
    const username = props.username                         //Username for obtaining the User.
    const changeUsername = props.changeUsername             //Function for changing the Username.
    const [password, setPassword] = useState('')            //Password for logging in.
    const [showWarning, setShowWarning] = useState(false)   //Shows Alert if true, else is hidden.
    const [message, setMessage] = useState('Login Failed')  //Error message for the Alert component.
    const navigate = useNavigate();
    const url = "http://localhost:8088/auth/login"          //Endpoint for logging in and obtaining a Bearer token.

    //Validates provided username and password.
    const handleLogin = (e) => {
        e.preventDefault();
        const userRegex = /^[a-zA-Z0-9]+$/;     //Letters and numbers.
        const passRegex = /^\S+$/;              //Any non-whitespace symbols.
        let isValid = true;
        const requestOptions = {
            auth:{
                username:username,
                password:password
            }
        }

        if (!userRegex.test(username))
            isValid = false;

        if (!passRegex.test(password))
            isValid = false;

        if (isValid)
        {
            authorize(requestOptions)
        }
        else
        {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 2000);
        }
    }

    //If provided fields are valid, will send authorization details, and receive a Bearer token if valid.
    const authorize = (requestOptions) => {
        axios.post(url,{},requestOptions)
            .then(response=>{
                changeBearer("Bearer " + response.data)
                navigate("/")
            })
            .catch(err => {
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 3000);
            })
    }

    return (
        <div className="login-container">
            <Typography variant="h3" sx={{m: 3}} className="login-title"> Login </Typography>
            <form className="input-form" onSubmit={handleLogin}>
                <Stack className="inputs" spacing={3}>
                    <TextField required id="login-username" className="input-field" 
                        label="Username" onChange={(e)=>changeUsername(e.target.value)} 
                        variant="outlined" inputProps={{maxLength:50}}
                    />
                    <TextField required id="login-password" className="input-field" 
                        label="Password" onChange={(e)=>setPassword(e.target.value)}
                        variant="outlined" type="password" inputProps={{maxLength:50}}
                    />
                    <Button type="submit" className="submit-button" variant="contained">Submit</Button>
                </Stack>
            </form>
            {showWarning && (
                <div className="login-warning">
                    <Alert severity="info">{message}</Alert>
                </div>
            )}
        </div>
    )
}

export default Login