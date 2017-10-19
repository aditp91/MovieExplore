import React from 'react';
import {NavLink} from 'react-router-dom';

export function Nav () {
    return (
        <ul className="nav">
            <li>
                <NavLink exact activeClassName="active" to="/">
                    Explore
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/my-reviews">
                    MyReviews
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/review">
                    Review
                </NavLink>
            </li>
        </ul>
    )
}