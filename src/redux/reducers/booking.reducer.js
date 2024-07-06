const bookingReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BOOKINGS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default bookingReducer;