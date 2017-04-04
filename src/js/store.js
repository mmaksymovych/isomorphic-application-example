import { createStore, compose, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducers from 'reducers';

let middlewares = [applyMiddleware(Thunk)];

if(process.env.NODE_ENV !== 'production') {
    if (window.devToolsExtension) {
        middlewares.push(window.devToolsExtension());
    }
}

export default function configureStore(initialState) {

    return compose(...middlewares) (createStore)(reducers, initialState);

}
