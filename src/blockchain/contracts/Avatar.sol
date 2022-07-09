//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import 'base64-sol/base64.sol';

contract Avatar is OwnableUpgradeable {
  string public imageData;
  
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

  function setLayout(address _layoutAddress, uint256 _layoutId) external {
    layoutAddress = _layoutAddress;
    layoutId = _layoutId;
    
    //  Emit Event
  }

  function reconstructImageData() external {
    string memory layoutSVG = ILayout(layoutAddress).tokenSVG(layoutId);

    imageData = string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64.encode(bytes(string(abi.encodePacked(
        '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
          layoutSVG,
        '</svg>'
      ))))
    ));

    //  Emit Event
  }

  function tokenURI() external view returns (string memory) {
    string memory color = "000000";
    string memory name = "Avatar";
    string memory description = "Solid Incarnation Avatar";
    
    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"background_color":"',
                  color,
                  '","name":"',
                  name,
                  '","description":"',
                  description,
                  '","image":"',
                  imageData,
                  '","attributes":"[]"}'            
              )
            )
          )
        )
      );
  }
}

interface ILayout {
  function tokenSVG(uint256 tokenId) external view returns (string memory);
}