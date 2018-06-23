import React from 'react';

class Search extends React.Component{
  constructor(){
    super();
  }



  render(){
    return <React.Fragment>
        <form action="" onSubmit={this.props.searchSubmit}>
        <input type="text" onChange={this.props.search}/>
          <button>Search</button>
        </form>
      </React.Fragment>;
  }
}

export default Search;