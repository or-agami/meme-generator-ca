'use strict'


function initSavedController() {
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemesForDisplay()
    const elMemeGallery = document.querySelector('.saved-gallery')
    const strHTMLs = savedMemes.map(meme =>
        `<img onclick="onMemeSelect(${meme.selectedImgId})" class="meme-card" src="assets/img/${meme.selectedImgId}.jpg" class="meme-image">`
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}


function onMemeSelect(memeId) {
    const elGalleryWindow = document.querySelector('.main-saved-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
    goToEditor(memeId)
}

function goToSaved() {
    console.log('goToSaved');
    const elGalleryWindow = document.querySelector('.main-saved-gallery')
    elGalleryWindow.classList.remove('inactive')
    setTimeout(() => elGalleryWindow.classList.remove('hidden'), 100)
}