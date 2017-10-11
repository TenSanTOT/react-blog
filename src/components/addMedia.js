import React, { Component } from 'react';

class AddMedia extends Component {
	constructor() {
		super();
		this.state = {
			empty: true,
			name: '',
			collaborate: true,
			summary: '',
			imgUrl: 'https://unsplash.it/200/150'
		};
	}
	addMedia() {
		const { name, collaborate, summary, imgUrl } = this.state;
		if (!name || !imgUrl || !summary) {
			this.setState({ empty: false });
		} else {
			const newMedia = {
				id: Math.floor(Math.random() * 1000000),
				name,
				imgUrl,
				summary,
				collaborate
			};
			this.props.handleMediaSubmit(newMedia);
		}
	}
	render() {
		return (
			<div className="editor-comp content-wrap">
				<span>名称</span>
				<input onChange={e => this.setState({ name: e.target.value })} />
				<span>介绍</span>
				<input onChange={e => this.setState({ summary: e.target.value })} />
				<span>封面图链接</span>
				<input onChange={e => this.setState({ imgUrl: e.target.value })} />
				<span>是否合作</span>
				<select
					style={{ display: 'block', marginBottom: '30px' }}
					onChange={e => this.setState({ collaborate: e.target.value })}
				>
					<option value="true">合作</option>
					<option value="false">不合作</option>
				</select>
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
				<button className="button-add" onClick={this.addMedia.bind(this)}>
					提交
				</button>
			</div>
		);
	}
}
export default AddMedia;
