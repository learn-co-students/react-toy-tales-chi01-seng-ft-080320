import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const toyArray = props.toys.map(toy => {
    return <ToyCard onDonate={props.onDonate} onLike={props.onLike} key={toy.id} toy={toy} />
  })
  return(
    <div id="toy-collection">
      {toyArray}
    </div>
  );
}

export default ToyContainer;
