import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'

const HOST_IP = import.meta.env.VITE_HOST_IP

function App() {
    const { identifier } = useParams()
    const [stampCount, setStampCount] = useState(0)
    const [stampsRequired, setStampsRequired] = useState(10)
    const [shopName, setShopName] = useState("")
    const [redeemCode, setRedeemCode] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    function loadCardData() {
        fetch(`https://${HOST_IP}:8000/api/card/${identifier}`)
            .then(response => response.json())
            .then(data => {
                setStampCount(data.stamp_count)
                setStampsRequired(data.stamps_required)
                setShopName(data.shop_name)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                if (data.stamp_count < data.stamps_required) {
                    setRedeemCode(null)
                } else if (data.active_redeem_code) {
                    setRedeemCode(data.active_redeem_code)
                }
            })
    }


    function redeemReward() {
        fetch(`https://${HOST_IP}:8000/api/card/${identifier}/generate-code`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                setRedeemCode(data.code)
            })
    }

    useEffect(() => {
        loadCardData()

        const interval = setInterval(() => {
            loadCardData()
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="page">
            <div className="stamp-card">
                <h1 className="wordmark">MFS</h1>

                <div className="stamp-strip">
                    {Array.from({ length: stampsRequired }).map((_, i) => (
                        <div key={i} className={`cup ${i < stampCount ? 'filled' : 'empty'}`}>
                            ☕
                        </div>
                    ))}
                </div>

                <div className="info-row">
                    <div>
                        <p className="info-label">NAME</p>
                        <p className="info-value">{firstName} {lastName}</p>
                    </div>
                    <div className="info-right">
                        <p className="info-label">STAMPS</p>
                        <p className="info-value">{stampCount}</p>
                    </div>
                </div>



                {stampCount >= stampsRequired ? (
                    <div className="reward-section">
                        <div className="reward-badge">🎉 Free coffee earned!</div>
                        {redeemCode ? (
                            <div className="code-box">
                                <p className="code-label">Show this code to the cashier</p>
                                <p className="code-value">{redeemCode}</p>
                            </div>
                        ) : (
                            <button className="redeem-button" onClick={redeemReward}>Redeem Reward</button>
                        )}
                    </div>
                ) : (
                    <img
                        className="qr-code"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${identifier}`}
                        alt="Your card QR code"
                    />
                )}
            </div>
        </div>
    )
}

export default App