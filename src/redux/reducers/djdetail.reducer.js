const djDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DJ_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };

  export default djDetails