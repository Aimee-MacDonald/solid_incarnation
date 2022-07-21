const hre = require('hardhat')

async function main() {
  const Avatar = await hre.ethers.getContractFactory('Avatar')
  const AvatarFactory = await hre.ethers.getContractFactory('AvatarFactory')
  const Geometry = await hre.ethers.getContractFactory('Geometry')
  const EyesLayout = await hre.ethers.getContractFactory('EyesLayout')
  const FaceLayout = await hre.ethers.getContractFactory('FaceLayout')
  
  const avatar = await Avatar.deploy()
  await avatar.deployed()
  console.log(`Avatar deployed to: ${avatar.address}`)

  const avatarFactory = await AvatarFactory.deploy(avatar.address)
  await avatarFactory.deployed()
  console.log(`AvatarFactory deployed to: ${avatarFactory.address}`)
  
  const geometry = await Geometry.deploy()
  await geometry.deployed()
  console.log(`Geometry deployed to: ${geometry.address}`)

  const eyesLayout = await EyesLayout.deploy()
  await eyesLayout.deployed()
  console.log(`EyesLayout deployed to: ${eyesLayout.address}`)

  const faceLayout = await FaceLayout.deploy()
  await faceLayout.deployed()
  console.log(`FaceLayout deployed to: ${faceLayout.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })