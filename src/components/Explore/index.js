import React, {Component } from 'react';
import axios from 'axios';

import apiConstants from '../../shared/api.constants.js';
import Movies from './Movies';
import Details from './Details';
import './style.css';

export default class Explore extends Component {
  constructor (props) {
    super();
    this.state = {
        movies: [],
        reviews: []
    };

    this.thumbnailSelectHandler.bind(this);
  };

  componentDidMount () {
    // RESTful calls to the api services
    axios.get(apiConstants.HOST + '/api/getMovies')
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      });
  }

  thumbnailSelectHandler(movieId) {
    axios.get(apiConstants.HOST + '/api/getReviewsByMovie/' + movieId)
      .then(res => {
        const reviews = res.data;
        this.setState({ reviews });
      });
  }

  render() {
    return (
      <div className='explore'>
        {/* <div className="explore-header">
          <img src={logo} className="explore-logo" alt="logo" />
          <h2>Explorer</h2>
        </div> */}
        <Movies data={this.state.movies} thumbnailSelectHandler={this.thumbnailSelectHandler.bind(this)}/>
        <Details data={this.state.reviews}/>
      </div>
    );
  }
};