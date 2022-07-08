import React, { useContext } from 'react'

import { BlockchainContext } from '../../../../contexts/Blockchain'

const AvatarEditor = () => {
  const { avatar } = useContext(BlockchainContext)

  const setLayout = e => {
    e.preventDefault()

    const layoutAddress = e.target.layoutAddress.value
    const layoutId = e.target.layoutId.value

    avatar.contract.setLayout(layoutAddress, layoutId)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h1>Set Avatar Layout</h1>
      <form onSubmit={setLayout}>
        <input id='layoutAddress' placeholder='Layout Address' required/>
        <input id='layoutId' placeholder='Layout ID' required/>
        <button>Set Layout</button>
      </form>
    </div>
  )
}

export default AvatarEditor