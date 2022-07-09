import React, { useContext, useState } from 'react'

import { BlockchainContext } from '../../../../../../contexts/Blockchain'

const EyesLayoutToken = ({ eyesLayoutToken }) => {
  const { geometry, eyesLayout } = useContext(BlockchainContext)
  const [ editing, setEditing ] = useState(false)

  const setLeftEyeGeometry = e => {
    e.preventDefault()

    eyesLayout.setLeftEyeGeometry(eyesLayoutToken.tokenId, geometry.address, e.target.geometryIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const setRightEyeGeometry = e => {
    e.preventDefault()
    
    eyesLayout.setRightEyeGeometry(eyesLayoutToken.tokenId, geometry.address, e.target.geometryIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      {!editing && (
        <div>
          <p>Token ID: {eyesLayoutToken.tokenId}</p>
          <p>Name: {eyesLayoutToken.name}</p>
          <p>Description: {eyesLayoutToken.description}</p>
          <img src={eyesLayoutToken.image}/>
        </div>
      )}

      {editing && (
        <div>
          <form onSubmit={setLeftEyeGeometry}>
            <input placeholder='Geometry Index' id='geometryIndex'/>
            <button type='submit'>Set Left Eye Geometry</button>
          </form>

          <form onSubmit={setRightEyeGeometry}>
            <input placeholder='Geometry Index' id='geometryIndex'/>
            <button type='submit'>Set Right Eye Geometry</button>
          </form>
      </div>
      )}

      {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
      {editing && <button onClick={() => setEditing(false)}>View</button>}
    </div>
  )
}

export default EyesLayoutToken