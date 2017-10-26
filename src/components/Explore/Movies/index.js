import React, {Component } from 'react';
import Gallery from 'react-grid-gallery';


const wallObjects = [
  {
      id: 111,
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 200,
      thumbnailHeight: 300,
      caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
      id: 222,
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 200,
      thumbnailHeight: 300,
  },
  {
      id: 333,
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 200,
      thumbnailHeight: 300
  }];

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

  onClickThumbnail(index) {
    const movieId = wallObjects[index].id;
    this.props.thumbnailSelectHandler(movieId);
  }

  render () {
    const {movies} = this.state;
    // console.log(typeof(movies) + movies);

    return (
      <div>
        <div>
          { 
            movies.map((movie) => {
              return (<Block info={movie} key={movie.id}/>)
            })
          }
        </div>
        <div className="movies-wall">
          <Gallery images={wallObjects}
            onClickThumbnail={this.onClickThumbnail.bind(this)}
            margin={10} rowHeight={320}
            enableLightbox={false}
            enableImageSelection={true} />
        </div>
      </div>
    );
  }
}