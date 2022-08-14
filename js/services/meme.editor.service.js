'use strict'

var gMeme = {}

function initEditorService(isNewMeme) {
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

function getSelectedMeme() {
    return gMeme
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setImgId(memeId) {
    const selectedMemeUrl = getImgUrlById(memeId)
    gMeme.selectedImgId = memeId
    gMeme.selectedImgUrl = selectedMemeUrl
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function addLine(txt, pos = { x: gCanvasSize.width / 2, y: gCanvasSize.height / 2 }, size = 50, align = 'center', color = 'white', sColor = 'black', isInDrag = false) {
    const userLang = getLang()
    if (txt === undefined) {
        if (userLang === 'he') txt = 'שורה חדשה'
        if (userLang === 'en') txt = 'New Line'
    }
    let whiteSpace = 35
    if (txt.length <= 2) whiteSpace = - 15
    gMeme.lines.push({ txt, size, align, color, sColor, pos, isInDrag, width: txt.length * size / 2 - whiteSpace, height: size })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function saveMeme(memeImg) {
    gMeme.imgSrc = memeImg
    setSavedMeme(gMeme)
}

function removeLine() {
    const removedLine = gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length === 0) addLine()
    return removedLine
}

function moveLine(distanceX, distanceY) {
    const line = getSelectedLine()
    if (line.pos.x < 0 && distanceX < 0
        || line.pos.y < 0 && distanceY < 0
        || line.pos.x > gCanvasSize.width && distanceX > 0
        || line.pos.y > gCanvasSize.height && distanceY > 0) return
    line.pos.x += distanceX
    line.pos.y += distanceY
}

function changeTextSize(size) {
    const line = getSelectedLine()
    if (line.size < 10 && size < 0 || line.size > 100 && size > 0) return
    line.size += size
}

function changeTextAlign(alignTo) {
    const line = getSelectedLine()
    line.align = alignTo
    line.pos.x = (alignTo === 'left') ? 10 : (alignTo === 'right') ? gCanvasSize.width - 10 : gCanvasSize.width / 2
}

function changeStrokeColor(newSColor) {
    getSelectedLine().sColor = newSColor
}

function changeTextColor(newColor) {
    getSelectedLine().color = newColor
}

function changeLineText(newTxt) {
    getSelectedLine().txt = newTxt
}

function addDefaultLines() {
    const userLang = getLang()
    let defaultLinesTxt
    if (userLang === 'he') defaultLinesTxt = ['טקסט עליון', 'טקסט תחתון']
    if (userLang === 'en') defaultLinesTxt = ['Top Text', 'Bottom Text']
    const defaultLines = [{ txt: defaultLinesTxt[0], posX: gCanvasSize.width / 2, posY: 50 }, { txt: defaultLinesTxt[1], posX: gCanvasSize.width / 2, posY: gCanvasSize.height - 50 }]
    defaultLines.forEach((line) => {
        addLine(line.txt, { x: line.posX, y: line.posY })
    })
}

function isOnLine(downPos) {
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        const lh = line.height / 2
        const startPosX = (line.align === 'left') ? line.pos.x : (line.align === 'right') ? line.pos.x - line.width : line.pos.x - line.width / 2
        const endPosX = (line.align === 'left') ? line.pos.x + line.width : (line.align === 'right') ? line.pos.x : line.pos.x + line.width / 2
        if (downPos.x >= startPosX && downPos.x <= endPosX && downPos.y >= line.pos.y - lh && downPos.y <= line.pos.y + lh) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
    return false
}

function updateLineIsInDrag(isInDrag) {
    getSelectedLine().isInDrag = isInDrag
}

function updateLinePos() {
    if (gMeme.lines.length === 0) return
    const posDeviation = (gCanvasSize.width === 400) ? 400 / 350 : 350 / 400
    gMeme.lines.forEach((line) => {
        line.pos.x *= posDeviation
        line.pos.y *= posDeviation
        line.size *= posDeviation
    })
}