pragma solidity ^0.4.18;

import './CommonSale.sol';
import './ValueBonusFeature.sol';
import './NextSaleAgentFeature.sol';

contract PreICO is ValueBonusFeature, NextSaleAgentFeature, CommonSale {

  uint public period;

  function calculateTokens(uint _invested) internal returns(uint) {
    uint tokens = _invested.mul(price).div(1 ether);
    uint valueBonusTokens = getValueBonusTokens(tokens, _invested);
    return tokens.add(valueBonusTokens);
  }

  function setPeriod(uint newPeriod) public onlyOwner {
    period = newPeriod;
  }

  function finish() public onlyOwner {
    token.setSaleAgent(nextSaleAgent);
  }

  function endSaleDate() public view returns(uint) {
    return start.add(period * 1 days);
  }
  
  function fallback() internal minInvestLimited(msg.value) returns(uint) {
    require(now >= start && now < endSaleDate());
    wallet.transfer(msg.value);
    return mintTokensByETH(msg.sender, msg.value);
  }
  
}

