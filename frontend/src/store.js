import { createStore } from "redux";
import { loadState, saveState } from "./localstorage";
import combineReducers from "./reducers";

export default function configureStore() {
  //call loadState function from localstorage.js to pass to createStore. This will update the redux state automatically from local storahe.
  const persistedState = loadState();
  const store = createStore(
    combineReducers,
    persistedState,
    // initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  //store.subscribe() uses getState function and passes it to saveState function in localStorage.js to be saved in to the local storage.
  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
}
