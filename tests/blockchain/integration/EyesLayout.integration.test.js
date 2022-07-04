const { expect } = require('chai')

describe('EyesLayout integration', () => {
  let signers
  let eyesLayout, geometry
  
  beforeEach(async () => {
    signers = await ethers.getSigners()
    
    const Geometry = await ethers.getContractFactory('Geometry')
    const EyesLayout = await ethers.getContractFactory('EyesLayout')
    
    geometry = await Geometry.deploy()
    eyesLayout = await EyesLayout.deploy()

    await geometry.addGeometry('<g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g>')
    await geometry.addGeometry('<g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g>')
  })
  
  describe('Token SVG Data', () => {
    /*
    beforeEach(async () => {
      await faceLayout.mint(signers[0].address)
      await faceLayout.mint(signers[0].address)
    })
    */
    
    //  Should revert if token does not exist
   
    it('Should return SVG data for the entire layout', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
    })

    it('Should set the left eye geometry', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
      
      //  Should revert if token is not owned
      //  Should revert if geometry slot is empty
      await eyesLayout.setLeftEyeGeometry(1, geometry.address, 1)

      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"><g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g>')
    })

    it('Should set the right eye geometry', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
      
      //  Should revert if token is not owned
      //  Should revert if geometry slot is empty
      await eyesLayout.setRightEyeGeometry(1, geometry.address, 2)

      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"><g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g>')
    })
  })

  describe('Token URI Data', () => {
    beforeEach(async () => {
      await eyesLayout.mint(signers[0].address)
    })

    it('Should return URI data for the layout', async () => {
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrUEM5blBqd3ZjM1puUGc9PSJ9')
    })

    it('Should update the URI data accordingly', async () => {
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrUEM5blBqd3ZjM1puUGc9PSJ9')
      
      await eyesLayout.setLeftEyeGeometry(1, geometry.address, 1)
      await eyesLayout.setRightEyeGeometry(1, geometry.address, 2)
      
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrUEdjZ2FXUTlJbXhsWm5SZlpYbGxJajQ4Wld4c2FYQnpaU0JqZUQwaU1UUTFJaUJqZVQwaU1UY3dJaUJ5ZUQwaU16QWlJSEo1UFNJek5TSWdjM1I1YkdVOUltWnBiR3c2STJabVptWm1aanRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQR05wY21Oc1pTQmplRDBpTVRVd0lpQmplVDBpTVRjd0lpQnlQU0l4TlNJZ2MzUjViR1U5SW1acGJHdzZJekF3TURBd01EdG1hV3hzTFc5d1lXTnBkSGs2TVR0bWFXeHNMWEoxYkdVNlpYWmxibTlrWkR0emRISnZhMlV0ZDJsa2RHZzZPVGd1TWpZMk16dHdZV2x1ZEMxdmNtUmxjanB0WVhKclpYSnpJR1pwYkd3Z2MzUnliMnRsSWk4K1BDOW5QanhuSUdsa1BTSnlhV2RvZEY5bGVXVWlQanhsYkd4cGNITmxJR040UFNJeU16VWlJR041UFNJeE56QWlJSEo0UFNJek1DSWdjbms5SWpNMUlpQnpkSGxzWlQwaVptbHNiRG9qWm1abVptWm1PMlpwYkd3dGIzQmhZMmwwZVRveE8yWnBiR3d0Y25Wc1pUcGxkbVZ1YjJSa08zTjBjbTlyWlMxM2FXUjBhRG81T0M0eU5qWXpPM0JoYVc1MExXOXlaR1Z5T20xaGNtdGxjbk1nWm1sc2JDQnpkSEp2YTJVaUx6NDhZMmx5WTJ4bElHTjRQU0l5TXpBaUlHTjVQU0l4TnpBaUlISTlJakUxSWlCemRIbHNaVDBpWm1sc2JEb2pNREF3TURBd08yWnBiR3d0YjNCaFkybDBlVG94TzJacGJHd3RjblZzWlRwbGRtVnViMlJrTzNOMGNtOXJaUzEzYVdSMGFEbzVPQzR5TmpZek8zQmhhVzUwTFc5eVpHVnlPbTFoY210bGNuTWdabWxzYkNCemRISnZhMlVpTHo0OEwyYytQQzluUGp3dmMzWm5QZz09In0=')
    })
  })
})


