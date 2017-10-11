import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		};
	}

	onSearch(e) {
		e.preventDefault();
		this.props.handelSearch(this.state.keyword.trim());
	}

	render() {
		return (
			<form className="search-area" onSubmit={this.onSearch.bind(this)}>
				<input
					onChange={e => this.setState({ keyword: e.target.value })}
					onBlur={this.onSearch.bind(this)}
				/>
				<button className="button-search">搜 索</button>
			</form>
		);
	}
}
export default Search;
