import React from 'react';
import { Link } from "react-router-dom";

import CircleRight from './circled-right-2.png'

export default function StartBrowsing() {
    return (
        <div className="start-browsing">
            <h2>Start Browsing</h2>
            <Link to="/cities"><img src={CircleRight} alt="&rarr;" height="150px" width="150px" /></Link>
        </div>
    )
}
