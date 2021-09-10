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