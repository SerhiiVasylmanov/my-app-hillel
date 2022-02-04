import React, { Component } from 'react';
import LogoReact from '../../logo.svg'
import HeaderMenu from './HeaderMenu';

export default class Header extends Component {
    render() {
        return <header className='header'>
            <div className='header__logo'>
                <img src={LogoReact} alt="logo" />
            </div>
            <HeaderMenu />
        </header>;
    }
}
