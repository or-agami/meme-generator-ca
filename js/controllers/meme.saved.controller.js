'use strict'


function initSavedController() {
    initSavedService()
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemesForDisplay()
    const elMemeGallery = document.querySelector('.saved-gallery')
    const strHTMLs = savedMemes.map(meme =>
        `<img onclick="onMemeSelect('${meme.selectedImgId}', '${meme.id}')" class="meme-card" src="${meme.imgSrc}" class="meme-image">`
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}


function onMemeSelect(memeImgId, memeId) {
    const elGalleryWindow = document.querySelector('.main-saved-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
    loadSavedMeme(memeId)
    goToEditor(memeImgId, false)
}

function goToSaved() {
    console.log('goToSaved');
    const elGalleryWindow = document.querySelector('.main-saved-gallery')
    elGalleryWindow.classList.remove('inactive')
    setTimeout(() => elGalleryWindow.classList.remove('hidden'), 100)
    initSavedController()
}