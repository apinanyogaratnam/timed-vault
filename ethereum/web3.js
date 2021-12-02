import Web3 from 'web3';

let web3;

// const connect = () => {
//     if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
//         window.ethereum.request({ method: 'eth_requestAccounts' });
//         web3 = new Web3(window.ethereum);
//     } else {
//         const provider = new Web3.providers.HttpProvider(
//             "https://rinkeby.infura.io/v3/d55c4f57b80445d284aa7754f355aaeb"
//         );
//         web3 = new Web3(provider);
//     }

//     return web3;
// }

// export default connect;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/d55c4f57b80445d284aa7754f355aaeb"
    );
    web3 = new Web3(provider);
}

export default web3;
