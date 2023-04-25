import {Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import SongView from './components/SongView'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
					setMessage(search)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={
						<Fragment>
							{message}
							<SearchContext.Provider value={handleSearch}>
								<SearchBar />
							</SearchContext.Provider>
							<DataContext.Provider value={data}>
								<Gallery />
							</DataContext.Provider>
						</Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
					<Route path="/song/:id" element={<SongView />} />
				</Routes>
			</Router>
		</div>
  	);
}

export default App;
