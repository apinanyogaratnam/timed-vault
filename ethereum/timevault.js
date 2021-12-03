import web3 from './web3';
import TimedVault from '../ethereum/build/TimedVault.json';

const connect = () => {
    return new web3.eth.Contract(TimedVault.abi, '0xAD69E3De929f34B3dE1BB89C00663331D376f61E');
};

export default connect;
