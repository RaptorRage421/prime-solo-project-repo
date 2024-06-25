import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Genres = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, [dispatch]);

  const genreList = useSelector(store => store.genreReducer);
  return (
    <div>
      {genreList.map((genre) => (
        <div key={genre.id}>{genre.genre_name}</div>
      ))}
    </div>
  );
}

export default Genres;
