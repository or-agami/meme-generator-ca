'use strict'

function onInit() {
    renderMemes()
}

function renderMemes() {
    const memesImgs = getMemesForDisplay()
    const elMemeGallery = document.querySelector('.meme-gallery')
    const strHTMLs = memesImgs.map(img =>
        `
          <section onclick="onGoToEditor(${img.id})" class="meme-card">
            <img src="assets/img/${img.id}.jpg" alt="${img.keywords[0]}" class="meme-image">
          </section>
        `
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}

// function onChooseMeme(memeId) {
//     const imgUrl = getMemeUrl(memeId)
//     goToEditor(imgUrl)
// }

function onGoToEditor(memeId) {
    console.log('onGoToEditor');
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.hidden = true
    const imgUrl = getMemeUrl(memeId)
    goToEditor(imgUrl)
}

function goToGallery() {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.hidden = false
    console.log('goToGallery');
}