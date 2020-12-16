import React, { useState } from 'react';
import DataLayer from './DataLayer';
import Dog from './components/Dog';
import DogAdder from './components/DogAdder';

const dataLayer = new DataLayer("localhost", 3000);

function App() {
  const [ dogs, setDogs] = useState(null);

  const dogElements = [];

  if (dogs == null) {
    dataLayer.all().then(setDogs);
  } else {
    for (let dog of dogs) {
      const dogElement = <Dog {...dog} />;
      dogElements.push(dogElement); 
    }
  }
  
  return (
    <div className="App">
      <DogEditor callback={() => dataLayer.all().then(setDogs))} />
      <div id="dogs">
        {dogElements}
      </div>
    </div>
  );
}

export default App;
