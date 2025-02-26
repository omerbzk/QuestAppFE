import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    let userId =5;
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to={{pathname : '/users/' + userId}}>User</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;