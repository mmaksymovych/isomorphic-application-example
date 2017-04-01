const defaultState = {
    message: "Hello World!"
};

export default function(state = defaultState, action = {}){
    switch(action.type){
        case "HELLO":
            return Object.assign({}, state, {
                message: action.message
            });
        default:
            return state;
    }
}
