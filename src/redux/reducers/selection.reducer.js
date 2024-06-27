const selectionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DJS_BY_GENRES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default selectionReducer;