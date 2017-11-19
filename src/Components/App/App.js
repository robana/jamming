import React, { Component } from 'react';
import './App.css';

import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import TrackList from '../../Components/TrackList/TrackList';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {searchResults:[
        {
          'name' : 'TestNavn',
          'artist' : 'TestArtist',
          'album' : 'TestAlbum',
          'id' : '1'
        },
        {
          'name' : 'TestNavn2',
          'artist' : 'TestArtist2',
          'album' : 'TestAlbum2',
          'id' : '2'
        },
        {
          'name' : 'TestNavn3',
          'artist' : 'TestArtist3',
          'album' : 'TestAlbum3',
          'id' : '3'
        },
        {
          'name' : 'TestNavn8',
          'artist' : 'TestArtist8',
          'album' : 'TestAlbum8',
          'id' : '8'
        }
      ],
      playlistName:'SpilleListeNavn',
      playlistTracks:[
        {
          'name' : 'TestNavn4',
          'artist' : 'TestArtist4',
          'album' : 'TestAlbum4',
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
  }

  addTrack(track) {
    //Sjekk om track.id allerede eksisterer i this.state.playListTracks[x].id
    let inPlaylist = this.state.playlistTracks.filter(function(tracks){
      //Filtrer playlistTracks på de tracks som har id som matcher track id
      return tracks.id == track.id;
    });
    if(inPlaylist.length < 1) {
      // legg track til på slutten av playListTracks
      let playListTracks = this.state.playlistTracks.push(track);
      // sett playListTracks på nytt
      this.setState({playlistTracks : playListTracks});
      console.log("Track added!");
    }else{
      console.log("Track already in playlist");
    };
  }

  removeTrack(track) {
    let playListTracks = this.state.playlistTracks.filter(function(tracks){
      //Filtrer playlistTracks på de tracks som har id som IKKE matcher track id
      return tracks !== track;
    });

    // sett playListTracks på nytt
    this.setState({playlistTracks : playListTracks});
  }

  render() {
    return (
      <div>
        <h1>Ja<span classname="highlight">mmm</span>ing</h1>
        <div className="App">
          //Add a SearchBar component
          <div className="App-playlist">
            //Add a SearchResults component
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
