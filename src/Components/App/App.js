import React, { Component } from 'react';
import './App.css';

import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import TrackList from '../../Components/TrackList/TrackList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults:[
        {
          'name' : 'TestNavn',
          'artist' : 'TestArtist',
          'album' : 'TestAlbum',
          'id' : '1'
        },
        {
          'name' : 'TestNavn1',
          'artist' : 'TestArtist1',
          'album' : 'TestAlbum1',
          'id' : '2'
        },
        {
          'name' : 'TestNavn2',
          'artist' : 'TestArtist2',
          'album' : 'TestAlbum2',
          'id' : '3'
        }
      ],
      playlistName:'SpilleListeNavn',
      playlistTracks:[
        {
          'name' : 'TestNavn2',
          'artist' : 'TestArtist2',
          'album' : 'TestAlbum2',
          'id' : '4'
        },
        {
        'name' : 'TestNavn2',
        'artist' : 'TestArtist2',
        'album' : 'TestAlbum2',
        'id' : '5'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    //Sjekk om track.id allerede eksisterer i this.state.playListTracks[x].id
    var alreadyInPlaylist = this.state.playlistTracks.filter(function(tracks){
      //Filtrer playlistTracks på de tracks som har id som matcher track id
      return tracks.id == track.id;
    });
    console.log(alreadyInPlaylist);
  }

  render() {
    return (
      <div>
        <h1>Ja<span classname="highlight">mmm</span>ing</h1>
        <div className="App">
          //Add a SearchBar component
          <div className="App-playlist">
            //Add a SearchResults component
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack({id:'5'})} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
