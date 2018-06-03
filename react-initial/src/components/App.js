import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {persistStore, persistReducer} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import MyRoutes from "./MyRoutes";

import rootReducer from "../reducers";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["songs"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
let persistor = persistStore(store);

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MyRoutes />
            </PersistGate>
        </Provider>
    )
}

export default App;