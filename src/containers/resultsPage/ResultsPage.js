import React from 'react';
import Results from '../../components/results/Results';
import Search from '../../components/search/Search';

class ResultsPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.location.state);
    return(
      <React.Fragment>
        <p>results page</p>
        {/* <Search /> */}
        
        <Results
          data={this.props.location.state.data}
        />
      </React.Fragment>
    )
  }
}

export default ResultsPage;