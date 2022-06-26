import React, { useState } from 'react'

const FaceEditor = () => {
  const [ faces, setFaces ] = useState([])

  return (
    <div>
      <h1>FaceEditor</h1>
      {faces.map(face => <p>face</p>)}
    </div>
  )
}

export default FaceEditor