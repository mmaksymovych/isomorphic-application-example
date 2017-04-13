import Axios from 'axios';
import * as types from 'constants/types';

export function login(data) {
    return function (dispatch) {
        const url = `/services/rest/auth/login`;
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

export function getUser(guid, cookie) {
    return function (dispatch) {
        const url = `/services/rest/user/${guid}?userFetchMask=3583`;
        const result = Axios.get(url, {
            headers: {
                cookie: cookie
            }
        });
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
    return function (dispatch) {
        const url = `/services/data`;
        const result = Axios.get(url);
        result.then(function (response) {
            dispatch({
                type: types.GET_DATA,
                data: response.data
            });
        });
        return result;
    }
}
