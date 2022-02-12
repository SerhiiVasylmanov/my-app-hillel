import React, { Component } from 'react';

export default class EditPostModal extends Component {

    render() {
        return <div className='modal'>
            <form className='form' onSubmit={this.props.createPost}>
                <div className='btnCloseBox'>
                    <button onClick={() => this.props.closeModal} className='btnClose'>X</button>
                </div>
                <div className='inputBox'>
                    <input className='input'
                        onChange={this.props.onChangeTitle}
                        value={this.props.state.title}
                        name='title'
                    />
                </div>
                <div className='inputBox'>
                    <input className='input'
                        onChange={this.props.onChangeBody}
                        value={this.props.state.body}
                        name='body'
                    />
                </div>
                <div className='btnSubmitBox'>
                    <button className='btnSubmit'>Save</button>
                </div>
            </form>
        </div>;
    }
}
