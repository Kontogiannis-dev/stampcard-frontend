import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import { API_URL } from './config'


function Wallet() {
    const { identifier } = useParams()
    const [walletLink, setWalletLink] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/api/card/${identifier}/wallet-link`)
            .then(response => response.json())
            .then(data => {
                setWalletLink(data.wallet_link)
            })
    }, [])

    return (
        <div className="page">
            <div className="stamp-card">
                <h1 className="wordmark">MFS</h1>
                <div className="name-prompt">
                    <p>Your card is ready.<br />Install it into your wallet.</p>
                    {walletLink ? (
                        <a href={walletLink}>
                            <button>Add to Wallet</button>
                        </a>
                    ) : (
                        <p>Preparing your card…</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Wallet