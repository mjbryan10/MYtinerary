import React from 'react';


export default function DestinationControls(props: any) {
    const { slideIndex, slideLength, onButtonClick } = props;
    const handleClick = (e: any) => {
        e.preventDefault();
        onButtonClick(e.target.value);
    }
    return (
        <div>
            <button onClick={handleClick} value="left">Left</button>
            {[...Array(slideLength)].map((element, index) => {
                return(
                    (slideIndex === index) ? <span>(*)</span> : <span>*</span>
                    )
                })}
                <button onClick={handleClick} value="right">Right</button>
        </div>
    )
}
