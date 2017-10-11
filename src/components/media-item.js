import React from 'react';
import { Link } from 'react-router-dom';

export const MediaItem = props => {
	return (
		<li className="media-item">
			<Link to={'/medialist/' + props.item.name}>
				<img
					style={{ width: '135px', height: '100px', objectFit: 'cover' }}
					src={props.item.imgUrl}
					alt={props.item.name}
				/>
				<h3>{props.item.name}</h3>
				<p style={{ fontSize: '0.8em' }}>{props.item.summary}</p>
			</Link>
		</li>
	);
};
