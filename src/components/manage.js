import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Manage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commit: true,
			id: 0
		};
	}
	componentDidMount() {
		console.log('manage mounted');
		if (this.props.handleFilteredByMedia) {
			this.props.handleFilteredByMedia(this.props.matchId);
		}
	}
	onDelete(id) {
		console.log(id);
		this.setState({ commit: false, id: id });
		// this.props.handleDelete(id)
		console.log(this.state);
	}
	onCommite() {
		console.log(this.state.id);
		this.props.handleDelete(this.state.id);
		this.setState({ commit: true, id: 0 });
	}
	onCancel() {
		this.setState({ commit: true, id: 0 });
	}
	render() {
		return (
			<div className="content-wrap">
				{this.state.commit || (
					<div className="commit-area">
						<h3>确定删除吗？</h3>
						<button
							onClick={this.onCommite.bind(this)}
							className="button-commit"
						>
							确 定
						</button>
						<button
							onClick={this.onCancel.bind(this)}
							className="button-cancel"
							style={{ background: '#F2545B' }}
						>
							取消
						</button>
					</div>
				)}
				<ul>
					{this.props.posts.map(post => (
						<li
							key={post.id}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '20px'
							}}
						>
							<h2
								style={{
									flexBasis: '85%',
									fontSize: '1.1em',
									color: '#282f44'
								}}
							>
								{post.title}
							</h2>
							<button
								className="button-delete"
								onClick={() => this.onDelete(post.id)}
							>
								删除
							</button>

							<button className="button-edit">
								<Link to={'/edit/' + post.id}>修改</Link>
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
export default Manage;
