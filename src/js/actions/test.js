import Axios from 'axios';

export function getPeople() {
    return function(dispatch){
        const url = 'http://localhost:3000/test';
        const result = Axios.get(url);
        result.then(function(response){
            dispatch({
                type: 'PEOPLE',
                people: response.data
            });
        });
        return result;
    };
}


export function changeMessage(message) {
    return {
        type: "HELLO",
        message: message
    };
}
