//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import 'base64-sol/base64.sol';

contract Avatar is OwnableUpgradeable {
  string public imageData;

  function init() external initializer returns (bool) {
    OwnableUpgradeable.__Ownable_init();
    imageData = string(abi.encodePacked('data:image/svg+xml;base64,', Base64.encode(bytes('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"></svg>'))));
    
    return true;
  }
}