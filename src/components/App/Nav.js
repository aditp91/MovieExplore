import React from 'react';
import {NavLink} from 'react-router-dom';

export function Nav () {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"><h2>Movie Explore</h2></a>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item nav-mx">
                            <NavLink exact activeClassName="active" to="/">
                                Explore
                            </NavLink>
                        </li>
                        <li className="nav-item nav-mx">
                            <NavLink activeClassName="active" to="/my-reviews">
                                MyReviews
                            </NavLink>
                        </li>
                    </ul>
                </div>
                
                <NavLink activeClassName="active" to="/login">
                    <button className="btn btn-primary">Login</button>
                </NavLink>
            </nav>
        </div>
    )
}