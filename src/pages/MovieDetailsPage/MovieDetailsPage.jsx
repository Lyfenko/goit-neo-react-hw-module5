import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../api/tmdbAPI';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const query = location.state?.query ?? '';

  useEffect(() => {
    getMovieDetails(movieId).then(data => setMovie(data));
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={`/movies?query=${query}`} className={styles.backLink}>
        Go back
      </Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className={styles.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: location.state?.from, query }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location.state?.from, query }}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
