import React from 'react';
import { FeedItem } from './feedItem';

export const Feeds = props => {
	return (
		<ul>{props.posts.map(post => <FeedItem {...post} key={post.id} />)}</ul>
	);
};
