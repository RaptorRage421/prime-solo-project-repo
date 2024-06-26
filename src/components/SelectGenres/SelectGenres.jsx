import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SelectGenres = () => {
  const genreList = useSelector((store) => store.genreReducer);
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, [dispatch]);

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedOptions);
  };

const submitGenres = () => {
    dispatch({type: 'SEND_GENRES', payload: { userId: user.id, genres: selectedGenres}})
}

  return (
    <div>
      <label htmlFor="genres">Select Genres:</label>
      <select
        id="genres"
        multiple
        value={selectedGenres}
        onChange={handleGenreChange}
      >
        {genreList.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.genre_name}
          </option>
        ))}
      </select>
      <button onClick={() => submitGenres(user.id)}>Submit</button>
    </div>
  );
};

export default SelectGenres;