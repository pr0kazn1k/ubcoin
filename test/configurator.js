import ether from './helpers/ether';
import tokens from './helpers/tokens';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

const Configurator = artifacts.require('Configurator.sol');
const Token = artifacts.require('NODVIXToken.sol');
const PreICO = artifacts.require('PreICO.sol');
const ICO = artifacts.require('ICO.sol');
const TeamTokensWallet = artifacts.require('FreezeTokensWallet.sol');

contract('Configurator integration test', function (accounts) {
  let configurator;
  let token;
  let preico;
  let ico;
  let teamTokensWallet;

  const manager = '0x64df5Eb8E4088e1362e6aeAFB13d1121727aA9BD';

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
    configurator = await Configurator.new();
    await configurator.deploy();

    const tokenAddress = await configurator.token();
    const preicoAddress = await configurator.preICO();
    const icoAddress = await configurator.ico();
    const teamTokensWalletAddress = await configurator.teamTokensWallet();

    token = await Token.at(tokenAddress);
    preico = await PreICO.at(preicoAddress);
    ico = await ICO.at(icoAddress);
    teamTokensWallet = await TeamTokensWallet.at(teamTokensWalletAddress);
  });

  it('contracts should have token address', async function () {
    const tokenOwner = await token.owner();
    tokenOwner.should.bignumber.equal(manager);
  });

  it('contracts should have preICO address', async function () {
    const preicoOwner = await preico.owner();
    preicoOwner.should.bignumber.equal(manager);
  });

  it('contracts should have ICO address', async function () {
    const icoOwner = await ico.owner();
    icoOwner.should.bignumber.equal(manager);
  });

  it('ICO should have team tokens wallet address', async function () {
    const teamWallet = await ico.teamTokensWallet();
    teamWallet.should.bignumber.equal(teamTokensWallet.address);
  });

  it('team tokens wallet should have ICO owner', async function () {
    const teamTokensWalletOwner = await teamTokensWallet.owner();
    teamTokensWalletOwner.should.bignumber.equal(ico.address);
  });

  it('preICO and ICO should have start time as described in README', async function () {
    const preicoStart = await preico.start();
    preicoStart.should.bignumber.equal((new Date('11 Oct 2018 00:00:00 GMT')).getTime() / 1000);
    const icoStart = await ico.start();
    icoStart.should.bignumber.equal((new Date('1 Dec 2018 00:00:00 GMT')).getTime() / 1000);
  });

  it ('presale period should be as described in README', async function () {
    const period = await preico.period();
    period.should.bignumber.equal(20);
  });

  it ('preICO and ICO should have price as described in README', async function () {
    const preicoPrice = await preico.price();
    preicoPrice.should.bignumber.equal(tokens(24000));
    const icoPrice = await ico.price();
    icoPrice.should.bignumber.equal(tokens(8000));
  });

  it ('preICO and ICO should have hardcap as described in README', async function () {
    const preicoHardcap = await preico.hardcap();
    preicoHardcap.should.bignumber.equal(ether(1000));
    const icoHardcap = await ico.hardcap();
    icoHardcap.should.bignumber.equal(ether(20000));
  });

  it ('preICO and ICO should have minimal insvested limit as described in README', async function () {
    const preicoMinInvest = await ico.minInvestedLimit();
    preicoMinInvest.should.bignumber.equal(ether(0.01));
    const icoMinInvest = await ico.minInvestedLimit();
    icoMinInvest.should.bignumber.equal(ether(0.01));
  });

  it ('bounty, team, reserved percent as described in README', async function () {
    const teamPercent = await ico.teamTokensPercent();
    teamPercent.should.bignumber.equal(12);
    const bountyPercent = await ico.bountyTokensPercent();
    bountyPercent.should.bignumber.equal(4);
    const reservedPercent = await ico.reservedTokensPercent();
    reservedPercent.should.bignumber.equal(9);
  });

  it ('preICO and ICO should have wallets as described in README', async function () {
    const preicoWallet = await preico.wallet();
    preicoWallet.should.bignumber.equal('0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4');
    const icoWallet = await ico.wallet();
    icoWallet.should.bignumber.equal('0x966913BE196d9f9bd17CffB36D3A56cadDD7a9A4');
  });

  it ('Bounty wallet and reserved wallet should be as described in README', async function () {
    const reservedWallet = await ico.reservedTokensWallet();
    reservedWallet.should.bignumber.equal('0xdA893B4788D7E915722a651aF2942C376Df05e64');
    const bountyWallet = await ico.bountyTokensWallet();
    bountyWallet.should.bignumber.equal('0x8f617f7C45F14edd5bdE074739D700e9A963Db8c');
  });

  it ('team tokens wallet start lock period should be as described in README', async function () {
    const startLockPeriod = await teamTokensWallet.startLockPeriod();
    startLockPeriod.should.bignumber.equal(duration.days(180));
  });

  it ('team tokens wallet period should be as described in README', async function () {
    const period = await teamTokensWallet.period();
    period.should.bignumber.equal(duration.days(360));
  });

  it ('team tokens wallet duration should be as described in README', async function () {
    const Duration = await teamTokensWallet.duration();
    Duration.should.bignumber.equal(duration.days(90));
  });

});

