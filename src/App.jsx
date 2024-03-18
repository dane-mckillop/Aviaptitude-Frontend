import './App.css';
import Header from './partials/Header';
import Footer from './partials/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import BirdRegister from './components/BirdRegister';
import BirdPage from './components/BirdPage';
import NotFound from './components/NotFound';
import Tricks from './components/Tricks';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Application including Header, Footer, and Routes.
 * Referenced in main.jsx, the entrypoint.
 * 
 * Header - Contains the navigation and search-bar.
 * Routes - Includes content to navigate and interact with entities.
 * Footer - Contains references and additional resources.
 */
function App() {
  const [bearer, setBearer] = useState("")          //Bearer token for authorization
  const [bird, setBird] = useState("")              //Currently focused bird
  const [birds, setBirds] = useState([])            //All birds associated witht he user
  const [lastSearch, setLastSearch] = useState("")  //Most recent search-bar submit
  const [tricks, setTricks] = useState([])          //Current subset of all Tricks
  const [username, setUsername] = useState("")      //Username used to obtain the User during login
  const [user, setUser] = useState("")              //Current logged in user
  const [starting, setStarting] = useState(true)    //Initialization status of the application
  const navigate = useNavigate()

  const changeBearer = (value) => { setBearer(value) }
  const changeBird = (value) => { setBird(value) }
  const changeBirds = (value) => { setBirds(value) }
  const changeLastSearch = (value) => { setLastSearch(value) }
  const changeTricks = (value) => { setTricks(value) }
  const changeUsername = (value) => { setUsername(value) }
  const changeUser = (value) => { setUser(value) }


  //Get sanitized user by username
  //Triggered by:
  //  -Login: user obtains a bearer token
  useEffect(() => {
    if (username && bearer) {
      const auth = {
        headers: {
          Authorization: bearer
        }
      }
      const url = `http://localhost:8088/users/search?username=${username}`

      axios.get(url, auth)
        .then(response => {
          console.log(response)
          let sanitizedUser = response.data
          delete sanitizedUser.password;
          setUser(sanitizedUser)
        })
        .catch(err => {
          console.log(err.message)
          setBearer("")
          setUsername("")
          setUser("")
        })
    }
  }, [bearer]);

  //Get birds for the current user
  //Triggered anytime user updates
  useEffect(() => {
    if (user !== "") {
      const auth = {
        headers: {
          Authorization: bearer
        }
      }
      const ownerUrl = `http://localhost:8088/birds/owner/${user.id}`

      axios.get(ownerUrl, auth)
        .then(response => {
          changeBirds(response.data)
        })
        .catch(err => {
          console.log(err.message)
          setBirds("")
        })
    }
  }, [user, bird])

  //Ensures we start at the homepage
  useEffect(() => {
    if (starting)
    {
      setStarting(false)  //Startup complete
      navigate("/")
    }
  }, [starting])

  return (
    <>
      <div className="main-container">
        <Header bearer={bearer} changeBearer={changeBearer} changeBird={changeBird} changeBirds={changeBirds} 
          changeLastSearch={changeLastSearch} tricks={tricks} changeTricks={changeTricks} 
          changeUser={changeUser} changeUsername={changeUsername}/>
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<HomePage bearer={bearer} bird={bird} birds={birds} user={user} changeBird={changeBird} />} />
            {bearer == "" && <Route path="/login" element={<Login bearer={bearer} changeBearer={changeBearer} username={username}
                changeUsername={changeUsername} />} />}
            {bearer == "" && <Route path="/register" element={<Register changeBearer={changeBearer} username={username}
              changeUsername={changeUsername} />} />}
            {bearer !== "" && <Route path="/register-bird" element={<BirdRegister bearer={bearer} user={user} changeBird={changeBird} />} />}
            {bearer !== "" && <Route path="/bird-page/" element={<BirdPage bearer={bearer} bird={bird} changeBird={changeBird} 
                changeLastSearch={changeLastSearch} changeTricks={changeTricks} username={username} />} />}
            <Route path="/tricks" element={<Tricks bearer={bearer} bird={bird} changeBird={changeBird} lastSearch={lastSearch} tricks={tricks} user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
