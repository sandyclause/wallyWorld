import React from 'react';

import Stars from '../stars/Stars';
import ReviewGraph from './reviewGraph/ReviewGraph';

class Review extends React.Component {
  constructor() {
    super();

    this.state = {
      reviewStatus: false
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.data !== prevProps.data) {
      if (this.props.reviewStats.totalReviewCount !== 'null') {
        this.setState({
          reviewStatus: true
        })
      }
    }
  }

  render(){
    const datas = this.props.data.reviews;
    const reviews = datas !== undefined ? datas.map((data, index) => {
      return (
        <div className='review' key={index}>
          <h2>{data.title}</h2>
          <Stars starNum={data.overallRating.rating} />
          <p className='reviewText'>{data.reviewText}</p>
          <p className='reviewer'>{data.reviewer}</p>
        </div>
      )
    }) : null;

    const reviewGraph = this.state.reviewStatus ? <ReviewGraph data={this.props.data.reviewStatistics} /> : <p>This no currently no reviews for this product</p>;
    
    return (
      <React.Fragment>
        <h1>Customer Reviews</h1>
        {reviewGraph}
        {reviews}
      </React.Fragment>
    )
  }
}

export default Review;