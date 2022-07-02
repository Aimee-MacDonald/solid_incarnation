//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract Layout is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  constructor() ERC721("Solid Incarnation Layout", "SIL") {
    _tokenIdTracker.increment();
  }

  function mint(address recipient) external {
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function tokenSVG(uint256 tokenId) public virtual view returns (string memory);
}