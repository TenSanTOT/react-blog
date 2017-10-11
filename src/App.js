import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Manage from './components/manage';
import ManageMedia from './components/manage-media';
import Collaborate from './components/collaborate';
import Search from './components/search';
import EditPost from './components/editPost';
import EditMedia from './components/edit-media';
import AddPost from './components/addPost';
import AddMedia from './components/addMedia';
import Post from './components/post';
import { Feeds } from './components/feeds';
import { MediaList } from './components/media-list';
import { Nav } from './components/nav';

import {
	filterd,
	loadPosts,
	loadMedia,
	removePost,
	updatePost,
	updateMedia,
	createPost,
	createMedia,
	removeMedia,
	filterdByMedia
} from './helpers';

class App extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			mediaArr: [],
			filterdPosts: [],
			addStatus: true,
			mediaFilterdPosts: []
		};
	}
	componentWillMount() {
		loadPosts().then(posts => {
			const rePosts = posts.reverse();
			this.setState({ posts: rePosts, filterdPosts: rePosts });
		});
		loadMedia().then(mediaArr => {
			this.setState({ mediaArr });
		});
	}
	handelSearch(keyword) {
		if (!keyword) {
			this.setState({ filterdPosts: this.state.posts });
		}
		const newPosts = filterd(this.state.posts, keyword);
		this.setState({ filterdPosts: newPosts });
	}
	resetSearch() {
		loadPosts().then(posts => {
			const rePosts = posts.reverse();
			this.setState({ posts: rePosts, filterdPosts: rePosts });
		});
		this.setState({ filterdPosts: this.state.posts });
	}

	handleDelete(id) {
		const newPosts = this.state.posts.filter(post => post.id !== id);
		this.setState({ posts: newPosts });
		removePost(id).then(() => console.log('Deleted!'));
	}
	handleMediaDelete(id) {
		const newmediaArr = this.state.mediaArr.filter(item => item.id !== id);
		this.setState({ mediaArr: newmediaArr });
		removeMedia(id).then(() => console.log('Deleted!'));
	}
	handelEdit(post) {
		updatePost(post);
		loadPosts().then(posts => this.setState({ posts }));
	}
	handelMediaEdit(item) {
		updateMedia(item).then(() =>
			loadMedia().then(mediaArr => {
				console.log('json load:', mediaArr);
				this.setState({ mediaArr });
			})
		);
	}
	handleSubmit(post) {
		const { posts } = this.state;
		const newPosts = (posts, post) => [...posts, post];
		this.setState({ posts: newPosts(posts, post) });
		createPost(post).then(res => this.setState({ addStatus: false }));
	}
	handleMediaSubmit(item) {
		const { mediaArr } = this.state;
		const newMediaArr = (mediaArr, item) => [...mediaArr, item];
		this.setState({ mediaArr: newMediaArr(mediaArr, item) });
		createMedia(item).then(res => this.setState({ addStatus: false }));
	}
	handleCommitPost() {
		this.setState({ addStatus: true });
	}
	handleFilteredByMedia(keyword) {
		console.log('keyword', keyword);
		const newPosts = filterdByMedia(this.state.posts, keyword);
		console.log('old mediaFilterdPosts', this.state.mediaFilterdPosts);
		this.setState({ mediaFilterdPosts: newPosts });
		console.log('new mediaFilterdPosts', this.state.mediaFilterdPosts);
	}
	render() {
		const { filterdPosts, mediaArr } = this.state;
		return (
			<BrowserRouter>
				<div className="App">
					<Nav resetSearch={this.resetSearch.bind(this)} />
					<div className="wrapper">
						{/* <Search  /> */}
						<Route
							exact
							path="/"
							render={() => (
								<Search handelSearch={this.handelSearch.bind(this)} />
							)}
						/>
						<Route path="/post/:id" component={Post} />
						<Route
							path="/addpost"
							render={() => (
								<AddPost
									posts={this.state.posts}
									addStatus={this.state.addStatus}
									handleCommitPost={this.handleCommitPost.bind(this)}
									handleSubmit={this.handleSubmit.bind(this)}
								/>
							)}
						/>
						<Route
							path="/addmedia"
							render={() => (
								<AddMedia
									posts={this.state.posts}
									addStatus={this.state.addStatus}
									handleCommitPost={this.handleCommitPost.bind(this)}
									handleMediaSubmit={this.handleMediaSubmit.bind(this)}
								/>
							)}
						/>
						<Route
							exact
							path="/"
							render={() => <Feeds posts={filterdPosts} />}
						/>
						<Route
							exact
							path="/medialist"
							render={() => <MediaList mediaArr={mediaArr} />}
						/>
						<Route
							path="/manage"
							render={() => (
								<Manage
									posts={this.state.posts}
									handleDelete={this.handleDelete.bind(this)}
								/>
							)}
						/>
						<Route
							path="/managecollaborate"
							render={({ match }) => (
								<Collaborate
									matchId={+match.params.id}
									handelMediaEdit={this.handelMediaEdit.bind(this)}
									mediaArr={this.state.mediaArr}
								/>
							)}
						/>
						<Route
							path="/managemedia"
							render={() => (
								<ManageMedia
									handleMediaDelete={this.handleMediaDelete.bind(this)}
									mediaArr={this.state.mediaArr}
								/>
							)}
						/>
						<Route
							path="/edit/:id"
							render={({ match }) => (
								<EditPost
									posts={this.state.posts}
									matchId={+match.params.id}
									handelEdit={this.handelEdit.bind(this)}
								/>
							)}
						/>
						<Route
							path="/medialist/:id"
							render={({ match }) => (
								<Manage
									posts={this.state.mediaFilterdPosts}
									matchId={match.params.id}
									handleFilteredByMedia={this.handleFilteredByMedia.bind(this)}
								/>
							)}
						/>
						<Route
							path="/editmedia/:id"
							render={({ match }) => (
								<EditMedia
									mediaArr={this.state.mediaArr}
									matchId={+match.params.id}
									handelMediaEdit={this.handelMediaEdit.bind(this)}
								/>
							)}
						/>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
