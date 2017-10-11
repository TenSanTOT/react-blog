import React, { Component } from 'react';
const postsUrl = 'http://localhost:8080/posts';
const mediaUrl = 'http://localhost:8080/media';

class EditPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			id: '',
			date: '',
			title: '',
			imgUrl: '',
			summary: '',
			content: '',
			commit: true,
			media: [],
			mediaValue: ''
		};
	}
	componentWillMount() {
		fetch(`${postsUrl}/${this.props.matchId}`, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				console.log('fetch post:', json);
				this.setState({
					loading: false,
					id: json.id,
					date: json.date,
					title: json.title,
					imgUrl: json.imgUrl,
					summary: json.summary,
					content: json.content,
					mediaValue: json.media
				});
			});
		fetch(mediaUrl, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				console.log('fetch2:', json);
				this.setState({
					loading: false,
					media: json
				});
			});
	}
	onSubmit() {
		this.setState({
			commit: false
		});
		const newPost = {
			id: this.props.matchId,
			date: this.state.date,
			title: this.state.title,
			imgUrl: this.state.imgUrl || 'https://placeimg.com/200/150/any',
			summary: this.state.summary,
			content: this.state.content,
			media: this.state.mediaValue
		};
		this.props.handelEdit(newPost);
	}
	onCommit() {
		this.setState({
			commit: true
		});
	}
	render() {
		if (this.state.loading) {
			return <span>loading</span>;
		}
		console.log('render:', this.state);
		return (
			<div className="editor-comp">
				<span>标题</span>
				<input
					value={this.state.title}
					onChange={e => this.setState({ title: e.target.value })}
				/>
				<span>摘要</span>
				<input
					value={this.state.summary}
					onChange={e => this.setState({ summary: e.target.value })}
				/>
				<span>封面图链接</span>
				<input
					value={this.state.imgUrl}
					onChange={e => this.setState({ imgUrl: e.target.value })}
				/>
				<select
					value={this.state.mediaValue}
					onChange={e => this.setState({ mediaValue: e.target.value })}
				>
					{this.state.media.map(item => (
						<option key={item.id}>{item.name}</option>
					))}
				</select>
				<span>正文</span>
				<textarea
					rows="9"
					value={this.state.content}
					onChange={e => this.setState({ content: e.target.value })}
				/>
				{this.state.commit || (
					<div className="commit-area">
						<h3>更新成功！</h3>
						<button
							onClick={this.onCommit.bind(this)}
							className="button-commit"
						>
							确 定
						</button>
					</div>
				)}
				<button
					className="button-edit-submit"
					style={{ marginBottom: '150px' }}
					onClick={this.onSubmit.bind(this)}
				>
					提 交
				</button>
			</div>
		);
	}
}
export default EditPost;
