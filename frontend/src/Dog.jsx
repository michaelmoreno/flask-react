import React, { useState } from 'react'

export default function Dog({ data, callback, api }) {
  const [name, setName] = useState(data.name);
  const [owner, setOwner] = useState(data.owner);
  const [breed, setBreed] = useState(data.breed);

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
  }

  const onDogSaved = (event) => {
    event.preventDefault();
    api.add(name, owner, breed).then(() => callback());
  }

  const onDogDeleted = (event) => {
    event.preventDefault();
    api.delete(data.id).then(() => callback());
  }

  return (
    <div className="dog">
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
        <button onClick={onDogSaved}>Save</button>
        <button onClick={onDogDeleted}>Delete</button>
      </div>

    </div>
  )
}
