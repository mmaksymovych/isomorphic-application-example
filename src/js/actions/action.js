import Axios from 'axios';
import * as types from 'constants/types';

export function getData() {
    return function(dispatch){
        const url = `/data`;
        const result = Axios.get(url);
        result.then(function(response){
            dispatch({
                type: types.GET_DATA,
                data: response.data
            });
        });
        return result;
    };
}
