import React, { Component } from 'react';
import { getDate } from '../helpers';
const mediaUrl = 'http://localhost:8080/media';

class AddPost extends Component {
	constructor() {
		super();
		this.state = {
			empty: true,
			title: '',
			content: '',
			media: [],
			select: '',
			summary: '',
			imgUrl: 'https://unsplash.it/200/150'
		};
	}
	componentWillMount() {
		fetch(mediaUrl, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					media: json
				});
			});
	}
	addPost() {
		const { title, content, summary, imgUrl, select } = this.state;
		if (!title || !imgUrl || !summary || !content) {
			this.setState({ empty: false });
		} else {
			const newPost = {
				id: Math.floor(Math.random() * 1000000),
				date: getDate(),
				title,
				imgUrl,
				summary,
				content,
				media: select
			};
			this.props.handleSubmit(newPost);
		}
	}
	render() {
		return (
			<div className="editor-comp content-wrap">
				<span>标题</span>
				<input onChange={e => this.setState({ title: e.target.value })} />
				<span>摘要</span>
				<input onChange={e => this.setState({ summary: e.target.value })} />
				<span>封面图链接</span>
				<input onChange={e => this.setState({ imgUrl: e.target.value })} />
				<span>媒体</span>
				<select
					style={{ display: 'block', marginBottom: '30px' }}
					onChange={e => this.setState({ select: e.target.value })}
				>
					{this.state.media.map((item, index) => (
						<option key={index}>{item.name}</option>
					))}
				</select>
				<span>正文</span>
				<textarea
					rows="4"
					onChange={e => this.setState({ content: e.target.value })}
				/>
				{this.state.empty || <h3>输入框不能为空</h3>}
				{this.props.addStatus || (
					<div className="commit-area">
						<h3>发布成功！</h3>
						<button
							onClick={this.props.handleCommitPost}
							className="button-commit"
						>
							确 定
						</button>
					</div>
				)}
				<button className="button-add" onClick={this.addPost.bind(this)}>
					提交
				</button>
			</div>
		);
	}
}
export default AddPost;
