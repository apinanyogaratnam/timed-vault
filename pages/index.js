import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import connect from '../ethereum/timeVault';
import { useState } from 'react';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [instance, setInstance] = useState(null);

    const connectToMetaMask = () => {
        const contractInstance = connect();
        setInstance(contractInstance);
        setIsConnected(true);
    };

    return (
        <div>
            <button onClick={connectToMetaMask}>Connect to MetaMask</button>
            {isConnected ? <h1>connected</h1> : <h1>not connected</h1>}
            <h1>asdf</h1>
        </div>
    );
}; 
