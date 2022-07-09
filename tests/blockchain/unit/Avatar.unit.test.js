const { expect } = require('chai')

describe('Avatar Unit', () => {
  let avatar
  let avatarLayoutMock

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    const AvatarLayoutMock = await ethers.getContractFactory('AvatarLayoutMock')

    avatar = await Avatar.deploy()
    avatarLayoutMock = await AvatarLayoutMock.deploy()
  })
  
  it('Should not initialise', () => {
    expect(avatar.init()).to.be.revertedWith('Initializable: contract is already initialized')
  })

  it('Should return a token URI', async () => {
    expect(await avatar.tokenURI()).to.equal('data:application/json;base64,eyJiYWNrZ3JvdW5kX2NvbG9yIjoiMDAwMDAwIiwibmFtZSI6IkF2YXRhciIsImRlc2NyaXB0aW9uIjoiU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiIiLCJhdHRyaWJ1dGVzIjoiW10ifQ==')
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
  })
})