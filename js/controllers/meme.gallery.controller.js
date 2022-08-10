'use strict'

function onInit() {
    renderMemes()
}

function renderMemes() {
    const memesImgs = getMemesForDisplay()
    const elMemeGallery = document.querySelector('.meme-gallery')
    const strHTMLs = memesImgs.map(img =>
        `<section onclick="onChooseMeme('${img.id}')" class="meme-card">
        <img src="assets/img/${img.id}.jpg" alt="${img.keywords[0]}" class="meme-image">
        </section>`
    )
    elMemeGallery.innerHTML = strHTMLs.join('')
}