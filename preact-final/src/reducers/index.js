import {combineReducers} from "redux";

import SongsReducer from "./songs-reducer";

export default combineReducers({
    songs: SongsReducer
});