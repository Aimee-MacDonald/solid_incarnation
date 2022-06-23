const { expect } = require("chai")

describe('AvatarFace Unit Test', () => {
  let signers
  let avatarFace

  beforeEach(async () => {
    signers = await ethers.getSigners()
    const AvatarFace = await ethers.getContractFactory('AvatarFace')
    avatarFace = await AvatarFace.deploy()
  })

  describe('Minting', () => {
    it('Should mint a new AvatarFace NFT', async () => {
      expect(await avatarFace.balanceOf(signers[0].address)).to.equal(0)
      
      await avatarFace.mint(signers[0].address)
      
      expect(await avatarFace.balanceOf(signers[0].address)).to.equal(1)
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFace.mint(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFace.tokenURI(1)
      expect(tokenURI).to.equal('data:application/json;base64,eyJuYW1lIjoiQXZhdGFyIEZhY2UiLCJkZXNjcmlwdGlvbiI6IkRlZmF1bHQgRmFjZSBmb3IgU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdjZ2FXUTlJbVY1WlhNaVBqeG5JR2xrUFNKc1pXWjBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakUwTlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqRTFNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OFp5QnBaRDBpY21sbmFIUmZaWGxsSWo0OFpXeHNhWEJ6WlNCamVEMGlNak0xSWlCamVUMGlNVGN3SWlCeWVEMGlNekFpSUhKNVBTSXpOU0lnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmp0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk9UZ3VNalkyTXp0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdOcGNtTnNaU0JqZUQwaU1qTXdJaUJqZVQwaU1UY3dJaUJ5UFNJeE5TSWdjM1I1YkdVOUltWnBiR3c2SXpBd01EQXdNRHRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQQzluUGp3dlp6NDhMMmMrUEM5emRtYysifQ==')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFace.tokenURI(1)).to.be.revertedWith('AvatarFace: Token does not exist')
    })
  })

  describe('Token SVG', () => {
    beforeEach(async () => {
      await avatarFace.mint(signers[0].address)
    })

    it('Should return SVG data for the token', async () => {
      const tokenSVG = await avatarFace.tokenSVG(1)
      expect(tokenSVG).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/><g id="eyes"><g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g><g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g></g>')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFace.tokenSVG(0)).to.be.revertedWith('AvatarFace: Token does not exist')
    })
  })
})