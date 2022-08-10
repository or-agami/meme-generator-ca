'use strict'

var gMemeImg = {
    selectedImgId: 5,
    selectedImgUrl: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Top Text',
            size: 50,
            align: 'center',
            color: 'white',
            sColor: 'black',
            pos: { x: 100, y: 100 },
        },
        {
            txt: 'Bottom Text',
            size: 50,
            align: 'center',
            color: 'white',
            sColor: 'black',
            pos: { x: 100, y: 100 },
        }
    ]
}

function initEditorService(canvasWidth, canvasHeight) {
    gMemeImg.lines[0].pos.x = canvasWidth / 2
    gMemeImg.lines[0].pos.y = gMemeImg.lines[0].size
    gMemeImg.lines[1].pos.x = canvasWidth / 2
    gMemeImg.lines[1].pos.y = canvasHeight - gMemeImg.lines[1].size
}

function getSelectedMeme() {
    console.log('getSelectedMeme');
    return gMemeImg
}

function setImgId(memeId) {
    console.log('memeId:', memeId);
    const selectedMemeUrl = getMemeUrlById(memeId)
    gMemeImg.selectedImgId = memeId
    gMemeImg.selectedImgUrl = selectedMemeUrl
}

function setLineIdx(lineIdx) {
    console.log('lineIdx:', lineIdx);
}

function addLine(lineStr, size = 20, align = 'center', color = 'white') {
    gMemeImg.push({ txt: lineStr, size, align, color, })
    console.log('lineStr:', lineStr);
}