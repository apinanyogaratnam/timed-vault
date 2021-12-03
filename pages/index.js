import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import connect from '../ethereum/timeVault';
import { useState } from 'react';
import connectToMetaMask from '../ethereum/web3';
import Web3 from 'web3';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);

    const [amountToLock, setAmountToLock] = useState('');
    const [timeToLock, setTimeToLock] = useState('');

    const connectToWeb3 = async () => {
        const accounts = await connectToMetaMask().eth.getAccounts();
        setAddress(accounts[0]);
        setIsConnected(true);
        getBalance();
    };

    const lockFunds = async (event) => {
        event.preventDefault();
        const timeVault = await connect();
        const accounts = await connectToMetaMask().eth.getAccounts();
        const tx = await timeVault.methods.lock(parseInt(timeToLock)).send({ 
          from: accounts[0],
          value: connectToMetaMask().utils.toWei(amountToLock.toString(), 'ether')
        });
        console.log(tx);

        setAmountToLock('');
        setTimeToLock('');
    };

    const unlockFunds = async (event) => {
        event.preventDefault();
        const timeVault = await connect();
        const accounts = await connectToMetaMask().eth.getAccounts();
        const tx = await timeVault.methods.unlock().send({ from: accounts[0] });
        console.log(tx);
    };

    const getBalance = async () => {
        const timeVault = await connect();
        const accounts = await connectToMetaMask().eth.getAccounts();
        const balanceResponse = await timeVault.methods.checkBalance().call({ from: accounts[0] });
        setBalance(connectToMetaMask().utils.fromWei(balanceResponse, 'ether'));
    };

    return (
        <div>
            {isConnected ? <button>{address}</button> : <button onClick={connectToWeb3}>Connect to MetaMask</button>}
            {isConnected ? <h1>connected</h1> : <h1>not connected</h1>}
            {balance ? <h3>Amount locked up: {balance}</h3>: null}

            <h2>Lock up your Ether</h2>
            <form>
                <input 
                    type="text"
                    placeholder="ETH to lock up"
                    value={amountToLock}
                    onChange={(e) => setAmountToLock(e.target.value)}
                />
                <br />
                <input 
                    type="text"
                    placeholder="time to lock up in seconds"
                    value={timeToLock}
                    onChange={(e) => setTimeToLock(e.target.value)}
                />
                <button onClick={lockFunds}>Lock</button>
            </form>

            <h2>Unlock your Ether</h2>
            <form>
                <button onClick={unlockFunds}>Unlock</button>
            </form>
            <p>please use the rinkeby testnet to use this application</p>
        </div>
    );
}
