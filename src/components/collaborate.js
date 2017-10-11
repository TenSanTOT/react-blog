import React, { Component } from 'react';

class Collaborate extends Component {
	onSubmit(media, collaborateValue) {
		const newMedia = {
			id: media.id,
			name: media.name,
			imgUrl: media.imgUrl || 'https://unsplash.it/200/150',
			summary: media.summary,
			collaborate: collaborateValue
		};
		console.log('newMedia:', newMedia);
		this.props.handelMediaEdit(newMedia);
	}

	render() {
		return (
			<div className="content-wrap">
				<ul>
					{this.props.mediaArr.map(media => (
						<li
							key={media.id}
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
								{media.name}
							</h2>
							{media.collaborate ? (
								<button
									className="button-delete"
									onClick={() => this.onSubmit(media, false)}
								>
									取消合作
								</button>
							) : (
								<button
									className="button-edit"
									onClick={() => this.onSubmit(media, true)}
								>
									建立合作
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
export default Collaborate;
