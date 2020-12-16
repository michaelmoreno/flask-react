import React from 'react'

export default function Dog({ data }) {
  
  return (
    <div className="dog">
        <div className="fields">
            <div className="field">
                <div className="label">Name:</div>
                <div className="value">{data.name}</div>
            </div>
            <div className="field">
                <div className="label">Owner:</div>
                <div className="value">{data.owner}</div>
            </div>
            <div className="field">
                <div className="label">Breed:</div>
                <div className="value">{data.breed}</div>
            </div>
        </div>
    </div>
  )
}
