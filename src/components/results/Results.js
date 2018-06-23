import React from 'react';
import Result from './result/Result';

class Results extends React.Component{
  constructor(){
    super();
    
  }


  
  render(){
    const datas = this.props.datas
    const result = datas !== undefined ? datas.map(data => (
            <Result 
              key={data.itemId}
              itemId={data.itemId}
              name={data.name}
              salePrice={data.salePrice}
              desc={data.shortDescription}
              upc={data.upc}
              img={data.largeImage}
            />
          )) : null;

    return (
      <div>
        {result}
      </div>
      
    )
  }
}

export default Results;