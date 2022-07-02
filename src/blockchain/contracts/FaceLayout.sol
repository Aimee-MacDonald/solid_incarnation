//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Layout.sol";

contract FaceLayout is Layout {
  mapping(uint256 => string) faceGeometry;
  mapping(uint256 => string) noseGeometry;
  mapping(uint256 => string) mouthGeometry;
  mapping(uint256 => string) eyesGeometry;

  function tokenSVG(uint256 tokenId) public override view returns (string memory) {
    return string(abi.encodePacked(
      '<g id="face">',
        eyesGeometry[tokenId],
        faceGeometry[tokenId],
        noseGeometry[tokenId],
        mouthGeometry[tokenId],
      '</g>'
    ));
  }

  function setGeometry(uint256 tokenId, address geometryAddress, uint256 geometryIndex) external {
    faceGeometry[tokenId] = IGeometry(geometryAddress).getGeometry(geometryIndex);

    //  Emit Event
  }

  function setEyesLayout(uint256 tokenId, address layoutAddress, uint256 layoutId) external {
    eyesGeometry[tokenId] = ILayout(layoutAddress).tokenSVG(layoutId);

    //  Emit Event
  }

  function setNoseGeometry(uint256 tokenId, address geometryAddress, uint256 geometryIndex) external {
    noseGeometry[tokenId] = IGeometry(geometryAddress).getGeometry(geometryIndex);

    //  Emit Event
  }

  function setMouthGeometry(uint256 tokenId, address geometryAddress, uint256 geometryIndex) external {
    mouthGeometry[tokenId] = IGeometry(geometryAddress).getGeometry(geometryIndex);

    //  Emit Event
  }
}

interface IGeometry {
  function getGeometry(uint256 geometryIndex) external view returns (string memory);
}

interface ILayout {
  function tokenSVG(uint256 tokenId) external view returns (string memory);
}