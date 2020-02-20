import React from 'react';

export default function NotFound() {
    const styles = {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center"
        //https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif --ALT
    }
    return (
        <div style={styles}>
            <h1>Page not found</h1>
            <h3>"This is not the page you were looking for ..."</h3>
            <img src="https://media.giphy.com/media/4Xbr39OD96ZmU/giphy.gif" alt="Obi Wan waving hand"/>
        </div>
    )
}
