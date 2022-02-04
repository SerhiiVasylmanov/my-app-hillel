import React, { Component } from 'react';

export default class HeaderMenu extends Component {
    render() {
        return <nav className='header__menu'>
            <ul className='header__menu_list'>
                <li>
                    <a className='header__menu-link' href="#">
                        Menu-link 1
                    </a>
                </li>
                <li>
                    <a className='header__menu-link' href="#">
                        Menu-link 2
                    </a>
                </li>
                <li>
                    <a className='header__menu-link' href="#">
                        Menu-link 3
                    </a>
                </li>
                <li>
                    <a className='header__menu-link' href="#">
                        Menu-link 4
                    </a>
                </li>
                <li>
                    <a className='header__menu-link' href="#">
                        Menu-link 5
                    </a>
                </li>
            </ul>
        </nav>;
    }
}
