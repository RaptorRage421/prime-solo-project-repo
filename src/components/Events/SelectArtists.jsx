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

    const addToEvent = (dj) => {
        dispatch({ type: 'ADD_DJ_TO_EVENT', payload: dj })
    }

    const createEvent = () => {
        dispatch({ type: 'CREATE_EVENT', payload: newEvent });
    }

    return (
        <div>
            <h2>Select Artists for Event: {newEvent.name}</h2>
            <div>
                {suggestedDJs.map((dj) => (
                    <div key={dj.dj_id}>
                        <span><img className="suggested" src={dj.dj_avatar_image} alt="DJ Avatar"/></span>
                        {dj.dj_stage_name} - {dj.dj_genres.join(', ')}
                        <button onClick={() => addToEvent(dj)}>✅</button>
                    </div>
                ))}
            </div>
            All DJs:
            <div>
                {djList.map((dj) => (
                    <div key={dj.dj_id}>
                        {dj.dj_stage_name} - {dj.dj_genres.join(', ')}
                        <button onClick={() => addToEvent(dj)}>✅</button>
                    </div>
                ))}
            </div>
            <button onClick={createEvent}>Create Event</button>
        </div>
    );
};

export default SelectArtists;
