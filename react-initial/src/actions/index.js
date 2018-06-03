export const NEW_SONG = "newsong";

export const createNewSong = (songObj) => {
    return {
        type: NEW_SONG,
        instructions: songObj
    }
}