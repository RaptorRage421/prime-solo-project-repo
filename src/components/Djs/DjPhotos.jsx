import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ImageList, ImageListItem, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DjPhotos = ({ isOpen, handleClose }) => {
    const photos = useSelector(store => store.galleryReducer)

    return (
        <>
            <Dialog
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '1em',
                        backgroundColor: '#1b2961',
                        boxShadow: '0px 0px 20px black',
                        border: '3px outset black'
                    }
                }}
                open={isOpen} onClose={handleClose} maxWidth="md" fullWidth
            >

                <DialogTitle
                    sx={{
                        color: 'white',
                        fontSize: '30px'
                    }}
                >Photo Gallery</DialogTitle>
                <DialogContent>
                    <ImageList

                        cols={4} gap={2}>
                        {photos.map((photo, index) => (
                            <ImageListItem
                                sx={{
                                    border: '2px outset black'
                                }}
                                key={index}>
                                <img
                                    src={photo.photo_url}
                                    alt={`Photo ${index}`}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        border: '3px outset black',
                        borderRadius: '.7em',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#274d9eeb',
                            color: 'white'
                        }
                    }} onClick={handleClose} >Close</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default DjPhotos;
