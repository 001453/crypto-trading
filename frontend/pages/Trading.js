import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trading() {
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState('');
    const [symbol, setSymbol] = useState('BTC/USDT');
    const [orderType, setOrderType] = useState('buy');

    useEffect(() => {
        const fetchPrice = async() => {
            try {
                const response = await axios.get('http://localhost:5001/api/trading/price', {
                    params: { symbol },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPrice(response.data.price);
            } catch (error) {
                console.error('Fiyat çekme hatası:', error);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 5000);
        return () => clearInterval(interval);
    }, [symbol]);

    const handleTrade = async() => {
        try {
            await axios.post('http://localhost:5001/api/trading/order', {
                symbol,
                amount,
                type: orderType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('İşlem başarılı!');
        } catch (error) {
            alert('İşlem başarısız!');
            console.error('Trade error:', error);
        }
    };

    return ( <
        div className = "trading-container" >
        <
        h2 > MEXC Trading < /h2> <
        div className = "price-info" >
        <
        h3 > { symbol }
        Fiyat: { price ? `$${price}` : 'Yükleniyor...' } < /h3> <
        /div> <
        div className = "trading-form" >
        <
        select value = { symbol }
        onChange = {
            (e) => setSymbol(e.target.value) } >
        <
        option value = "BTC/USDT" > BTC / USDT < /option> <
        option value = "ETH/USDT" > ETH / USDT < /option> <
        option value = "BNB/USDT" > BNB / USDT < /option> <
        /select> <
        select value = { orderType }
        onChange = {
            (e) => setOrderType(e.target.value) } >
        <
        option value = "buy" > Alış < /option> <
        option value = "sell" > Satış < /option> <
        /select> <
        input type = "number"
        placeholder = "Miktar"
        value = { amount }
        onChange = {
            (e) => setAmount(e.target.value) }
        /> <
        button onClick = { handleTrade } > İşlemi Gerçekleştir < /button> <
        /div> <
        /div>
    );
}

export default Trading;