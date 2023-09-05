import React, { Component, Fragment } from "react";
import './Header.css';

class Header extends Component {
    render () {
        return (
            <div>
                <header className="header">
                    <h3>{this.props.children}</h3>
                </header>
            </div>
        )
    }
}

export default Header;