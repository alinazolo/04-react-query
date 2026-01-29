import './App.css'
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {fetchMovies} from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';


export default function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
//Modal
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


const handleSearch = async (query : string) => {
try {
 setIsError(false); 
setIsLoading(true);
const newMovies = await fetchMovies(query);

if (!newMovies.length) {
  setMovies([]);
  toast.error("No movies found for your request.")
    return;
}

setMovies(newMovies);
console.log(newMovies);
} catch {
setIsError(true);
} finally {
setIsLoading(false);
} 
};

  return (
     <>
     <Toaster/>
     <SearchBar onSubmit={handleSearch}/>
     {isLoading && <Loader/>}
     {isError && <ErrorMessage/>}
     {movies.length > 0 && <MovieGrid onSelect={setSelectedMovie} movies={movies} />}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
     </>  
  );
}
