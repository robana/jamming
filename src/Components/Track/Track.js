import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
      super(props);
      this.addTrack = this.addTrack.bind(this);
  }

  renderAction(isRemoval) {
    if(isRemoval == true){
      return <a className="Track-action"> - </a>
    }else if (isRemoval == false) {
      return <a className="Track-action" onClick={this.addTrack}> + </a>
    }
    else {
      return <a className="Track-action"> ... </a>
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }
  render(){

    return(
      <div className="Track" id={this.props.id}>
        <div className="Track-information">
          <h3> {this.props.track.name}
          </h3>
          <p>{this.props.track.artist} |  {this.props.track.album}
          </p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
    )
  }
}

export default Track;
