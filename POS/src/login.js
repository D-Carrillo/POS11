import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';


const Login = () => {
    //all onsubmit variables 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typeOfUser, setTypeOfUser] = useState('customer');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
                typeOfUser
            });
        
            console.log('Login success:' , response.data);
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };


    return (
        <div className = "firstlogin" >
            <div className = "container">
                <div className="image-section">
                    <img src="store.jpg" alt="Image of a store" />
                </div>

                {/*the actual login part */}
                <div className = "login-container">
                    <h2>Login</h2>
                    <div className = "tabs">
                        <button 
                            className = {`tab ${typeOfUser === 'customer' ? 'active': ''}`}
                            onClick = { () => setTypeOfUser('customer')}
                            >
                                Customer 
                        </button>
                        <button 
                            className = {`tab ${typeOfUser === 'supplier' ? 'active': ''}`}
                            onClick = { () => setTypeOfUser('supplier')}
                            >
                                Supplier 
                        </button>
                    </div>
                    <div className="box">
                        <form onSubmit = {handleSubmit}> 
                            <div>
                                <label>Email:</label>
                                <input 
                                    type = "email"
                                    value = {email}
                                    onChange = { (e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input 
                                    type = "password"
                                    value = {password}
                                    onChange = { (e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type = "submit">Login</button>
                        </form>
                        <p>
                            Don't have an account? <Link to = "/customer-Entry-Form">Sign Up</Link> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;