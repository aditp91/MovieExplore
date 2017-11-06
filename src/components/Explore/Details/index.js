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
      avgSentiment: "",
      avgScore: 0,
      reviews: []
    };
  };

  componentWillReceiveProps(nextProps) {
    // transform raw movie data into wall 
    let reviews = nextProps.data;
    this.setState({ reviews });
  }


  render () {
    const {reviews} = this.state;

    return (
      <div>
        <div>
          { 
            reviews.map((review) => {
              return (<Block info={review} key={review.ID}/>)
            })
          }
        </div>
      </div>
    );
  }
}