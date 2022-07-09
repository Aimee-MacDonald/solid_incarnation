import React, { useContext } from 'react'

import { BlockchainContext } from '../../../../../contexts/Blockchain'

const MintView = () => {
  const { wallet, avatarFactory } = useContext(BlockchainContext)

  const mintAvatar = e => {
    e.preventDefault()

    if(avatarFactory === null) {
      console.log('Avatar Factory not loaded')
    } else {
      avatarFactory.mintAvatar(wallet.address)
        .then(transaction => transaction.wait())
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <form onSubmit={mintAvatar}>
        <input required/>
        <button type='submit'>Mint Avatar</button>
      </form>
    </div>
  )
}

export default MintView