import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import connect from '../ethereum/timeVault';
import { useState } from 'react';
import connectWeb3 from '../ethereum/web3';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState(null);

    const connectToMetaMask = async () => {
        const accounts = await connectWeb3().eth.getAccounts();
        setAddress(accounts[0]);
        setIsConnected(true);
    };

    return (
        <div>
            {isConnected ? <button>{address}</button> : <button onClick={connectToMetaMask}>Connect to MetaMask</button>}
            {isConnected ? <h1>connected</h1> : <h1>not connected</h1>}
        </div>
    );
}; 
