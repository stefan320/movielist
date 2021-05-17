import rootReducer from "./moviesReducer.js";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const initStore = (initialState, options) => {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk) //Applying redux-thunk middleware
    )
  );

  return store;
};

export default initStore;
