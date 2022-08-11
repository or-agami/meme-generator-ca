'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')
const gCanvasSize = { width: gElCanvas.width, height: gElCanvas.height }

function initEditorController(memeId) {
    initEditorService()
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
    renderInputLineText(getCurrLineTxt())
}

function renderMemeLine({ txt, size, pos, align, color, sColor, }) {
    console.log('align:', align)
    gCtx.font = `${size}px Impact`
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.fillStyle = color
    gCtx.lineWidth = 6
    gCtx.strokeStyle = gCtx.shadowColor = sColor
    gCtx.shadowOffsetX = gCtx.shadowOffsetY = 3
    gCtx.shadowBlur = 5
    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
}

function renderInputLineText(lineTxt) {
    const elLineInput = document.querySelector('.main-meme-editor .text-input')
    elLineInput.value = lineTxt
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function onGoToGallery() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.classList.add('hidden')
    setTimeout(() => elEditorWindow.classList.add('inactive'), 600)
    // setTimeout(() => elEditorWindow.hidden = true, 600)

    console.log('onGoToGallery');
    goToGallery()
}

function goToEditor(memeId) {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // window.scrollTo({ top: 0 });
    // elEditorWindow.hidden = false
    elEditorWindow.classList.remove('inactive')
    setTimeout(() => elEditorWindow.classList.remove('hidden'), 100)
    // elEditorWindow.classList.remove('hidden')
    initEditorController(memeId)
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAddLine() {
    console.log('onAddLine');
    // const lineStr = document.querySelector('.main-meme-editor .text-input').value
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onMoveLine(distance) {
    moveLine(distance)
    renderMeme()
}

function onChangeTextSize(size) {
    changeTextSize(size)
    renderMeme()
}

function onChangeTextAlign(alignTo, elButton) {
    changeTextAlign(alignTo)
    renderMeme()

    const elButtons = document.querySelectorAll('.main-meme-editor button')
    elButtons.forEach(button => button.classList.remove('chosen'))
    elButton.classList.add('chosen')
}

function onChangeTextColor(newColor) {
    changeTextColor(newColor)
    renderMeme()
}

function onChangeStrokeColor(newSColor) {
    changeStrokeColor(newSColor)
    renderMeme()
}

function onChangeLineText(txt) {
    changeLineText(txt)
    renderMeme()
}