import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './App.css'

const HOST_IP = import.meta.env.VITE_HOST_IP

function Onboard() {
    const { shopId } = useParams()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    function submitOnboarding() {
        if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) return

        fetch(`https://${HOST_IP}:8000/api/onboard/${shopId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&phone_number=${encodeURIComponent(phoneNumber)}`
        })
            .then(response => response.json())
            .then(data => {
                navigate(`/wallet/${data.identifier}`)
            })
    }

    return (
        <div className="page">
            <div className="stamp-card">
                <h1 className="wordmark">MFS</h1>
                <div className="name-prompt">
                    <p>Welcome! Let's get your card.</p>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                    />
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone number"
                    />
                    <button onClick={submitOnboarding}>Get the card</button>
                </div>
            </div>
        </div>
    )
}

export default Onboard