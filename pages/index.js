import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import connect from '../ethereum/timeVault';
import { useState } from 'react';
import connectWeb3 from '../ethereum/web3';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);

    const [amountToLock, setAmountToLock] = useState('');
    const [timeToLock, setTimeToLock] = useState('');

    const connectToMetaMask = async () => {
        const accounts = await connectWeb3().eth.getAccounts();
        setAddress(accounts[0]);
        setIsConnected(true);
    };

    const lockFunds = async (event) => {
        event.preventDefault();
        const timeVault = await connect();
        const accounts = await connectWeb3().eth.getAccounts();
        const tx = await timeVault.methods.lock(parseInt(timeToLock)).send({ 
          from: accounts[0],
          value: connectWeb3().utils.toWei(amountToLock.toString(), 'ether')
        });
        console.log(tx);

        setAmountToLock('');
        setTimeToLock('');
    };

    const unlockFunds = async (event) => {
        event.preventDefault();
        const timeVault = await connect();
        const accounts = await connectWeb3().eth.getAccounts();
        const tx = await timeVault.methods.unlock().send({ from: accounts[0] });
        console.log(tx);
    };

    const getBalance = async () => {
        const timeVault = await connect();
        const accounts = await connectWeb3().eth.getAccounts();
        const balance = await timeVault.methods.checkBalance().call({ from: accounts[0] });
        setBalance(connectWeb3().utils.fromWei(balance, 'ether'));
    };

    getBalance();

    return (
        <div>
            {isConnected ? <button>{address}</button> : <button onClick={connectToMetaMask}>Connect to MetaMask</button>}
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
        </div>
    );
}
