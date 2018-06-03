import React from "react";
import {Link} from "react-router-dom";

import "../styles/errors.css";

class Error404 extends React.Component {
    componentDidMount() {
        document.title = "That's not cool bruh...";
    }
    render() {
        return (
            <div className="container error-container">
                <h1 className="error-heading">BUMMER YO</h1>
                <h1 className="error-heading error-info">COULDN'T FIND YOUR SONG...</h1>
                <Link className="error-redirect-btn" to="/new/song">GO WRITE ONE!!!</Link>
            </div>
        )
    }
}

export default Error404;