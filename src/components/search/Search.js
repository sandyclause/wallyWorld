import React from 'react';
import classes from './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

class Search extends React.Component{
  constructor(){
    super();
  }



  render(){
    return <React.Fragment>
        <form action="" onSubmit={this.props.searchSubmit}>
          <input type="text" className='searchInput' placeholder='Search' onChange={this.props.search}/>
          <button className='searchButton'>
          <FontAwesomeIcon icon='search' />
          </button>
        </form>
      </React.Fragment>;
  }
}

export default withRouter(Search);