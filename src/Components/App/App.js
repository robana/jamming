import React, { Component } from 'react';
import './App.css';

import SearchResults from '../../Components/SearchResults/SearchResults';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Playlist from '../../Components/Playlist/Playlist';
import TrackList from '../../Components/TrackList/TrackList';

import Spotify from '../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {searchResults:[],
      playlistName:'SpilleListeNavn',
      playlistTracks:[
        {
          'name' : 'TestNavn4',
          'artist' : 'TestArtist4',
          'album' : 'TestAlbum4',
          'id' : '4',
          'uri' : 'oiawd14awd'
        },
        {
        'name' : 'TestNavn2',
        'artist' : 'TestArtist2',
        'album' : 'TestAlbum2',
        'id' : '5',
        'uri' : 'oiawd14awd'
        }
      ]
    };
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(!tracks.includes(track)){
      tracks.push(track);
      this.setState({playlistTracks : tracks})
    }
  }

  removeTrack(track) {
    let playListTracks = this.state.playlistTracks.filter(function(tracks){
      //Filtrer playlistTracks på de tracks som har id som IKKE matcher track id
      return tracks !== track;
    });

    // sett playListTracks på nytt
    this.setState({playlistTracks : playListTracks});
  };

  updatePlaylistName(name) {
    this.setState({playlistName : name});
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(searchResults => {
      this.setState({playlistName : 'New Playlist', searchResults : []});
    })
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults : searchResults});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span classname="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
