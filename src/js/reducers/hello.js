const defaultState = {
    message: "Hello World!",
    people: []
};

export default function(state = defaultState, action = {}){
    switch(action.type){
        case "PEOPLE":
            return Object.assign({}, state, {
                people: action.people
            });
        case "HELLO":
            return Object.assign({}, state, {
                message: action.message
            });
        default:
            return state;
    }
}
