const eventDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EVENT_DETAILS':
        return action.payload;
      case 'CLEAR_EVENT_DETAILS':
        return state = {}
      default:
        return state;
    }
  };

  export default eventDetails