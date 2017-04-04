import * as types from 'constants/types';

const defaultState = {
    message: "Isomorphic application example",
    data: []
};

export default function(state = defaultState, action = {}){
    switch(action.type){
        case types.GET_DATA:
            return Object.assign({}, state, {
                data: action.data
            });
        case types.GET_NEW_DATA:
            return Object.assign({}, state, {
                data: action.data
            });
        default:
            return state;
    }
}
