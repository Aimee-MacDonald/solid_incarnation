import React, { useState } from 'react'

import AvatarImage from './AvatarImage/AvatarImage'
import AvatarEditor from './AvatarEditor/AvatarEditor'

const AvatarView = ({ avatar }) => {
  const [ editing, setEditing ] = useState(true)

  return (
    <div>
      {!editing && <AvatarImage avatar={avatar}/>}
      {editing && <AvatarEditor/>}
      {!editing && <button onClick={() => setEditing(true)}>Edit Avatar</button>}
      {editing && <button onClick={() => setEditing(false)}>View Avatar</button>}
    </div>
  )
}

export default AvatarView