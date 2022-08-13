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

function saveMeme(memeImg) {
    gMeme.imgSrc = memeImg
    setSavedMeme(gMeme)
}

function editSavedMeme(meme) {
    gMeme = meme
}

function getSelectedMeme() {
    return gMeme
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// function getCurrLineTxt() {
//     return gMeme.lines[gMeme.selectedLineIdx].txt
// }

function setImgId(memeId) {
    const selectedMemeUrl = getImgUrlById(memeId)
    gMeme.selectedImgId = memeId
    gMeme.selectedImgUrl = selectedMemeUrl
}

function switchLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx++
    else gMeme.selectedLineIdx = 0
    return gMeme.selectedLineIdx
}

function addLine(txt = 'New Line', pos = { x: gCanvasSize.width / 2, y: gCanvasSize.height / 2 }, size = 50, align = 'center', color = 'white', sColor = 'black', isInDrag = false) {
    gMeme.lines.push({ txt, size, align, color, sColor, pos, isInDrag, width: txt.length * size / 2 - 25, height: size })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    const removedLine = gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length === 0) addLine()
    return removedLine
}

function addDefaultLines() {
    const userLang = getLang()
    let defaultLinesTxt
    if (userLang === 'he') defaultLinesTxt = ['טקסט עליון', 'טקסט תחתון']
    if (userLang === 'en') defaultLinesTxt = ['Top Text', 'Top Text']
    let defaultLines = [{ txt: defaultLinesTxt[0], posX: gCanvasSize.width / 2, posY: 50 }, { txt: defaultLinesTxt[1], posX: gCanvasSize.width / 2, posY: gCanvasSize.height - 50 }]
    // else defaultLines = [{ txt: 'Top Text', posX: gCanvasSize.width / 2, posY: 50 }, { txt: 'Bottom Text', posX: gCanvasSize.width / 2, posY: gCanvasSize.height - 50 }]
    defaultLines.forEach((line) => {
        addLine(line.txt, { x: line.posX, y: line.posY })
    })
}

function moveLine(distanceX, distanceY) {
    if (gMeme.lines[gMeme.selectedLineIdx].pos.x < 0 && distanceX < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y < 0 && distanceY < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.x > gCanvasSize.width && distanceX > 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y > gCanvasSize.height && distanceY > 0) return
    gMeme.lines[gMeme.selectedLineIdx].pos.x += distanceX
    gMeme.lines[gMeme.selectedLineIdx].pos.y += distanceY
}

function isOnLine(downPos) {
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i];
        // const lw = line.width / 2
        // const lh = line.height / 2
        // if (downPos.x >= line.pos.x - lw && downPos.x <= line.pos.x + lw && downPos.y >= line.pos.y - lh && downPos.y <= line.pos.y + lh) {
        //     gMeme.selectedLineIdx = i
        //     return true
        // }
        const startPosX = (line.align === 'left') ? line.pos.x : (line.align === 'right') ? line.pos.x - line.width : line.pos.x - line.width / 2
        const endPosX = (line.align === 'left') ? line.pos.x + line.width : (line.align === 'right') ? line.pos.x : line.pos.x + line.width / 2
        const lh = line.height / 2
        if (downPos.x >= startPosX && downPos.x <= endPosX && downPos.y >= line.pos.y - lh && downPos.y <= line.pos.y + lh) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
    return false
}

function updateLineIsInDrag(isInDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isInDrag = isInDrag
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

function changeTextSize(size) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 10 && size < 0) return
    if (gMeme.lines[gMeme.selectedLineIdx].size > 100 && size > 0) return
    gMeme.lines[gMeme.selectedLineIdx].size += size
}

function changeTextAlign(alignTo) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignTo
    gMeme.lines[gMeme.selectedLineIdx].pos.x = (alignTo === 'left') ? 10 : (alignTo === 'right') ? gCanvasSize.width - 10 : gCanvasSize.width / 2
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