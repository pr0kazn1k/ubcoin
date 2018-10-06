pragma solidity ^0.4.18;

// File: contracts/ownership/Ownable.sol

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}

// File: contracts/TestConfigurator.sol

contract NODVIXToken {
  function setSaleAgent(address newSaleAgent) public;
  function transferOwnership(address newOwner) public;
}

contract PreICO {
  function setWallet(address newWallet) public;
  function setStart(uint newStart) public;
  function setPeriod(uint newPerion) public;
  function setPrice(uint newPrice) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setHardcap(uint newHardcap) public;
  //function getValueBonusTokens(uint tokens, uint invested) public;
  function setNextSaleAgent(address newICO) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
}

contract ICO {
  function addMilestone(uint period, uint bonus) public;
  function setStart(uint newStart) public;
  function setPrice(uint newPrice) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setHardcap(uint newHardcap) public;
  //function getValueBonusTokens(uint tokens, uint invested) public;
  function setWallet(address newWallet) public;
  function setTeamTokensWallet(address newTeamTokensWallet) public;
  function setBountyTokensWallet (address newBountyWallet) public;
  function setReservedTokensWallet (address newReservedTokensWallet) public;
  function setTeamTokensPercent(uint newTeamTokensPercent) public;
  function setBountyTokensPercent(uint newBountyTokensPercent) public;
  function setReservedTokensPercent(uint newReservedTokensPercent) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
}

contract FreezeTokensWallet {
  function setStartLockPeriod(uint newStartLockPeriod) public;
  function setPeriod(uint newPeriod) public;
  function setDuration(uint newDuration) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
}

contract TestConfigurator is Ownable {
  NODVIXToken public token;
  PreICO public preICO;
  ICO public ico;
  FreezeTokensWallet public teamTokensWallet;

  function setToken(address _token) public onlyOwner {
    token = NODVIXToken(_token);
  }

  function setPreICO(address _preICO) public onlyOwner {
    preICO = PreICO(_preICO);
  }

  function setICO(address _ico) public onlyOwner {
    ico = ICO(_ico);
  }

  function setTeamTokensWallet(address _teamTokensWallet) public onlyOwner {
    teamTokensWallet = FreezeTokensWallet(_teamTokensWallet);
  }

  function deploy() public onlyOwner {
    preICO.setWallet(0x8fD94be56237EA9D854B23B78615775121Dd1E82);
    preICO.setStart(1539216000); // 11 Oct 2018 00:00:00 GMT
    preICO.setPeriod(20);
    preICO.setPrice(2400000000000);
    preICO.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    preICO.setHardcap(1000000000000000000000); // 1000 ETH
    preICO.setToken(token);

    token.setSaleAgent(preICO);
    preICO.setNextSaleAgent(ico);

    ico.setStart(1543622400); // 01 Dec 2018 00:00:00 GMT
    ico.addMilestone(10, 88);
    ico.addMilestone(10, 37);
    ico.addMilestone(10, 25);
    ico.addMilestone(15, 12);
    ico.addMilestone(15, 7);
    ico.addMilestone(20, 0);
    ico.setPrice(800000000000);
    ico.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    ico.setHardcap(20000000000000000000000); // 20 000 ETH
    ico.setWallet(0x8fD94be56237EA9D854B23B78615775121Dd1E82);
    ico.setBountyTokensWallet(0x470a2D1105EaE6aAe879623357F615Ab9cbf906E);
    ico.setReservedTokensWallet(0x093A89bDb5CE905fecb6272ff3ac92f53350a79A);
    ico.setTeamTokensPercent(12);
    ico.setBountyTokensPercent(4);
    ico.setReservedTokensPercent(9);
    ico.setToken(token);

    ico.setTeamTokensWallet(teamTokensWallet);

    teamTokensWallet.setStartLockPeriod(180);
    teamTokensWallet.setPeriod(360);
    teamTokensWallet.setDuration(90);
    teamTokensWallet.setToken(token);
    teamTokensWallet.transferOwnership(ico);

    token.transferOwnership(owner);
    preICO.transferOwnership(owner);
    ico.transferOwnership(owner);
  }
}
