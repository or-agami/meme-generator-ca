'use strict'

function onInit() {
    initI18nService()
    InitGalleryController()
    initSavedService()
    const userLang = getLang()
    if (userLang === 'he') transDocument()
}

function onSetLang(lang) {
    document.body.classList = lang
    setLang(lang)
    transDocument()
}

function toggleNav(elOpenNavBtn) {
    const elMainNav = document.querySelector('.main-nav')
    elMainNav.setAttribute('onclick', 'closeNav()')
    elMainNav.classList.toggle('main-nav-open')
    elOpenNavBtn.classList.toggle('is-open')
    document.body.classList.toggle('main-nav-open')
}

function closeNav() {
    const elOpenNavBtn = document.querySelector('.open-nav-btn')
    const elMainNav = document.querySelector('.main-nav')
    elMainNav.removeAttribute('onclick')
    elMainNav.classList.remove('main-nav-open')
    elOpenNavBtn.classList.remove('is-open')
    document.body.classList.remove('main-nav-open')
}

function onGoToGallery() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.classList.add('hidden')
    const elSavedWindow = document.querySelector('.main-saved-gallery')
    elSavedWindow.classList.add('hidden')
    setTimeout(() => elEditorWindow.classList.add('inactive'), 600)
    setTimeout(() => elSavedWindow.classList.add('inactive'), 600)

    goToGallery()
}

function onGoToSaved() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.classList.add('hidden')
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elEditorWindow.classList.add('inactive'), 600)
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)

    goToSaved()
}