import React from 'react';
import classes from './ReviewGraph.css';

class ReviewGraph extends React.Component {
  constructor(){
    super();

    this.state = {
      countArrayState: []
    }
  }

  componentDidMount(){
    this.reviewCalculation();
  }

  reviewCalculation = () => {
    if (this.props.data.ratingDistributions !== undefined) {
      let countArray = [];
      const total = this.props.datatotalReviewCount;

      for (let i = 0; i < this.props.data.ratingDistributions.length; i++) {
        countArray.push(this.props.data.ratingDistributions[i].count ? [this.props.data.ratingDistributions[i].count, i+1] : ["0", i]);
      }

      this.setState({
        countArrayState: countArray.reverse()
      })
    } else {
      console.log("false");
    }
  }

  render() {  
  
    return <React.Fragment>
        <div className="starsContainer">
          {this.state.countArrayState.map((item, index) => {
          return <div className="starContainer" key={index}>
              <p>{item[1]} stars</p>
              <div className="star">
                <div className="innerStar" style={{ width: (item[0] / this.props.data.totalReviewCount) * 100 + "%" }} />
              </div>
              <p className='totalStars'>{item[0]}</p>
            </div>;
          })}
        </div>
      </React.Fragment>;
  }

}

export default ReviewGraph;