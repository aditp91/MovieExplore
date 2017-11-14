import React from 'react';
import {NavLink} from 'react-router-dom';

export function Nav (props) {
    let authorized = props.userId === 'unauthorized' ? false : true;

    console.log(props);

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
                
                <div className="alert alert-primary welcome" role="alert" style={authorized ? {} : { display: 'none' }}>
                    Welcome {props.username} !
                </div>
                <NavLink activeClassName="active" to="/login">
                    <button className="btn btn-primary" style={!authorized ? {} : { display: 'none' }}>Login</button>
                </NavLink>
            </nav>
        </div>
    )
}