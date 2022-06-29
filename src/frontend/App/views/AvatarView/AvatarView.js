import React, { useState, useContext } from 'react'

import AvatarImage from './AvatarImage/AvatarImage'
import AvatarEditor from './AvatarEditor/AvatarEditor'

import { BlockchainContext } from '../../../contexts/Blockchain'

const AvatarView = () => {
  const { avatar } = useContext(BlockchainContext)
  const [ editing, setEditing ] = useState(false)

  const reconstructImageData = () => {
    avatar.contract.reconstructImageData()
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      {!editing && <AvatarImage/>}
      {editing && <AvatarEditor/>}
      {!editing && <button onClick={() => setEditing(true)}>Edit Avatar</button>}
      {!editing && <button onClick={reconstructImageData}>Reconstruct Face</button>}
      {editing && <button onClick={() => setEditing(false)}>View Avatar</button>}
    </div>
  )
}

export default AvatarView