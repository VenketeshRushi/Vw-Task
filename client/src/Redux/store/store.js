import {
  combineReducers,
  applyMiddleware,
  legacy_createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { productReducer } from "../products/reducers";
import { authReducer } from "../authentication/auth.reducer";

const rootReducer = combineReducers({
  productReducer,
  authReducer,
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  createCompose(applyMiddleware(thunk))
);
