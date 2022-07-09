//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AvatarFactory is Ownable, ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  mapping(uint256=>address) private _contractAddresses;

  address public avatarImplementationAddress;

  constructor(address _avatarImplementationAddress) ERC721("Solid Incarnation Avatar", "SIA") {
    avatarImplementationAddress = _avatarImplementationAddress;
    _tokenIdTracker.increment();
  }

  function mintAvatar(address recipient) external {
    address cloneAddress = Clones.clone(avatarImplementationAddress);
    _contractAddresses[_tokenIdTracker.current()] = cloneAddress;

    IAvatar(cloneAddress).init();
    IAvatar(cloneAddress).transferOwnership(recipient);

    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function contractAddressOf(uint256 tokenId) external view returns (address) {
    require(_exists(tokenId), "AvatarFactory: Token does not exist");

    return _contractAddresses[tokenId];
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "AvatarFactory: Token does not exist");

    return IAvatar(_contractAddresses[tokenId]).tokenURI();
  }
}

interface IAvatar {
  function init() external;
  function transferOwnership(address newOwner) external;
  function tokenURI() external view returns (string memory);
}