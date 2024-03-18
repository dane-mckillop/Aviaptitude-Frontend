import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

/**
 * Styling options for the MUI TableCell components.
 */
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 13,
        backgroundColor: "#333",
        color: "#D3F0FF",
        cursor: "pointer",
        border: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        backgroundColor: "#D3F0FF",
        cursor: "pointer",
    },
}));

/**
 * Partial component rendered to the BirdPage and Tricks pages.
 * Presents a sortable table Tricks searched by the SearchTricks component.
 * If on BirdPage, onClick deletes tricks from the current bird.
 * If on Tricks page, onClick adds tricks to the current bird, if one exists.
 * 
 * props throws exceptions if not destructured first.
 */
const TricksTable = (props) => {
    const { bearer, bird, changeBird, tricks } = props  //Bearer token, current bird, function to change bird, and current list of tricks.
    const [sorting, setSorting] = useState({ column: null, direction: null });  //States for sortable column and direction
    const auth = {
        headers: {
            Authorization: bearer
        }
    }

    //Toggles the sorting direction (ascending, descending, or none) for a given column.
    const handleSort = (columnName) => {
        if (sorting.column === columnName) {
            setSorting(prevSorting => ({
                ...prevSorting,
                direction: prevSorting.direction === 'asc' ? 'desc' : prevSorting.direction === 'desc' ? null : 'asc'
            }));
        } else {
            setSorting({ column: columnName, direction: 'asc' });
        }
    };

    //Array of tricks based on a specified column and direction, maintaining original order if no sorting criteria is provided.
    const sortedTricks = [...tricks].sort((a, b) => {
        if (sorting.column && sorting.direction) {
            const columnA = a[sorting.column];
            const columnB = b[sorting.column];
            if (sorting.direction === 'asc') {
                return columnA < columnB ? -1 : 1;
            } else {
                return columnA > columnB ? -1 : 1;
            }
        } else {
            return 0;
        }
    });

    //Returns an arrow symbol indicating sorting direction for a given column or null if not sorted.
    const arrowSymbol = (column) => {
        if (sorting.column === column) {
            if (sorting.direction === 'asc') {
                return '▲';
            } else if (sorting.direction === 'desc') {
                return '▼';
            } else {
                return null;
            }
        }
        return null;
    };

    //Handles a click event by either deleting tricks if on the /bird-page path, or adding a trick if on the /tricks route.
    const handleClick = (trick) => {
        const currentPage = window.location.pathname;
        if (currentPage === '/bird-page') {
            deleteTrick(trick);
        } else if (currentPage === '/tricks') {
            addTrick(trick);
        }
    }

    //Deletes a trick from the current bird using the Bird's remove-trick endpoint.
    const deleteTrick = (trick) => {
        const url = "http://localhost:8088/birds/remove-trick"
        const birdTrickRequest = {
            bird: bird,
            trick: trick
        }

        axios.put(url, birdTrickRequest, auth)
            .then(response => {
                changeBird(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Adds a trick to the current bird using the Bird's add-trick endpoint.
    const addTrick = (trick) => {
        if (bird !== "") {
            const url = "http://localhost:8088/birds/add-trick"
            const trickExists = bird.tricks.some(birdTrick => birdTrick.id === trick.id);

            if (!trickExists) {
                const birdTrickRequest = {
                    bird: bird,
                    trick: trick
                }

                axios.put(url, birdTrickRequest, auth)
                    .then(response => {
                        changeBird(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    return (
        <Paper sx={{ overflow: "hidden", backgroundColor: "#333", width: "100%" }}>
            <TableContainer sx={{ height: "100%" }} className="table-container" component={Paper}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow >
                            <StyledTableCell onClick={() => handleSort('name')}>
                                Name {arrowSymbol('name')}
                            </StyledTableCell>
                            <StyledTableCell onClick={() => handleSort('difficulty')}>
                                Difficulty {arrowSymbol('difficulty')}
                            </StyledTableCell>
                            <StyledTableCell onClick={() => handleSort('description')}>
                                Description {arrowSymbol('description')}
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTricks.map((trick) => (
                            <TableRow key={trick.id} onClick={() => handleClick(trick)}>
                                <StyledTableCell >{trick.name}</StyledTableCell>
                                <StyledTableCell >{trick.difficulty}</StyledTableCell>
                                <StyledTableCell >{trick.description || 'No description'}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TricksTable