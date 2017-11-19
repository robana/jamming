import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} />
        <TrackList tracks={this.props.playlistTracks} isRemoval= {true} onRemove={this.props.removeTrack} />
        <a className="Playlist-save"> Save to Spotify </a>
      </div>
    )
  }
}

export default Playlist;
