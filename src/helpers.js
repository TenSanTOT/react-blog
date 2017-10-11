const postsUrl = 'http://localhost:8080/posts';
const mediaUrl = 'http://localhost:8080/media';

export const loadPosts = () => {
	return fetch(postsUrl).then(res => res.json());
};
export const loadMedia = () => {
	return fetch(mediaUrl).then(res => res.json());
};

export const filterd = (posts, keyword) => {
	return posts.filter(item => {
		return item.title.match(keyword);
	});
};

export const filterdByMedia = (posts, keyword) => {
	console.log('the posts:', posts);
	return posts.filter(item => {
		return item.media.match(keyword);
	});
};

export const getDate = () => {
	let d = new Date(),
		str = '';
	str += d.getFullYear() + '年';
	str += d.getMonth() + 1 + '月';
	str += d.getDate() + '日 ';
	str += d.getHours() + ':';
	str += d.getMinutes();
	return str;
};

export const removePost = id => {
	return fetch(`${postsUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
};
export const removeMedia = id => {
	return fetch(`${mediaUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
};

export const updatePost = post => {
	return fetch(`${postsUrl}/${post.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}).then(res => res.json());
};

export const updateMedia = item => {
	return fetch(`${mediaUrl}/${item.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	}).then(res => res.json());
};

export const createPost = post => {
	return fetch(postsUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}).then(res => res.json());
};
export const createMedia = item => {
	return fetch(mediaUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	}).then(res => res.json());
};
