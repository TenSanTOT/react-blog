import React from 'react';
import { MediaItem } from './media-item';

export const MediaList = props => {
	return (
		<ul style={{ display: 'flex', flexWrap: 'wrap' }}>
			{props.mediaArr.map(item => <MediaItem key={item.id} item={item} />)}
		</ul>
	);
};
