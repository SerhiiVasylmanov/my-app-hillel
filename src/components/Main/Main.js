import React, { Component } from 'react';
import LogoMain from '../../logo.svg';

export default class Main extends Component {
    render() {
        return <main className='main'>
            <h2>Content</h2>
            <img className='main__logo' src={LogoMain} alt="LogoMain" />
        </main>;
    }
}
