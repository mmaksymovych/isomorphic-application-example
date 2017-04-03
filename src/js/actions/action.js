import Axios from 'axios';
import * as types from 'constants/types';

export function getData() {
    return function(dispatch){
        const url = 'http://104.131.119.140/data';
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

export function getNewData() {
    return function(dispatch){
        const url = 'http://104.131.119.140/newData';
        const result = Axios.get(url);
        result.then(function(response){
            dispatch({
                type: types.GET_NEW_DATA,
                data: response.data
            });
        });
        return result;
    };
}
