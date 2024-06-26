import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const DjsList = () => {
const dispatch = useDispatch()
useEffect(() => 
    dispatch({type: 'FETCH_DJS'}),
[])
const djList = useSelector(store => store.djReducer)

    return (

        <>
        
        </>

    )

}

export default DjsList