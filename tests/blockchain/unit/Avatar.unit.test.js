const { expect } = require('chai')

describe('Avatar Unit', () => {
  let avatar

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    avatar = await Avatar.deploy()
  })

  it('Should return image data for the Avatar', async () => {
    expect(await avatar.imageData()).to.equal('AVATAR SVG')
  })
})