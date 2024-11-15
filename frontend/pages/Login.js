import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Giriş başarısız!');
            console.error('Login error:', error);
        }
    };

    return ( <
        div className = "login-container" >
        <
        h2 > Crypto Trading Platform < /h2> <
        form onSubmit = { handleSubmit } >
        <
        div className = "form-group" >
        <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "password"
        placeholder = "Şifre"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        required /
        >
        <
        /div> <
        button type = "submit" > Giriş Yap < /button> < /
        form > <
        p >
        Hesabınız yok mu ?
        <
        span onClick = {
            () => navigate('/register')
        }
        className = "register-link" >
        Kayıt Ol <
        /span> < /
        p > <
        /div>
    );
}

export default Login;