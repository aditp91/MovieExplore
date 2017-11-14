import React, {Component } from 'react';
import Gallery from 'react-grid-gallery';

export default class Movies extends Component {
  constructor (props) {
    super();
    this.state = {
      movies: [],
      wallObjects: []
    };
  };

  componentWillReceiveProps(nextProps) {
    // transform raw movie data into wall objects
    let movies = nextProps.data;
    let wallObjects = [];
    
    movies.forEach((movie) => {
      let obj = {
        id: movie.ID,
        src: movie.ImageUrl,
        thumbnail: movie.ImageUrl,
        thumbnailWidth: 100,
        thumbnailHeight: 130,
        caption: movie.Description
      };

      wallObjects.push(obj);
    });

    this.setState({ movies, wallObjects });
  }

  onClickThumbnail(index) {
    const movieId = this.state.wallObjects[index].id;
    this.props.thumbnailSelectHandler(movieId);
  }

  onClickLoad() {
    this.props.loadHandler();
  }

  render () {
    const {wallObjects} = this.state;

    return (
      <div>
        <div className="movies-wall area">
          <Gallery images={wallObjects}
            onClickThumbnail={this.onClickThumbnail.bind(this)}
            margin={12} rowHeight={310}
            enableLightbox={false}
            enableImageSelection={true} />
        </div>
        <div>
          <button type="submit" 
            className="btn btn-primary movies-wall-button" 
            onClick={this.onClickLoad.bind(this)}
            disabled={this.props.role !== 'admin'}>
              Load Latest Movies
          </button>
        </div>
      </div>
    );
  }
}