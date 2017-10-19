import React, {Component } from 'react';


const Block = ({info}) => {
  return (
    <div>
        <h3>Block: {JSON.stringify(info)}</h3>
    </div>
  );
}

export default class Movies extends Component {
  constructor (props) {
    super();
    this.state = {
        movies: []
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ movies: nextProps.data });
  }

  render () {
    const {movies} = this.state;
    console.log(typeof(movies) + movies);

    return (
      <div>
        <div className="explore-intro">
          { 
            movies.map((movie) => {
              return (<Block info={movie} key={movie.id}/>)
            })
          }
        </div>
      </div>
    );
  }
}