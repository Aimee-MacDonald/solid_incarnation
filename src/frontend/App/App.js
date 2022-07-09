import React, { useState } from 'react'

import './App.sass'

import Header from './Header/Header'
import Mainnet from './appmodes/Mainnet/Mainnet'
import Testnet from './appmodes/Testnet/Testnet'

const App = () => {
  const [ mainnet, setMainnet ] = useState(true)
  const [ activeView, setActiveView ] = useState(0)

  const views = [
    'WELCOME',
    'MINT',
    'AVATAR',
    'COLLECTIONS',
    'GUILDS',
    'LAYOUT',
    'GEOMETRY',
  ]

  return (
    <div id='App'>
      <Header
        mainnet={mainnet}
        toggleMainnet={() => setMainnet(mainnet => !mainnet)}
        views={views}
        setActiveView={setActiveView}
      />

      {mainnet && <Mainnet views={views} activeView={activeView}/>}
      {!mainnet && <Testnet views={views} activeView={activeView}/>}
    </div>
  )
}

export default App