import Axios from 'axios';
import * as types from 'constants/types';

export function login(data) {
    return function (dispatch) {
        const url = `/rest/auth/login`;
        const result = Axios.post(url, data);
        result.then((response) => {
            console.log(response);
            dispatch({
                type: types.LOGIN,
                user: response.data
            });
        });
        return result;
    };
}

export function getUser(guid) {
    return function (dispatch) {
        const url = `/rest/user/${guid}?userFetchMask=3583`;
        const result = Axios.get(url);
        result.then((response) => {
            dispatch({
                type: types.LOGIN,
                user: response.data
            });
        });
        return result;
    }
}

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

export function getNewData() {
    return function(dispatch){
        const url = `/newData`;
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
