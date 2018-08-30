import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;
  const milestones = [
    {day: 9, bonus: 88},
    {day: 10, bonus: 37},
    {day: 10, bonus: 25},
    {day: 15, bonus: 12},
    {day: 15, bonus: 7},
    {day: 20, bonus: 0}
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
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.addValueBonus(20000000000000000000,15); // 20 eth - 15%
    await crowdsale.addValueBonus(50000000000000000000,25); // 50 eth - 25%
    await crowdsale.addValueBonus(100000000000000000000,50); // 100 eth - 50%
    await crowdsale.addMilestone(10, 88);
    await crowdsale.addMilestone(10, 37);
    await crowdsale.addMilestone(10, 25);
    await crowdsale.addMilestone(15, 12);
    await crowdsale.addMilestone(15, 7);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.setWallet(this.wallet);
    await crowdsale.setBountyTokensWallet(this.BountyTokensWallet);
    await crowdsale.setReservedTokensWallet(this.ReservedTokensWallet);
    await crowdsale.setTeamTokensPercent(this.TeamTokensPercent);
    await crowdsale.setBountyTokensPercent(this.BountyTokensPercent);
    await crowdsale.setReservedTokensPercent(this.ReservedTokensPercent);
  });

  milestones.forEach((milestone, i) => {
    it(`should add ${milestone.bonus}% bonus for milestone #${i}`, async function () {
      await increaseTimeTo(latestTime() + duration.days(milestone.day));
      await crowdsale.sendTransaction({value: ether(1), from: wallets[i]});
      const balance = await token.balanceOf(wallets[i]);
      const value = this.price.times(1 + milestone.bonus / 100);
      balance.should.be.bignumber.equal(value);
    });
  });

}
