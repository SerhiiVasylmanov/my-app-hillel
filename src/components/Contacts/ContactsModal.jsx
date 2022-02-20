import React, { Component } from 'react'

export default class ContactsModal extends Component {
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.props.state.id)
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
        })
    }

    render() {
        return <div className='modal'>
            <form className='form' onSubmit={this.onFormSubmit}>
                <div className='inputBox'>
                    <label htmlFor="firstName">First Name</label>
                    <input className='input'
                        id='firstName'
                        type='text'
                        onChange={this.props.handleUserContactDataChange}
                        value={this.props.state.firstName}
                        name='firstName'
                        pattern=".{3,}"
                        required title={"Minimum firstName length 3 letters"}
                    />
                </div>
                <div className='inputBox'>
                    <label htmlFor="lastName">Last Name</label>
                    <input className='input'
                        id='lastName'
                        onChange={this.props.handleUserContactDataChange}
                        value={this.props.state.lastName}
                        name='lastName'
                        pattern=".{3,}|"
                        required title={"Minimum lastName length 3 letters"}
                    />
                </div>
                <div className='inputBox'>
                    <label htmlFor="phone">Phone</label>
                    <input className='input'
                        id='phone'
                        type='tel'
                        onChange={this.props.handleUserContactDataChange}
                        value={this.props.state.phone}
                        name='phone'
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required title={"Number entered incorrectly"}
                    />
                    <small>Format: 123-456-7890</small>
                </div>
                <div className='btnSubmitBox'>
                    <input type="submit" className='btnSubmit' value={this.props.state.id ? 'Create contact' : 'Save new contact'} />
                    <input type='button' className='btnClose' value='Cancel' onClick={this.props.closeModal} />
                </div>
            </form>
        </div>;
    }
}
