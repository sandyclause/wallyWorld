import React from 'react';
import Result from './result/Result';
import classes from './Results.css';

class Results extends React.Component{
  constructor(props){
    super(props);
    
    // this.state = {
    //   searchData: this.props.datas
    // }

  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({
  //     searchData: nextProps.datas
  //   }, () => {
  //     console.log(this.state.searchData)
  //   })
  // }
  
  render(){
    const datas = this.props.location.state.data
    const result = datas !== undefined ? datas.map(data => (
            <Result 
              key={data.itemId}
              itemId={data.itemId}
              name={data.name}
              salePrice={data.salePrice}
              msrp={data.msrp}
              long={data.longDescription}
              img={data.largeImage}
              ratingNum={data.numReviews}
              ratingImg={data.customerRatingImage}
            />
          )) : null;



    return (
      <div className="wrapper">
        <div className="resultsContainer">
          <p>result</p>
          {result}
        </div>
      </div>
      
    )
  }
}

export default Results;