'use strict'

var gMemeImg = {
    selectedImgId: 5,
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: []
}

function initEditorService() {
    if (gMemeImg.lines.length === 0) addDefaultLines()
}

function getSelectedMeme() {
    return gMemeImg
}

function getCurrLineTxt() {
    return gMemeImg.lines[gMemeImg.selectedLineIdx].txt
}

function setImgId(memeId) {
    const selectedMemeUrl = getMemeUrlById(memeId)
    gMemeImg.selectedImgId = memeId
    gMemeImg.selectedImgUrl = selectedMemeUrl
}

function switchLine() {
    if (gMemeImg.lines.length > gMemeImg.selectedLineIdx + 1) gMemeImg.selectedLineIdx++
    else gMemeImg.selectedLineIdx = 0
    return gMemeImg.selectedLineIdx
}

function addLine(txt = 'New Line', pos = { x: gCanvasSize.width / 2, y: gCanvasSize.height / 2 }, size = 50, align = 'center', color = 'white', sColor = 'black') {
    gMemeImg.lines.push({ txt, size, align, color, sColor, pos })
}

function removeLine() {
    const removedLine = gMemeImg.lines.splice(gMemeImg.selectedLineIdx, 1)
    if (gMemeImg.lines.length === 0) addLine()
    return removedLine
}

function addDefaultLines() {
    let defaultLines = [{ txt: 'Top Text', posX: gCanvasSize.width / 2, posY: 50 }, { txt: 'Bottom Text', posX: gCanvasSize.width / 2, posY: gCanvasSize.height - 50 }]
    defaultLines.forEach((line) => {
        // let currLine = {
        //     txt: line.txt,
        //     size: 50,
        //     align: 'center',
        //     color: 'white',
        //     sColor: 'black',
        //     pos: { x: line.posX, y: line.posY }
        // }
        // gMemeImg.lines.push(currLine)
        addLine(line.txt, { x: line.posX, y: line.posY })
    })
}

function moveLine(distanceY, distanceX = 0) {
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].pos.x < 0 && distanceX < 0) return
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].pos.y < 0 && distanceY < 0) return
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].pos.x > gCanvasSize.width && distanceX > 0) return
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].pos.y > gCanvasSize.height && distanceY > 0) return
    gMemeImg.lines[gMemeImg.selectedLineIdx].pos.x += distanceX
    gMemeImg.lines[gMemeImg.selectedLineIdx].pos.y += distanceY
}

function changeTextSize(size) {
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].size < 10 && size < 0) return
    if (gMemeImg.lines[gMemeImg.selectedLineIdx].size > 100 && size > 0) return
    gMemeImg.lines[gMemeImg.selectedLineIdx].size += size
}

function changeTextAlign(alignTo) {
    console.log('alignTo:', alignTo);
    gMemeImg.lines[gMemeImg.selectedLineIdx].align = alignTo
}

function changeTextColor(newColor) {
    gMemeImg.lines[gMemeImg.selectedLineIdx].color = newColor
}

function changeStrokeColor(newSColor) {
    gMemeImg.lines[gMemeImg.selectedLineIdx].sColor = newSColor
}

function changeLineText(newTxt) {
    gMemeImg.lines[gMemeImg.selectedLineIdx].txt = newTxt
}