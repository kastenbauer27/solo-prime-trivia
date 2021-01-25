const studyReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_STUDY':
            return action.payload;
        default:
            return state;
    }
}

export default studyReducer;