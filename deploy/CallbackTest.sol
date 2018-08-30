pragma solidity ^0.4.18;

// File: contracts/ReceivingContractCallback.sol

contract ReceivingContractCallback {

  function tokenFallback(address _from, uint _value) public;

}

// File: contracts/CallbackTest.sol

contract CallbackTest is ReceivingContractCallback {
  
  address public from;
  uint public value;
  
  function tokenFallback(address _from, uint _value) public
  {
    from = _from;
    value = _value;
  }

}
