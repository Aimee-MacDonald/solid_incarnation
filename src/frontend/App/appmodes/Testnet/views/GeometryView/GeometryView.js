import React, { useContext, useState, useEffect } from 'react'

import { BlockchainContext } from '../../../../../contexts/Blockchain'

const GeometryView = () => {
  const { geometry } = useContext(BlockchainContext)
  const [ geometries, setGeometries ] = useState([])

  useEffect(() => {loadGeometries()}, [])

  const loadGeometries = async () => {
    const geometryCount = (await geometry.geometryCount()).toNumber()

    for(let i = 1; i <= geometryCount; i++) {
      let _geometry = await geometry.getGeometry(i)
      _geometry = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">${_geometry}</svg>`
      _geometry = window.btoa(_geometry)
      _geometry = `data:image/svg+xml;base64,${_geometry}`
      setGeometries(geometries => ([ ...geometries, _geometry ]))
    }
  }

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

      <div>
        <h2>Available Geometries</h2>
        <p>Geometry Count: {geometries.length}</p>
        {geometries.map((geo, i) => <img key={`geo${i}`} src={geo}/>)}
      </div>
    </div>
  )
}

export default GeometryView