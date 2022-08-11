'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')
var gCanvasSize = { width: gElCanvas.width, height: gElCanvas.height }

function initEditorController(memeId) {
    initListeners()
    initEditorService()
    setImgId(memeId)
    resizeCanvas()
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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-section')
    if (elContainer.offsetWidth > 400 && gElCanvas.width === 400) return
    if (elContainer.offsetWidth < 401 && gElCanvas.width === 350) return
    gCanvasSize.width = gElCanvas.width = (elContainer.offsetWidth > 400) ? 400 : 350
    gCanvasSize.height = gElCanvas.height = (elContainer.offsetWidth > 400) ? 400 : 350
    updateLinePos()
    // renderMeme()
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

function onDownloadMeme(elLink) {
    const memeImg = gElCanvas.toDataURL('image/jpeg')
    elLink.href = memeImg
}

function onSaveMeme() {
    const memeImg = gElCanvas.toDataURL('image/jpeg')
    saveMeme(memeImg)
}

function renderInputLineText(lineTxt) {
    const elLineInput = document.querySelector('.main-meme-editor .text-input')
    elLineInput.value = lineTxt
}

function goToEditor(memeId) {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    window.scrollTo({ top: 0, behavior: 'smooth' });
    elEditorWindow.classList.remove('inactive')
    setTimeout(() => elEditorWindow.classList.remove('hidden'), 100)
    initEditorController(memeId)
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAddLine(txt) {
    console.log('onAddLine');
    addLine(txt)
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
    console.log('txt:', txt);
    changeLineText(txt)
    renderMeme()
}

function initListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}