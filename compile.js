const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const lotterySource = fs.readFileSync(lotteryPath, 'utf-8');

module.exports = solc.compile(lotterySource, 1).contracts[':Lottery'];


