import { createStore , applyMiddleware, compose} from "redux";
import rootReducer from "../redux/modules";
import middlewares from "../redux/middlewares";

let composeEnhancers = compose;

if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default (initialState = {}) => {
    const store = createStore(rootReducer, initialState, enhancer);

    if (__DEV__ && module.hot){
        module.hot.accept("../redux/modules", (module) => {
            store.replaceReducer(module.default);
        });
    }

    return store;
};