import React, {Component } from 'react';
import axios from 'axios';

import apiConstants from '../../shared/api.constants.js';
import './style.css';

const Card = ({info}) => {
  return (
    <div>
      <div className="card card-mx">
        <div className="card-body">
          <h4 className="card-title"> {info.Username} </h4>
          <h6 className="card-subtitle mb-2 text-muted"> {info.EntryDateTime} </h6>
          <p className="card-text"> {info.Description} </p>
          <a className="card-text text-muted">score: {info.Score}   </a>
          <a className="card-text text-muted">sentiment: {info.Sentiment}</a>
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
      reviewContent: "",
      reviewScore: 5,
      reviewSentiment: "neutral"
    };
  };

  componentDidMount () {
    // check if app component has an authorized user
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

  render() {
    const { className, ...props } = this.props;

    const {reviews} = this.state;

    return (
      <div className="myreviews-panel area">
        <div className="analysis">
          <h4>Movie Poster: { }, Movie Production Company: { }</h4>
        </div>
        <div className="reviews">
          { 
            reviews.map((review) => {
              return (<Card info={review} key={review.ID}/>)
            })
          }
        </div>
      </div>
    );
  }
}