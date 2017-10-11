import React, { Component } from 'react';
const mediaUrl = 'http://localhost:8080/media';

class EditMedia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			id: '',
			name: '',
			imgUrl: '',
			summary: '',
			commit: true,
			collaborate: true
		};
	}
	componentWillMount() {
		fetch(`${mediaUrl}/${this.props.matchId}`, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				console.log('fetch medias:', json);
				this.setState({
					loading: false,
					id: json.id,
					name: json.name,
					imgUrl: json.imgUrl,
					summary: json.summary,
					collaborate: json.collaborate
				});
			});
	}
	onSubmit() {
		this.setState({
			commit: false
		});
		const newMedia = {
			id: this.props.matchId,
			name: this.state.name,
			imgUrl: this.state.imgUrl || 'https://unsplash.it/200/150',
			summary: this.state.summary,
			collaborate: this.state.collaborate
		};
		this.props.handelMediaEdit(newMedia);
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
				<span>名称</span>
				<input
					value={this.state.name}
					onChange={e => this.setState({ name: e.target.value })}
				/>
				<span>介绍</span>
				<input
					value={this.state.summary}
					onChange={e => this.setState({ summary: e.target.value })}
				/>
				<span>封面图链接</span>
				<input
					value={this.state.imgUrl}
					onChange={e => this.setState({ imgUrl: e.target.value })}
				/>
				<span>是否合作</span>
				<select
					style={{ display: 'block', marginBottom: '30px' }}
					onChange={e => this.setState({ collaborate: e.target.value })}
				>
					<option value="true">合作</option>
					<option value="false">不合作</option>
				</select>
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
export default EditMedia;
