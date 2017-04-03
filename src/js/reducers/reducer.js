import * as types from 'constants/types';

const defaultState = {
    message: "Hello World!",
    data: []
};

export default function(state = defaultState, action = {}){
    switch(action.type){
        case types.GET_DATA:
            return Object.assign({}, state, {
                data: action.data
            });
        default:
            return state;
    }
}