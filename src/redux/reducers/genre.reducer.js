const genreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GENRES':
        return action.payload;
      default:
        return state;
    }
  }

  export default genreReducer

