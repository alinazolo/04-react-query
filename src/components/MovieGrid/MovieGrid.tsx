import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
results: Movie[];
onSelect: (movie: Movie) => void;
}

export default function MovieGrid({onSelect, results}:MovieGridProps) {
  return (
    <ul className={css.grid}>
 {/* Набір елементів списку з фільмами */}
        {results.map((movie) => (
            <li key={movie.id}>
        <div className={css.card}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            onClick={() => onSelect(movie)}
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div>
      </li> ))}
    </ul>
  );
}
