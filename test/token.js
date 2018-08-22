import additional from './token/additional';
import basic from './token/basic';
import mintable from './token/mintable';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('NODVIXToken.sol');

contract('NODVIXToken - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('NODVIXToken - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('NODVIXToken - Mintable test', function (accounts) {
  mintable(token, accounts);
});
contract('NODVIXToken - Ownable test', function (accounts) {
  ownable(token, accounts);
});
contract('NODVIXToken - Additional conditions test', function (accounts) {
  additional(token, accounts);
});

