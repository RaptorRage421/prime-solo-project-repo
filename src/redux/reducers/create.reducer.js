const createReducer = (state = { djs: [] }, action) => {
    switch (action.type) {
        case 'CREATE_NEW_EVENT':
            return { ...state, ...action.payload }
        case 'ADD_DJ_TO_EVENT':
            return { ...state, djs: [...state.djs, action.payload] }
        default:
            return state
    }
}

export default createReducer