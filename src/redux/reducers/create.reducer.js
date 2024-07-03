const createReducer = (state = { djs: [] }, action) => {
    switch (action.type) {
        case 'CREATE_NEW_EVENT':
            return { ...state, ...action.payload }
        case 'ADD_DJ_TO_EVENT':
            return { ...state, djs: [...state.djs, action.payload] }
        case 'REMOVE_DJ_FROM_EVENT':
            return { ...state, djs: state.djs.filter(dj => dj.dj_id !== action.payload.dj_id) }
        case 'CLEAR_STORE':
            return state = { djs: [] }
        default:
            return state
    }
}

export default createReducer