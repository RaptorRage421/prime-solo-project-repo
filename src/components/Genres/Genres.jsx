import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const Genres = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, [dispatch]);
  const [newGenre, setNewGenre] = useState('')
  const genreList = useSelector(store => store.genreReducer);

  const addNewGenre = (event) => {
    dispatch({ type: 'ADD_NEW_GENRE', payload: {genre_name: newGenre}})
    setNewGenre('')
  }

  return (
    <div className="center">
      <form onSubmit={addNewGenre}>

<input
type="text"
value={newGenre}
onChange={(event) => setNewGenre(event.target.value)}

/>
<button type="submit">Submit</button>

</form>
      {genreList.map((genre) => (
        <div key={genre.id}>{genre.genre_name}</div>
      ))}

  {newGenre}
    </div>
  );
}

export default Genres;
