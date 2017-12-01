import React, {Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import apiConstants from '../../shared/api.constants.js';
import './style.css';

const Card = ({info, selectCard}) => {
  return (
    <div>
      <div className="card card-mx">
        <div className="card-body">
          <div className="details">
            <h4 className="card-title"> {info.Username} </h4>
            <h6 className="card-subtitle mb-2 text-muted"> {moment(info.EntryDateTime).format('MMMM Do YYYY, h:mm:ss a')} </h6>
            <p className="card-text"> {info.Description} </p>
            <a className="card-text text-muted">score: {info.Score}   </a>
            <a className="card-text text-muted">sentiment: {info.Sentiment}</a>
          </div>
          <div className="show">
            <button type="submit" className="btn btn-primary" onClick={selectCard}>Show Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default class MyReviews extends Component {
  constructor (props) {
    super();
    this.state = {
      reviews: [],
      associatedMoviePoster: '',
      associatedProduction: ''
    };

    this.selectReviewHandler = this.selectReviewHandler.bind(this);
  };

  componentDidMount () {
    if (this.props.role === 'unauthorized') {
      this.props.history.push('/login');
    } else { this.getReviews(); }
  }

  getReviews() {
    axios.get(apiConstants.HOST + '/api/getReviewsByUserId/'+ this.props.userId)
    .then(res => {
      const reviews = res.data;
      console.log(reviews);

      this.setState({ reviews });
    });
  }

  selectReviewHandler() {
    //TODO
    console.log("selected review");
  }

  deleteReviewHandler() {
    // TODO
  }

  render() {
    const {reviews} = this.state;

    return (
      <div className="myreviews-panel area">
        <div className="analysis">
          <h4>Movie Poster: { }, Movie Production Company: { }</h4>
        </div>
        <div className="reviews">
          { 
            reviews.map((review) => {
              return (<Card info={review} selectCard={this.selectReviewHandler.bind(this)} key={review.ID}/>)
            })
          }
        </div>
      </div>
    );
  }
}