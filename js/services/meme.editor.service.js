'use strict'

// var gMeme = {
//     selectedImgId: 5,
//     selectedImgUrl: '',
//     selectedLineIdx: 0,
//     lines: []
// }
var gMeme = {}

function initEditorService(isNewMeme) {
    console.log('initEditorService');
    if (isNewMeme) {
        gMeme = {
            selectedImgId: 5,
            selectedImgUrl: '',
            selectedLineIdx: 0,
            lines: []
        }
    } else {
        gMeme = getMemeToEdit()
    }
    if (gMeme.lines.length === 0) addDefaultLines()
    gMeme.selectedLineIdx = 0
}

function saveMeme(memeImg) {
    gMeme.imgSrc = memeImg
    setSavedMeme(gMeme)
}

function editSavedMeme(meme) {
    console.log('editSavedMeme');
    gMeme = meme
}

function getSelectedMeme() {
    return gMeme
}

function getCurrLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setImgId(memeId) {
    const selectedMemeUrl = getMemeUrlById(memeId)
    gMeme.selectedImgId = memeId
    gMeme.selectedImgUrl = selectedMemeUrl
}

function switchLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function addLine(txt = 'New Line', pos = { x: gCanvasSize.width / 2, y: gCanvasSize.height / 2 }, size = 50, align = 'center', color = 'white', sColor = 'black') {
    gMeme.lines.push({ txt, size, align, color, sColor, pos })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    const removedLine = gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length === 0) addLine()
    return removedLine
}

function addDefaultLines() {
    let defaultLines = [{ txt: 'Top Text', posX: gCanvasSize.width / 2, posY: 50 }, { txt: 'Bottom Text', posX: gCanvasSize.width / 2, posY: gCanvasSize.height - 50 }]
    defaultLines.forEach((line) => {
        addLine(line.txt, { x: line.posX, y: line.posY })
    })
}

function moveLine(distanceY, distanceX = 0) {
    if (gMeme.lines[gMeme.selectedLineIdx].pos.x < 0 && distanceX < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y < 0 && distanceY < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.x > gCanvasSize.width && distanceX > 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y > gCanvasSize.height && distanceY > 0) return
    gMeme.lines[gMeme.selectedLineIdx].pos.x += distanceX
    gMeme.lines[gMeme.selectedLineIdx].pos.y += distanceY
}

function updateLinePos() {
    if (gMeme.lines.length === 0) return
    const posDeviation = (gCanvasSize.width === 400) ? 400 / 350 : 350 / 400
    gMeme.lines.forEach((line) => {
        line.pos.x = gCanvasSize.width / 2
        line.pos.y *= posDeviation
        line.size *= posDeviation
    })
}

function changeTextSize(size) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 10 && size < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].size > 100 && size > 0) return
    gMeme.lines[gMeme.selectedLineIdx].size += size
}

function changeTextAlign(alignTo) {
    console.log('alignTo:', alignTo);
    gMeme.lines[gMeme.selectedLineIdx].align = alignTo
}

function changeTextColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function changeStrokeColor(newSColor) {
    gMeme.lines[gMeme.selectedLineIdx].sColor = newSColor
}

function changeLineText(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}