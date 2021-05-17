import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import moviesReducer from "./moviesReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  moviesReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
