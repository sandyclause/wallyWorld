import React from 'react';

class Review extends React.Component {
  constructor() {
    super();

  }

  render(){
    const datas = this.props.data.reviews;
    console.log(datas);
    const reviews = datas !== undefined ? datas.map((data, index) => {
      return (
      <div className='review' key={index}>
        <h2>{data.title}</h2>
        <p>{data.reviewText}</p>
      </div>
      )
    }) : null;
    return (
      <React.Fragment>
        <h1>Customer Reviews</h1>
        {reviews}
      </React.Fragment>
    )
  }
}

export default Review;