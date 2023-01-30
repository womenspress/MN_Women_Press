import { combineReducers } from 'redux';

const allTags = (state = [], action) => {
    if (action.type === 'SET_ALL_TAGS') return action.payload;
    return state;
}


const tagReducer = combineReducers({
    allTags
})

export default tagReducer