'use strict'

const MEME_STORAGE_KEY = 'memeDB'

var gSavedMemes = []


function initSavedService() {
    getSavedMemes()
}

function getSavedMemesForDisplay() {
    return gSavedMemes
}

function getSavedMemes() {

    let memes = _loadMemesFromStorage()
    if (!memes || !memes.length) return
    else gSavedMemes = memes

    _saveMemesToStorage()
}

function setSavedMeme(meme) {
    gSavedMemes.push(meme)
    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(MEME_STORAGE_KEY, gSavedMemes)
}

function _loadMemesFromStorage() {
    return loadFromStorage(MEME_STORAGE_KEY)
}