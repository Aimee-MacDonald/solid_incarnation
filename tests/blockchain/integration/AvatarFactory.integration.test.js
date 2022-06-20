const { expect } = require('chai')

describe('AvatarFactory Integration Test', () => {
  let signers
  let avatarFactory, avatarFace

  beforeEach(async () => {
    signers = await ethers.getSigners()

    const Avatar = await ethers.getContractFactory('Avatar')
    const avatar = await Avatar.deploy()

    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    avatarFactory = await AvatarFactory.deploy(avatar.address)

    const AvatarFace = await ethers.getContractFactory('AvatarFace')
    avatarFace = await AvatarFace.deploy()
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFactory.setFaceAddress(avatarFace.address)
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFactory.tokenURI(0)
      expect(tokenURI).to.equal('data:application/json;base64,eyJiYWNrZ3JvdW5kX2NvbG9yIjoiMDAwMDAwIiwibmFtZSI6IkF2YXRhciIsImRlc2NyaXB0aW9uIjoiU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhMM04yWno0PSIsImF0dHJpYnV0ZXMiOiJbXSJ9')
    })
  })
})