import React, {Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import apiConstants from '../../shared/api.constants.js';
import './style.css';

const Card = ({info, selectCard, deleteCard}) => {
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
            <button type="submit" className="btn btn-primary" 
              onClick={() => selectCard(info)}>Show Details</button>
            <button type="submit" className="btn btn-danger" 
              onClick={() => deleteCard(info)}>Delete Review</button>
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
      selectedReview: ''
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
      this.setState({ reviews });
    });
  }

  selectReviewHandler(info) {
    this.setState({ selectedReview: info });
  }

  deleteReviewHandler(info) {
    const reviewID = info.ID;
    const filtered = this.state.reviews.filter(e => e.ID !== info.ID);

    this.setState({ reviews: filtered });

  }

  render() {
    const {reviews, selectedReview} = this.state;

    return (
      <div className="myreviews-panel area">
        <div className="analysis">
          <div className="poster">
            <img src={selectedReview.ImageUrl} alt={selectedReview.ImageUrl} /> 
          </div>
          <div className="info">
            <h4><strong>Movie Name:</strong> {selectedReview.Title}</h4>
            <h4><strong>Movie Production Company:</strong> {selectedReview.ProductionCompany}</h4>
          </div>
        </div>
        <div className="reviews">
          { 
            reviews.map((review) => {
              return (<Card info={review} 
                key={review.ID}
                selectCard={this.selectReviewHandler.bind(this)} 
                deleteCard={this.deleteReviewHandler.bind(this)} />)
            })
          }
        </div>
      </div>
    );
  }
}