import React, { useState } from "react";

const ListFilter = (props) => {
    
    const [filter, setFilter] = useState("");
    
    return (
        <div>
            <input
                type="text"
                className="list__filter"
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    )
}

export default ListFilter;

// .filter is textmatch (shop.name contains {filter})
// incorporate into restaurant list
// https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1