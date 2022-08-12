'use strict'

function InitGalleryController() {
    renderMemes()
}

function renderMemes() {
    const memesImgs = getImgForDisplay()
    const elMemeGallery = document.querySelector('.meme-gallery')
    const strHTMLs = memesImgs.map(img =>
        `<img onclick="onImgSelect(${img.id})" class="meme-card ${img.size}" src="assets/img/${img.id}.jpg" alt="${img.keywords[0]}" class="meme-image">`
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(memeId) {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
    goToEditor(memeId)
}

function goToGallery() {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.remove('inactive')
    setTimeout(() => elGalleryWindow.classList.remove('hidden'), 100)
}