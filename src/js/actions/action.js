import Axios from 'axios';
import * as types from 'constants/types';
import * as constants from 'constants/common';

//const localhost = `${constants.HOST.LOCAL}:${constants.PORT.LOCAL}`;
const production = `${constants.HOST.PROD}`;

const host = production;

export function getData() {
    return function(dispatch){
        const url = `${host}/data`;
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
        const url = `${host}/newData`;
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
