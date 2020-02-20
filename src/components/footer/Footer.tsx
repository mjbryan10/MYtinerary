import React from 'react';
import "./footer.scss";
import home from './homeIcon.png'

export default function Footer() {
    return (
        <footer>
            <a href="/"><img src={home} alt="Home" /></a>
        </footer>
    )
}
