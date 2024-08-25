import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../api/tmdbAPI';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(data => setCast(data.cast));
  }, [movieId]);

  return (
    <div className={styles.castList}>
      {cast.map(actor => (
        <div key={actor.id} className={styles.castItem}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCast;
