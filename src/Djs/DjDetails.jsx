import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"



const DjDetails = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
dispatch({type: 'FETCH_DJ_DETAIL', payload: id})
    }, [dispatch, id])
    const djDetails = useSelector(store => store.djDetails)


    return (
        <>
        {JSON.stringify(djDetails)}
        </>
    )

}

export default DjDetails