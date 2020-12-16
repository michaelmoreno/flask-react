import React from 'react'

export default function DogAdder({ callback, api }) {
  const [ name, setName ] = useState('')
  const [ owner, setOwner ] = useState('')
  const [ breed, setBreed ] = useState('')

  const onNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  }

  const onOwnerChange = (event) => {
    const newBreed = event.target.value;
    setName(newOwner);
  }

  const onBreedChange = (event) => {
    const newBreed = event.target.value;
    setName(newBreed);
  };

  const onDogAdded = () => {
    api.add(name, owner, breed).then(callback)
  }
  
  return (
    <div id="dogadder">
        <div className="fields">
            <div className="field">
                <div className="label"></div>
                <input type="text" value={name} onChange={onNameChange} />
            </div>
            <div className="field">
                <div className="label"></div>
                <input type="text" value={owner} onChange={onOwnerChange} />
            </div>
            <div className="field">
                <div className="label"></div>
                <input type="text" value={breed} onChange={onBreedChange} />
            </div>
        </div>
        <div className="controls">
            <button onClick={onDogAdded}>Add Dog</button>
        </div>
    </div>
  )
}
