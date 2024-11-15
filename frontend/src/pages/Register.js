import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/auth/register', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Kayıt başarısız!');
            console.error('Register error:', error);
        }
    };

    return ( <
        div className = "register-container" >
        <
        h2 > Kayıt Ol < /h2> <
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
        div className = "form-group" >
        <
        input type = "password"
        placeholder = "Şifre Tekrar"
        value = { confirmPassword }
        onChange = {
            (e) => setConfirmPassword(e.target.value)
        }
        required /
        >
        <
        /div> <
        button type = "submit" > Kayıt Ol < /button> < /
        form > <
        p >
        Zaten hesabınız
        var mı ?
            <
            span onClick = {
                () => navigate('/')
            }
        className = "login-link" >
        Giriş Yap <
        /span> < /
        p > <
        /div>
    );
}

export default Register;