import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css'


class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track id={track.id}
                  track={track}
                  isRemoval={this.props.isRemoval}
                  onAdd={this.props.onAdd}/>
                 }
               )}
      </div>
    )
  }
}

export default TrackList;
