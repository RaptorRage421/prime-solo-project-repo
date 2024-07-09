const galleryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PHOTOS':
        return action.payload
      case 'CLEAR_PHOTOS':
        return state = []
      default:
        return state
    }
  }

  export default galleryReducer