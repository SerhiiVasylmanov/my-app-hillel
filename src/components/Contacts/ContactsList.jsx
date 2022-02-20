import React, { Component } from 'react'

export default class ContactsList extends Component {
    render() {
        return (
            <table className='table'>
                <thead className='table__header'>
                    <tr>
                        <th>№</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody onClick={this.props.eventTarget} className='table__body'>
                    {this.props.contacts.map((contact, index) =>
                        <tr key={contact.id} id={contact.id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {contact.firstName}
                            </td>
                            <td>
                                {contact.lastName}
                            </td>
                            <td>
                                {contact.phone}
                            </td>
                            <td className='table__body_btn'>
                                <button className='table__body_btn-edit' onClick={() => { this.props.onEditContactClick(contact.id) }}> Edit</button>
                                <button className='table__body_btn-delete' onClick={() => { this.props.onDeleteContactClick(contact.id) }}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot className='table__footer'>
                    <tr>
                        <td className='table__footer_btn' colSpan={5}>
                            <button className='table__footer_btn-add' onClick={() => { this.props.onClickNewContact(this.props.contacts.id) }}>Add new contact</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}
