import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const DjsList = () => {
const dispatch = useDispatch()
useEffect(() => 
    {dispatch({type: 'FETCH_DJS'})},
[dispatch])
const djList = useSelector(store => store.djReducer)

    return (

        <table>
            <thead>
                <tr>
                    <td>

                    </td>
                    <td>
                        DJ Name
                    </td>
                    <td>
                        Genres
                    </td>
                    <td>
                        Confirmed Events
                    </td>
                </tr>
            </thead>
            <tbody>
        {djList.map((djs, i) => (
            <tr key={`${djs.id}-${i}`} >
                <td>
                 <img src={djs.dj_avatar_image}/>  
                </td>
                <td>
                {djs.dj_stage_name}
                </td>
                <td>
                {Array.isArray(djs.dj_genres) && djs.dj_genres.map((genre, index) => (
                                    <span key={index}>{genre}{index !== djs.dj_genres.length - 1 ? ', ' : ''}</span>
                                ))}
                </td>
                <td>
                {Array.isArray(djs.confirmed_events) && djs.confirmed_events.map((confirmedevent, index) => (
                                    <div key={index}>{confirmedevent}{index !== djs.confirmed_events.length - 1 ? ', ' : ''}</div>
                                ))}
                </td>
                </tr>
        ))}
        </tbody>
        </table>

    )

}

export default DjsList