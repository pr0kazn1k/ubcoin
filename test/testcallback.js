import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import callback from './testcallback/callback';

const token = artifacts.require('NODVIXToken.sol');
const crowdsale = artifacts.require('ICO.sol');
const callbacktest = artifacts.require('CallbackTest.sol');

contract('Callback test', function (accounts) {
  before(config);
  callback(token, crowdsale, callbacktest, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('25 Oct 2019 00:00:00 GMT');
  this.period = 60;
  this.price = tokens(8000);
  this.hardcap = ether(20000);
  this.minInvestedLimit = ether(0.01);
  this.wallet = '0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4';
  this.BountyTokensWallet = '0x8f617f7C45F14edd5bdE074739D700e9A963Db8c';
  this.ReservedTokensWallet = '0xdA893B4788D7E915722a651aF2942C376Df05e64';
  this.TeamTokensPercent = 12;
  this.BountyTokensPercent = 4;
  this.ReservedTokensPercent = 9;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
