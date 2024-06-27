const createReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_NEW_EVENT':
            return action.payload
        default:
            return state
    }
}

export default createReducer