const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const timedVaultPath = path.resolve(__dirname, 'contracts', 'TimedVault.sol');
const source = fs.readFileSync(timedVaultPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'TimedVault.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

fs.outputJsonSync(
    path.resolve(buildPath, 'TimedVault.json'),
    output.contracts['TimedVault.sol']['TimedVault']
);
