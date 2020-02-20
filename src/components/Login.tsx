import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="login-container">
            <p>Want to build your won MYtinerary?</p>
            <Link to="/login">Log in</Link>
            <Link to="/create">Create Account</Link>
        </div>
    )
}
