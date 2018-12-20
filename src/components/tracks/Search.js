import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    trackTitle: ''
  }

  findLyrics = (dispatch, e) => {
    e.preventDefault();

    const apiCors = 'https://cors-anywhere.herokuapp.com/'
    const baseURL = 'https://api.musixmatch.com/ws/1.1/'
    const getLyrics = `track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc`
    axios.get(`${apiCors}${baseURL}${getLyrics}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
        this.setState({trackTitle: ''});
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          const  {dispatch} = value;
          return (
            <div className='card card-body mb-4 p-4'>
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Buscar canción
           </h1>
              <p className="lead text-center">Encuentra la letra de cualquier canción</p>
              <form onSubmit={this.findLyrics.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className='form-control form-control-lg'
                    placeholder='Título de la canción...'
                    name='trackTitle'
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button className="btn btn-primary btn-lg btn-block mb-5" type='submit'>
                  Buscar letra</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Search;