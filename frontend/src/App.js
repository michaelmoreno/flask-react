import React, { useState } from 'react';
import DataLayer from './DataLayer';
import Dog from './Dog';
import DogAdder from './DogAdder';

const dataLayer = new DataLayer("localhost", 3000);

function App() {
  const [ dogs, setDogs] = useState(null);

  const dogElements = [];

  const onDogsChanged = () => {
    dataLayer.all().then(r => setDogs(r.data));
  }

  if (dogs == null) {
    onDogsChanged();
  } else {
    for (let dog of dogs) {
      const dogElement = <Dog data={dog} callback={onDogsChanged} api={dataLayer} />;
      dogElements.push(dogElement); 
    }
  }
  
  
  return (
    <div className="App">
      <DogAdder api={dataLayer} callback={() => dataLayer.all().then(r => setDogs(r.data))} />
      <div id="dogs">
        {dogElements}
      </div>
    </div>
  );
}

export default App;
