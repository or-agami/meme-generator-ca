'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')
var gCanvasSize = { width: gElCanvas.width, height: gElCanvas.height }
var gDraggedLinePos, gAspectRatio

function initEditorController(memeId, isNewMeme) {
    initListeners()
    initEditorService(isNewMeme)
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
    renderInputLineText(getCurrLine())
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-section')
    if (elContainer.offsetWidth > 400 && gElCanvas.width === 400) return
    if (elContainer.offsetWidth < 401 && gElCanvas.width === 350) return
    gCanvasSize.width = gElCanvas.width = (elContainer.offsetWidth > 400) ? 400 : 350
    gCanvasSize.height = gElCanvas.height = gAspectRatio * gElCanvas.width
    updateLinePos()
}

function renderMemeLine({ txt, size, pos, align, color, sColor, }) {
    gCtx.font = `${size}px Impact`
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.fillStyle = color
    gCtx.lineWidth = 5
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
    onGoToSaved()
}

function renderInputLineText(line) {
    const elLineInput = document.querySelector('.main-meme-editor .text-input')
    elLineInput.value = line.txt
    markSelectedAlignBtn(line.align)
}

function goToEditor(memeId, isNewMeme = true) {
    const img = new Image()
    img.src = getImgUrlById(memeId);
    img.onload = () => {
        gAspectRatio = img.height / img.width
        gCanvasSize.height = gElCanvas.height = gAspectRatio * gElCanvas.width
        const elEditorWindow = document.querySelector('.main-meme-editor')
        window.scrollTo({ top: 0, behavior: 'smooth' });
        elEditorWindow.classList.remove('inactive')
        setTimeout(() => elEditorWindow.classList.remove('hidden'), 100)
        initEditorController(memeId, isNewMeme)
    }
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    const currLine = getCurrLine()
    markSelectedAlignBtn(currLine.align)
}

function markSelectedAlignBtn(alignTo) {
    const elButtons = document.querySelectorAll('.main-meme-editor button')
    const elButton = document.querySelector(`.align-${alignTo}-btn`)
    elButtons.forEach(button => button.classList.remove('chosen'))
    elButton.classList.add('chosen')
}

function onAddLine(txt) {
    addLine(txt)
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onMoveLine(distanceX, distanceY) {
    moveLine(distanceX, distanceY)
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

function onChangeLineText(txt, ev) {
    console.log('ev:', ev);
    ev.preventDefault()
    changeLineText(txt)
    renderMeme()
}

function onCanvasDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    if (!isOnLine(pos)) return
    updateLineIsInDrag(true)
    gDraggedLinePos = pos
}

function onCanvasMove(ev) {
    ev.preventDefault()
    const line = getCurrLine();
    if (!line.isInDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gDraggedLinePos.x
    const dy = pos.y - gDraggedLinePos.y
    moveLine(dx, dy)
    gDraggedLinePos = pos
    renderMeme()
}

function onCanvasUp() {
    updateLineIsInDrag(false)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (['touchstart', 'touchmove', 'touchend'].includes(ev.type)) {

        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - 50,
            y: ev.pageY - ev.target.offsetTop - 50
        }
    }
    return pos
}

function initListeners() {
    // DESKTOP //
    gElCanvas.addEventListener('mousedown', onCanvasDown)
    gElCanvas.addEventListener('mousemove', onCanvasMove)
    gElCanvas.addEventListener('mouseup', onCanvasUp)

    // MOBILE //
    gElCanvas.addEventListener('touchstart', onCanvasDown)
    gElCanvas.addEventListener('touchmove', onCanvasMove)
    gElCanvas.addEventListener('touchend', onCanvasUp)
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`); 
    }
    doUploadImg(imgDataUrl, onSuccess);
}