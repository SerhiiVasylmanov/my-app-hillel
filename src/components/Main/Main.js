import React, { Component } from 'react';
import EditPostModal from './EditPostModal';
import './main.css'
import PostList from './PostList';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorPostList: null,
            errorDeletePost: null,
            isLoaded: false,
            posts: {
                body: '',
                title: '',
                id: '',
                userId: '',
            },
            setModal: false,
        }
    }

    componentDidMount() {
        this.getPostList();
    }

    getPostList() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw this.setState({
                    errorPostList: 'Error ' + res.status
                })
            })
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        posts: data
                    })
                },
            )
    }

    onDeletePostClick = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        return this.setState({
                            posts: this.state.posts.filter((post) => {
                                return post.id !== id
                            })
                        })
                    }
                    throw this.setState({
                        errorDeletePost: 'Error ' + res.status + `' Post №${id} not deleted'`
                    })
                })
        }
    }

    onChangeTitle = (e) => {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }
    onChangeBody = (e) => {
        this.setState({
            ...this.state,
            body: e.target.value
        })
    }

    createPost = (e) => {
        e.preventDefault();
        let id = this.state.id;
        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                body: this.state.body,
                userId: this.state.userId,
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
                    errorPostList: 'Error ' + res.status
                })
            })
            .then((data) => this.setState({
                ...data,
                posts: this.state.posts.map(item => item.id === id
                    ? { ...data } : item)
            }))
        this.setState({
            setModal: false,
        })
    }

    onEditPostClick = (id) => {
        const editPost = {
            ...this.state.posts.find(post => {
                return post.id === id
            })
        }

        this.setState({
            ...this.state,
            setModal: true,
            title: editPost.title,
            body: editPost.body,
            userId: editPost.userId,
            id: editPost.id,
        })
    }

    closeModal = () => {
        this.setState({
            setModal: false,
        })
    }

    render() {
        const { errorPostList, errorDeletePost, isLoaded, posts, setModal } = this.state;
        if (errorPostList) {
            return <h1>{errorPostList}</h1>
        } else if (!isLoaded) {
            return <h1>Loading...</h1>
        } else {
            return <main className='main'>
                <h1  > {errorDeletePost}</h1>
                {
                    setModal ? <>
                        <EditPostModal
                            closeModal={this.closeModal}
                            onChangeBody={this.onChangeBody}
                            onChangeTitle={this.onChangeTitle}
                            state={this.state}
                            createPost={this.createPost}
                        />
                    </>
                        : null
                }
                {
                    <PostList
                        posts={posts}
                        onEditPostClick={this.onEditPostClick}
                        onDeletePostClick={this.onDeletePostClick}
                    />
                }
            </main >;
        }

    }
}
