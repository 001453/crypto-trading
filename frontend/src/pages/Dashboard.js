import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [exchanges, setExchanges] = useState({
        binance: { apiKey: '', secretKey: '' },
        ftx: { apiKey: '', secretKey: '' },
        mexc: { apiKey: '', secretKey: '' }
    });
    const navigate = useNavigate();

    const handleExchangeUpdate = async(exchange) => {
        try {
            await axios.post('http://localhost:5001/api/exchange/update', {
                exchange: exchange,
                apiKey: exchanges[exchange].apiKey,
                secretKey: exchanges[exchange].secretKey
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('API anahtarları güncellendi!');
        } catch (error) {
            alert('Güncelleme başarısız!');
            console.error('Update error:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return ( <
            div className = "dashboard-container" >
            <
            nav className = "dashboard-nav" >
            <
            h2 > Crypto Trading Dashboard < /h2> <
            button onClick = { handleLogout } > Çıkış Yap < /button> < /
            nav >

            <
            div className = "exchange-settings" >
            <
            h3 > Borsa API Ayarları < /h3> {
            Object.keys(exchanges).map((exchange) => ( <
                div key = { exchange }
                className = "exchange-form" >
                <
                h4 > { exchange.toUpperCase() } < /h4> <
                input type = "text"
                placeholder = "API Key"
                value = { exchanges[exchange].apiKey }
                onChange = {
                    (e) => setExchanges({
                        ...exchanges,
                        [exchange]: {...exchanges[exchange], apiKey: e.target.value }
                    })
                }
                /> <
                input type = "password"
                placeholder = "Secret Key"
                value = { exchanges[exchange].secretKey }
                onChange = {
                    (e) => setExchanges({
                        ...exchanges,
                        [exchange]: {...exchanges[exchange], secretKey: e.target.value }
                    })
                }
                /> <
                button onClick = {
                    () => handleExchangeUpdate(exchange)
                } >
                Güncelle <
                /button> < /
                div >
            ))
        } <
        /div> < /
    div >
);
}

export default Dashboard;