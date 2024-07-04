import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Button, Box } from "@mui/material";

const SelectGenres = ({ djId, handleSubmittedGenres }) => {
  const genreList = useSelector((store) => store.genreReducer);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, [dispatch,]);

  const handleGenreChange = (event) => {
    const selectedOptions = event.target.value;
    setSelectedGenres(selectedOptions);
  };

  const submitGenres = () => {
    console.log("IN SUBMIT GENRES", user.id, selectedGenres)
    const userId = user.role === 2 ? djId : user.id
    dispatch({ type: "SEND_GENRES", payload: { userId, genres: selectedGenres } })
    dispatch({ type: "FETCH_DJS" })
    handleSubmittedGenres()
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl variant="outlined" sx={{
        width: '50%',
        marginRight: '10px',
        '& .MuiInputLabel-root': {
          color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'white',
        },
      }}>
        <InputLabel
          sx={{ color: 'white' }}
          id="genres-label" >Select Genres</InputLabel>
        <Select
          labelId="genres-label"
          id="genres"
          multiple
          sx={{
            color: 'white',
            borderRadius: '1em',
            width: '100%',
            height: 'auto',
            '& .MuiInputBase-root': {
              color: 'white'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&:focus .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '& .MuiSelect-multiple': {
              display: 'flex',
              flexWrap: 'wrap',
              height: 'auto',
              padding: '8.5px 14px',
              overflow: 'hidden'
            }
          }}
          value={selectedGenres}
          onChange={handleGenreChange}
          input={<OutlinedInput label="Select Genres" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  variant="outlined"
                  key={value}
                  label={genreList.find((genre) => genre.id === value)?.genre_name}
                  sx={{ color: 'white', backgroundColor: '#1b2961', height: '30px', fontSize: '18px' }}
                />
              ))}
            </Box>
          )}
        >
          {genreList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant='outlined' sx={{ color: 'white', borderColor: 'white' }} onClick={submitGenres}>Submit</Button>
    </div>
  );
};

export default SelectGenres;
