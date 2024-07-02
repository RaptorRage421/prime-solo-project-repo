import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SelectGenres from "../components/SelectGenres/SelectGenres";
import "./DjsList.css";

const DjsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DJS" });
  }, [dispatch]);

  const djList = useSelector((store) => store.djListReducer)
  const user = useSelector((store) => store.user)
  const isCurrentUser = (djId) => djId === user.id

  const handleDeleteGenre = (userId, genreId) => {
    console.log("Deleting genre:", genreId)
    dispatch({ type: "DELETE_GENRE", payload: { userId, genreId } })
  };
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>DJ Name</th>
            <th>Genres</th>
            <th>Confirmed Events</th>
          </tr>
        </thead>
        <tbody>
          {djList.map((dj, i) => (
            <tr key={`${dj.dj_id}-${i}`}>
              <td className="avatar-column">
                <img
                  src={dj.dj_avatar_image}
                  alt={`${dj.dj_stage_name}'s avatar`}
                  className="avatar"
                />
              </td>
              <td className="name-column"><Link to={`/dj/${dj.dj_id}`} className='dj_link'>{dj.dj_stage_name}</Link></td>
              <td className="genres-column">
                {isCurrentUser(dj.dj_id) && dj.dj_genres[0].id === null ? (
                  <SelectGenres />
                ) : (
                  Array.isArray(dj.dj_genres) && dj.dj_genres.map((genre, index) => (
                    <Stack
                      direction="row"
                      spacing={3}
                      key={index}
                      sx={{display: 'inline' }}
                    >
                      {isCurrentUser(dj.dj_id) ? (
                        <Chip
                          label={genre.genre_name}
                          onDelete={() => handleDeleteGenre(dj.dj_id, genre.id)}
                          size="small"
                          variant="outlined"
                          sx={{ color: "black"}}
                        />
                      ) : (
                        <Chip 
                        label={genre.genre_name} 
                        size="small"
                        variant="outlined"
                          sx={{ color: "black"}}
                        />
                      )}
                    </Stack>
                  ))
                )}
              </td>
              <td className="events-column">
                {Array.isArray(dj.confirmed_events) &&
                  dj.confirmed_events.map((confirmedevent, index) => (
                    <div key={index} className="confirmed_events_dj">
                   <strong>{confirmedevent.event_name}</strong> &nbsp;&nbsp;&nbsp; {formatDate(confirmedevent.event_date)}
                      
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DjsList;
