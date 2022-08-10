'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')

function initEditorController(memeId) {
    initEditorService(gElCanvas.width, gElCanvas.height)
    setImgId(memeId)
    renderMeme()
}

function renderMeme() {
    const selectedMeme = getSelectedMeme()
    const img = new Image()
    img.src = selectedMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        selectedMeme.lines.forEach((line) => renderMemeLine(line))
    }
}

function renderMemeLine({ txt, size, pos, align, color, sColor, }) {
    console.log('size:', size);
    gCtx.font = `${size}px Impact`;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = align;
    gCtx.fillStyle = color;
    gCtx.lineWidth = 6;
    gCtx.strokeStyle = sColor;
    gCtx.shadowColor = sColor
    gCtx.shadowOffsetX = gCtx.shadowOffsetY = 3
	gCtx.shadowBlur = 7
    gCtx.strokeText(txt, pos.x, pos.y);
    gCtx.fillText(txt, pos.x, pos.y);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function onGoToGallery() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.hidden = true

    console.log('onGoToGallery');
    goToGallery()
}

function goToEditor(memeId) {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.hidden = false
    console.log('goToEditor');
    initEditorController(memeId)
}

function onAddLine() {
    console.log('onAddLine');
    const lineStr = document.querySelector('.main-meme-editor .text-input')
    addLine(lineStr)
}