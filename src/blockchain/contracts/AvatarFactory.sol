//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import 'base64-sol/base64.sol';

contract AvatarFactory is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  constructor() ERC721("Solid Incarnation Avatar", "SIA") {}

  function mintAvatar(address recipient) external {
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();

    //  Check Event Emition
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "AvatarFactory: Token does not exist");

    string memory color = "000000";
    string memory name = "Avatar";
    string memory description = "Solid Incarnation Avatar";

    string memory image = Base64.encode(bytes(string(abi.encodePacked(
      '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
        '<g id="face">',
          '<ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>',
          '<g id="eyes">',
            '<g id="left_eye">',
              '<ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
              '<circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
            '</g>',
            '<g id="right_eye">',
              '<ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
              '<circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
            '</g>',
          '</g>',
        '</g>',
      '</svg>'))));
    
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
                  'data:image/svg+xml;base64,',
                  image,
                  '","attributes":"[]"}'            
              )
            )
          )
        )
      );
  }
}