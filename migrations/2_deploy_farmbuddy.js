var FarmBuddy = artifacts.require("./FarmBuddy.sol");

module.exports = function (deployer) {
  deployer.deploy(FarmBuddy);
};
