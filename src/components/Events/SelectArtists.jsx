import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const SelectArtists = () => {
    const newEvent = useSelector(store => store.createReducer);
    const djList = useSelector(store => store.djListReducer);
    const suggestedDJs = useSelector(store => store.selectionReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ALL_DJS'})
        if (newEvent.genres && newEvent.genres.length > 0) {
            dispatch({ type: 'FETCH_DJS_BY_GENRES', payload: newEvent.genres });
        }
    }, [dispatch, newEvent.genres]);

    return (
        <div>
            <h2>Select Artists for Event: {newEvent.name}</h2>
            <ul>
                {suggestedDJs.map((dj) => (
                    <li key={dj.dj_id}>
                        {dj.dj_stage_name} - {dj.dj_genres.join(', ')}
                    </li>
                ))}
            </ul>
            All DJs:
            <ul>
                {djList.map((dj) => (
                    <li key={dj.dj_id}>
                        {dj.dj_stage_name} - {dj.dj_genres.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectArtists;
