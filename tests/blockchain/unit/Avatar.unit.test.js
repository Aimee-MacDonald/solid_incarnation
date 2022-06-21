const { expect } = require('chai')

describe('Avatar Unit', () => {
  let avatar
  let avatarFaceMock

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    const AvatarFaceMock = await ethers.getContractFactory('AvatarFaceMock')

    avatar = await Avatar.deploy()
    avatarFaceMock = await AvatarFaceMock.deploy()
  })
  
  it('Should not initialise', () => {
    expect(avatar.init()).to.be.revertedWith('Initializable: contract is already initialized')
  })

  it('Should set the Avatar Face', async () => {
    expect(await avatar.faceAddress()).to.equal('0x0000000000000000000000000000000000000000')
    
    await avatar.setFace(avatarFaceMock.address, 0)
    
    expect(await avatar.faceAddress()).to.equal(avatarFaceMock.address)
  })

  it('Should reconstruct the image data', async () => {
    expect(await avatar.imageData()).to.equal('')
    
    await avatar.setFace(avatarFaceMock.address, 0)
    await avatar.reconstructImageData()
    
    expect(await avatar.imageData()).to.equal('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj5BdmF0YXIgRmFjZSBTVkc8L3N2Zz4=')
  })
})