import '../styles/NotFound.css'
import { Typography } from "@mui/material";

/**
 * Default page component if requested route doesn't exist.
 */
const NotFound = () => {
    return (
      <div className="not-found-container">
        <Typography variant="h3" sx={{m: 1}} className="not-found-title"> 404 - Page Not Found </Typography>
        <img className="not-found-img" src="https://media.tenor.com/Ce73hHEMBycAAAAi/happi-happi-cat.gif" alt="Happi Cat GIF" />
      </div>
    );
  };
  
  export default NotFound;