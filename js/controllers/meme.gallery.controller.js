'use strict'

function onInit() {
    renderMemes()
}

function renderMemes() {
    const memesImgs = getMemesForDisplay()
    const elMemeGallery = document.querySelector('.meme-gallery')
    const strHTMLs = memesImgs.map(img =>
        `
          <section onclick="onImgSelect(${img.id})" class="meme-card">
            <img src="assets/img/${img.id}.jpg" alt="${img.keywords[0]}" class="meme-image">
          </section>
        `
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(memeId) {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.hidden = true
    goToEditor(memeId)
}

function goToGallery() {
    console.log('goToGallery');
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.hidden = false
}