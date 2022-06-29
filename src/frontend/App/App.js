import React, { useContext } from 'react'

import { BlockchainContext } from '../contexts/Blockchain'

import AvatarView from './views/AvatarView/AvatarView'
import MintView from './views/MintView/MintView'
import GeometryView from './views/GeometryView/GeometryView'

const App = () => {
  const { avatar } = useContext(BlockchainContext)

  return (
    <div>
      <h1>Solid Incarnation</h1>

      {!avatar && <MintView />}
      {avatar && <AvatarView />}
      <GeometryView/>
    </div>
  )
}

export default App