const { expect } = require('chai')

describe('Avatar Unit', () => {
  let avatar
  let avatarFaceMock
  let avatarLayoutMock

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    const AvatarFaceMock = await ethers.getContractFactory('AvatarFaceMock')
    const AvatarLayoutMock = await ethers.getContractFactory('AvatarLayoutMock')

    avatar = await Avatar.deploy()
    avatarFaceMock = await AvatarFaceMock.deploy()
    avatarLayoutMock = await AvatarLayoutMock.deploy()
  })
  
  it('Should not initialise', () => {
    expect(avatar.init()).to.be.revertedWith('Initializable: contract is already initialized')
  })

  describe('Image Data', () => {
    describe('Layout', () => {
      it('Should set the Layout Address and token ID', async () => {
        expect(await avatar.layoutAddress()).to.equal('0x0000000000000000000000000000000000000000')
        expect(await avatar.layoutId()).to.equal(0)

        await avatar.setLayout(avatarLayoutMock.address, 1)

        expect(await avatar.layoutAddress()).to.equal(avatarLayoutMock.address)
        expect(await avatar.layoutId()).to.equal(1)
      })

      //  Cant set to zero address
      //  Cant set to zero token
      //  Token must be owned by avatar
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
})