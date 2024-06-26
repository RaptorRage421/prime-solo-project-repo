const djListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DJS':
        return action.payload;
      default:
        return state;
    }
  }

  export default djListReducer
