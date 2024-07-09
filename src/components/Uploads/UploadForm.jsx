import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Header/Header';


const UploadForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const history = useHistory()

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const submitPhotos = (event) => {
        event.preventDefault();
        dispatch({ type: 'UPLOAD_IMAGES', payload: selectedFiles })
        history.push(`/dj/${user.id}`)
        dispatch({ type: 'FETCH_UPLOADS' })
    };

    return (
        <>

            <Header />
            <Header />
            <div className='center'>
                <h1>Uploads</h1>
                <div className='center formPanel'>
                    <form onSubmit={submitPhotos}>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        <Button sx={{
                            border: '3px outset black',
                            borderRadius: '.7em',
                            fontSize: '20px',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#274d9eeb',
                                color: 'white'
                            }
                        }} type="submit">Upload</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UploadForm;
