import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField } from '../actions';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css';

const mapStateToProps = (state) => ({
	searchField: state.searchField
});
// To send action to the reducer, we use dispatch
const mapDispatchToProps = (dispatch) => ({
	onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			robots: []
		};
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => this.setState({ robots: users }));
	}

	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
		const filteredRobots = robots.filter((item) => {
			return item.name.toLowerCase().includes(searchField.toLowerCase());
		});
		return !robots.length ? (
			<h1>Loading</h1>
		) : (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

// what state and action respectively should the App listen to from store
export default connect(mapStateToProps, mapDispatchToProps)(App);
