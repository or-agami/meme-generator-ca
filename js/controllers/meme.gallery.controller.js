'use strict'

function initGalleryController() {
    initGalleryService()
    renderImgs()
}

function goToGallery() {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.remove('inactive')
    setTimeout(() => elGalleryWindow.classList.remove('hidden'), 100)
}

function renderImgs() {
    const memesImgs = getImgForDisplay()
    const uploadFromLocalImgUrl = getUploadFromLocalImgUrl()
    const elMemeGallery = document.querySelector('.meme-gallery')
    const strHTMLs = memesImgs.map(img =>
        `<img onclick="onImgSelect(${img.id})" class="meme-image ${img.size}" src="assets/img/${img.id}.jpg" alt="${img.keywords[0]}">`
    )
    const uploadImgStrHTML = `<img class="meme-image xxxs" onclick="onImgUpload()" src="${uploadFromLocalImgUrl}" alt="Upload From Local">`
    strHTMLs.unshift(uploadImgStrHTML)
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
    renderImgs()
}

function onSelectFilter(keyword) {
    setFilterBy(keyword)
    document.querySelector('.search-input').value = keyword
    document.getElementById("result").innerHTML = ''
    renderImgs()
}

function onImgSelect(memeId) {
    const elGalleryWindow = document.querySelector('.main-meme-gallery')
    elGalleryWindow.classList.add('hidden')
    setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
    goToEditor(memeId)
}

function onImgUpload() {
    const elImgInput = document.createElement('input')
    elImgInput.type = 'file'
    elImgInput.setAttribute('onchange', 'onImgInput(event)')
    document.body.appendChild(elImgInput)
    elImgInput.click()
    document.body.removeChild(elImgInput)
}

function onImgInput(ev) {
    loadImageFromInput(ev, setImgFromInput)
}

function loadImageFromInput(ev, onImageReady) {

    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        const elGalleryWindow = document.querySelector('.main-meme-gallery')
        elGalleryWindow.classList.add('hidden')
        setTimeout(() => elGalleryWindow.classList.add('inactive'), 600)
        img.onload = onImageReady.bind(null, img)
        setTimeout(() => goToEditor(26), 100)
    }
    reader.readAsDataURL(ev.target.files[0])
}