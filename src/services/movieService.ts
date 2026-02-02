import axios from 'axios';

import type { Movie } from "../types/movie";
 
interface MovieHttpResponse {
    results: Movie[];
    nbPages: number;
}

export const fetchMovies = async(query: string, page: number): Promise<Movie[]> => {
const { data } = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
        page,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
);
return data.results;
};
