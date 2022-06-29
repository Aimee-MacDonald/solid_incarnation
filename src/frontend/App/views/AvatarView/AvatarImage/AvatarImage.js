import React, { useState, useEffect, useContext } from 'react'

import { BlockchainContext } from '../../../../contexts/Blockchain'

const AvatarImage = () => {
  const { avatar } = useContext(BlockchainContext)
/* 
  useEffect(() => {
    if(avatarContract !== null){
      avatarContract.imageData()
        .then(result => setAvatarImage(result))
        .catch(error => console.log(error))
    }
  }, [avatarContract])
 */
  return (
    <div>
      <img src={avatar.imageData} />
    </div>
  )
}

export default AvatarImage