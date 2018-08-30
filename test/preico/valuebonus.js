import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;
  const valuebonuses = [
    {value: 10000000000000000000, bonus: 15},
    {value: 30000000000000000000, bonus: 25},
    {value: 100000000000000000000, bonus: 40}
  ];

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  before(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPeriod(this.period);
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.addValueBonus(10000000000000000000,15); // 10 eth - 15%
    await crowdsale.addValueBonus(30000000000000000000,25); // 30 eth - 25%
    await crowdsale.addValueBonus(100000000000000000000,40); // 100 eth - 40%
    await crowdsale.setWallet(this.wallet);
  });

  valuebonuses.forEach((valuebonus, i) => {
    it(`should add ${valuebonus.bonus}% bonus for investment over ${valuebonus.value / 1000000000000000000} eth`, async function () {
      await crowdsale.sendTransaction({value: valuebonus.value, from: wallets[i]});
      const balance = await token.balanceOf(wallets[i]);
      const tokenamount = this.price.mul(valuebonus.value).div(ether(1)).times(1 + valuebonus.bonus / this.PercentRate);
      balance.should.be.bignumber.equal(tokenamount);
    });
  });

  it('should add value bonus if it is active only', async function () {
    const investment = ether(11);

    await crowdsale.setActiveValueBonus(false);
    await crowdsale.sendTransaction({value: investment, from: wallets[7]});
    const balance1 = await token.balanceOf(wallets[7]);
    const tokenamount1 = this.price.mul(investment).div(ether(1));
    balance1.should.be.bignumber.equal(tokenamount1);

    await crowdsale.setActiveValueBonus(true);
    await crowdsale.sendTransaction({value: investment, from: wallets[8]});
    const balance2 = await token.balanceOf(wallets[8]);
    const tokenamount2 = this.price.mul(investment).div(ether(1)).times(1 + 15 / this.PercentRate);
    balance2.should.be.bignumber.equal(tokenamount2);
  });

  it('should correctly remove value bonus', async function () {
    const investment = ether(50);
    const owner = await crowdsale.owner();

    await crowdsale.removeValueBonus(1, {from: owner});
    await crowdsale.sendTransaction({value: investment, from: wallets[4]});
    const balance = await token.balanceOf(wallets[4]);
    const tokenamount = this.price.mul(investment).div(ether(1)).times(1 + 15 / this.PercentRate);
    balance.should.be.bignumber.equal(tokenamount);
  });

  it('should correctly add new value bonus', async function () {
    const investment = ether(350);
    const owner = await crowdsale.owner();

    await crowdsale.addValueBonus(350000000000000000000, 85, {from: owner});
    await crowdsale.sendTransaction({value: investment, from: wallets[9]});
    const balance = await token.balanceOf(wallets[9]);
    const tokenamount = this.price.mul(investment).div(ether(1)).times(1 + 85 / this.PercentRate);

    balance.should.be.bignumber.equal(tokenamount);

    await crowdsale.addValueBonus(1000000000000000000, 20, {from: owner}).should.be.rejectedWith(EVMRevert);
    await crowdsale.addValueBonus(360000000000000000000, 35, {from: owner}).should.be.rejectedWith(EVMRevert);
  });

  it('should correctly insert new value bonus', async function () {
    const investment = ether(40);
    const owner = await crowdsale.owner();

    await crowdsale.insertValueBonus(0, 40000000000000000000, 35, {from: owner});
    await crowdsale.sendTransaction({value: investment, from: wallets[6]});
    const balance = await token.balanceOf(wallets[6]);
    const tokenamount = this.price.mul(investment).div(ether(1)).times(1 + 35 / this.PercentRate);

    balance.should.be.bignumber.equal(tokenamount);

    await crowdsale.insertValueBonus(0, 1000000000000000000, 55, {from: owner}).should.be.rejectedWith(EVMRevert);
    await crowdsale.insertValueBonus(0, 40000000000000000000, 15, {from: owner}).should.be.rejectedWith(EVMRevert);
  });


  it('should correctly change value bonus', async function () {
    const investment = ether(1);
    const owner = await crowdsale.owner();

    await crowdsale.changeValueBonus(0, 1000000000000000000, 15, {from: owner});
    await crowdsale.sendTransaction({value: investment, from: wallets[5]});
    const balance = await token.balanceOf(wallets[5]);
    const tokenamount = this.price.mul(investment).div(ether(1)).times(1 + 15 / this.PercentRate);
    balance.should.be.bignumber.equal(tokenamount);
  });

  it('should correctly clear value bonuses', async function () {
    const investment = ether(100);
    const owner = await crowdsale.owner();

    await crowdsale.clearValueBonuses({from: owner});
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    const balance = await token.balanceOf(wallets[3]);
    const tokenamount = this.price.mul(investment).div(ether(1));
    balance.should.be.bignumber.equal(tokenamount);
  });

}
