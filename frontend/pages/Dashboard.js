const handleExchangeUpdate = async(exchange) => {
    try {
        console.log('Gönderilen veriler:', {
            exchange,
            apiKey: exchanges[exchange].apiKey,
            secretKey: exchanges[exchange].secretKey
        });

        const response = await axios.post('http://localhost:5001/api/exchange/update', {
            exchange: exchange,
            apiKey: exchanges[exchange].apiKey,
            secretKey: exchanges[exchange].secretKey
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Sunucu yanıtı:', response.data);
        alert('API anahtarları güncellendi!');
    } catch (error) {
        console.log('Token:', localStorage.getItem('token'));
        console.error('Hata detayları:', error.response ? .data);
        alert('Güncelleme başarısız!');
    }
};