pragma solidity ^0.4.18;

import './ownership/Ownable.sol';


contract NODVIXToken {
  function setSaleAgent(address newSaleAgent) public;
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

contract TestICOConfigurator is Ownable {

  NODVIXToken public token;
  ICO public ico;
  FreezeTokensWallet public teamTokensWallet;

  function setToken(address _token) public onlyOwner {
    token = NODVIXToken(_token);
  }

  function setICO(address _ico) public onlyOwner {
    ico = ICO(_ico);
  }

  function setTeamTokensWallet(address _teamTokensWallet) public onlyOwner {
    teamTokensWallet = FreezeTokensWallet(_teamTokensWallet);
  }

  function deploy() public onlyOwner {
    ico.setStart(1543622400); // 01 Dec 2018 00:00:00 GMT
    ico.addMilestone(10, 88);
    ico.addMilestone(10, 37);
    ico.addMilestone(10, 25);
    ico.addMilestone(15, 12);
    ico.addMilestone(15, 7);
    ico.addMilestone(20, 0);
    ico.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    ico.setPrice(800000000000);
    ico.setHardcap(20000000000000000000000); // 20 000 ETH
    ico.setWallet(0x8fd94be56237ea9d854b23b78615775121dd1e82);
    ico.setBountyTokensWallet(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29);
    ico.setReservedTokensWallet(0x470a2D1105EaE6aAe879623357F615Ab9cbf906E);
    ico.setTeamTokensPercent(12);
    ico.setBountyTokensPercent(4);
    ico.setReservedTokensPercent(9);
    ico.setToken(token);

    teamTokensWallet.setStartLockPeriod(180);
    teamTokensWallet.setPeriod(360);
    teamTokensWallet.setDuration(90);
    teamTokensWallet.setToken(token);
    teamTokensWallet.transferOwnership(ico);

    ico.setTeamTokensWallet(teamTokensWallet);
    token.setSaleAgent(ico);

    ico.transferOwnership(owner);
    token.transferOwnership(owner);
  }

}
