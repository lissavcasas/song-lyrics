import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    const apiCors = 'https://cors-anywhere.herokuapp.com/'
    const baseURL = 'https://api.musixmatch.com/ws/1.1/'
    const getLyrics = `track.lyrics.get?track_id=${this.props.match.params.id}`
    const getTrack = `track.get?track_id=${this.props.match.params.id}`
    axios.get(`${apiCors}${baseURL}${getLyrics}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        /* console.log(res.data); */
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(`${apiCors}${baseURL}${getTrack}&apikey=${process.env.REACT_APP_MM_KEY}`)
          .then(res => {
            console.log(res.data, 'response track');
            this.setState({ track: res.data.message.body.track });
          })
      })
      .catch(err => console.log(err));
  }


  render() {
    const { track, lyrics } = this.state;
    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
      return <Spinner />
    } else {
      return (
        <React.Fragment>
          <Link to='/' className='btn btn-dark btn-sm mb-4'>Atrás</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by {''} <span className="text-secondary">{track.artist_name} </span>
            </h5>
            <div className="card-body">
              <p className="card-text"> {lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Álbum ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Género</strong>:{' '}
              {track.primary_genres.music_genre_list.length !== 0
                ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name
                : 'N/A'}
            </li>
            <li className="list-group-item">
              <strong>Letras explícitas</strong>: {track.explicit === 0 ? 'No' : 'Si'}
            </li>
          </ul>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics;