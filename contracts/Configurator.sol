pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './MintableToken.sol';
import './NODVIXToken.sol';
import './PreICO.sol';
import './ICO.sol';
import './FreezeTokensWallet.sol';

contract Configurator is Ownable {

  MintableToken public token;

  PreICO public preICO;

  ICO public ico;

  FreezeTokensWallet public teamTokensWallet;

  function deploy() public onlyOwner {

    token = new NODVIXToken();

    preICO = new PreICO();

    preICO.setWallet(0x00EE9d057f66754C7D92550F77Aeb0A87AE34B01);
    preICO.setStart(1538352000); // 1 Oct 2018 00:00:00 GMT
    preICO.setPeriod(20);
    preICO.setPrice(33334000000000000000000);
    preICO.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    preICO.setToken(token);
    preICO.setHardcap(1000000000000000000000); // 1000 ETH
    token.setSaleAgent(preICO);

    ico = new ICO();

    ico.addMilestone(10, 88);
    ico.addMilestone(10, 37);
    ico.addMilestone(10, 25);
    ico.addMilestone(15, 12);
    ico.addMilestone(15, 7);
    ico.addMilestone(20, 0);
    ico.addValueBonus(20000000000000000000,50); // 20 eth - 50%
    ico.addValueBonus(50000000000000000000,65); // 50 eth - 65%
    ico.addValueBonus(100000000000000000000,100); // 100 eth - 100%
    ico.setMinInvestedLimit(10000000000000000); // 0.01 ETH
    ico.setToken(token);
    ico.setPrice(14286000000000000000000);
    ico.setWallet(0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F);
    ico.setBountyTokensWallet(0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6);
    ico.setReservedTokensWallet(0xE1D1898660469797B22D348Ff67d54643d848295);
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

    preICO.setNextSaleAgent(ico);

    address manager = 0xF1f94bAD54C8827C3B53754ad7dAa0FF5DCD527d;

    token.transferOwnership(manager);
    preICO.transferOwnership(manager);
    ico.transferOwnership(manager);
  }

}

