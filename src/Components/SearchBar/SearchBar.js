import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term : 'awd'
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({term : event.target.value})
  }

  render() {
    return(
      <div className='SearchBar'>
        <input placeholder="Enter a song, album or an artist" onChange={this.handleTermChange} />
        <a onClick={this.search}> Search </a>
      </div>
    )
  }
}

export default SearchBar;
