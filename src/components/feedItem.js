import React from 'react';
import { Link } from 'react-router-dom';

export const FeedItem = props => {
	const data = Object.assign(props, {});
	// console.log(props);
	return (
		<li className="feed-item">
			<img
				src={data.imgUrl}
				alt={data.title}
				style={{ width: '250px', height: '190px', objectFit: 'cover' }}
			/>
			<div
				style={{
					padding: '20px 30px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}
			>
				<Link to={'/post/' + data.id}>
					<h2 style={{ fontSize: '1.4em', margin: '0', color: 'black' }}>
						{data.title}
					</h2>
				</Link>
				<span style={{ fontSize: '.8em', color: '#93a3b1', flexBasis: '50%' }}>
					{data.summary.substring(0, 40) + '...'}
				</span>
				<span style={{ fontSize: '.8em', color: '#545454' }}>
					{data.media} {data.date}
				</span>
			</div>
		</li>
	);
};
