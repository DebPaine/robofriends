import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchField } from '../actions';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css';

function App () {
	const searchField = useSelector((state) => state.searchRobots.searchField);
	const dispatch = useDispatch();

	const [ robots, setRobots ] = useState([]);
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setRobots(users));
	});

	const filteredRobots = robots.filter((item) => {
		return item.name.toLowerCase().includes(searchField.toLowerCase());
	});

	const onSearchChange = (e) => {
		dispatch(setSearchField(e.target.value));
	};

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

export default App;
