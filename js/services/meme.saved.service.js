'use strict'

const MEME_STORAGE_KEY = 'memeDB'

var gSavedMemes = []
var memeToEdit


function initSavedService() {
    getSavedMemes()
}

function getSavedMemesForDisplay() {
    return gSavedMemes
}

function getSavedMemeIdxById(memeId) {
    return gSavedMemes.findIndex(meme => meme.id === memeId)
}

function getSavedMemeById(memeId) {
    return gSavedMemes.find(meme => meme.id === memeId)
}

function getMemeToEdit() {
    return memeToEdit
}

function loadSavedMeme(memeId) {
    memeToEdit = getSavedMemeById(memeId)
}

function getSavedMemes() {

    let memes = _loadMemesFromStorage()
    if (!memes || !memes.length) return
    else gSavedMemes = memes

    _saveMemesToStorage()
}

function setSavedMeme(meme) {
    if (meme.id === undefined) {
        meme.id = makeId()
        gSavedMemes.push(meme)
    } else {
        const memeIdx = getSavedMemeIdxById(meme.id)
        gSavedMemes.splice(memeIdx, 1, meme)
    }
    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(MEME_STORAGE_KEY, gSavedMemes)
}

function _loadMemesFromStorage() {
    return loadFromStorage(MEME_STORAGE_KEY)
}