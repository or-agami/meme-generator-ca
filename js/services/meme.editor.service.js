'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'white'
        }
    ]
}

function setImgId(memeId) {
    console.log('memeId:', memeId);
    gMeme.selectedImgId = memeId
}

function setLineIdx(lineIdx) {
    console.log('lineIdx:', lineIdx);
}

function setLine(lineStr, size = 20, align = 'center', color = 'white') {
    console.log('lineStr:', lineStr);
}