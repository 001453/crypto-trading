import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Trading.css';
import { createChart } from 'lightweight-charts';

function Trading() {
    const [exchanges] = useState([
        'binance',
        'mexc',
        'ftx',
        'lbank',
        'bitci',
        'probit',
        'latoken'
    ]);

    const [selectedExchange, setSelectedExchange] = useState('');
    const navigate = useNavigate();
    const chartContainerRef = useRef();

    useEffect(() => {
        if (selectedExchange && chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: 800,
                height: 400,
                layout: {
                    background: { color: '#ffffff' },
                    textColor: '#333',
                },
                grid: {
                    vertLines: { color: '#f0f0f0' },
                    horzLines: { color: '#f0f0f0' },
                },
            });

            const lineSeries = chart.addLineSeries({
                color: '#2962FF',
                lineWidth: 2,
            });

            lineSeries.setData([
                { time: '2024-01-01', value: 100 },
                { time: '2024-01-02', value: 120 },
                { time: '2024-01-03', value: 115 },
                { time: '2024-01-04', value: 134 },
                { time: '2024-01-05', value: 168 },
                { time: '2024-01-06', value: 132 },
                { time: '2024-01-07', value: 140 }
            ]);

            chart.timeScale().fitContent();

            return () => {
                chart.remove();
            };
        }
    }, [selectedExchange]);

    return ( <
        div className = "trading-container" >
        <
        nav className = "trading-nav" >
        <
        h2 > Trading Panel < /h2> <
        button onClick = {
            () => navigate('/dashboard') } > Dashboard < /button> <
        /nav>

        <
        div className = "trading-content" >
        <
        div className = "exchange-selector" >
        <
        h3 > Borsa Seçin < /h3> <
        select value = { selectedExchange }
        onChange = {
            (e) => setSelectedExchange(e.target.value) } >
        <
        option value = "" > Seçiniz < /option> {
            exchanges.map(exchange => ( <
                option key = { exchange }
                value = { exchange } > { exchange.toUpperCase() } <
                /option>
            ))
        } <
        /select> <
        /div>

        {
            selectedExchange && ( <
                div className = "trading-panel" >
                <
                h3 > { selectedExchange.toUpperCase() }
                Trading Panel < /h3> <
                div className = "price-chart" >
                <
                h4 > Fiyat Grafiği < /h4> <
                div ref = { chartContainerRef }
                /> <
                /div> <
                div className = "balance-info" >
                <
                h4 > Bakiye Bilgileri < /h4> <
                /div> <
                /div>
            )
        } <
        /div> <
        /div>
    );
}

export default Trading;