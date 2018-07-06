import React from 'react';
import Results from '../results/Results';

import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <React.Fragment>
        <img src="./images/pickUpImg.jpg" alt="pick up images" className="pickUpImage" />
        <div className="carousel">
          <Carousel autoPlay={true} infiniteLoop={true} interval={3000} showStatus={false} showThumbs={false}>
            <div>
              <img src="./images/carousel01.jpg" alt="delivery or free pickup" />
            </div>
            <div>
              <img src="./images/carousel02.jpg" alt="play the day away in the pool" />
            </div>
            <div>
              <img src="./images/carousel03.jpg" alt="get moving this summer" />
            </div>
          </Carousel>
        </div>
        <h1>Trending Deals</h1>

        <Results data={this.props.data} />
      </React.Fragment>
    )
  }
}

export default Home;