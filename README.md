![NODVIXToken](logo.png "NODVIXToken")

# NODVIXToken smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : NODVIX 
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_          : NDVX
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_        : 18
* _Emission_        : Mintable
* _Crowdsales_      : 2
* _Fiat dependency_ : No
* _Tokens locked_   : Yes

## Smart-contracts description

The tokens for the bounty and the team are minted after the ICO is finished.
There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _NODVIX_ - Token contract
2. _PreICO_ - PreICO contract
3. _ICO_ - ICO contract
4. _Configurator_ - contract with main configuration for production
5. _TeamWallet_ - wallet for freeze team tokens

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call _finish_ after each crowdsale in corresponding contract!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution

* _Bounty tokens percent_       : 4%
* _Team tokens percent_         : 12%
* _Reserved tokens_             : 9%
* _For sale tokens percent_     : 75% (PRE-ICO + ICO)

## Main network configuration

* _Bounty tokens wallet_        : 0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6
* _Reserved tokens wallet_      : 0xE1D1898660469797B22D348Ff67d54643d848295
* _Team tokens lock period_     : 180 days lock
* _Contracts owner_             : 0xF1f94bAD54C8827C3B53754ad7dAa0FF5DCD527d

### Links
1. _Token_ - https://etherscan.io/token/0x2d3e7d4870a51b918919e7b851fe19983e4c38d5
2. _PreICO_ - https://etherscan.io/address/0xce5dbd884305a5716460dCcFfA63888Fc9BFaa72
3. _ICO_ - https://etherscan.io/address/0x8dd9034f7ccc805bdc4d593a01f6a2e2eb94a67a
3. _TeamWallet_ - https://etherscan.io/address/0xe564e0a6a545671d29ad690398c9e94a398434b3

### Crowdsale stages

#### PreICO
* _Minimal insvested limit_     : 50 ETH
* _Base price_                  : 1 ETH = 24 000 Tokens
* _Hardcap_                     : 1 000 ETH
* _Period_                      : 20 days
* _Start_                       : 10 Oct 2018 00:00:00 GMT
* _Wallet_                      : 0x00EE9d057f66754C7D92550F77Aeb0A87AE34B01

##### Value bonus
* 10 eth - 30%
* 30 eth - 65%
* 100 eth - 80%

#### ICO
* _Minimal insvested limit_     : 0.01 ETH
* _Techincally base price_      : 1 ETH = 8000 Tokens
* _Hardcap_                     : 20 000 ETH
* _Softcap_                     : 700 ETH
* _Start_                       : 02 Apr 2019 00:00:00 GMT
* _Wallet_                      : 0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F 

##### Milestones
1. 10 days, 1 ETH = 15 040 Tokens (Technically +88%)
2. 10 days, 1 ETH = 10 960 Tokens (Technically +37%)
2. 10 days, 1 ETH = 10 000 Tokens (Technically +25%)
2. 15 days, 1 ETH =  8 960 Tokens (Technically +12%)
2. 15 days, 1 ETH =  8 560 Tokens (Technically +7%)
3. 20 days, 1 ETH =  8 000 Tokens 

##### Value bonus
* 20 eth - 30%
* 50 eth - 65%
* 100 eth - 100%
