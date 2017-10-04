import React from 'react';
import {NavLink} from 'react-router-dom';

export function Nav () {
    return (
        <ul className="nav">
            <li>
                <NavLink exact activeClassName="active" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/about">
                    About
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