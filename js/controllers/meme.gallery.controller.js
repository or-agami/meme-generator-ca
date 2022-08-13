'use strict'

function InitGalleryController() {
    initGalleryService()
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

function renderResults(val) {
    const res = document.getElementById("result")
    let list = ''
    let terms = autocompleteMatch(val)
    res.innerHTML = ''
    for (let i = 0; i < terms.length; i++) {
        list += `<li onclick="onSelectFilter('${terms[i]}')">${terms[i]}</li>`;
    }
    res.innerHTML = '<ul class="clean-list">' + list + '</ul>';
    if (!list) res.innerHTML = ''
}

function onSetFilterBy(keyword, ev) {
    ev.preventDefault()
    setFilterBy(keyword)
    renderMemes()
}

function onSelectFilter(keyword) {
    setFilterBy(keyword)
    document.querySelector('.search-input').value = keyword
    document.getElementById("result").innerHTML = ''
    renderMemes()
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
