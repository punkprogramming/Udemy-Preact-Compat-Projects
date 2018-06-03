import {NEW_SONG} from "../actions";

import {
    jamSong, chillSong,
    initialSongsList as initialState
} from "../data/song-data";

export default (state = initialState, action) => {
    switch(action.type) {
        case NEW_SONG:
            const song = action.instructions;
            const {songName, songImgUrl, songType, songLyrics} = song;
            return [
                ...state,
                {
                    name: songName,
                    img: songImgUrl,
                    type: songType,
                    url: (songType === "Jam" ? jamSong : chillSong),
                    lyrics: songLyrics
                }
            ];
        default: return state;
    }
}