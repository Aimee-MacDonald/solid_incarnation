const { expect } = require('chai')

describe('Avatar Integration', () => {
  let signers
  let avatar_1

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    
    const avatar = await Avatar.deploy()
    const avatarFactory = await AvatarFactory.deploy(avatar.address)

    signers = await ethers.getSigners()
    await avatarFactory.mintAvatar(signers[0].address)
    const avatarAddress_1 = await avatarFactory.contractAddressOf(1)
    avatar_1 = Avatar.attach(avatarAddress_1)
  })

  describe('Minting', () => {
    it('Should be initialised by the AvatarFactory', () => {
      expect(avatar_1.init()).to.be.revertedWith('Initializable: contract is already initialized')
    })

    it('Should be owned by the recipient wallet', async () => {
      expect(await avatar_1.owner()).to.equal(signers[0].address)
    })
  })

  describe('Image Data', () => {
    let avatarFace

    beforeEach(async () => {
      const AvatarFace = await ethers.getContractFactory('AvatarFace')
      avatarFace = await AvatarFace.deploy()
      await avatarFace.mint(signers[0].address)
    })

    it('Should return image data for the Avatar', async () => {
      expect(await avatar_1.imageData()).to.equal('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48L3N2Zz4=')
    })

    it('Should set the Avatar Face', async () => {
      expect(await avatar_1.faceAddress()).to.equal('0x0000000000000000000000000000000000000000')
      
      await avatar_1.setFace(avatarFace.address, 0)
      
      expect(await avatar_1.faceAddress()).to.equal(avatarFace.address)
    })
    
    it('Should reconstruct the image data', async () => {
      expect(await avatar_1.imageData()).to.equal('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48L3N2Zz4=')
      
      await avatar_1.setFace(avatarFace.address, 0)
      await avatar_1.reconstructImageData()
      
      expect(await avatar_1.imageData()).to.equal('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBpZD0iZmFjZSI+PGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE4MCIgcng9IjE1MCIgcnk9IjExMCIgc3R5bGU9ImZpbGw6IzljODg4ZTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6MTAxLjEwOTtwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PGcgaWQ9ImV5ZXMiPjxnIGlkPSJsZWZ0X2V5ZSI+PGVsbGlwc2UgY3g9IjE0NSIgY3k9IjE3MCIgcng9IjMwIiByeT0iMzUiIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLXdpZHRoOjk4LjI2NjM7cGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE3MCIgcj0iMTUiIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLXdpZHRoOjk4LjI2NjM7cGFpbnQtb3JkZXI6bWFya2VycyBmaWxsIHN0cm9rZSIvPjwvZz48ZyBpZD0icmlnaHRfZXllIj48ZWxsaXBzZSBjeD0iMjM1IiBjeT0iMTcwIiByeD0iMzAiIHJ5PSIzNSIgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6OTguMjY2MztwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PGNpcmNsZSBjeD0iMjMwIiBjeT0iMTcwIiByPSIxNSIgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6OTguMjY2MztwYWludC1vcmRlcjptYXJrZXJzIGZpbGwgc3Ryb2tlIi8+PC9nPjwvZz48L2c+PC9zdmc+')
    })
  })
})