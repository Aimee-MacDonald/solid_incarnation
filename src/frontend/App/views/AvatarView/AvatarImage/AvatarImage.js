import React, { useState, useEffect } from 'react'

const AvatarImage = ({ avatar }) => {
  const [ avatarImage, setAvatarImage ] = useState('#')

  useEffect(() => {
    if(avatar !== null){
      avatar.imageData()
        .then(result => setAvatarImage(result))
        .catch(error => console.log(error))
    }
  }, [avatar])

  return (
    <div>
      <img src={avatarImage} />
    </div>
  )
}

export default AvatarImage