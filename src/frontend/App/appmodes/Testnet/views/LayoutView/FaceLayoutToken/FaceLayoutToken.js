import React, { useContext, useState } from 'react'

import { BlockchainContext } from '../../../../../../contexts/Blockchain'

const FaceLayoutToken = ({ faceLayoutToken }) => {
  const { eyesLayout, faceLayout, geometry } = useContext(BlockchainContext)

  const [ editing, setEditing ] = useState(false)

  const setGeometry = e => {
    e.preventDefault()
    
    faceLayout.setGeometry(faceLayoutToken.tokenId, geometry.address, e.target.geometryIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const setEyesLayout = e => {
    e.preventDefault()

    faceLayout.setEyesLayout(faceLayoutToken.tokenId, eyesLayout.address, e.target.layoutIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const setNoseGeometry = e => {
    e.preventDefault()

    faceLayout.setNoseGeometry(faceLayoutToken.tokenId, geometry.address, e.target.geometryIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const setMouthGeometry = e => {
    e.preventDefault()

    faceLayout.setMouthGeometry(faceLayoutToken.tokenId, geometry.address, e.target.geometryIndex.value)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      {!editing && (
        <div>
          <p>Token ID: {faceLayoutToken.tokenId}</p>
          <p>Name: {faceLayoutToken.name}</p>
          <p>Description: {faceLayoutToken.description}</p>
          <img src={faceLayoutToken.image}/>
        </div>
      )}

      {editing && (
        <div>
          <form onSubmit={setGeometry}>
            <input placeholder='Geometry Index' id='geometryIndex' required/>
            <button type='submit'>Set Geometry</button>
          </form>

          <form onSubmit={setEyesLayout}>
            <input placeholder='Eyes Layout Index' id='layoutIndex' required/>
            <button type='submit'>Set Eyes Layout</button>
          </form>

          <form onSubmit={setNoseGeometry}>
            <input placeholder='Nose Geometry Index' id='geometryIndex' required/>
            <button type='submit'>Set Nose Geometry</button>
          </form>

          <form onSubmit={setMouthGeometry}>
            <input placeholder='Mouth Geometry Index' id='geometryIndex' required/>
            <button type='submit'>Set Mouth Geometry</button>
          </form>
        </div>
      )}

      {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
      {editing && <button onClick={() => setEditing(false)}>View</button>}
    </div>
  )
}

export default FaceLayoutToken