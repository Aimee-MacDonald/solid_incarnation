import React, { useContext } from 'react'

import { BlockchainContext } from '../../../../../contexts/Blockchain'

const GeometryView = () => {
  const { geometry } = useContext(BlockchainContext)

  const addGeometry = e => {
    e.preventDefault()

    const newGeometry = e.target.svg.value

    geometry.addGeometry(newGeometry)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <p>Here geometry creators can create new SVG geometries for avatar images</p>
      <p>Geometry creators need to be in the geometries guild to create geometry</p>
      <p>Each Geometry creator is in control of their own geometries contract</p>
      <p>Geometry creators can have their status assigned or revoked by the community</p>

      <form onSubmit={addGeometry}>
        <input id='svg' placeholder='SVG data' required/>
        <button type='submit'>Add Geometry</button>
      </form>
    </div>
  )
}

export default GeometryView