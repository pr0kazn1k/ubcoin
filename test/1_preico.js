import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './preico/capped';
import common from './preico/common';
import valuebonus from './preico/valuebonus';
import additional from './preico/additional';

const token = artifacts.require('NODVIXToken.sol');
const crowdsale = artifacts.require('PreICO.sol');

contract('PreICO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('PreICO - value bonus test', function (accounts) {
    before(config);
    valuebonus(token, crowdsale, accounts);
});

contract('PreICO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('PreICO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('11 Oct 2018 00:00:00 GMT');
  this.period = 20;
  this.price = tokens(24000);
  this.hardcap = ether(1000);
  this.minInvestedLimit = ether(0.01);
  this.wallet = '0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4';
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
