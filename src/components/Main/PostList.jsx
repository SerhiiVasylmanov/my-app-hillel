import React, { Component } from 'react';

export default class PostList extends Component {

    render() {
        return <>
            {this.props.posts.map((post) =>
                <div className='postItem' key={post.id} id={post.id}>
                    <p className='postItem-id'>{post.id}</p>
                    <p className='postItem-text'>{post.body}</p>
                    <p className='postItem-text'>{post.title}</p>
                    <div className='postItem__btn '>
                        <button
                            className='btn btnEdit'
                            onClick={() => this.props.onEditPostClick(post.id, post.userId)}
                        > Edit</button>
                        <button className='btn btnDelete' onClick={() => this.props.onDeletePostClick(post.id)}>Delete</button>
                    </div>

                </div>
            )}
        </>;
    }
}
