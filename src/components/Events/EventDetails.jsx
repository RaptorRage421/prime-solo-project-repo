import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

const EventDetails = () => {
const dispatch = useDispatch()
const {id} = useParams()

useEffect(() => {
    dispatch({type: 'FETCH_EVENT_DETAILS', payload: id})
}, [dispatch, id])
const eventDetails = useSelector(store => store.eventDetails)
    return (
        <>
        {JSON.stringify(eventDetails)}
        </>
    )

}

export default EventDetails