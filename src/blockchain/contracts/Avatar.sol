//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import 'base64-sol/base64.sol';

contract Avatar is OwnableUpgradeable {
  string public imageData;
  
  address public faceAddress;
  uint256 public faceId;
  
  address public layoutAddress;
  uint256 public layoutId;

  constructor() {
    _disableInitializers();
  }

  function init() external initializer returns (bool) {
    OwnableUpgradeable.__Ownable_init();
    imageData = string(abi.encodePacked('data:image/svg+xml;base64,', Base64.encode(bytes('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"></svg>'))));
    
    return true;
  }

  function setFace(address faceContractAddress, uint256 tokenId) external {
    faceAddress = faceContractAddress;
    faceId = tokenId;
    
    //  Emit Event
  }

  function setLayout(address _layoutAddress, uint256 _layoutId) external {
    layoutAddress = _layoutAddress;
    layoutId = _layoutId;
    
    //  Emit Event
  }

  function reconstructImageData() external {
    string memory faceSVG = IAvatarFace(faceAddress).tokenSVG(faceId);

    imageData = string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64.encode(bytes(string(abi.encodePacked(
        '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
          faceSVG,
        '</svg>'
      ))))
    ));

    //  Emit Event
  }
}

interface IAvatarFace {
  function tokenSVG(uint256 tokenId) external pure returns (string memory);
}