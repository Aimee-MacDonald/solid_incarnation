import React, { useContext } from 'react'

import { BlockchainContext } from '../../../contexts/Blockchain'

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
    <form onSubmit={addGeometry}>
      <input id='svg' placeholder='SVG data' required/>
      <button type='submit'>Add Geometry</button>
    </form>
  )
}

export default GeometryView

//  <ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>
//  <ellipse cx="200" cy="180" rx="110" ry="150" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>