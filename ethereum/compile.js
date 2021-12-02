const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const timeVaultPath = path.resolve(__dirname, 'contracts', 'TimeVault.sol');
const source = fs.readFileSync(timeVaultPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'TimeVault.sol': {
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
    path.resolve(buildPath, 'TimeVault.json'),
    output.contracts['TimeVault.sol']['TimeVault']
);
