import React, { useContext } from 'react'

import { BlockchainContext } from '../../../../../../contexts/Blockchain'

const AvatarImage = () => {
  const { avatar } = useContext(BlockchainContext)
  
  return (
    <div>
      <img src={avatar.imageData} />
    </div>
  )
}

export default AvatarImage