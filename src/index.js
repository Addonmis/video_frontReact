import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import App from "./App";
import routes from "./routes";

const appEl = document.querySelector("#app");
const renderApp = (Component, appRoutes) => {
    render(
        <Provider store={createStore()}>
            <Component routes={appRoutes()}/>
        </Provider>, 
        appEl
    );
};

renderApp(App, routes);

if (__DEV__ && module.hot){
    module.hot.accept("./App", () => {
        import("./App").then((module) => {
          renderApp(module.default, routes);
        });
    });
    module.hot.accept("./routes", () => {
        import("./routes").then((module) => {
          renderApp(App, module.default);
        });
    });
}