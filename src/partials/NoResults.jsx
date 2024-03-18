import { Typography } from "@mui/material"

/**
 * Partial component rendered on the Tricks page if tricks list is empty.
 */
const NoResults = () => {
    return (
        <div className="no-results-container"
            style={{display: "flex", flexDirection: "column", alignItems: "center",
                color: "#0189C3", backgroundColor: "#D3F0FF", padding: "20px",
                borderRadius: "1rem"}}
        >
            <Typography variant="h3"> No Results! </Typography>
        </div>
    )
}

export default NoResults