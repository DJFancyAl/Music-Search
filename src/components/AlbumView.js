import {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function AlbumView() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [albumData, setAlbumData] = useState([])
    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button> | <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    const renderSongs = justSongs.map((song, index) => {
        return (
            <div key={index}>
                <p><Link to={`/song/${song.trackId}`}>{song.trackName}</Link></p>
            </div>
        )
    })

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    return (
        <div>
            {albumData.length > 0 ? <><h2>{albumData[0].collectionName}</h2><h3><Link to={`/artist/${albumData[0].artistId}`}>{albumData[0].artistName}</Link></h3></> : <h2>Loading...</h2>}
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView
