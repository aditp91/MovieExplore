import React, {Component } from 'react';

const Block = ({info}) => {
  return (
    <div>
      <h3>Block: {JSON.stringify(info)}</h3>
    </div>
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
      if (reviews.length == 0) { return 0; }
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
    
      if (reviews.length == 0) { return "neutral"; }
      if (reviews.length == 1) { return reviews[0].Sentiment; }

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
      <div className="details-panel">
        <div className="analysis">
          <h2>avgScore: {avgScore}, avgSentiment: {avgSentiment}</h2>
        </div>
        <div className="reviews">
          { 
            reviews.map((review) => {
              return (<Block info={review} key={review.ID}/>)
            })
          }
        </div>
        <div className="new=-entry">
          <h2>3rd Area</h2>
        </div>
      </div>
    );
  }
}