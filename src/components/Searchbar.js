// SeachBar.js
import { useState, useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function SeachBar(props) {
    let [searchTerm, setSearchTerm] = useState('')
    const handleSearch = useContext(SearchContext)

    return (
        <form onSubmit={(e) => handleSearch(e, searchTerm)}>

            <input type="text" placeholder="Enter a search term here" onChange={
                (e) => setSearchTerm(e.target.value)
            }/>

            <input type="submit" />

        </form>
    )
}

export default SeachBar