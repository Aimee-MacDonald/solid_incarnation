const { expect } = require('chai')

describe('AvatarFactory Unit Test', () => {
  let signers
  let avatarFactory

  beforeEach(async () => {
    signers = await ethers.getSigners()

    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    avatarFactory = await AvatarFactory.deploy()
  })

  describe('Minting', () => {
    it('Should mint a new Avatar NFT', async () => {
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(0)
      
      await avatarFactory.mintAvatar(signers[0].address)
      
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(1)
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFactory.tokenURI(0)
      expect(tokenURI).to.equal('data:application/json;base64,eyJiYWNrZ3JvdW5kX2NvbG9yIjoiMDAwMDAwIiwibmFtZSI6IkF2YXRhciIsImRlc2NyaXB0aW9uIjoiU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdjZ2FXUTlJbVY1WlhNaVBqeG5JR2xrUFNKc1pXWjBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakUwTlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqRTFNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OFp5QnBaRDBpY21sbmFIUmZaWGxsSWo0OFpXeHNhWEJ6WlNCamVEMGlNak0xSWlCamVUMGlNVGN3SWlCeWVEMGlNekFpSUhKNVBTSXpOU0lnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmp0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk9UZ3VNalkyTXp0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdOcGNtTnNaU0JqZUQwaU1qTXdJaUJqZVQwaU1UY3dJaUJ5UFNJeE5TSWdjM1I1YkdVOUltWnBiR3c2SXpBd01EQXdNRHRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQQzluUGp3dlp6NDhMMmMrUEM5emRtYysiLCJhdHRyaWJ1dGVzIjoiW10ifQ==')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.tokenURI(1)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })
})