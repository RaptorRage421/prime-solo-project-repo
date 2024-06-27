import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"


const CreateEvent = () => {
    const dispatch = useDispatch()
    const genreList = useSelector(store => store.genreReducer)
    const [newEvent, setNewEvent] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([]);
useEffect(() => {
    dispatch({type: 'FETCH_GENRES'})
},[dispatch])

    const handleGenreChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedOptions);
      };

    return (
        <>
        <div>{newEvent}</div>
        <div>{location}</div>
        <div>{date}</div>
        <div>{startTime}</div>
        <form>
        <input
        type='text'
        placeholder='Event Name'
        value={newEvent}
        onChange={(event) => setNewEvent(event.target.value)}
        />
        <input 
        type='text'
        placeholder="Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        />
        <input 
        type="date"
        placeholder="Date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        />
        <input 
        type="time"
        placeholder="Start Time"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
        />
        <input 
        type="time"
        placeholder="End Time"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
        />
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
        </div>
        
        </form>
        </>
    )

}

export default CreateEvent