import '../styles/Register.css';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Page component for registering a new User.
 */
const Register = (props) => {
    const username = props.username                             //Username for new User.
    const changeUsername = props.changeUsername                 //Function for changing the User.
    const [password, setPassword] = useState("")                //Password for the new User.
    const [confirmPassword, setConfirmPassword] = useState("")  //Confirms password is correct.
    const [firstName, setFirstName] = useState("")              //First name of the new User.
    const [lastName, setLastName] = useState("")                //Last name of the new User.
    const [email, setEmail] = useState("")                      //Email of the new User.
    const [focus, setFocus] = useState("")                      //Focus of the currently selected form field.
    const [message, setMessage] = useState("")                  //Error message for the Alert component.
    const [showWarning, setShowWarning] = useState("")          //Shows Alert if true, else is hidden.
    const navigate = useNavigate()
    const url = "http://localhost:8088/users/register"          //Endpoint for registering a new User.

    //Field currently selected
    const handleFocus = (elementName) => {
        setFocus(elementName)
    }

    //Clears the focus when deselecting field
    const handleBlur = () => {
        setFocus("")
    }

    //Validates fields provided for the registration.
    //Email validated against email type in TextField type email.
    const handleRegister = (e) => {
        e.preventDefault()
        const userRegex = /^[a-zA-Z0-9]+$/      //Letters and numbers.
        const passRegex = /^\S+$/               //Any non-whitespace symbol.
        const nameRegex = /^[a-zA-Z]+$/         //Letters only.

        let isValid = true
        let warning = ""

        if (!userRegex.test(username))
        {
            isValid = false
            warning = "username"
        }
        if (!passRegex.test(password))
        {
            isValid = false
            warning = warning === "" ? "password" : warning + ", password"
        }
        if(!(password === confirmPassword))
        {
            isValid = false
            warning = warning === "" ? "confirm password" : warning + ", confirm password"
        }
        if(!nameRegex.test(firstName))
        {
            isValid = false
            warning = warning === "" ? "first name" : warning + ", first name"
        }
        if(!nameRegex.test(lastName))
        {
            isValid = false
            warning = warning === "" ? "last name" : warning + ", last name"
        }

        if (isValid)
        {
            const user = {
                username:username,
                password:password,
                firstName:firstName,
                lastName:lastName,
                email:email
            }

            authorize(user)
        }
        else
        {
            warning = "Fields requiring attention:\n" + warning
            setMessage(warning)
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
        }
    }

    //If provided details are valid, attempts to register the new User.
    const authorize = (newUser) => {
        axios.post(url, newUser)
            .then(response=>{
                changeUsername("")
                navigate("/login")
            })
            .catch(err => {
                let warning = err.response && err.response.data && err.response.data.message ? err.response.data.message : "Network error. Try again later.";
                setMessage("Registration Failed:\n" + warning)
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 2000);
            })
    }

    return (
        <div className="register-container">
            <Typography variant="h3" sx={{m: 1}} className="register-title"> Registration </Typography>
            <form className="input-form" onSubmit={handleRegister}>
                <Stack className="inputs" spacing={1}>
                    <TextField required id="register-username" className="input-field" 
                        label="Username" onChange={(e)=>changeUsername(e.target.value)} 
                        variant="outlined" onFocus={() => handleFocus('username')} onBlur={handleBlur}
                        helperText={focus==="username" ? "Letters and numbers only.": ""} inputProps={{maxLength:50}}
                    />
                    <TextField required id="register-password" className="input-field" 
                        label="Password" onChange={(e)=>setPassword(e.target.value)}
                        variant="outlined" type="password" onFocus={() => handleFocus('password')} onBlur={handleBlur}
                        helperText={focus==="password" ? "Letters, numbers & symbols. No whitespaces." : ""}
                        inputProps={{maxLength:50}}
                    />
                    <TextField required id="register-confirm" className="input-field" 
                        label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}
                        variant="outlined" type="password" onFocus={() => handleFocus('confirm')} onBlur={handleBlur}
                        helperText={focus==="confirm" ? "Match the provided password." : ""} inputProps={{maxLength:50}}
                    />
                    <TextField required id="register-first" className="input-field" 
                        label="First Name" onChange={(e)=>setFirstName(e.target.value)}
                        variant="outlined" onFocus={() => handleFocus("first")} onBlur={handleBlur}
                        helperText={focus==="first" ? "Letters only. No whitespaces." : ""} inputProps={{maxLength:50}}
                    />
                    <TextField required id="register-last" className="input-field" 
                        label="Last Name" onChange={(e)=>setLastName(e.target.value)}
                        variant="outlined" onFocus={() => handleFocus('last')} onBlur={handleBlur}
                        helperText={focus==="last" ? "Letters only. No whitespaces." : ""} inputProps={{maxLength:50}}
                    />
                    <TextField required id="register-email" className="input-field" 
                        label="Email" onChange={(e)=>setEmail(e.target.value)}
                        variant="outlined" type="email" onFocus={() => handleFocus('email')} onBlur={handleBlur}
                        helperText={focus==="email" ? "Valid email address." : ""} inputProps={{maxLength:100}}
                    />
                    <Button type="submit" className="submit-button" variant="contained">Submit</Button>
                </Stack>
            </form>
            {showWarning && (
                <div className="register-warning">
                    <Alert severity="info">{message}</Alert>
                </div>
            )}
        </div>
    )
}

export default Register