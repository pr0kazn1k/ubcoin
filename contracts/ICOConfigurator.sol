pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './MintableToken.sol';
import './ICO.sol';
import './FreezeTokensWallet.sol';
import './NODVIXToken.sol';

contract ICOConfigurator is Ownable {

  MintableToken public token;

  ICO public ico;

  FreezeTokensWallet public teamTokensWallet;

  function deploy() public onlyOwner {

    token = NODVIXToken(0xbc05ff51c5bc84613aaa80c6d50960eda9e63738);

    ico = new ICO();

    ico.addMilestone(10, 88);
    ico.addMilestone(10, 37);
    ico.addMilestone(10, 25);
    ico.addMilestone(15, 12);
    ico.addMilestone(15, 7);
    ico.addMilestone(20, 0);
    ico.addValueBonus(20000000000000000000,15); // 20 eth - 15%
    ico.addValueBonus(50000000000000000000,25); // 50 eth - 25%
    ico.addValueBonus(100000000000000000000,50); // 100 eth - 50%
    ico.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    ico.setToken(token);
    ico.setPrice(800000000000);
    ico.setWallet(0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4);
    ico.setBountyTokensWallet(0x8f617f7C45F14edd5bdE074739D700e9A963Db8c);
    ico.setReservedTokensWallet(0xdA893B4788D7E915722a651aF2942C376Df05e64);
    ico.setStart(1543622400); // 01 Dec 2018 00:00:00 GMT
    ico.setHardcap(20000000000000000000000); // 20 000 ETH
    ico.setTeamTokensPercent(12);
    ico.setBountyTokensPercent(4);
    ico.setReservedTokensPercent(9);

    teamTokensWallet = new FreezeTokensWallet();
    teamTokensWallet.setStartLockPeriod(180);
    teamTokensWallet.setPeriod(360);
    teamTokensWallet.setDuration(90);
    teamTokensWallet.setToken(token);
    teamTokensWallet.transferOwnership(ico);

    ico.setTeamTokensWallet(teamTokensWallet);

    address manager = 0x64df5Eb8E4088e1362e6aeAFB13d1121727aA9BD;

    ico.transferOwnership(manager);

    // To finish  setSaleAgent(this) for token!!!
  }

}
