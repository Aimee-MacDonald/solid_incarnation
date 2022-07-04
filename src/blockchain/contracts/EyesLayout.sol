//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Layout.sol";

contract EyesLayout is Layout {
  mapping(uint256 => string) leftEyeGeometry;
  mapping(uint256 => string) rightEyeGeometry;
  
  function setLeftEyeGeometry(uint256 tokenId, address geometryAddress, uint256 geometryIndex) external {
    leftEyeGeometry[tokenId] = IGeometry(geometryAddress).getGeometry(geometryIndex);

    //  Emit Event
  }

  function setRightEyeGeometry(uint256 tokenId, address geometryAddress, uint256 geometryIndex) external {
    rightEyeGeometry[tokenId] = IGeometry(geometryAddress).getGeometry(geometryIndex);

    //  Emit Event
  }

  function tokenSVG(uint256 tokenId) public override view returns (string memory) {
    return string(abi.encodePacked(
      '<g id="eyes">',
        leftEyeGeometry[tokenId],
        rightEyeGeometry[tokenId],
      '</g>'
    ));
  }
}

interface IGeometry {
  function getGeometry(uint256 geometryIndex) external view returns (string memory);
}