import "../styles/SearchTricks.css"
import { TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

/**
 * Partial component rendered in the Header.
 * Search field used to search tricks by substring of name.
 * Accesses findAll endpoint if no search entered.
 * Accesses findByPartial endpoint if search term provided.
 */
const SearchTricks = (props) => {
    const tricks = props.tricks                             //List of Tricks matching search
    const changeTricks = props.changeTricks                 //Function for changing tricks
    const changeLastSearch = props.changeLastSearch         //Function for changing lastSearch
    const [searchHover, setSearchHover] = useState(false)   //Hover state for the search icon.
    const [search, setSearch] = useState("")                //Search term entered into textfield.
    const navigate = useNavigate()

    //Checks if search is empty, then receives tricks from relevant endpoint
    const handleSearch = (e) => {
        if (e) e.preventDefault()
        let url = "http://localhost:8088/tricks"

        //If parameters, search by name.
        //Will need to be reviewed if filtering applied
        if (search !== "") {
            url = `${url}/search?name=${search}`
        }
        changeLastSearch(search)    //Save the most recent search
        setSearch("")               //Clear search to empty the textfield

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
        <div className="search-tricks-format">
            <div className="search-tricks-container">
                <TextField id="search-tricks" variant="standard" placeholder="Search Tricks..." value={search} onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }} inputProps={{ style: { fontSize: 12 }, maxLength: 50 }}
                    sx={{ marginTop: "4px", marginRight: "1px", marginLeft: "2px", width: "85%", '& .MuiInputBase-input': { paddingBottom: '0' } }}
                />
            </div>
            <img className="search-tricks-img" src={searchHover ? "/img/icons8-search-hover-50.png" : "/img/icons8-search-norm-50.png"} alt="Search"
                onMouseEnter={() => setSearchHover(true)}
                onMouseLeave={() => setSearchHover(false)}
                onClick={handleSearch}
            />
        </div>
    )
}

export default SearchTricks