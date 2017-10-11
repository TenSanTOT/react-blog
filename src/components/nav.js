import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = props => {
	return (
		<nav className="nav-bar">
			<NavLink exact to="/" onClick={props.resetSearch}>
				内容
			</NavLink>
			<NavLink to="/manage">内容管理</NavLink>
			<NavLink to="/addpost">添加文章</NavLink>
			<NavLink to="/medialist">媒体</NavLink>
			<NavLink to="/managemedia">媒体管理</NavLink>
			<NavLink to="/addmedia">添加媒体</NavLink>
			<NavLink to="/managecollaborate">合作管理</NavLink>
		</nav>
	);
};
