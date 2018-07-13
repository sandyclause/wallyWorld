import React from 'react';

import Stars from '../stars/Stars';
import ReviewGraph from './reviewGraph/ReviewGraph';

class Review extends React.Component {
  constructor() {
    super();

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
    
    console.log(this.props.reviewStats)
    const reviewGraph = this.props.reviewStats ? <ReviewGraph data={this.props.data.reviewStatistics} /> : null;
    // <ReviewGraph data={this.props.data.reviewStatistics} />
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