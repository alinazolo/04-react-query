import './App.css'
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {fetchMovies} from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';


export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading, isError} =  useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, 1),
    enabled: query.trim().length > 0,
  });
  const handleSearch = (newQuery: string) => {
setQuery(newQuery)
  }
// const [movies, setMovies] = useState<Movie[]>([]);
// const [isLoading, setIsLoading] = useState(false);
// const [isError, setIsError] = useState(false);
//Modal
// const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


// const handleSearch = async (query : string) => {
// try {
//  setIsError(false); 
// setIsLoading(true);
// const newMovies = await fetchMovies(query);

// if (!newMovies.length) {
//   setMovies([]);
//   toast.error("No movies found for your request.")
//     return;
// }

// setMovies(newMovies);
// console.log(newMovies);
// } catch {
// setIsError(true);
// } finally {
// setIsLoading(false);
// } 
// };

  return (
     <>
     <Toaster/>
     <SearchBar onSubmit={handleSearch}/>
     {isLoading && <Loader/>}
     {isError && <ErrorMessage/>}
     {data && data.results > 0 && <MovieGrid movies={data.results}/>}
     {/* {movies.length > 0 && <MovieGrid onSelect={setSelectedMovie} movies={movies} />}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />} */}
     </>  
  );
}
