import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './ico/capped';
import common from './ico/common';
import milestonebonus from './ico/milestonebonus';
import valuebonus from './ico/valuebonus';
import bounty from './ico/bounty';
import additional from './ico/additional';

const token = artifacts.require('NODVIXToken.sol');
const crowdsale = artifacts.require('ICO.sol');
const teamwallet = artifacts.require('FreezeTokensWallet.sol');

contract('ICO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, teamwallet, accounts);
});

contract('ICO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('ICO - milestone bonus test', function (accounts) {
  before(config);
  milestonebonus(token, crowdsale, accounts);
});

contract('ICO - value bonus test', function (accounts) {
  before(config);
  valuebonus(token, crowdsale, accounts);
});

contract('ICO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, teamwallet, accounts);
});

contract('ICO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, teamwallet, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('1 Dec 2018 00:00:00 GMT');
  this.period = 80;
  this.price = tokens(8000);
  this.hardcap = ether(20000);
  this.minInvestedLimit = ether(0.01);
  this.wallet = '0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4';
  this.BountyTokensWallet = '0x8f617f7C45F14edd5bdE074739D700e9A963Db8c';
  this.ReservedTokensWallet = '0xdA893B4788D7E915722a651aF2942C376Df05e64';
  this.TeamTokensPercent = 12;
  this.BountyTokensPercent = 4;
  this.ReservedTokensPercent = 9;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
