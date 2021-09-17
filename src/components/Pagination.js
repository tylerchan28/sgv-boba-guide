import React from "react";
import Button from "@mui/material/Button";
import { makeStyles} from "@material-ui/styles";

const Pagination = ({ reviewsPerPage, totalReviews, paginate }) => {
    
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
        pageNumbers.push(i);
    }

    const useStyles = makeStyles(theme => ({
        pagination__button: {
            width: "1vw",
            "&:focus": { backgroundColor: "gray"},
        }
    }))
    
    const classes = useStyles();

    return (
        <nav>
            <div className="pagination__container">
                {pageNumbers.map(number => (
                    <Button 
                        key={number}
                        variant="standard" 
                        onClick={() => paginate(number)}
                        className={classes.pagination__button}
                    >
                        <div className="pagination__page-number">{number}</div>
                    </Button>
                ))}
            </div>
        </nav>
    )
}

export default Pagination;