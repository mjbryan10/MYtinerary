import React from 'react';
import { Link } from "react-router-dom";
import "./footer.scss";
import home from './homeIcon.png'

export default function Footer() {
    return (
        <footer>
            <Link to="/"><img src={home} alt="Home" /></Link>
        </footer>
    )
}
