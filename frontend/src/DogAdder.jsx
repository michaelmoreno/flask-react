import React, { useState } from 'react'

export default function DogAdder({ callback, api }) {
  const [ name, setName ] = useState('')
  const [ owner, setOwner ] = useState('')
  const [ breed, setBreed ] = useState('')

  const onNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  }

  const onOwnerChange = (event) => {
    const newOwner = event.target.value;
    setOwner(newOwner);
  }

  const onBreedChange = (event) => {
    const newBreed = event.target.value;
    setBreed(newBreed);
  };

  const onDogAdded = () => {
    api.add(name, owner, breed).then(callback)
  }
  
  return (
    <div id="dog-adder">
        <div className="fields">
            <div className="field">
                <div className="label">Name:</div>
                <input type="text" value={name} onChange={onNameChange} />
            </div>
            <div className="field">
                <div className="label">Owner:</div>
                <input type="text" value={owner} onChange={onOwnerChange} />
            </div>
            <div className="field">
                <div className="label">Breed:</div>
                <input type="text" value={breed} onChange={onBreedChange} />
            </div>
        </div>
        <div className="controls">
            <button onClick={onDogAdded}>Add Dog</button>
        </div>
    </div>
  )
}
