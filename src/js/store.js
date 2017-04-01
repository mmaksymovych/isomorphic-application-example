import { createStore, compose } from 'redux';
import reducers from 'reducers';

let middlewares = [];

if (window.devToolsExtension) {
    middlewares.push(window.devToolsExtension());
}

export default function configureStore(initialState) {

    return compose(...middlewares) (createStore)(reducers, initialState);

}
