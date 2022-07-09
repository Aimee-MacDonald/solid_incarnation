import React from 'react'

const Header = ({ mainnet, toggleMainnet, views, setActiveView }) => (
  <div>
    {!mainnet && (
      <nav>
        <button onClick={() => setActiveView(views.indexOf('WELCOME'))}>SI</button>
        <button onClick={() => setActiveView(views.indexOf('MINT'))}>Mint</button>
        <button onClick={() => setActiveView(views.indexOf('AVATAR'))}>Avatar</button>
        <button onClick={() => setActiveView(views.indexOf('COLLECTIONS'))}>Collections</button>
        <button onClick={() => setActiveView(views.indexOf('GUILDS'))}>Guilds</button>
        <button onClick={() => setActiveView(views.indexOf('LAYOUT'))}>Layout</button>
        <button onClick={() => setActiveView(views.indexOf('GEOMETRY'))}>Geometry</button>
      </nav>
    )}

    {!mainnet && <button onClick={toggleMainnet}>Switch to Polygon Mainnet</button>}
    {mainnet && <button onClick={toggleMainnet}>Switch to Mumbai Testnet</button>}
  </div>
)

export default Header