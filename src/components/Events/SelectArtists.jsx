import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const SelectArtists = () => {
    const newEvent = useSelector(store => store.createReducer)
    const djList = useSelector(store => store.djListReducer)
newEvent.genres.map((genre) => {
    
})
        return (
            <>
            {newEvent.name}
            </>
        )

}
export default SelectArtists