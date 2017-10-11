import React, { Component } from 'react';
const postsUrl = 'http://localhost:8080/posts';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			post: ''
		};
	}
	componentWillMount() {
		const id = this.props.match.params.id;
		fetch(`${postsUrl}/${id}`, { method: 'GET' })
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					loading: false,
					post: json
				});
			});
	}
	render() {
		if (this.state.loading) {
			return <span>loading</span>;
		}
		const { date, title, imgUrl, summary, content, media } = this.state.post;
		return (
			<li>
				<div>
					<h1
						style={{
							fontSize: '2em',
							color: '#282f44'
						}}
					>
						{title}
					</h1>
					<span style={{ fontSize: '.8em', color: '#545454' }}>
						{media} {date}
					</span>
					<p
						style={{
							fontSize: '.9em',
							color: '#93a3b1',
							fontWeight: '400',
							margin: '20px 0'
						}}
					>
						{summary}
					</p>
					<img src={imgUrl} alt={title} style={{ width: '100%' }} />
					<p
						style={{
							fontSize: '1.2em',
							color: '#333333',
							fontWeight: '400',
							margin: '30px 0 80px'
						}}
					>
						{content}
					</p>
				</div>
			</li>
		);
	}
}

export default Post;
