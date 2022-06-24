const { expect } = require('chai')

describe('Geometry Unit', () => {
  let geometry

  beforeEach(async () => {
    const Geometry = await ethers.getContractFactory('Geometry')
    geometry = await Geometry.deploy()
  })

  it('Should add and return geometry', async () => {
    expect(await geometry.getGeometry(1)).to.equal('')
    
    await geometry.addGeometry('Geometry')
    
    expect(await geometry.getGeometry(1)).to.equal('Geometry')
  })
})