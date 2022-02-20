import React, { Component } from 'react'
import ContactsList from './ContactsList'
import ContactsModal from './ContactsModal'
import './contacts.css';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorContactsList: null,
            errorDeleteContact: null,
            isLoaded: false,
            setModal: false,
            contacts: [],
            firstName: '',
            lastName: '',
            phone: '',
        }
    }
    componentDidMount = () => {
        this.getContactList()
    }
    getContactList = () => {
        fetch('https://620e27dc585fbc3359d87a8b.mockapi.io/contacts')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw this.setState({
                    errorContactsList: 'Error ' + res.status
                })
            })
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        contacts: data
                    })
                },
            )
    }
    onDeleteContactClick = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch('https://620e27dc585fbc3359d87a8b.mockapi.io/contacts/' + id, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        return this.setState({
                            contacts: this.state.contacts.filter((contact) => {
                                return contact.id !== id
                            })
                        })
                    }
                    throw this.setState({
                        errorDeleteContacts: 'Error ' + res.status + `' Contact №${id} not deleted'`
                    })
                })
        }
    }
    createContact = (id) => {
        fetch('https://620e27dc585fbc3359d87a8b.mockapi.io/contacts/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw this.setState({
                    errorContactsList: 'Error ' + res.status
                })
            })
            .then((data) => this.setState({
                ...data,
                contacts: this.state.contacts.map(item => item.id === id
                    ? { ...data } : item),
            }))
        this.setState({
            setModal: false,
        })
    }
    addNewContact = () => {
        fetch('https://620e27dc585fbc3359d87a8b.mockapi.io/contacts/', {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw this.setState({
                    errorContactsList: 'Error ' + res.status
                })
            })
            .then((data) => this.setState({
                contacts: [...this.state.contacts, data]
            }))
        this.setState({
            setModal: false,
        })
    }
    onEditContactClick = (id) => {
        const editContact = {
            ...this.state.contacts.find(contact => {
                return contact.id === id
            })
        }

        this.setState({
            ...this.state,
            setModal: true,
            firstName: editContact.firstName,
            lastName: editContact.lastName,
            phone: editContact.phone,
            id: editContact.id,
        })
    }
    closeModal = () => {
        this.setState({
            setModal: false,
        })
    }
    onClickNewContact = () => {
        this.setState({
            setModal: true,
            firstName: '',
            lastName: '',
            phone: '',
            id: '',
        })
    }
    handleUserContactDataChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    onSubmit = (id) => {
        if (id) {
            this.createContact(id);
        } else {
            this.addNewContact()
        }
    }

    render() {
        const { setModal, contacts, errorDeleteContact, isLoaded, errorContactsList } = this.state;
        if (errorContactsList) {
            return <h1>{errorContactsList}</h1>
        } else if (!isLoaded) {
            return <h1>Loading...</h1>
        } else
            return (
                <>
                    <h1>{errorDeleteContact}</h1>
                    {setModal ? <>
                        <ContactsModal
                            closeModal={this.closeModal}
                            handleUserContactDataChange={this.handleUserContactDataChange}
                            state={this.state}
                            onSubmit={this.onSubmit}
                        />
                    </> : null}
                    {<ContactsList
                        contacts={contacts}
                        onEditContactClick={this.onEditContactClick}
                        onDeleteContactClick={this.onDeleteContactClick}
                        onClickNewContact={this.onClickNewContact}
                    />}
                </>
            )
    }
}
