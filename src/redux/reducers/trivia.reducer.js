const triviaReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_TRIVIA':
            return action.payload;
        default:
            return state;
    }
}

export default triviaReducer;