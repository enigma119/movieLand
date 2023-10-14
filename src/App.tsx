import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from  './search.svg'
import MovieCard from './MovieCard'
import { IMovieType } from './types';


const API_URL = import.meta.env.VITE_API_URL

const App = () => {

  const [movies, setMovies] = useState<IMovieType[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const searchMovies = async (title: string) => {
    const res = await fetch(`${API_URL}&s=${title}}`)
    const data = await res.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Batman')
  }, [])

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input type='text' placeholder='Search fro movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt="search"  onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies.length > 0 ? (
          <div className='container'>
            {
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID}/>
              ))
            }
          </div>
        ) :
        (
          <p className='message'>No movies found</p>
        )
      }


    </div>
  )
}

export default App