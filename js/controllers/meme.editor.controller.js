'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')
var gCanvasSize = { width: gElCanvas.width, height: gElCanvas.height }
var gDraggedLinePos, gAspectRatio


function initEditorController(memeId, isNewMeme) {
    let impactFont = new FontFace('Impact', 'url(assets/fonts/impact/impact.ttf)')
    impactFont.load().then((font) => {
        document.fonts.add(font)
    })
    initListeners()
    initEditorService(isNewMeme)
    setImgId(memeId)
    resizeCanvas()
    renderMeme()
}

function goToEditor(memeId, isNewMeme = true) {
    const img = new Image()
    img.src = getImgUrlById(memeId);
    img.onload = () => {
        gAspectRatio = img.height / img.width
        if (img.width < 400) gElCanvas.width = img.width
        gCanvasSize.height = gElCanvas.height = gAspectRatio * gElCanvas.width
        const elEditorWindow = document.querySelector('.main-meme-editor')
        window.scrollTo({ top: 0, behavior: 'smooth' });
        elEditorWindow.classList.remove('inactive')
        setTimeout(() => elEditorWindow.classList.remove('hidden'), 100)
        initEditorController(memeId, isNewMeme)
    }
}

function renderMeme(isInEdit = true) {
    const selectedMeme = getSelectedMeme()
    const img = new Image()
    img.src = selectedMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        selectedMeme.lines.forEach((line, idx) => renderMemeLine(line, getSelectedLineIdx() === idx, isInEdit))
    }
    renderInputLineText(getSelectedLine())
}

function renderMemeLine({ txt, size, pos, align, color, sColor, }, selectedLine, isInEdit) {
    gCtx.font = `${size}px Impact`
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.fillStyle = color
    gCtx.lineWidth = size / 15
    gCtx.strokeStyle = gCtx.shadowColor = sColor
    gCtx.shadowOffsetX = gCtx.shadowOffsetY = 2
    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
    if (selectedLine && isInEdit) {
        gCtx.beginPath()
        gCtx.lineWidth = 3
        gCtx.shadowOffsetX = gCtx.shadowOffsetY = 0
        gCtx.rect(1, pos.y - size / 1.7, gElCanvas.width - 2, size * 1.1)
        gCtx.stroke()
        gCtx.closePath()
    }
}

function renderInputLineText(line) {
    const elLineInput = document.querySelector('.main-meme-editor .text-input')
    elLineInput.value = line.txt
    markSelectedAlignBtn(line.align)
}

function markSelectedAlignBtn(alignTo) {
    const elButtons = document.querySelectorAll('.main-meme-editor button')
    const elButton = document.querySelector(`.align-${alignTo}-btn`)
    elButtons.forEach(button => button.classList.remove('chosen'))
    elButton.classList.add('chosen')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-section')
    if (elContainer.offsetWidth > 400 && gElCanvas.width === 400) return
    if (elContainer.offsetWidth < 401 && gElCanvas.width === 350) return
    gCanvasSize.width = gElCanvas.width = (elContainer.offsetWidth > 400) ? 400 : 350
    gCanvasSize.height = gElCanvas.height = gAspectRatio * gElCanvas.width
    updateLinePos()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    const currLine = getSelectedLine()
    markSelectedAlignBtn(currLine.align)
}

function onAddLine(txt) {
    addLine(txt)
    renderMeme()
}

function onSaveMeme() {
    renderMeme(false)
    setTimeout(() => {
        saveMeme(convertMemeToJpeg())
        onGoToSaved()
    }, 100)
    resumeEditing()
}

function onDownloadMeme() {
    renderMeme(false)
    setTimeout(() => {
        const memeImg = convertMemeToJpeg()
        const elMemeImgLink = document.createElement('a')
        elMemeImgLink.href = memeImg
        elMemeImgLink.download = 'My Meme.jpeg'
        document.body.appendChild(elMemeImgLink)
        elMemeImgLink.click()
        document.body.removeChild(elMemeImgLink)
    }, 100)
    resumeEditing()
}

function onShareMeme() {
    renderMeme(false)
    setTimeout(() => {
        const imgDataUrl = convertMemeToJpeg()
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`);
        }
        doUploadImg(imgDataUrl, onSuccess);
    }, 100)
    resumeEditing()
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

function onChangeTextAlign(alignTo) {
    changeTextAlign(alignTo)
    renderMeme()
    markSelectedAlignBtn(alignTo)
}

function onChangeStrokeColor(newSColor) {
    changeStrokeColor(newSColor)
    renderMeme()
}

function onChangeTextColor(newColor) {
    changeTextColor(newColor)
    renderMeme()
}

function onChangeLineText(txt, ev) {
    ev.preventDefault()
    changeLineText(txt)
    renderMeme()
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

function onCanvasDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    if (!isOnLine(pos)) return
    renderMeme()
    updateLineIsInDrag(true)
    gDraggedLinePos = pos
}

function onCanvasMove(ev) {
    ev.preventDefault()
    const line = getSelectedLine();
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
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop - 50
        }
    }
    return pos
}

function convertMemeToJpeg() {
    return gElCanvas.toDataURL('image/jpeg')
}

function resumeEditing() {
    setTimeout(() => renderMeme(), 400)
}
