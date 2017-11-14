import React, {Component } from 'react';

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

const NewEntry = () => {
  return (
    <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputContent">Content</label>
          <input type="text" className="form-control" id="inputContent"/>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputSentiment">Sentiment</label>
          <select id="inputSentiment" className="form-control" defaultValue="neutral">
            <option>positive</option>
            <option>neutral</option>
            <option>negative</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputScore">Score</label>
          <select id="inputScore" className="form-control" defaultValue="5">
          {
            [...Array(10).keys()].map((i) => { return (<option key={i}>{i+1}</option>) })
          }
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </div>
    </form>
  );
}

export default class Details extends Component {
  constructor (props) {
    super();
    this.state = {
      avgScore: 0,
      avgSentiment: "",
      reviews: []
    };
  };

  componentWillReceiveProps(nextProps) {
    const reviews = nextProps.data;
    
    const getAvgScore = (reviews) => {
      if (reviews.length === 0) { return 0; }
      let total = 0;
      for (let r in reviews) {
        total += reviews[r].Score;
      }
      return total/(reviews.length);
    };

    const getAvgSentiment = (reviews) => {
      const mode = (arr) => {
        return arr.sort((a,b) =>
          arr.filter(v => v===a).length - arr.filter(v => v===b).length
        ).pop();
      };
    
      if (reviews.length === 0) { return "neutral"; }
      if (reviews.length === 1) { return reviews[0].Sentiment; }

      const sentiments = reviews.map(r => r.Sentiment);
      return mode(sentiments);
    };

    this.setState({ 
      reviews: reviews,
      avgScore: getAvgScore(reviews),
      avgSentiment: getAvgSentiment(reviews)
    });
  }


  render () {
    const {reviews, avgScore, avgSentiment} = this.state;

    return (
      <div className="details-panel area">
        <div className="analysis">
          <h4>Movie Score: {avgScore}, Movie Sentiment: {avgSentiment}</h4>
        </div>
        <div className="reviews">
          { 
            reviews.map((review) => {
              return (<Card info={review} key={review.ID}/>)
            })
          }
        </div>
        <div className="new-entry">
          <NewEntry />
        </div>
      </div>
    );
  }
}