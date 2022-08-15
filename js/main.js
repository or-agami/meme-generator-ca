'use strict'

function onInit() {
    initI18nService()
    initGalleryController()
    initSavedService()
    const userLang = getLang()
    if (userLang === 'he') transDocument()
}

function onSetLang(lang) {
    document.body.classList = lang
    setLang(lang)
    transDocument()
}

function onToggleNav() {
    toggleMainNav()
}

function onCloseNav() {
    toggleMainNav()
}

function onGoToGallery() {
    const elSavedWindow = document.querySelector('.main-saved-gallery')
    elSavedWindow.classList.add('hidden')
    setTimeout(() => elSavedWindow.classList.add('inactive'), 600)
    hideEditorWindow()
    goToGallery()
}

function onGoToSaved() {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
    hideEditorWindow()
    goToSaved()
}

function hideEditorWindow() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.classList.add('hidden')
    setTimeout(() => elEditorWindow.classList.add('inactive'), 600)
}

function toggleMainNav() {
    const elOpenNavBtn = document.querySelector('.open-nav-btn')
    const elMainNav = document.querySelector('.main-nav')

    elOpenNavBtn.classList.toggle('is-open')
    elMainNav.classList.toggle('main-nav-open')
    document.body.classList.toggle('main-nav-open')
}